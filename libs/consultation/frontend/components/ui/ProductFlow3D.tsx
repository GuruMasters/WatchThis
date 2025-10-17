import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Stars, Sparkles, Line, useTexture } from "@react-three/drei";
import * as THREE from "three";

// 🎨 CUSTOM SVG IKONE za UI instrukcije
const RotateIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
  </svg>
);

const ZoomIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="11" y1="8" x2="11" y2="14"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
);

const HoverIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
    <path d="M13 13l6 6"/>
  </svg>
);

const AutoRotateIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

// 🌥️ ADVANCED CLOUD TEXTURE - Realistic clouds with depth
function createCloudTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = 'rgba(255,255,255,0)';
  ctx.fillRect(0, 0, 1024, 1024);

  // Multiple layers of clouds for depth
  for (let layer = 0; layer < 3; layer++) {
    const opacity = 0.3 - (layer * 0.08);
    const count = 40 - (layer * 10);
    
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const size = Math.random() * 80 + 30;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, `rgba(255,255,255,${opacity})`);
      gradient.addColorStop(0.5, `rgba(255,255,255,${opacity * 0.5})`);
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  return new THREE.CanvasTexture(canvas);
}

// 🗺️ ADVANCED NORMAL MAP - Procedural bump mapping
function createNormalMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;
  
  // Base normal color (pointing up)
  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, 1024, 1024);
  
  // Add terrain variation with Perlin-like noise
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const size = Math.random() * 100 + 50;
    const intensity = Math.random() * 40 + 10;
    
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, `rgba(${128 + intensity}, ${128 + intensity}, ${255 - intensity}, 0.3)`);
    gradient.addColorStop(0.5, `rgba(${128 - intensity/2}, ${128 - intensity/2}, ${255 + intensity/2}, 0.2)`);
    gradient.addColorStop(1, 'rgba(128, 128, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  return new THREE.CanvasTexture(canvas);
}

// 💧 ADVANCED SPECULAR MAP - Water reflections
function createSpecularMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;
  
  // Dark base (continents - no reflection)
  ctx.fillStyle = 'rgb(20, 20, 20)';
  ctx.fillRect(0, 0, 1024, 1024);
  
  // Bright spots for water (high reflection)
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const size = Math.random() * 150 + 100;
    const brightness = Math.random() * 100 + 155;
    
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, `rgba(${brightness}, ${brightness}, ${brightness}, 0.8)`);
    gradient.addColorStop(0.5, `rgba(${brightness * 0.7}, ${brightness * 0.7}, ${brightness * 0.7}, 0.5)`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  return new THREE.CanvasTexture(canvas);
}

