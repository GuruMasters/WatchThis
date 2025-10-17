import React, { useEffect, useRef } from 'react';

interface ShurikenWebGLProps {
  size?: number;
  speed?: number; // rotations per second
  texturePath?: string; // path to the realistic shuriken PNG (with alpha)
}

// Ultra-realistic WebGL2 shuriken with auto-generated normal & roughness maps.
// - If a texture is provided, it generates a normal map and roughness map on the CPU (fast JS) and uploads them to GPU.
// - Uses a PBR-like shader (simplified Cook-Torrance) driven by generated maps.
// - Falls back to a procedural 2D renderer if WebGL2 or texture loading fails.

const ShurikenWebGL: React.FC<ShurikenWebGLProps> = ({
  size = 420,
  speed = 1.0,
  texturePath = '/watchthis/shuriken-texture.png',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    // 2D fallback
    const start2D = () => {
      console.log('Starting 2D fallback renderer for ShurikenWebGL');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      let angle = 0;
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(dpr, dpr);
        // vignette
        const g = ctx.createRadialGradient(size / 2, size / 2, size * 0.05, size / 2, size / 2, size * 0.9);
        g.addColorStop(0, 'rgba(255,255,255,0)');
        g.addColorStop(1, 'rgba(0,0,0,0.18)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, size, size);

        ctx.translate(size / 2, size / 2);
        ctx.rotate(angle);

        const blades = 6;
        for (let i = 0; i < blades; i++) {
          ctx.save();
          ctx.rotate((i * Math.PI * 2) / blades);
          const L = size * 0.42;
          const w = Math.max(6, size * 0.09);
          const grad = ctx.createLinearGradient(0, -w, L, -w);
          grad.addColorStop(0, '#6b6f73');
          grad.addColorStop(0.5, '#c0c2c4');
          grad.addColorStop(1, '#3b3d3f');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(0, -w);
          ctx.lineTo(L * 0.9, 0);
          ctx.lineTo(0, w);
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = 'rgba(255,255,255,0.08)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, -w * 0.4);
          ctx.lineTo(L * 0.5, 0);
          ctx.stroke();

          ctx.restore();
        }

        ctx.fillStyle = '#0b0b0b';
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.08, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
        angle += 0.02 * speed;
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
      return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    };

    // get webgl2
    const gl = canvas.getContext('webgl2', { alpha: true, antialias: true }) as WebGL2RenderingContext | null;
    if (!gl) {
      console.warn('WebGL2 not supported, falling back to 2D renderer');
      start2D();
      return;
    }

    // Create properly typed gl context after null check
    const glContext: WebGL2RenderingContext = gl;

    // helpers for shader compile
    const compile = (src: string, type: number) => {
      const s = glContext.createShader(type)!;
      glContext.shaderSource(s, src);
      glContext.compileShader(s);
      if (!glContext.getShaderParameter(s, glContext.COMPILE_STATUS)) {
        const info = glContext.getShaderInfoLog(s);
        glContext.deleteShader(s);
        throw new Error('Shader compile error: ' + info);
      }
      return s;
    };

    // Fullscreen quad
    const quad = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1]);

    // vertex shader
    const vs = `#version 300 es
    precision highp float;
    layout(location=0) in vec2 a_pos;
    layout(location=1) in vec2 a_uv;
    out vec2 v_uv;
    uniform mat3 u_transform;
    void main(){
      vec3 p = u_transform * vec3(a_pos,1.0);
      gl_Position = vec4(p.xy, 0.0, 1.0);
      v_uv = a_uv;
    }
    `;

    // fragment shader: PBR-ish using albedo, normal and roughness maps
    const fs = `#version 300 es
    precision highp float;
    in vec2 v_uv;
    out vec4 o;

    uniform sampler2D u_albedo;
    uniform sampler2D u_normal;
    uniform sampler2D u_roughness;
    uniform vec3 u_lightDir;
    uniform float u_brightness;

    const float PI = 3.141592653589793;

    vec3 srgbToLinear(vec3 c){ return pow(c, vec3(2.2)); }
    vec3 linearToSrgb(vec3 c){ return pow(c, vec3(1.0/2.2)); }

    float DistributionGGX(vec3 N, vec3 H, float roughness) {
      float a = roughness*roughness;
      float a2 = a*a;
      float NdotH = max(dot(N,H), 0.0);
      float denom = (NdotH*NdotH)*(a2-1.0)+1.0;
      return a2 / (PI * denom * denom + 1e-5);
    }
    float GeometrySchlickGGX(float NdotV, float k) {
      return NdotV / (NdotV * (1.0 - k) + k);
    }
    float GeometrySmith(vec3 N, vec3 V, vec3 L, float k) {
      return GeometrySchlickGGX(max(dot(N,V), 0.0), k) * GeometrySchlickGGX(max(dot(N,L),0.0), k);
    }

    vec3 fresnelSchlick(float cosTheta, vec3 F0){ return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0); }

    void main(){
      vec4 base = texture(u_albedo, v_uv);
      if (base.a < 0.02) discard;
      vec3 albedo = srgbToLinear(base.rgb) * u_brightness;

      // fetch normal from normal map (stored as RGB 0..1 => -1..1)
      vec3 nmap = texture(u_normal, v_uv).rgb;
      vec3 N = normalize(nmap * 2.0 - 1.0);

      float rough = texture(u_roughness, v_uv).r;
      rough = clamp(rough, 0.05, 1.0);

      vec3 V = normalize(vec3(0.0,0.0,1.0));
      vec3 L = normalize(u_lightDir);
      vec3 H = normalize(V + L);

      float NdotL = max(dot(N,L), 0.0);
      float NdotV = max(dot(N,V), 0.0001);
      float NdotH = max(dot(N,H), 0.0);

      // specular
      float D = DistributionGGX(N,H,rough);
      float k = (rough + 1.0);
      k = (k*k)/8.0;
      float G = GeometrySmith(N,V,L,k);
      vec3 F0 = vec3(0.04);
      F0 = mix(F0, albedo, 1.0); // metallic 1.0 assumed for steel-like
      vec3 F = fresnelSchlick(max(dot(H,V),0.0), F0);
      vec3 spec = (D * G * F) / (4.0 * NdotV * NdotL + 1e-5);

      vec3 kD = (1.0 - F) * (1.0 - 1.0);
      vec3 diff = vec3(0.0);

      vec3 env = vec3(0.18,0.2,0.22);

      vec3 color = (diff + spec) * NdotL + env * 0.6;
      color = color / (color + vec3(1.0));
      color = linearToSrgb(color);

      o = vec4(color, base.a);
    }
    `;

    // compile and link
    let prog: WebGLProgram;
    try {
      console.log('Compiling WebGL shaders for ShurikenWebGL...');
      const v = compile(vs, glContext.VERTEX_SHADER);
      const f = compile(fs, glContext.FRAGMENT_SHADER);
      prog = glContext.createProgram()!;
      glContext.attachShader(prog, v);
      glContext.attachShader(prog, f);
      glContext.linkProgram(prog);
      if (!glContext.getProgramParameter(prog, glContext.LINK_STATUS)) {
        const linkError = glContext.getProgramInfoLog(prog) || 'link error';
        console.error('Shader link failed:', linkError);
        throw new Error(linkError);
      }
      glContext.useProgram(prog);
      console.log('WebGL shaders compiled successfully');
    } catch (e) {
      console.error('Shader compilation/link failed:', e);
      start2D();
      return;
    }

    // create buffers/vao
    const vao = glContext.createVertexArray()!;
    glContext.bindVertexArray(vao);
    const buf = glContext.createBuffer()!;
    glContext.bindBuffer(glContext.ARRAY_BUFFER, buf);
    glContext.bufferData(glContext.ARRAY_BUFFER, quad, glContext.STATIC_DRAW);
    glContext.enableVertexAttribArray(0);
    glContext.vertexAttribPointer(0, 2, glContext.FLOAT, false, 16, 0);
    glContext.enableVertexAttribArray(1);
    glContext.vertexAttribPointer(1, 2, glContext.FLOAT, false, 16, 8);

    // uniform locations
    const uTransform = glContext.getUniformLocation(prog, 'u_transform');
    const uAlbedo = glContext.getUniformLocation(prog, 'u_albedo');
    const uNormal = glContext.getUniformLocation(prog, 'u_normal');
    const uRough = glContext.getUniformLocation(prog, 'u_roughness');
    const uLightDir = glContext.getUniformLocation(prog, 'u_lightDir');
    const uBrightness = glContext.getUniformLocation(prog, 'u_brightness');

    glContext.uniform3f(uLightDir, 0.45, 0.6, 0.7);
    glContext.uniform1f(uBrightness, 1.05);

    // create textures placeholders
    const albedoTex = glContext.createTexture()!;
    const normalTex = glContext.createTexture()!;
    const roughTex = glContext.createTexture()!;

    function uploadTextureFromImage(img: HTMLImageElement, tex: WebGLTexture, unit = 0, generateMipmap = true) {
      glContext.activeTexture(glContext.TEXTURE0 + unit);
      glContext.bindTexture(glContext.TEXTURE_2D, tex);
      glContext.pixelStorei(glContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
      glContext.texImage2D(glContext.TEXTURE_2D, 0, glContext.RGBA, glContext.RGBA, glContext.UNSIGNED_BYTE, img);
      if (generateMipmap) glContext.generateMipmap(glContext.TEXTURE_2D);
      glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MIN_FILTER, generateMipmap ? glContext.LINEAR_MIPMAP_LINEAR : glContext.LINEAR);
      glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MAG_FILTER, glContext.LINEAR);
      glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_S, glContext.CLAMP_TO_EDGE);
      glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_T, glContext.CLAMP_TO_EDGE);
    }

    // Generate normal map from image (height-from-luminance -> sobel -> encode normal)
    function generateNormalMap(img: HTMLImageElement, sizePow = 1024) {
      const w = img.width;
      const h = img.height;
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const imgd = ctx.getImageData(0, 0, w, h);
      const data = imgd.data;
      // compute luminance height
      const height = new Float32Array(w * h);
      for (let i = 0; i < w * h; i++) {
        const r = data[i * 4] / 255;
        const g = data[i * 4 + 1] / 255;
        const b = data[i * 4 + 2] / 255;
        const a = data[i * 4 + 3] / 255;
        // weight by alpha so cutout areas don't influence height
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) * a;
        height[i] = lum;
      }

      const normalPixels = new Uint8ClampedArray(w * h * 4);

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          // sample neighbors (clamped)
          const xm = Math.max(0, x - 1);
          const xp = Math.min(w - 1, x + 1);
          const ym = Math.max(0, y - 1);
          const yp = Math.min(h - 1, y + 1);

          const hl = height[y * w + xm];
          const hr = height[y * w + xp];
          const hu = height[ym * w + x];
          const hd = height[yp * w + x];

          // gradient
          const dx = (hr - hl);
          const dy = (hd - hu);
          const dz = 1.0 / Math.max(0.0001, Math.sqrt(dx * dx + dy * dy + 1.0));

          // normal in [-1,1]
          let nx = -dx * dz;
          let ny = -dy * dz;
          let nz = dz;

          // encode to 0..255
          const idx = (y * w + x) * 4;
          normalPixels[idx] = Math.round((nx * 0.5 + 0.5) * 255);
          normalPixels[idx + 1] = Math.round((ny * 0.5 + 0.5) * 255);
          normalPixels[idx + 2] = Math.round((nz * 0.5 + 0.5) * 255);
          normalPixels[idx + 3] = 255;
        }
      }

      // create canvas and put pixels
      const nc = document.createElement('canvas');
      nc.width = w;
      nc.height = h;
      const nctx = nc.getContext('2d')!;
      const imgData = new ImageData(normalPixels, w, h);
      nctx.putImageData(imgData, 0, 0);
      return nc;
    }

    // Generate roughness map: use inverted luminance, apply simple box blur
    function generateRoughnessMap(img: HTMLImageElement, blurRadius = 2) {
      const w = img.width;
      const h = img.height;
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const id = ctx.getImageData(0, 0, w, h);
      const data = id.data;
      // luminance
      const lum = new Float32Array(w * h);
      for (let i = 0; i < w * h; i++) {
        const r = data[i * 4] / 255;
        const g = data[i * 4 + 1] / 255;
        const b = data[i * 4 + 2] / 255;
        const a = data[i * 4 + 3] / 255;
        lum[i] = ((0.299 * r + 0.587 * g + 0.114 * b) * a);
      }
      // blur (box blur)
      const out = new Float32Array(w * h);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          let sum = 0;
          let cnt = 0;
          for (let oy = -blurRadius; oy <= blurRadius; oy++) {
            const yy = Math.min(h - 1, Math.max(0, y + oy));
            for (let ox = -blurRadius; ox <= blurRadius; ox++) {
              const xx = Math.min(w - 1, Math.max(0, x + ox));
              sum += lum[yy * w + xx];
              cnt++;
            }
          }
          out[y * w + x] = sum / cnt;
        }
      }
      // invert for roughness (bright -> smooth -> low roughness); tweak to taste
      const roughPixels = new Uint8ClampedArray(w * h * 4);
      for (let i = 0; i < w * h; i++) {
        const val = 1.0 - out[i];
        const v = Math.round(255 * Math.pow(val, 0.9));
        roughPixels[i * 4 + 0] = v;
        roughPixels[i * 4 + 1] = v;
        roughPixels[i * 4 + 2] = v;
        roughPixels[i * 4 + 3] = 255;
      }
      const rc = document.createElement('canvas');
      rc.width = w;
      rc.height = h;
      const rctx = rc.getContext('2d')!;
      rctx.putImageData(new ImageData(roughPixels, w, h), 0, 0);
      return rc;
    }

    // load image and generate maps, then upload
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        console.log('Texture loaded successfully:', texturePath);
        console.log('Processing textures for WebGL shuriken...');
        // upload albedo
        uploadImageToTexture(glContext, img, albedoTex, 0, true);

        // generate normal
        const normalCanvas = generateNormalMap(img);
        uploadCanvasToTexture(glContext, normalCanvas, normalTex, 1, true);

        // generate roughness
        const roughCanvas = generateRoughnessMap(img, 2);
        uploadCanvasToTexture(glContext, roughCanvas, roughTex, 2, true);

        // bind texture units to uniforms
        glContext.useProgram(prog);
        glContext.uniform1i(uAlbedo, 0);
        glContext.uniform1i(uNormal, 1);
        glContext.uniform1i(uRough, 2);

        // start render loop
        startRenderLoop(glContext, prog, uTransform, size, speed, albedoTex, normalTex, roughTex, rafRef, canvas);
      } catch (e) {
        console.error('Processing textures failed, falling back to 2D renderer.', e);
        start2D();
      }
    };
    img.onerror = (err) => {
      console.error('Failed to load texture:', texturePath, err);
      console.error('Falling back to 2D renderer due to texture loading failure');
      start2D();
    };
    try {
      console.log('Loading texture from:', texturePath);
      img.src = texturePath;
    } catch (e) {
      console.error('Setting src failed:', e);
      console.error('Falling back to 2D renderer due to src setting failure');
      start2D();
    }

    // helper: upload image element to texture
    function uploadImageToTexture(glContext: WebGL2RenderingContext, imgEl: HTMLImageElement, tex: WebGLTexture, unit: number, mip = true) {
      glContext.activeTexture(glContext.TEXTURE0 + unit);
      glContext.bindTexture(glContext.TEXTURE_2D, tex);
      glContext.pixelStorei(glContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
      glContext.texImage2D(glContext.TEXTURE_2D, 0, glContext.RGBA, glContext.RGBA, glContext.UNSIGNED_BYTE, imgEl);
      if (mip) glContext.generateMipmap(glContext.TEXTURE_2D);
      glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MIN_FILTER, mip ? glContext.LINEAR_MIPMAP_LINEAR : glContext.LINEAR);
      glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MAG_FILTER, glContext.LINEAR);
      glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_S, glContext.CLAMP_TO_EDGE);
      glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_T, glContext.CLAMP_TO_EDGE);
    }

    function uploadCanvasToTexture(glContext: WebGL2RenderingContext, canvasEl: HTMLCanvasElement, tex: WebGLTexture, unit: number, mip = true) {
      glContext.activeTexture(glContext.TEXTURE0 + unit);
      glContext.bindTexture(glContext.TEXTURE_2D, tex);
      glContext.pixelStorei(glContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
      glContext.texImage2D(glContext.TEXTURE_2D, 0, glContext.RGBA, glContext.RGBA, glContext.UNSIGNED_BYTE, canvasEl);
      if (mip) glContext.generateMipmap(glContext.TEXTURE_2D);
      glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MIN_FILTER, mip ? glContext.LINEAR_MIPMAP_LINEAR : glContext.LINEAR);
      glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MAG_FILTER, glContext.LINEAR);
      glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_S, glContext.CLAMP_TO_EDGE);
      glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_T, glContext.CLAMP_TO_EDGE);
    }

    // main render loop
    function startRenderLoop(
      glContext: WebGL2RenderingContext,
      prog: WebGLProgram,
      uTransform: WebGLUniformLocation | null,
      size: number,
      speed: number,
      albedo: WebGLTexture,
      normal: WebGLTexture,
      rough: WebGLTexture,
      rafRef: React.MutableRefObject<number | null>,
      canvasEl: HTMLCanvasElement
    ) {
      glContext.useProgram(prog);
      const light = [0.45, 0.6, 0.7];
      const uLight = glContext.getUniformLocation(prog, 'u_lightDir');
      glContext.uniform3f(uLight, light[0], light[1], light[2]);

      const start = performance.now();
      const draw = () => {
        const t = (performance.now() - start) * 0.001;
        glContext.viewport(0, 0, canvasEl.width, canvasEl.height);

        // clear transparent
        glContext.clearColor(0, 0, 0, 0);
        glContext.clear(glContext.COLOR_BUFFER_BIT);

        // transform matrix
        const rot = t * speed * 2.0 * Math.PI;
        const c = Math.cos(rot);
        const s = Math.sin(rot);
        const sc = 0.94;
        const mat = new Float32Array([c * sc, s * sc, 0, -s * sc, c * sc, 0, 0, 0, 1]);
        if (uTransform) glContext.uniformMatrix3fv(uTransform, false, mat);

        // bind textures
        glContext.activeTexture(glContext.TEXTURE0);
        glContext.bindTexture(glContext.TEXTURE_2D, albedo);
        glContext.activeTexture(glContext.TEXTURE1);
        glContext.bindTexture(glContext.TEXTURE_2D, normal);
        glContext.activeTexture(glContext.TEXTURE2);
        glContext.bindTexture(glContext.TEXTURE_2D, rough);

        glContext.drawArrays(glContext.TRIANGLE_STRIP, 0, 4);

        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    }

    // cleanup on unmount
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try { glContext.getExtension('WEBGL_lose_context')?.loseContext(); } catch (e) {}
    };
  }, [size, speed, texturePath]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: size, height: size, background: 'transparent' }}
      aria-hidden
    />
  );
};

export default ShurikenWebGL;
