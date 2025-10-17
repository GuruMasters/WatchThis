import React, { useEffect, useRef, useState } from 'react';

interface GlobeWebGLProps {
  size?: number;
  nightMode?: boolean;
  autoRotate?: boolean;
  speed?: number;
  showMeridians?: boolean;
  className?: string;
}

export const GlobeWebGL: React.FC<GlobeWebGLProps> = ({
  size = 400,
  nightMode = false,
  autoRotate = false,
  speed = 0.0007,
  showMeridians = false,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [controls, setControls] = useState({
    autoRotate: false,
    showMeridians: false,
    nightMode: false,
    showAtmosphere: true,
    animateClouds: true,
    cloudOpacity: 0.6
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    let animationId: number;
    let scene: any, camera: any, renderer: any, orbitControls: any;
    let earth: any, clouds: any, atmosphere: any, glow: any, meridianLines: any;
    let sun: any, fillLight: any, ambient: any;
    let autoRotateEnabled = autoRotate;
    let cloudAnimationEnabled = true;
    // Texture references za cloud toggle
    let specularTexRef: any, bumpTexRef: any;
    // Original Earth material properties
    let originalEarthMaterial: any = {};

    const init = async () => {
      try {
        // Dynamically import Three.js
        const THREE = await import('three').catch(() => null);
        if (!THREE) {
          console.warn('Three.js not available, using fallback');
          setLoadError(true);
          setIsLoading(false);
          return;
        }

        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js').catch(() => ({ OrbitControls: null }));
        if (!OrbitControls) {
          console.warn('OrbitControls not available');
          setLoadError(true);
          setIsLoading(false);
          return;
        }

        // Setup scene
        scene = new THREE.Scene();
        // Povećana FOV za jači 3D efekat
        camera = new THREE.PerspectiveCamera(35, size / size, 0.1, 2000);
        camera.position.set(0, 0, 6.5);

        renderer = new THREE.WebGLRenderer({ 
          canvas: canvasRef.current!, 
          antialias: true,
          alpha: true 
        });
        renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        // Omogući senke za realističniji 3D efekat
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // Bolji tone mapping za metalik efekat
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;

        // Realistično osvetljenje - kao u prirodi
        ambient = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambient);

        // Glavno svetlo (sunce) - realistična boja i intenzitet
        sun = new THREE.DirectionalLight(0xfffaed, 2.2);
    sun.position.set(5, 3, 5);
        sun.castShadow = true;
        sun.shadow.mapSize.width = 4096;
        sun.shadow.mapSize.height = 4096;
        sun.shadow.camera.near = 0.5;
        sun.shadow.camera.far = 50;
        sun.shadow.bias = -0.0001;
    scene.add(sun);
        
        // Fill light - nebeski plavi kao atmosfera
        fillLight = new THREE.DirectionalLight(0x4488ff, 0.6);
        fillLight.position.set(-4, 2, -4);
        scene.add(fillLight);
        
        // Rim light - topli narandžasti zalazak sunca
        const rimLight = new THREE.DirectionalLight(0xffaa66, 0.4);
        rimLight.position.set(-5, 0, -5);
        scene.add(rimLight);
        
        // Hemisphere light za prirodno osvetljenje neba
        const hemiLight = new THREE.HemisphereLight(0xaaccff, 0x333333, 0.3);
        scene.add(hemiLight);

        // Controls sa boljom responzivnošću i strožim zoom limitima
        orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enableDamping = true;
        orbitControls.dampingFactor = 0.05;
        orbitControls.enablePan = false;
        orbitControls.minDistance = 2.2; // Ne može bliže od površine
        orbitControls.maxDistance = 8; // Ne može biti premala
        orbitControls.autoRotate = false;
        orbitControls.rotateSpeed = 0.5;
        orbitControls.zoomSpeed = 0.8;

    // Load textures
    const loader = new THREE.TextureLoader();
        const textureUrls = {
          color: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg',
          bump: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/elev_bump_4k.jpg',
          specular: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/water_4k.png',
          clouds: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/fair_clouds_4k.png'
        };

        const [colorTex, bumpTex, specularTex, cloudsTex] = await Promise.all([
          loader.loadAsync(textureUrls.color),
          loader.loadAsync(textureUrls.bump),
          loader.loadAsync(textureUrls.specular),
          loader.loadAsync(textureUrls.clouds)
        ]);
        
        // Sačuvaj texture reference za cloud toggle
        specularTexRef = specularTex;
        bumpTexRef = bumpTex;

        // Earth sa ultra-realistični PBR materijal
        const earthGeo = new THREE.SphereGeometry(1.8, 256, 256);
        const earthMat = new THREE.MeshStandardMaterial({
          map: colorTex,
          bumpMap: bumpTex,
          bumpScale: 0.015, // Realistična visina planina
          roughnessMap: specularTex,
          roughness: 0.8, // Kontinenti grubi, okeani glatki
          metalness: 0.2, // Blagi metalik sjaj na vodi
          envMapIntensity: 2.0, // Jača refleksija okoline
          displacementMap: bumpTex,
          displacementScale: 0.05 // Realna 3D geometrija planina
        });
        earth = new THREE.Mesh(earthGeo, earthMat);
        earth.castShadow = true;
        earth.receiveShadow = true;
        scene.add(earth);
        
        // Sačuvaj originalne vrednosti materijala
        originalEarthMaterial = {
          roughnessMap: specularTex,
          roughness: 0.8,
          metalness: 0.2,
          envMapIntensity: 2.0,
          emissive: new THREE.Color(0x000000),
          emissiveIntensity: 0,
          displacementMap: bumpTex,
          displacementScale: 0.05,
          bumpMap: bumpTex,
          bumpScale: 0.015
        };

        // Clouds - realistični sa volumetrijskim efektom
        const cloudsGeo = new THREE.SphereGeometry(1.825, 128, 128);
        const cloudsMat = new THREE.MeshStandardMaterial({
          map: cloudsTex,
          transparent: true,
          opacity: 0.6,
          depthWrite: false,
          alphaMap: cloudsTex,
          roughness: 1.0,
          metalness: 0.0,
          emissive: new THREE.Color(0xffffff),
          emissiveIntensity: 0.05 // Blagi sjaj oblaka
        });
        clouds = new THREE.Mesh(cloudsGeo, cloudsMat);
        clouds.visible = true; // Inicijalno vidljivi
        clouds.castShadow = true;
        clouds.receiveShadow = true;
        scene.add(clouds);

        // Atmosphere - realistični Rayleigh scattering
        const atmosphereGeo = new THREE.SphereGeometry(1.92, 64, 64);
      const atmosphereMat = new THREE.ShaderMaterial({
          vertexShader: `
            varying vec3 vNormal;
            varying vec3 vPosition;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              vPosition = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 sunPosition;
            varying vec3 vNormal;
            varying vec3 vPosition;
            
            void main() {
              // Atmospheric scattering
              float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
              
              // Sun direction effect
              vec3 sunDir = normalize(sunPosition);
              float sunEffect = max(0.0, dot(normalize(vPosition), sunDir));
              
              // Blue sky color (Rayleigh scattering)
              vec3 skyColor = vec3(0.3, 0.6, 1.0);
              // Sunset color
              vec3 sunsetColor = vec3(1.0, 0.5, 0.2);
              
              vec3 finalColor = mix(skyColor, sunsetColor, pow(sunEffect, 4.0));
              
              gl_FragColor = vec4(finalColor, 1.0) * intensity * 1.3;
            }
          `,
          uniforms: {
            sunPosition: { value: new THREE.Vector3(5, 3, 5) }
          },
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
          transparent: true
        });
        atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
        atmosphere.visible = true;
        scene.add(atmosphere);
        
        // Takođe sačuvaj glow referencu za kompatibilnost
        glow = atmosphere;
        
        // Outer glow za dodatnu dubinu
        const outerGlowGeo = new THREE.SphereGeometry(2.0, 32, 32);
        const outerGlowMat = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
              float intensity = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
              gl_FragColor = vec4(0.4, 0.7, 1.0, 1.0) * intensity * 0.5;
            }
          `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true
      });
        const outerGlow = new THREE.Mesh(outerGlowGeo, outerGlowMat);
        scene.add(outerGlow);

        // Meridian lines (latitude/longitude grid)
        const meridiansGroup = new THREE.Group();
        const lineColor = nightMode ? 0x88ccff : 0xffffff;
        
        // Vertical meridians (longitude)
        for (let i = 0; i < 24; i++) {
          const curve = new THREE.EllipseCurve(
            0, 0,
            1.81, 1.81,
            0, 2 * Math.PI,
            false,
            0
          );
          const points = curve.getPoints(50);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ 
            color: lineColor, 
            transparent: true, 
            opacity: 0.15 
          });
          const ellipse = new THREE.Line(geometry, material);
          ellipse.rotation.y = (i / 24) * Math.PI * 2;
          meridiansGroup.add(ellipse);
        }
        
        // Horizontal parallels (latitude)
        for (let i = 1; i < 6; i++) {
          const radius = Math.sin((i / 6) * Math.PI) * 1.81;
          const y = Math.cos((i / 6) * Math.PI) * 1.81;
          const geometry = new THREE.RingGeometry(radius - 0.01, radius + 0.01, 64);
          const material = new THREE.MeshBasicMaterial({ 
            color: lineColor, 
            transparent: true, 
            opacity: 0.15,
            side: THREE.DoubleSide
          });
          const ring = new THREE.Mesh(geometry, material);
          ring.position.y = y;
          ring.rotation.x = Math.PI / 2;
          meridiansGroup.add(ring);
          
          if (i !== 3) {
            const ring2 = new THREE.Mesh(geometry, material);
            ring2.position.y = -y;
            ring2.rotation.x = Math.PI / 2;
            meridiansGroup.add(ring2);
          }
        }
        
        meridianLines = meridiansGroup;
        meridianLines.visible = false; // Inicijalno sakriveni
        scene.add(meridianLines);

        // Zvezdano nebo za pozadinu
        const starsGeometry = new THREE.BufferGeometry();
        const starCount = 15000;
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        
        for (let i = 0; i < starCount * 3; i += 3) {
          // Random sfera oko globusa
          const radius = 50 + Math.random() * 50;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          
          positions[i] = radius * Math.sin(phi) * Math.cos(theta);
          positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[i + 2] = radius * Math.cos(phi);
          
          // Random boje zvezda (bele do plave)
          const colorVariation = 0.8 + Math.random() * 0.2;
          colors[i] = colorVariation;
          colors[i + 1] = colorVariation;
          colors[i + 2] = 0.9 + Math.random() * 0.1;
        }
        
        starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const starsMaterial = new THREE.PointsMaterial({
          size: 0.15,
          vertexColors: true,
          transparent: true,
          opacity: 0.8,
          sizeAttenuation: true
        });
        
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(stars);

        setIsLoading(false);

        // Animation loop sa smooth efektima
        let time = 0;
        const animate = () => {
          animationId = requestAnimationFrame(animate);
          time += 0.001;
          
          // Rotacija Zemlje
          if (autoRotateEnabled && earth) {
            earth.rotation.y += speed;
            if (meridianLines) meridianLines.rotation.y += speed;
          }
          
          // Animacija oblaka - nezavisno od auto-rotate
          if (clouds && clouds.visible && cloudAnimationEnabled) {
            // Oblaci se uvek kreću (ako je animateClouds enabled)
            clouds.rotation.y += speed * 1.2;
            // Subtilna vertikalna oscilacija
            clouds.rotation.x = Math.sin(time * 0.3) * 0.015;
            clouds.rotation.z = Math.cos(time * 0.4) * 0.01;
          }
          
          
          // Animiraj atmospheric glow
          if (glow && glow.material && (glow.material as any).uniforms) {
            (glow.material as any).uniforms.sunPosition.value.x = 5 * Math.cos(time * 0.1);
            (glow.material as any).uniforms.sunPosition.value.z = 5 * Math.sin(time * 0.1);
          }
          
          if (orbitControls) orbitControls.update();
          if (renderer && scene && camera) {
            renderer.render(scene, camera);
          }
        };
        animate();

        // Expose controls for external updates
        (window as any).globeControls = {
          toggleAutoRotate: () => {
            autoRotateEnabled = !autoRotateEnabled;
          },
          toggleMeridians: () => {
            if (meridianLines) meridianLines.visible = !meridianLines.visible;
          },
          toggleNightMode: (isNight: boolean) => {
            // Smooth transition between day and night
            if (sun) {
              sun.intensity = isNight ? 0.3 : 2.2;
              sun.color.setHex(isNight ? 0x8899ff : 0xfffaed);
            }
            if (fillLight) {
              fillLight.intensity = isNight ? 0.8 : 0.6;
              fillLight.color.setHex(isNight ? 0x2233ff : 0x4488ff);
            }
            if (ambient) {
              ambient.intensity = isNight ? 0.05 : 0.2;
            }
            
            // Tamna pozadina za noćni mod
            scene.background = isNight ? new THREE.Color(0x000208) : null;
            
            // Animiraj emissive na oblacima
            if (clouds && clouds.material) {
              (clouds.material as any).emissiveIntensity = isNight ? 0.02 : 0.05;
            }
          },
          toggleClouds: () => {
            if (!clouds) return;
            
            // JEDNOSTAVNO: samo toggle visibility oblaka, NE diraj Earth materijal
            clouds.visible = !clouds.visible;
            
            // Smooth fade-in animation ako se oblaci prikazuju
            if (clouds.visible && clouds.material) {
              const cloudMat = clouds.material as any;
              cloudMat.opacity = 0;
              let opacity = 0;
              const fadeIn = setInterval(() => {
                opacity += 0.05;
                if (opacity >= 0.6) {
                  opacity = 0.6;
                  clearInterval(fadeIn);
                }
                cloudMat.opacity = opacity;
              }, 20);
            }
          },
          
          toggleAtmosphere: () => {
            if (atmosphere) {
              atmosphere.visible = !atmosphere.visible;
            }
          },
          
          setCloudOpacity: (opacity: number) => {
            if (clouds && clouds.material) {
              (clouds.material as any).opacity = opacity;
            }
          },
          
          toggleCloudAnimation: () => {
            cloudAnimationEnabled = !cloudAnimationEnabled;
          },
        };

      } catch (error) {
        console.error('Failed to initialize globe:', error);
        setLoadError(true);
        setIsLoading(false);
      }
    };

    init();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) {
        renderer.dispose();
      }
      if (scene) {
        scene.traverse((object: any) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat: any) => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
      delete (window as any).globeControls;
    };
  }, [size, speed, autoRotate]);

  // Custom SVG Icons
  const icons = {
    play: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
    ),
    pause: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>
    ),
    grid: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h18M3 12h18M3 18h18"/>
        <path d="M6 3v18M12 3v18M18 3v18"/>
      </svg>
    ),
    cloud: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>
    ),
    sun: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
    moon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    ),
    atmosphere: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6" opacity="0.5"/>
      </svg>
    ),
    animation: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12h4l3 9 4-18 3 9h4"/>
      </svg>
    ),
    opacity: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" opacity="0.3"/>
        <path d="M12 2 A10 10 0 0 1 12 22" opacity="0.8"/>
      </svg>
    ),
    snow: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="2" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <line x1="5" y1="5" x2="19" y2="19"/>
        <line x1="19" y1="5" x2="5" y2="19"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    ),
    volcano: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 20h16L15 8l-3 4-3-4z" fill="currentColor" opacity="0.5"/>
        <path d="M12 2v6M10 3l2 2 2-2M9 5l3 3 3-3"/>
      </svg>
    )
  };

  const handleControlToggle = (control: 'autoRotate' | 'showMeridians' | 'nightMode' | 'showAtmosphere' | 'animateClouds') => {
    // Check if globeControls is available
    if (!(window as any).globeControls) {
      console.warn('Globe not yet initialized');
      return;
    }

    // Apply changes to Three.js scene immediately
    if (control === 'autoRotate') {
      (window as any).globeControls.toggleAutoRotate();
    } else if (control === 'showMeridians') {
      (window as any).globeControls.toggleMeridians();
    } else if (control === 'nightMode') {
      const newNightMode = !controls.nightMode;
      (window as any).globeControls.toggleNightMode(newNightMode);
    } else if (control === 'showAtmosphere') {
      (window as any).globeControls.toggleAtmosphere();
    } else if (control === 'animateClouds') {
      (window as any).globeControls.toggleCloudAnimation();
    }

    // Update state for UI
    setControls(prev => ({ ...prev, [control]: !prev[control] }));
  };
  
  const handleCloudOpacityChange = (opacity: number) => {
    if ((window as any).globeControls) {
      (window as any).globeControls.setCloudOpacity(opacity);
      setControls(prev => ({ ...prev, cloudOpacity: opacity }));
    }
  };

  // Fallback visual if Three.js fails
  if (loadError) {
    return (
      <div className={className} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div 
          style={{
            position: 'relative',
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(52, 168, 235, 1) 0%, rgba(20, 108, 148, 1) 40%, rgba(11, 68, 90, 1) 70%, rgba(5, 34, 45, 1) 100%)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset -20px -20px 60px rgba(0, 0, 0, 0.5), inset 20px 20px 60px rgba(255, 255, 255, 0.3)',
            overflow: 'hidden'
          }}
        >
          {/* Simple continents SVG overlay */}
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 200 200"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: 0.4
            }}
          >
            <ellipse cx="100" cy="60" rx="25" ry="15" fill="#2D5F3F" opacity="0.6" />
            <ellipse cx="85" cy="75" rx="20" ry="12" fill="#2D5F3F" opacity="0.6" />
            <ellipse cx="120" cy="85" rx="18" ry="10" fill="#2D5F3F" opacity="0.5" />
            <ellipse cx="70" cy="95" rx="15" ry="20" fill="#2D5F3F" opacity="0.6" />
            <ellipse cx="130" cy="110" rx="22" ry="15" fill="#2D5F3F" opacity="0.5" />
            <ellipse cx="95" cy="125" rx="20" ry="18" fill="#2D5F3F" opacity="0.6" />
            <ellipse cx="115" cy="140" rx="12" ry="10" fill="#2D5F3F" opacity="0.5" />
          </svg>

          {/* Atmosphere glow */}
          <div style={{
            position: 'absolute',
            top: '-5%',
            left: '-5%',
            right: '-5%',
            bottom: '-5%',
            borderRadius: '50%',
            backgroundImage: 'radial-gradient(circle at 30% 30%, transparent 60%, rgba(100, 200, 255, 0.3) 80%, rgba(50, 150, 255, 0.2) 100%)',
            pointerEvents: 'none'
          }} />

          {/* Shine effect */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '15%',
            width: '40%',
            height: '40%',
            borderRadius: '50%',
            backgroundImage: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, transparent 60%)',
            pointerEvents: 'none',
            filter: 'blur(20px)'
          }} />
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px'
    }}>
      {/* Canvas Container */}
      <div style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: nightMode 
          ? '0 20px 60px rgba(0, 113, 227, 0.5)'
          : '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        <canvas 
          ref={canvasRef}
          style={{
            display: 'block',
            width: '100%',
            height: '100%'
          }}
        />
        
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: '50%'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '8px' }}>🌍</div>
              <div>Loading Earth...</div>
            </div>
          </div>
        )}
      </div>

      {/* Control Buttons - 3 PO REDU */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        width: '100%',
        maxWidth: size,
        padding: '0 16px',
        boxSizing: 'border-box'
      }}>
        {/* Auto-Rotate Button */}
        <button
          onClick={() => handleControlToggle('autoRotate')}
          disabled={isLoading}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '14px 18px',
            border: controls.autoRotate ? 'none' : '1.5px solid rgba(0,0,0,0.12)',
            borderRadius: '16px',
            backgroundImage: controls.autoRotate
              ? 'linear-gradient(135deg, #0071E3 0%, #0088FF 100%)'
              : 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 100%)',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.5 : 1,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: controls.autoRotate
              ? '0 6px 18px rgba(0, 113, 227, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              : '0 4px 12px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            outline: 'none',
            position: 'relative',
            overflow: 'hidden',
            width: '100%'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
              e.currentTarget.style.boxShadow = controls.autoRotate
                ? '0 8px 24px rgba(0, 113, 227, 0.45)'
                : '0 5px 15px rgba(0, 0, 0, 0.12)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = controls.autoRotate
                ? '0 6px 18px rgba(0, 113, 227, 0.35)'
                : '0 3px 10px rgba(0, 0, 0, 0.08)';
            }
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: controls.autoRotate ? '#FFFFFF' : '#1D1D1F',
            filter: controls.autoRotate ? 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))' : 'none'
          }}>
            {controls.autoRotate ? icons.pause : icons.play}
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: controls.autoRotate ? '#FFFFFF' : '#1D1D1F',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            letterSpacing: '-0.01em'
          }}>
            Rotation
          </div>
        </button>

        {/* Meridians Button */}
        <button
          onClick={() => handleControlToggle('showMeridians')}
          disabled={isLoading}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '14px 18px',
            border: controls.showMeridians ? 'none' : '1.5px solid rgba(0,0,0,0.12)',
            borderRadius: '16px',
            backgroundImage: controls.showMeridians
              ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
              : 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 100%)',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.5 : 1,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: controls.showMeridians
              ? '0 6px 18px rgba(16, 185, 129, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              : '0 4px 12px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            outline: 'none',
            position: 'relative',
            overflow: 'hidden',
            width: '100%'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
              e.currentTarget.style.boxShadow = controls.showMeridians
                ? '0 8px 24px rgba(16, 185, 129, 0.45)'
                : '0 5px 15px rgba(0, 0, 0, 0.12)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = controls.showMeridians
                ? '0 6px 18px rgba(16, 185, 129, 0.35)'
                : '0 3px 10px rgba(0, 0, 0, 0.08)';
            }
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: controls.showMeridians ? '#FFFFFF' : '#1D1D1F',
            filter: controls.showMeridians ? 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))' : 'none'
          }}>
            {icons.grid}
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: controls.showMeridians ? '#FFFFFF' : '#1D1D1F',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            letterSpacing: '-0.01em'
          }}>
            Grid
          </div>
        </button>

        {/* Night Mode Button */}
        <button
          onClick={() => handleControlToggle('nightMode')}
          disabled={isLoading}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '14px 18px',
            border: controls.nightMode ? 'none' : '1.5px solid rgba(0,0,0,0.12)',
            borderRadius: '16px',
            backgroundImage: controls.nightMode
              ? 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)'
              : 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 100%)',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.5 : 1,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: controls.nightMode
              ? '0 6px 18px rgba(99, 102, 241, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              : '0 4px 12px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            outline: 'none',
            position: 'relative',
            overflow: 'hidden',
            width: '100%'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
              e.currentTarget.style.boxShadow = controls.nightMode
                ? '0 8px 24px rgba(99, 102, 241, 0.45)'
                : '0 5px 15px rgba(0, 0, 0, 0.12)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = controls.nightMode
                ? '0 6px 18px rgba(99, 102, 241, 0.35)'
                : '0 3px 10px rgba(0, 0, 0, 0.08)';
            }
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: controls.nightMode ? '#FFFFFF' : '#1D1D1F',
            filter: controls.nightMode ? 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))' : 'none'
          }}>
            {controls.nightMode ? icons.moon : icons.sun}
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: controls.nightMode ? '#FFFFFF' : '#1D1D1F',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            letterSpacing: '-0.01em'
          }}>
            Night
          </div>
        </button>

        {/* Atmosphere Button */}
        <button
          onClick={() => handleControlToggle('showAtmosphere')}
          disabled={isLoading}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '14px 18px',
            border: controls.showAtmosphere ? 'none' : '1.5px solid rgba(0,0,0,0.12)',
            borderRadius: '16px',
            backgroundImage: controls.showAtmosphere
              ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
              : 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 100%)',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.5 : 1,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: controls.showAtmosphere
              ? '0 6px 18px rgba(16, 185, 129, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              : '0 4px 12px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            outline: 'none',
            position: 'relative',
            overflow: 'hidden',
            width: '100%'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
              e.currentTarget.style.boxShadow = controls.showAtmosphere
                ? '0 8px 24px rgba(16, 185, 129, 0.45)'
                : '0 5px 15px rgba(0, 0, 0, 0.12)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = controls.showAtmosphere
                ? '0 6px 18px rgba(16, 185, 129, 0.35)'
                : '0 3px 10px rgba(0, 0, 0, 0.08)';
            }
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: controls.showAtmosphere ? '#FFFFFF' : '#1D1D1F',
            filter: controls.showAtmosphere ? 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))' : 'none'
          }}>
            {icons.atmosphere}
      </div>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: controls.showAtmosphere ? '#FFFFFF' : '#1D1D1F',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            letterSpacing: '-0.01em'
          }}>
            Atmosphere
          </div>
        </button>

        {/* Animate Clouds Button */}
        <button
          onClick={() => handleControlToggle('animateClouds')}
          disabled={isLoading}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '14px 18px',
            border: controls.animateClouds ? 'none' : '1.5px solid rgba(0,0,0,0.12)',
            borderRadius: '16px',
            backgroundImage: controls.animateClouds
              ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
              : 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 100%)',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.5 : 1,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: controls.animateClouds
              ? '0 6px 18px rgba(245, 158, 11, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              : '0 4px 12px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            outline: 'none',
            whiteSpace: 'nowrap',
            minWidth: 'fit-content'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
              e.currentTarget.style.boxShadow = controls.animateClouds
                ? '0 8px 24px rgba(245, 158, 11, 0.45)'
                : '0 5px 15px rgba(0, 0, 0, 0.12)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = controls.animateClouds
                ? '0 6px 18px rgba(245, 158, 11, 0.35)'
                : '0 3px 10px rgba(0, 0, 0, 0.08)';
            }
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: controls.animateClouds ? '#FFFFFF' : '#1D1D1F',
            filter: controls.animateClouds ? 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))' : 'none'
          }}>
            {icons.animation}
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: controls.animateClouds ? '#FFFFFF' : '#1D1D1F',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            letterSpacing: '-0.01em'
          }}>
            Animation
          </div>
        </button>
      </div>

      {/* Cloud Opacity Slider - ALWAYS VISIBLE */}
      <div style={{
        width: '100%',
        maxWidth: size,
        padding: '0 16px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          marginTop: '16px',
          padding: '16px',
          borderRadius: '16px',
          backgroundImage: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 100%)',
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <div style={{
              color: '#1D1D1F'
            }}>
              {icons.opacity}
            </div>
            <div style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#1D1D1F',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              letterSpacing: '-0.01em'
            }}>
              Cloud Opacity: {Math.round(controls.cloudOpacity * 100)}%
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={controls.cloudOpacity}
            onChange={(e) => handleCloudOpacityChange(parseFloat(e.target.value))}
            disabled={isLoading}
            style={{
              width: '100%',
              height: '6px',
              borderRadius: '3px',
              background: `linear-gradient(to right, #60A5FA 0%, #60A5FA ${controls.cloudOpacity * 100}%, #E5E7EB ${controls.cloudOpacity * 100}%, #E5E7EB 100%)`,
              outline: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              WebkitAppearance: 'none',
              appearance: 'none'
            }}
          />
        </div>
      </div>

      {/* Info text */}
      <div style={{
        fontSize: '11px',
        color: '#9CA3AF',
        textAlign: 'center',
        fontWeight: 500,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        paddingTop: '4px'
      }}>
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default GlobeWebGL;