// 🪐 PROJECT AS SOLAR SYSTEM - each phase is a planet with REAL NASA TEXTURES
const planets = [
  {
    id: "sun",
    name: "Sun",
    projectPhase: "Vision",
    description: "The beginning of everything",
    distance: 0,
    size: 3.0,
    texture: "/textures/planets/sun.jpg",
    color: "#FFD700",
    emissive: "#FFA500",
    rotationSpeed: 0.002,
    orbitSpeed: 0,
    detail: "Central idea and project goal",
    isSun: true,
  },
  {
    id: "mercury",
    name: "Mercury",
    projectPhase: "Research",
    description: "Market analysis",
    distance: 8,
    size: 0.4,
    texture: "/textures/planets/mercury.jpg",
    color: "#D3D3D3",
    emissive: "#A9A9A9",
    rotationSpeed: 0.004,
    orbitSpeed: 0.04,
    detail: "In-depth research of needs and competition",
  },
  {
    id: "venus",
    name: "Venus",
    projectPhase: "Ideation",
    description: "Creative ideas",
    distance: 11,
    size: 0.9,
    texture: "/textures/planets/venus.jpg",
    color: "#F0E68C",
    emissive: "#DEB887",
    rotationSpeed: 0.002,
    orbitSpeed: 0.035,
    hasAtmosphere: true,
    atmosphereColor: "#CD853F",
    detail: "Solution generation and brainstorming",
  },
  {
    id: "earth",
    name: "Earth",
    projectPhase: "Design",
    description: "UI/UX creation",
    distance: 15,
    size: 1.0,
    texture: "/textures/planets/earth.jpg",
    color: "#4169E1",
    emissive: "#1E90FF",
    rotationSpeed: 0.01,
    orbitSpeed: 0.03,
    hasAtmosphere: true,
    atmosphereColor: "#87CEEB",
    detail: "Visual identity and user interface",
  },
  {
    id: "mars",
    name: "Mars",
    projectPhase: "Development",
    description: "Coding",
    distance: 19,
    size: 0.55,
    texture: "/textures/planets/mars.jpg",
    color: "#CD853F",
    emissive: "#8B4513",
    rotationSpeed: 0.009,
    orbitSpeed: 0.025,
    detail: "Implementation of functionality and architecture",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    projectPhase: "Integration",
    description: "System connection",
    distance: 26,
    size: 2.2,
    texture: "/textures/planets/jupiter.jpg",
    color: "#DAA520",
    emissive: "#B8860B",
    rotationSpeed: 0.02,
    orbitSpeed: 0.018,
    detail: "Merging all components into a whole",
  },
  {
    id: "saturn",
    name: "Saturn",
    projectPhase: "Testing",
    description: "QA & Debug",
    distance: 34,
    size: 1.8,
    texture: "/textures/planets/saturn.jpg",
    color: "#F4A460",
    emissive: "#D2691E",
    rotationSpeed: 0.018,
    orbitSpeed: 0.012,
    hasRings: true,
    detail: "Quality assurance and bug fixing",
  },
  {
    id: "uranus",
    name: "Uranus",
    projectPhase: "Staging",
    description: "Launch preparation",
    distance: 42,
    size: 1.4,
    texture: "/textures/planets/uranus.jpg",
    color: "#ADD8E6",
    emissive: "#4682B4",
    rotationSpeed: 0.012,
    orbitSpeed: 0.008,
    detail: "Final optimization and preparation",
  },
  {
    id: "neptune",
    name: "Neptune",
    projectPhase: "Deployment",
    description: "Launch",
    distance: 50,
    size: 1.3,
    texture: "/textures/planets/neptune.jpg",
    color: "#4169E1",
    emissive: "#191970",
    rotationSpeed: 0.015,
    orbitSpeed: 0.006,
    detail: "Application release to production",
  },
];

