'use client';

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (c) 2026 宋夏天Dazzle / Based on three-scope-map-skill
// 作者全平台ID：宋夏天Dazzle；公众号：送你整个夏天
// Source: https://github.com/songsummer920-dazzle/three-scope-map-skill
// Adapted for HKUST campus map — real building footprints + multi-level towers

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { GeoFeatureCollection } from './hkustGeo';

// ── Campus theme (HKUST deep blue + gold) ────────────────────────────────
const C = {
  gold: '#d4a84b',
  goldLight: '#ffe4a0',
  goldDeep: '#8b6914',
  ambientBlue: '#b0d0ff',
  directional: '#fff4d0',
  bay: '#0a3a5c',
  sea: '#062038',
  outline: '#d4a84b',
};

// Map dimensions (virtual canvas)
const MAP_W = 1000;
const MAP_H = 600;

// ── Per-category colour schemes ──────────────────────────────────────────
const CAT: Record<'academic' | 'life' | 'landscape', {
  body: string;
  bodyEmissive: string;
  accent: string;
  roof: string;
  light: string;
}> = {
  academic: {
    body: '#1a3a6e',
    bodyEmissive: '#0d2850',
    accent: '#d4a84b',
    roof: '#0a1e3d',
    light: '#b0d0ff',
  },
  life: {
    body: '#3a2a10',
    bodyEmissive: '#2a1800',
    accent: '#e8c87a',
    roof: '#1a1000',
    light: '#ffd690',
  },
  landscape: {
    body: '#0a3015',
    bodyEmissive: '#0a2a10',
    accent: '#7ac87a',
    roof: '#061a0a',
    light: '#a0e0a0',
  },
};

// ── Helper: project screen coords → 3D world coords ──────────────────────
function projectCoord(x: number, y: number, z = 0): THREE.Vector3 {
  return new THREE.Vector3(x - MAP_W / 2, -(y - MAP_H / 2), z);
}

function makeShape(ring: number[][]): THREE.Shape {
  // Convert screen-space polygon to Shape centred at origin
  const points2d = ring.map(([x, y]) => new THREE.Vector2(x - MAP_W / 2, -(y - MAP_H / 2)));
  // Ensure CCW for shape (Three.js expects CCW for outer ring)
  return new THREE.Shape(points2d);
}

function getCentroid(ring: number[][]): { x: number; y: number } {
  let cx = 0, cy = 0;
  for (const [x, y] of ring) {
    cx += x;
    cy += y;
  }
  return { x: cx / ring.length, y: cy / ring.length };
}

