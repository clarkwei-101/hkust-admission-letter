'use client';

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (c) 2026 宋夏天Dazzle / Based on three-scope-map-skill
// 作者全平台ID：宋夏天Dazzle；公众号：送你整个夏天
// Source: https://github.com/songsummer920-dazzle/three-scope-map-skill
// Adapted for HKUST campus map

import { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { GeoFeatureCollection } from './hkustGeo';

// ── HKUST colour theme (deep blue + gold, matching the site) ───────────────
const C = {
  // Main accent — gold from HKUST palette
  gold: '#d4a84b',
  goldLight: '#e8c87a',
  // Side-wall gradient (top → mid → bottom)
  sideTop: '#d4a84b',
  sideMid: '#8b6914',
  sideBot: '#1a0d00',
  // Top surface
  topBase: '#0a1a2e',
  topEmissive: '#0d2040',
  // Outlines
  outline: '#d4a84b',
  outlineDim: '#7a5c20',
  // Hover / glow
  hover: '#ffe4a0',
  // Ambient light
  ambient: '#b0d0ff',
  // Bay/water colour
  bay: '#0a3a5c',
};

const MAP_W = 1000;
const MAP_H = 600;
const TOP_Z = 44;
const SIDE_TOP_Z = 44;
const SIDE_BOT_Z = 24;
const BASE_Z = 20;

// ── Building category colours for top surface ───────────────────────────────
const CAT_COLORS: Record<string, { base: string; emissive: string; sideTop: string }> = {
  academic: { base: '#0a1e3d', emissive: '#0d2850', sideTop: '#d4a84b' },
  life: { base: '#1a1500', emissive: '#2a2000', sideTop: '#e8c87a' },
  landscape: { base: '#061a0a', emissive: '#0a2a10', sideTop: '#7ac87a' },
};

// ── Side wall gradient shader ───────────────────────────────────────────────
const sideWallVert = `
  varying float vDepth;
  void main() {
    vDepth = clamp((position.z - 24.0) / 20.0, 0.0, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const sideWallFrag = `
  varying float vDepth;
  void main() {
    vec3 top = vec3(0.831, 0.659, 0.294);
    vec3 mid = vec3(0.545, 0.412, 0.078);
    vec3 bot = vec3(0.102, 0.051, 0.0);
    vec3 lower = mix(bot, mid, smoothstep(0.0, 0.24, vDepth));
    vec3 col = mix(lower, top, smoothstep(0.34, 1.0, vDepth));
    float edgeGlow = smoothstep(0.48, 1.0, vDepth);
    col += edgeGlow * top * 0.24;
    float alpha = 0.46 + vDepth * 0.54;
    gl_FragColor = vec4(col, alpha);
  }
`;

// ── Floor gradient shader ───────────────────────────────────────────────────
const floorVert = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const floorFrag = `
  varying vec2 vUv;
  void main() {
    vec3 col1 = vec3(0.051, 0.102, 0.235);
    vec3 col2 = vec3(0.020, 0.051, 0.120);
    vec3 col = mix(col2, col1, vUv.y);
    gl_FragColor = vec4(col, 0.92);
  }
`;

// ── Helpers ────────────────────────────────────────────────────────────────
function projectCoord(x: number, y: number) {
  return new THREE.Vector3(x - MAP_W / 2, -(y - MAP_H / 2), 0);
}

function makeShape(rect: number[][]) {
  const pts = rect.map(([x, y]) => new THREE.Vector2(x - MAP_W / 2, -(y - MAP_H / 2)));
  const shape = new THREE.Shape(pts);
  return shape;
}

function getFeatureName(f: GeoFeatureCollection['features'][number]) {
  return f.properties?.name ?? '';
}

// ── Campus Mesh ─────────────────────────────────────────────────────────────
function CampusMesh({
  data,
  onSelect,
  selected,
}: {
  data: GeoFeatureCollection;
  onSelect: (id: string | null) => void;
  selected: string | null;
}) {
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const sideMatsRef = useRef<THREE.ShaderMaterial[]>([]);
  const glowMatsRef = useRef<THREE.MeshBasicMaterial[]>([]);
  const groupRef = useRef<THREE.Group>(null);

  const meshEntries = data.features.map((feature) => {
    const coords = feature.geometry.coordinates as number[][][];
    const ring = coords[0];
    const h = feature.properties?.height ?? 2;
    const cat = feature.properties?.category ?? 'academic';
    const catCfg = CAT_COLORS[cat] ?? CAT_COLORS.academic;

    return { feature, ring, h, cat, catCfg };
  });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Subtle float animation
    if (groupRef.current) {
      groupRef.current.position.z = Math.sin(t * 0.4) * 1.5;
    }
    // Update side wall uniforms
    sideMatsRef.current.forEach((mat) => {
      mat.uniforms.uTime.value = t;
    });
    // Pulse outline on selected
    meshesRef.current.forEach((mesh) => {
      const name = mesh.userData.featureId as string;
      if (name === selected) {
        mesh.rotation.z = Math.sin(t * 2) * 0.005;
      }
    });
    // Glow pulse on selected
    glowMatsRef.current.forEach((mat) => {
      const name = mat.userData.featureId as string;
      if (name === selected) {
        mat.opacity = 0.12 + Math.sin(t * 3) * 0.06;
      } else {
        mat.opacity = 0.02;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {meshEntries.map(({ feature, ring, h, cat, catCfg }) => {
        const id = feature.properties.id;
        const pts2d = ring.map(([x, y]) => new THREE.Vector2(x - MAP_W / 2, -(y - MAP_H / 2)));
        const shape = new THREE.Shape(pts2d);
        // Find centroid for building height extrusion
        const cx = pts2d.reduce((s, p) => s + p.x, 0) / pts2d.length;
        const cy = pts2d.reduce((s, p) => s + p.y, 0) / pts2d.length;

        const topColor = new THREE.Color(catCfg.base);
        const emissiveColor = new THREE.Color(catCfg.emissive);
        const sideTopColor = new THREE.Color(catCfg.sideTop);

        return (
          <group key={id}>
            {/* Base / floor plate */}
            <mesh
              position={[0, 0, BASE_Z - h]}
              userData={{ featureId: id }}
              onPointerEnter={() => onSelect(id)}
              onPointerLeave={() => onSelect(null)}
              onClick={(e) => { e.stopPropagation(); onSelect(id); }}
            >
              <shapeGeometry args={[shape]} />
              <meshBasicMaterial color={catCfg.base} transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>

            {/* 3D extruded building body */}
            <mesh
              position={[0, 0, BASE_Z - h]}
              userData={{ featureId: id }}
              onPointerEnter={() => onSelect(id)}
              onPointerLeave={() => onSelect(null)}
              onClick={(e) => { e.stopPropagation(); onSelect(id); }}
            >
              <extrudeGeometry args={[shape, {
                depth: h,
                bevelEnabled: false,
              }]} />
              <meshStandardMaterial
                color={topColor}
                emissive={emissiveColor}
                emissiveIntensity={0.15}
                roughness={0.8}
                metalness={0.1}
                transparent
                opacity={0.88}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Gold outline ring */}
            <lineSegments position={[0, 0, TOP_Z]}>
              <edgesGeometry args={[new THREE.ShapeGeometry(shape)]} />
              <lineBasicMaterial color={C.outline} transparent opacity={0.7} />
            </lineSegments>

            {/* Top surface glow */}
            <mesh position={[0, 0, TOP_Z + 4]} userData={{ featureId: id + '_glow' }}>
              <shapeGeometry args={[shape]} />
              <meshBasicMaterial
                color={C.goldLight}
                transparent
                opacity={0.02}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                userData={{ featureId: id }}
              />
            </mesh>
          </group>
        );
      })}

      {/* Campus outline / boundary ring */}
      {meshEntries[0] && (() => {
        const allX = meshEntries.flatMap(e => e.ring.map(r => r[0]));
        const allY = meshEntries.flatMap(e => e.ring.map(r => r[1]));
        const minX = Math.min(...allX);
        const maxX = Math.max(...allX);
        const minY = Math.min(...allY);
        const maxY = Math.max(...allY);
        const boundaryShape = new THREE.Shape([
          new THREE.Vector2(minX - MAP_W / 2, -(minY - MAP_H / 2)),
          new THREE.Vector2(maxX - MAP_W / 2, -(minY - MAP_H / 2)),
          new THREE.Vector2(maxX - MAP_W / 2, -(maxY - MAP_H / 2)),
          new THREE.Vector2(minX - MAP_W / 2, -(maxY - MAP_H / 2)),
          new THREE.Vector2(minX - MAP_W / 2, -(minY - MAP_H / 2)),
        ]);
        return (
          <lineSegments position={[0, 0, TOP_Z + 6]}>
            <edgesGeometry args={[new THREE.ShapeGeometry(boundaryShape)]} />
            <lineBasicMaterial color={C.outline} transparent opacity={0.25} />
          </lineSegments>
        );
      })()}
    </group>
  );
}

// ── Camera controller ────────────────────────────────────────────────────────
function CameraController() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, -800, 420);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

// ── Animated fly lines ──────────────────────────────────────────────────────
function FlyLines({ data }: { data: GeoFeatureCollection }) {
  const groupRef = useRef<THREE.Group>(null);

  const lineData = data.features.slice(0, 6).map((f, i) => {
    const c = f.properties?.center as [number, number] ?? [500, 300];
    return {
      id: f.properties.id,
      start: new THREE.Vector3(c[0] - MAP_W / 2, -(c[1] - MAP_H / 2), 70),
    };
  });

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {lineData.map((line) => {
        const mid = line.start.clone().add(new THREE.Vector3(0, 0, 40));
        const end = new THREE.Vector3(line.start.x + 60, line.start.y + 60, 70);
        const pts: THREE.Vector3[] = [];
        for (let t = 0; t <= 30; t++) {
          const tt = t / 30;
          const p1 = new THREE.Vector3().lerpVectors(line.start, mid, tt);
          const p2 = new THREE.Vector3().lerpVectors(mid, end, tt);
          pts.push(new THREE.Vector3().lerpVectors(p1, p2, tt));
        }
        const geom = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          <primitive
            key={line.id}
            object={new THREE.Line(geom, new THREE.LineBasicMaterial({
              color: C.gold,
              transparent: true,
              opacity: 0.15,
              blending: THREE.AdditiveBlending,
            }))}
          />
        );
      })}
    </group>
  );
}

// ── Chase light ring around campus ─────────────────────────────────────────
function ChaseLight() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.z = t * 0.08;
  });

  const segCount = 32;
  const ringPoints: number[] = [];
  for (let i = 0; i <= segCount; i++) {
    const a = (i / segCount) * Math.PI * 2;
    ringPoints.push(Math.cos(a) * 460, Math.sin(a) * 280, 46);
  }

  const ringGeom = new THREE.BufferGeometry();
  ringGeom.setAttribute('position', new THREE.Float32BufferAttribute(ringPoints, 3));
  const ringMat = new THREE.LineBasicMaterial({
    color: C.goldLight,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
  });

  return (
    <group ref={groupRef}>
      <primitive object={new THREE.LineLoop(ringGeom, ringMat)} />
    </group>
  );
}

// ── Water / bay background ──────────────────────────────────────────────────
function BayPlane() {
  return (
    <mesh position={[0, 0, -5]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1400, 900]} />
      <shaderMaterial
        vertexShader={floorVert}
        fragmentShader={floorFrag}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ── Building labels (HTML overlay via CSS2D) ─────────────────────────────────
// We render labels as a separate overlay — done in the parent component

// ── Main scene ─────────────────────────────────────────────────────────────
function Scene({
  data,
  onSelect,
  selected,
}: {
  data: GeoFeatureCollection;
  onSelect: (id: string | null) => void;
  selected: string | null;
}) {
  return (
    <>
      <ambientLight color={C.ambient} intensity={1.2} />
      <directionalLight position={[200, -400, 500]} color="#ffe4a0" intensity={2.2} />
      <BayPlane />
      <CampusMesh data={data} onSelect={onSelect} selected={selected} />
      <ChaseLight />
      <CameraController />
    </>
  );
}

// ── Public component ────────────────────────────────────────────────────────
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
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      camera={{ fov: 45, near: 1, far: 3000 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <Scene data={data} onSelect={onSelect} selected={selected} />
    </Canvas>
  );
}