// 💍 REALISTIC SATURN RINGS - Sa kamenjem i detaljima
function RealisticSaturnRings({ size }: { size: number }) {
  const ringsRef = useRef<THREE.Group>(null);
  const rocksRef = useRef<THREE.InstancedMesh>(null);

  // Kreiranje teksture za prstenove sa realističnim detaljima
  const ringTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Kreiranje realističnih pruga za Saturnove prstenove
    const gradient = ctx.createLinearGradient(0, 0, 2048, 0);
    
    // Cassini Division i različiti delovi prstena
    const rings = [
      { start: 0, end: 0.3, colors: ['#8B7355', '#6B5345', '#4A4035'] },
      { start: 0.3, end: 0.35, colors: ['#1a1510', '#0a0505'] }, // Cassini Division
      { start: 0.35, end: 0.65, colors: ['#C9A87C', '#A89060', '#8B7355'] },
      { start: 0.65, end: 0.7, colors: ['#2a2015', '#1a1510'] }, // Encke Gap
      { start: 0.7, end: 1, colors: ['#9B8B7A', '#7B6B5A', '#5B4B3A'] }
    ];

    rings.forEach(ring => {
      const start = ring.start;
      const end = ring.end;
      const colors = ring.colors;
      
      for (let i = 0; i < 50; i++) {
        const pos = start + (Math.random() * (end - start));
        const width = Math.random() * 0.01 + 0.002;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = 0.4 + Math.random() * 0.6;
        
        gradient.addColorStop(Math.max(0, pos - width), `${color}00`);
        gradient.addColorStop(pos, color);
        gradient.addColorStop(Math.min(1, pos + width), `${color}00`);
      }
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2048, 128);

    // Dodavanje šuma i detalja
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * 2048;
      const y = Math.random() * 128;
      const brightness = Math.random() * 100 + 50;
      ctx.fillStyle = `rgba(${brightness}, ${brightness * 0.9}, ${brightness * 0.8}, ${Math.random() * 0.3})`;
      ctx.fillRect(x, y, 1, 1);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }, []);

  // Kreiranje alpha mape za transparentnost
  const alphaTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createLinearGradient(0, 0, 2048, 0);
    
    // Kompleksna transparentnost
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(0.05, 'rgba(255,255,255,0.4)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(0.35, 'rgba(0,0,0,0)'); // Cassini Division
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.9)');
    gradient.addColorStop(0.65, 'rgba(255,255,255,0.85)');
    gradient.addColorStop(0.7, 'rgba(0,0,0,0.1)'); // Encke Gap
    gradient.addColorStop(0.75, 'rgba(255,255,255,0.7)');
    gradient.addColorStop(0.95, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2048, 128);

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Kreiranje kamenja koje kruži oko Saturna - GUŠĆI I DEBLJI RED
  const rockCount = 12000; // Povećano sa 8000 na 12000 za još gušći efekat
  const rockData = useMemo(() => {
    const data = [];
    for (let i = 0; i < rockCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = size * 1.3 + Math.random() * (size * 0.5);
      const rockSize = Math.random() * 0.06 + 0.01; // Povećane veličine za vidljivost
      const height = (Math.random() - 0.5) * 0.35; // POVEĆANA debljina prstena sa 0.08 na 0.35
      const speed = 0.1 / radius; // Keplerova zakon - bliže kamenje se kreće brže
      
      data.push({
        angle,
        radius,
        size: rockSize,
        height,
        speed,
        color: new THREE.Color().setHSL(0.1 + Math.random() * 0.05, 0.3 + Math.random() * 0.2, 0.4 + Math.random() * 0.3)
      });
    }
    return data;
  }, [size, rockCount]);

  // Animacija kamenja
  useFrame(({ clock }) => {
    if (rocksRef.current) {
      const t = clock.getElapsedTime();
      const matrix = new THREE.Matrix4();
      const color = new THREE.Color();

      rockData.forEach((rock, i) => {
        const currentAngle = rock.angle + t * rock.speed;
        const x = Math.cos(currentAngle) * rock.radius;
        const z = Math.sin(currentAngle) * rock.radius;
        const y = rock.height;

        matrix.makeRotationFromEuler(new THREE.Euler(t * rock.speed * 2, t * rock.speed * 3, t * rock.speed));
        matrix.setPosition(x, y, z);
        matrix.scale(new THREE.Vector3(rock.size, rock.size, rock.size));
        
        rocksRef.current!.setMatrixAt(i, matrix);
        rocksRef.current!.setColorAt(i, rock.color);
      });

      rocksRef.current.instanceMatrix.needsUpdate = true;
      if (rocksRef.current.instanceColor) {
        rocksRef.current.instanceColor.needsUpdate = true;
      }
    }

    // Rotacija glavnog prstena
    if (ringsRef.current) {
      ringsRef.current.rotation.z += 0.0003;
    }
  });

  return (
    <group ref={ringsRef}>
      {/* Glavni prstenovi sa teksturom */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2.2, 0, 0]} receiveShadow castShadow>
        <ringGeometry args={[size * 1.3, size * 1.8, 256, 1]} />
        <meshStandardMaterial
          map={ringTexture}
          alphaMap={alphaTexture}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
          roughness={0.8}
          metalness={0.1}
          emissive="#4A4035"
          emissiveIntensity={0.08}
          depthWrite={false}
        />
      </mesh>

      {/* Dodatni layeri za dubinu - VIŠE SLOJEVA */}
      <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2.2, 0, 0]} receiveShadow>
        <ringGeometry args={[size * 1.32, size * 1.78, 256, 1]} />
        <meshStandardMaterial
          map={ringTexture}
          alphaMap={alphaTexture}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          roughness={0.9}
          metalness={0.05}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, -0.02, 0]} rotation={[Math.PI / 2.2, 0, Math.PI * 0.5]} receiveShadow>
        <ringGeometry args={[size * 1.31, size * 1.79, 256, 1]} />
        <meshStandardMaterial
          map={ringTexture}
          alphaMap={alphaTexture}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          roughness={0.85}
          metalness={0.08}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 0.04, 0]} rotation={[Math.PI / 2.2, 0, Math.PI * 0.25]} receiveShadow>
        <ringGeometry args={[size * 1.33, size * 1.77, 256, 1]} />
        <meshStandardMaterial
          map={ringTexture}
          alphaMap={alphaTexture}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          roughness={0.95}
          metalness={0.03}
          depthWrite={false}
        />
      </mesh>

      {/* Dodatni debeli slojevi za volumetrijski efekat */}
      <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2.2, 0, Math.PI * 0.75]} receiveShadow>
        <ringGeometry args={[size * 1.34, size * 1.76, 256, 1]} />
        <meshStandardMaterial
          map={ringTexture}
          alphaMap={alphaTexture}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
          roughness={0.9}
          metalness={0.05}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, -0.08, 0]} rotation={[Math.PI / 2.2, 0, Math.PI * 0.15]} receiveShadow>
        <ringGeometry args={[size * 1.35, size * 1.75, 256, 1]} />
        <meshStandardMaterial
          map={ringTexture}
          alphaMap={alphaTexture}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          roughness={0.92}
          metalness={0.04}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2.2, 0, Math.PI * 0.6]} receiveShadow>
        <ringGeometry args={[size * 1.315, size * 1.785, 256, 1]} />
        <meshStandardMaterial
          map={ringTexture}
          alphaMap={alphaTexture}
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          roughness={0.95}
          metalness={0.02}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, -0.12, 0]} rotation={[Math.PI / 2.2, 0, Math.PI * 0.4]} receiveShadow>
        <ringGeometry args={[size * 1.325, size * 1.775, 256, 1]} />
        <meshStandardMaterial
          map={ringTexture}
          alphaMap={alphaTexture}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          roughness={0.97}
          metalness={0.01}
          depthWrite={false}
        />
      </mesh>

      {/* Instanced kamenje - 12000 komada */}
      <instancedMesh 
        ref={rocksRef} 
        args={[undefined, undefined, rockCount]}
        castShadow
        receiveShadow
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          roughness={0.9}
          metalness={0.1}
          vertexColors
        />
      </instancedMesh>

      {/* Fine particles za atmosferski efekat - VIŠE I DEBLJIH SLOJEVA */}
      {Array.from({ length: 24 }).map((_, i) => (
        <mesh 
          key={i}
          position={[0, (Math.random() - 0.5) * 0.25, 0]} 
          rotation={[Math.PI / 2.2 + (Math.random() - 0.5) * 0.08, 0, Math.random() * Math.PI * 2]}
          receiveShadow
        >
          <ringGeometry args={[
            size * (1.3 + i * 0.025), 
            size * (1.32 + i * 0.025), 
            256, 
            1
          ]} />
          <meshStandardMaterial
            color={`hsl(${30 + Math.random() * 10}, ${20 + Math.random() * 20}%, ${40 + Math.random() * 20}%)`}
            transparent
            opacity={0.1 + Math.random() * 0.15}
            side={THREE.DoubleSide}
            roughness={1}
            metalness={0}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// 🌌 CONSTELLATION DATA - Sazvežđa u pozadini
const constellations = [
  {
    name: "Orion",
    stars: [
      { x: -15, y: 10, z: -30 },
      { x: -12, y: 12, z: -30 },
      { x: -10, y: 8, z: -30 },
      { x: -13, y: 6, z: -30 },
    ],
    connections: [[0, 1], [1, 2], [2, 3]],
  },
  {
    name: "Cassiopeia",
    stars: [
      { x: 20, y: 15, z: -35 },
      { x: 22, y: 13, z: -35 },
      { x: 24, y: 15, z: -35 },
      { x: 26, y: 12, z: -35 },
    ],
    connections: [[0, 1], [1, 2], [2, 3]],
  },
  {
    name: "Ursa Major",
    stars: [
      { x: -20, y: -10, z: -40 },
      { x: -18, y: -8, z: -40 },
      { x: -15, y: -9, z: -40 },
      { x: -13, y: -12, z: -40 },
    ],
    connections: [[0, 1], [1, 2], [2, 3]],
  },
];

// ⭐ Constellation Star - SVETLEĆA TAČKA
function ConstellationStar({ position, index }: any) {
  const starRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (starRef.current) {
      const blinkPhase = Math.sin(t * 1.5 + index * 0.5);
      starRef.current.scale.setScalar(0.8 + blinkPhase * 0.2);
      (starRef.current.material as THREE.MeshBasicMaterial).opacity = 0.7 + blinkPhase * 0.3;
    }
    if (glowRef.current) {
      const glowPhase = Math.sin(t * 1.2 + index * 0.3);
      glowRef.current.scale.setScalar(1.0 + glowPhase * 0.15);
    }
  });

  return (
    <>
      {/* Core zvezde */}
      <mesh ref={starRef} position={position}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Glow efekat */}
      <mesh ref={glowRef} position={position}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Manji sparkles */}
      <Sparkles
        count={4}
        scale={0.8}
        size={0.8}
        speed={0.2}
        position={position}
        color="#ffffff"
        opacity={0.3}
      />
    </>
  );
}