// ── Window-grid texture ──────────────────────────────────────────────────
function makeWindowTexture(category: string): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Background dark
  ctx.fillStyle = category === 'academic' ? '#0a1e3d' : '#1a1000';
  ctx.fillRect(0, 0, 256, 256);

  // Window grid
  const cols = 12;
  const rows = 16;
  const cellW = 256 / cols;
  const cellH = 256 / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const lit = (r * 7 + c * 11 + 13) % 4 === 0;
      const x = c * cellW + cellW * 0.2;
      const y = r * cellH + cellH * 0.15;
      const w = cellW * 0.6;
      const h = cellH * 0.6;
      if (lit) {
        ctx.fillStyle = category === 'academic' ? '#a8c8ff' : '#ffd690';
        ctx.shadowBlur = 6;
        ctx.shadowColor = ctx.fillStyle;
      } else {
        ctx.fillStyle = '#0a0a14';
      }
      ctx.fillRect(x, y, w, h);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeRoofTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#0a1e3d';
  ctx.fillRect(0, 0, 256, 256);
  // Subtle rooftop machinery outline
  ctx.strokeStyle = '#1a3a6e';
  ctx.lineWidth = 2;
  for (let i = 0; i < 4; i++) {
    ctx.strokeRect(20 + i * 50, 20 + i * 30, 60, 60);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ── A single building, extruded with proper height ──────────────────────
function Building({
  feature,
  onHover,
  selected,
}: {
  feature: GeoFeatureCollection['features'][number];
  onHover: (id: string | null) => void;
  selected: string | null;
}) {
  const id = feature.properties.id;
  const ring = feature.geometry.coordinates[0] as number[][];
  const h = feature.properties.height;
  const cat = feature.properties.category;
  const cfg = CAT[cat];
  const isSelected = selected === id;

  const shape = useMemo(() => makeShape(ring), [ring]);
  const winTex = useMemo(() => makeWindowTexture(cat), [cat]);
  const roofTex = useMemo(() => makeRoofTexture(), []);
  const baseZ = 0;

  // Configure textures based on silhouette footprint scale
  const shapeRect = useMemo(() => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    ring.forEach(([x, y]) => {
      minX = Math.min(minX, x - MAP_W / 2);
      maxX = Math.max(maxX, x - MAP_W / 2);
      minY = Math.min(minY, -(y - MAP_H / 2));
      maxY = Math.max(maxY, -(y - MAP_H / 2));
    });
    return { w: maxX - minX, h: maxY - minY };
  }, [ring]);
  const widthM = shapeRect.w;
  const depthM = shapeRect.h;
  useMemo(() => {
    const tilesX = Math.max(1, Math.round(widthM / 22));
    const tilesY = Math.max(1, Math.round(depthM / 22));
    winTex.repeat.set(tilesX, h);
    winTex.needsUpdate = true;
    roofTex.repeat.set(Math.max(1, Math.round(widthM / 18)), Math.max(1, Math.round(depthM / 18)));
    roofTex.needsUpdate = true;
  }, [widthM, depthM, h]);

  // Bevel settings for nicer corners
  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: h * 10,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.6,
    bevelThickness: 0.4,
    steps: 1,
  };

  const geom = useMemo(() => new THREE.ExtrudeGeometry(shape, extrudeSettings), [shape]);
  geom.computeVertexNormals();

  // ── Different silhouettes (stepped, terraced, towers) ──
  const silhouette = feature.properties.silhouette ?? 'podium';

  // Hover lift
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) {
      const targetY = isSelected ? 6 : 0;
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY,
        0.1,
      );
    }
  });

  // Materials
  const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: winTex,
    color: cfg.body,
    emissive: cfg.bodyEmissive,
    emissiveIntensity: 0.4,
    emissiveMap: winTex,
    roughness: 0.6,
    metalness: 0.4,
  }), [cfg]);

  const roofMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: roofTex,
    color: cfg.roof,
    emissive: cfg.bodyEmissive,
    emissiveIntensity: 0.15,
    roughness: 0.85,
    metalness: 0.2,
  }), [cfg, roofTex]);

  const outlineMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: C.outline,
    transparent: true,
    opacity: isSelected ? 1.0 : 0.55,
  }), [isSelected]);

  return (
    <group position={[0, baseZ, 0]}>
      {/* Base footprint shadow / slab */}
      <mesh
        position={[0, -0.5, 0.2]}
        onPointerEnter={() => onHover(id)}
        onPointerLeave={() => onHover(null)}
        onClick={(e) => { e.stopPropagation(); }}
      >
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial
          color="#02080f"
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main 3D extruded body */}
      <mesh
        ref={meshRef}
        geometry={geom}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        onPointerEnter={() => onHover(id)}
        onPointerLeave={() => onHover(null)}
      >
        <meshStandardMaterial
          map={winTex}
          color={cfg.body}
          emissive={cfg.bodyEmissive}
          emissiveMap={winTex}
          emissiveIntensity={isSelected ? 0.85 : 0.4}
          roughness={0.55}
          metalness={0.5}
        />
      </mesh>

      {/* Roof cap (a shapeGeometry plane on top, slight brighter) */}
      <mesh
        position={[0, 0, h * 10 + 0.5]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial
          color={cfg.accent}
          emissive={cfg.light}
          emissiveIntensity={isSelected ? 0.6 : 0.25}
          roughness={0.5}
          metalness={0.7}
          side={THREE.DoubleSide}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Roof rim accent line */}
      <mesh position={[0, 0, h * 10 + 0.6]}>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial
          color={C.outline}
          transparent
          opacity={isSelected ? 0.6 : 0.3}
          wireframe
        />
      </mesh>

      {/* Gold outline ring at top */}
      <lineSegments position={[0, 0, h * 10 + 0.4]}>
        <edgesGeometry args={[new THREE.ShapeGeometry(shape)]} />
        <primitive object={outlineMaterial} attach="material" />
      </lineSegments>

      {/* Antenna / spire for towers */}
      {(silhouette === 'tower' || silhouette === 'tower-stack') && (
        <group position={[0, 0, h * 10 + 0.5]}>
          <mesh position={[0, 0, 4]}>
            <cylinderGeometry args={[0.4, 0.4, 8, 8]} />
            <meshStandardMaterial color={cfg.accent} emissive={cfg.light} emissiveIntensity={0.4} metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 11]}>
            <sphereGeometry args={[1.2, 12, 8]} />
            <meshBasicMaterial color={C.goldLight} />
          </mesh>
        </group>
      )}
    </group>
  );
}