// 🌌 Constellation
function Constellation({ constellation }: any) {
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    constellation.connections.forEach(([start, end]: [number, number]) => {
      const startPos = constellation.stars[start];
      const endPos = constellation.stars[end];
      points.push(new THREE.Vector3(startPos.x, startPos.y, startPos.z));
      points.push(new THREE.Vector3(endPos.x, endPos.y, endPos.z));
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [constellation]);

  return (
    <group>
      {constellation.stars.map((star: any, i: number) => (
        <ConstellationStar key={i} position={[star.x, star.y, star.z]} index={i} />
      ))}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#4488ff" transparent opacity={0.3} />
      </lineSegments>
      <Html position={[constellation.stars[0].x, constellation.stars[0].y + 2, constellation.stars[0].z]} center>
        <div
          style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.7rem',
            fontFamily: 'Inter, sans-serif',
            pointerEvents: 'none',
            textShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
          }}
        >
          {constellation.name}
        </div>
      </Html>
    </group>
  );
}

// 🌟 Blinking Background Stars - SVETLEĆE TAČKE (ne kvadrati)
function BlinkingStars() {
  const starsRef = useRef<THREE.Points>(null);
  
  const [positions, colors, sizes] = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 60 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Razne boje - bele, plave, žute
      const colorType = Math.random();
      if (colorType > 0.7) {
        // Žute zvezde
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 2] = 0.6 + Math.random() * 0.2;
      } else if (colorType > 0.4) {
        // Plave zvezde
        colors[i * 3] = 0.7 + Math.random() * 0.3;
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 2] = 1;
      } else {
        // Bele zvezde
        const brightness = 0.8 + Math.random() * 0.2;
        colors[i * 3] = brightness;
        colors[i * 3 + 1] = brightness;
        colors[i * 3 + 2] = brightness;
      }

      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    return [positions, colors, sizes];
  }, []);

  useFrame(({ clock }) => {
    if (starsRef.current) {
      const material = starsRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.5 + Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  // Kreiraj round sprite teksturu za zvezde (ne kvadrati!)
  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    
    // Napravi radijalni gradient za svetleću tačku
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  return (
    <points ref={starsRef} geometry={geometry}>
      <pointsMaterial
        map={starTexture}
        size={2.0}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// 🌍 Realistic Planet - NASA TEXTURES + ADVANCED PROCEDURAL MAPS + ROTATION + ORBIT
function RealisticPlanet({ planet, index }: any) {
  const orbitGroupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Load NASA textures + advanced procedural maps
  const texture = useTexture(planet.texture) as THREE.Texture;
  const cloudTexture = useMemo(() => createCloudTexture(), []);
  const normalMap = useMemo(() => createNormalMap(), []);
  const specularMap = useMemo(() => createSpecularMap(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // ORBITALNA PUTANJA ako nije sunce
    if (orbitGroupRef.current && planet.distance > 0) {
      const angle = t * planet.orbitSpeed;
      const x = Math.cos(angle) * planet.distance;
      const z = Math.sin(angle) * planet.distance;
      orbitGroupRef.current.position.set(x, 0, z);
    }
    
    // ROTACIJA oko svoje ose
    if (meshRef.current) {
      meshRef.current.rotation.y += planet.rotationSpeed;
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 1.5 + index) * 0.05);
    }

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= planet.rotationSpeed * 0.2;
    }

    if (cloudRef.current) {
      cloudRef.current.rotation.y += planet.rotationSpeed * 1.3;
    }
  });

  return (
    <group ref={orbitGroupRef}>
      {/* Glow removed - clean Sun without rings */}

      {/* Main Planet - ULTRA REALISTIC LIGHTING + SHADOWS */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[planet.size, 256, 256]} />
        <meshStandardMaterial
          map={texture}
          normalMap={planet.id === 'earth' ? normalMap : undefined}
          normalScale={planet.id === 'earth' ? new THREE.Vector2(3.0, 3.0) : undefined}
          roughnessMap={planet.id === 'earth' ? specularMap : undefined}
          roughness={planet.isSun ? 0.3 : (planet.id === 'earth' ? 0.6 : 0.98)}
          metalness={planet.isSun ? 0.0 : (planet.id === 'earth' ? 0.15 : 0.01)}
          emissive={planet.isSun ? "#FFFFFF" : "#000000"}
          emissiveMap={planet.isSun ? texture : undefined}
          emissiveIntensity={planet.isSun ? 1.5 : 0}
          toneMapped={!planet.isSun}
          flatShading={false}
          envMapIntensity={planet.id === 'earth' ? 1.2 : 0.5}
        />
      </mesh>

      {/* Cloud Layer */}
      {planet.hasAtmosphere && (
        <mesh ref={cloudRef} position={[0, 0, 0]}>
          <sphereGeometry args={[planet.size * 1.015, 64, 64]} />
          <meshStandardMaterial
            map={cloudTexture}
            transparent
            opacity={0.25}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Atmosphere - suptilna */}
      {planet.hasAtmosphere && (
        <mesh ref={atmosphereRef} position={[0, 0, 0]}>
          <sphereGeometry args={[planet.size * 1.04, 64, 64]} />
          <meshBasicMaterial
            color={planet.atmosphereColor}
            transparent
            opacity={0.05}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Realistic Saturn Rings sa kamenjem */}
      {planet.hasRings && (
        <RealisticSaturnRings size={planet.size} />
      )}

      {/* Sparkles - SAMO ZA SUNCE */}
      {planet.isSun && (
        <Sparkles
          count={200}
          scale={planet.size * 2.0}
          size={3.0}
          speed={0.3}
          position={[0, 0, 0]}
          color="#FFD700"
          opacity={0.6}
        />
      )}

      {/* TEKST - Faza projekta SMANJEN */}
      <Html position={[0, planet.size + 1.2, 0]} center>
        <div
          style={{
            textAlign: 'center',
            pointerEvents: 'auto',
            fontFamily: '"Montserrat", "Inter", -apple-system, sans-serif',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Glavna faza - SMANJEN tekst */}
          <div
            style={{
              fontSize: hovered ? '1.3rem' : '1.1rem',
              fontWeight: '700',
              color: '#fff',
              textShadow: `
                0 0 20px ${planet.color}dd, 
                0 0 40px ${planet.color}88,
                0 2px 10px rgba(0,0,0,0.9)
              `,
              letterSpacing: '1.5px',
              marginBottom: '6px',
              filter: hovered ? 'brightness(1.2)' : 'brightness(1)',
            }}
          >
            {planet.projectPhase}
          </div>

          {/* Naziv planete - manji */}
          <div
            style={{
              fontSize: hovered ? '0.85rem' : '0.75rem',
              fontWeight: '500',
              color: '#ffffff',
              textShadow: `0 0 15px ${planet.color}66, 0 2px 8px rgba(0,0,0,0.8)`,
              opacity: 0.85,
              marginBottom: hovered ? '10px' : '0',
            }}
          >
            {planet.name}
          </div>

          {/* Hover detalji - SMANJEN */}
          {hovered && (
            <>
              <div
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: planet.atmosphereColor || '#ffffff',
                  textShadow: `0 0 12px ${planet.color}55, 0 2px 6px rgba(0,0,0,0.8)`,
                  marginTop: '8px',
                  opacity: 0.9,
                }}
              >
                {planet.description}
              </div>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: '400',
                  color: '#cccccc',
                  textShadow: '0 1px 5px rgba(0,0,0,0.8)',
                  marginTop: '6px',
                  opacity: 0.8,
                  fontStyle: 'italic',
                  lineHeight: '1.5',
                  maxWidth: '280px',
                }}
              >
                {planet.detail}
              </div>
            </>
          )}
        </div>
      </Html>
    </group>
  );
}