// ── Side-walls glow shader (vertical gradient) ────────────────────────────
function makeSideWallMaterial(category: string): THREE.ShaderMaterial {
  const cfg = CAT[category as keyof typeof CAT] ?? CAT.academic;
  return new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    uniforms: {
      uTopColor: { value: new THREE.Color(cfg.accent) },
      uMidColor: { value: new THREE.Color(C.goldDeep) },
      uBotColor: { value: new THREE.Color('#06080f') },
      uTotalHeight: { value: 100 },
    },
    vertexShader: `
      varying float vDepth;
      uniform float uTotalHeight;
      void main() {
        vDepth = clamp(position.z / uTotalHeight, 0.0, 1.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uTopColor;
      uniform vec3 uMidColor;
      uniform vec3 uBotColor;
      varying float vDepth;
      void main() {
        vec3 lower = mix(uBotColor, uMidColor, smoothstep(0.0, 0.3, vDepth));
        vec3 col = mix(lower, uTopColor, smoothstep(0.45, 1.0, vDepth));
        float edgeGlow = smoothstep(0.6, 1.0, vDepth);
        col += edgeGlow * uTopColor * 0.4;
        float alpha = 0.55 + vDepth * 0.4;
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });
}

// ── Campus outline / boundary (chase light ring) ────────────────────────
function ChaseLightRing() {
  const points = useMemo(() => {
    const pts: number[] = [];
    const segs = 64;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      // Ellipse matching campus shape
      pts.push(Math.cos(a) * 480, Math.sin(a) * 300, 60);
    }
    return new Float32Array(pts);
  }, []);

  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Line>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.06;
    }
  });

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(points, 3));
    return g;
  }, [points]);

  const mat = useMemo(() => new THREE.LineBasicMaterial({
    color: C.goldLight,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  return (
    <group ref={groupRef}>
      <primitive ref={ringRef} object={new THREE.LineLoop(geom, mat)} />
    </group>
  );
}

// ── Sky / sea backdrop ──────────────────────────────────────────────────
function SkyBackdrop() {
  return (
    <>
      {/* Ground plane — deep ocean blue */}
      <mesh position={[0, 0, -3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1600, 1100]} />
        <meshBasicMaterial color={C.sea} />
      </mesh>
      {/* North sea plane (top of map) */}
      <mesh position={[0, 260, -4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1400, 240]} />
        <meshBasicMaterial color={C.bay} transparent opacity={0.85} />
      </mesh>
      {/* Subtle horizon glow line */}
      <mesh position={[0, 320, 0]}>
        <planeGeometry args={[1400, 1]} />
        <meshBasicMaterial color={C.gold} transparent opacity={0.2} />
      </mesh>
    </>
  );
}

// ── Cable car / skytram line (HKUST-CWBC) ────────────────────────────────
function Skytram() {
  const lineRef = useRef<THREE.Line>(null);
  const points = useMemo(() => {
    // Approximate line from NW (Mount Davis) → campus
    return [
      new THREE.Vector3(-460, 220, 90),
      new THREE.Vector3(-280, 180, 60),
      new THREE.Vector3(-100, 140, 40),
      new THREE.Vector3(80, 100, 20),
      new THREE.Vector3(240, 60, 10),
    ];
  }, []);
  const geom = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.35 + Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <>
      <primitive
        object={(() => {
          const ln = new THREE.Line(geom, new THREE.LineBasicMaterial({
            color: C.goldLight,
            transparent: true,
            opacity: 0.4,
          }));
          lineRef.current = ln;
          return ln;
        })()}
      />
      {/* Cables — towers */}
      {points.slice(0, -1).map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <cylinderGeometry args={[1, 1, 30, 6]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {/* Cable car 1 */}
      <CableCar start={points[0]} end={points[Math.floor(points.length / 2)]} />
    </>
  );
}

function CableCar({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.elapsedTime * 0.05) % 1;
      ref.current.position.lerpVectors(start, end, t);
    }
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[8, 5, 6]} />
      <meshStandardMaterial color={C.gold} emissive={C.goldLight} emissiveIntensity={0.4} metalness={0.7} roughness={0.3} />
    </mesh>
  );
}

// ── Walkthrough CameraController ────────────────────────────────────────
function CameraOrbit({ autoRotate = true }: { autoRotate?: boolean }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(-400, -700, 320);
    camera.lookAt(0, 0, 30);
  }, [camera]);
  useFrame((state) => {
    if (autoRotate) {
      const t = state.clock.elapsedTime * 0.04;
      const r = 800;
      camera.position.x = Math.cos(t) * r * 0.5;
      camera.position.y = Math.sin(t) * r * 0.6 - 200;
      camera.lookAt(0, 0, 30);
    }
  });
  return null;
}

// ── All buildings rendered together ─────────────────────────────────────
function CampusBuildings({
  data,
  onHover,
  selected,
}: {
  data: GeoFeatureCollection;
  onHover: (id: string | null) => void;
  selected: string | null;
}) {
  return (
    <group>
      {data.features.map((f) => (
        <Building key={f.properties.id} feature={f} onHover={onHover} selected={selected} />
      ))}
    </group>
  );
}

// ── Scene root ──────────────────────────────────────────────────────────
function Scene({
  data,
  onHover,
  selected,
}: {
  data: GeoFeatureCollection;
  onHover: (id: string | null) => void;
  selected: string | null;
}) {
  return (
    <>
      <color attach="background" args={['#02040a']} />

      {/* Lighting — golden hour feel */}
      <ambientLight color={C.ambientBlue} intensity={0.45} />
      <directionalLight position={[300, -500, 600]} color={C.directional} intensity={2.4} castShadow={false} />
      <directionalLight position={[-300, -200, 200]} color={C.goldLight} intensity={0.6} />
      <hemisphereLight color={C.ambientBlue} groundColor="#02040a" intensity={0.5} />

      <SkyBackdrop />
      <Skytram />
      <CampusBuildings data={data} onHover={onHover} selected={selected} />
      <ChaseLightRing />

      <CameraOrbit />
    </>
  );
}

// ── Public component ────────────────────────────────────────────────────
export default function HKUSTThreeMap({
  data,
  onSelect,
  selected,
}: {
  data: GeoFeatureCollection;
  onSelect: (id: string | null) => void;
  selected: string | null;
}) {
  return (
    <Canvas
      style={{ width: '100%', height: '100%', background: 'transparent', cursor: 'grab' }}
      camera={{ fov: 36, near: 1, far: 5000 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
      dpr={[1, 2]}
    >
      <Scene data={data} onHover={onSelect} selected={selected} />
    </Canvas>
  );
}