// 🌀 Orbitalne putanje - tanje linije koje pokazuju orbite
function OrbitPath({ radius, color = "#6c778c" }: { radius: number; color?: string }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  const material = useMemo(() => new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.15 }), [color]);

  return <primitive object={new THREE.Line(geometry, material)} />;
}

// CentralSun je sada deo planets niza

// 🌌 Main Scene
export default function ProductFlow3D() {
  return (
    <div
      style={{
        width: '100%',
        height: '70vh',
        minHeight: '600px',
        background: 'radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Title - LUXURY FONTS + VISIBLE BACKGROUND */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          textAlign: 'center',
          pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0) 100%)',
          padding: '20px 60px 40px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <h2
          style={{
            fontSize: '2.8rem',
            fontWeight: '700',
            color: '#ffffff',
            textShadow: '0 0 30px rgba(255, 215, 0, 0.8), 0 4px 20px rgba(0, 0, 0, 1), 0 2px 10px rgba(255, 140, 0, 0.6)',
            fontFamily: '"Playfair Display", "Cormorant Garamond", Georgia, serif',
            marginBottom: '16px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          Solar System of Development
        </h2>
        <p
          style={{
            fontSize: '1.15rem',
            color: '#ffffff',
            fontFamily: '"Montserrat", "Inter", -apple-system, sans-serif',
            textShadow: '0 2px 15px rgba(0, 0, 0, 1), 0 0 20px rgba(100, 200, 255, 0.5)',
            fontWeight: '400',
            letterSpacing: '1.5px',
          }}
        >
          From vision to launch — Journey through nine phases of success
        </p>
      </div>

      {/* Instructions - CUSTOM SVG ICONS */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          pointerEvents: 'none',
          color: 'rgba(255, 255, 255, 0.75)',
          fontSize: '0.95rem',
          fontFamily: '"Montserrat", "Inter", -apple-system, sans-serif',
          fontWeight: '400',
          letterSpacing: '0.5px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RotateIcon />
          <span>Rotate Camera</span>
        </div>
        <span style={{ opacity: 0.4 }}>•</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ZoomIcon />
          <span>Zoom</span>
        </div>
        <span style={{ opacity: 0.4 }}>•</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HoverIcon />
          <span>Hover for Details</span>
        </div>
        <span style={{ opacity: 0.4 }}>•</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AutoRotateIcon />
          <span>Auto-Rotation</span>
        </div>
      </div>

      <Canvas
        camera={{ position: [0, 5, 30], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
        shadows
      >
        <color attach="background" args={['#000000']} />
        
        {/* Ambient svetlo - JAKO SVETLO za odličnu vidljivost */}
        <ambientLight intensity={0.5} color="#6b7280" />
        
        {/* Sunčevo svetlo - MAKSIMALNO JAKO */}
        <pointLight 
          position={[0, 0, 0]} 
          intensity={15.0} 
          color={"#fff5e6"} 
          castShadow 
          distance={300} 
          decay={1.5}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* Dodatno sunčevo svetlo za warm glow */}
        <pointLight position={[0, 0, 0]} intensity={7.0} color={"#ffb366"} distance={200} decay={1.8} />
        
        {/* Fill light za maksimalnu vidljivost */}
        <hemisphereLight intensity={0.4} color="#a8b5c7" groundColor="#2a3544" />
        
        {/* Solarni sistem - planete sa orbitalnim putanjama */}
        {planets.map((planet, i) => (
          <group key={planet.id}>
            {/* Orbitalna putanja (prsten) za svaku planetu osim Sunca */}
            {planet.distance > 0 && <OrbitPath radius={planet.distance} color={planet.color} />}
            {/* Planeta */}
            <RealisticPlanet planet={planet} index={i} />
          </group>
        ))}
        
        {/* Constellations u pozadini */}
        {constellations.map((constellation, i) => (
          <Constellation key={i} constellation={constellation} />
        ))}
        
        {/* Blinking Stars za dubinu */}
        <BlinkingStars />
        
        {/* Main Stars */}
        <Stars radius={200} depth={150} count={8000} factor={5} fade speed={0.1} />
        
        {/* Controls - FULL 3D ROTATION (NO LIMITS) */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={0.05}
          minDistance={15}
          maxDistance={80}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          target={[0, 0, 0]}
          autoRotate={true}
          autoRotateSpeed={0.2}
          zoomSpeed={0.5}
          rotateSpeed={0.5}
        />
        
        <fog attach="fog" args={['#000000', 50, 150]} />
      </Canvas>
    </div>
  );
}
