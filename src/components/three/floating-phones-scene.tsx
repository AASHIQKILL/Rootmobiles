"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Phone({
  position,
  rotation,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  speed?: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.25 * speed) * 0.35;
    group.current.rotation.x = rotation[0] + Math.cos(state.clock.elapsedTime * 0.2 * speed) * 0.12;
  });

  return (
    <Float speed={1.4 * speed} rotationIntensity={0.25} floatIntensity={1.1}>
      <group ref={group} position={position} scale={scale}>
        <RoundedBox args={[1, 2.05, 0.09]} radius={0.14} smoothness={6}>
          <meshPhysicalMaterial
            color="#17171a"
            roughness={0.32}
            metalness={0.25}
            clearcoat={1}
            clearcoatRoughness={0.2}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.048]}>
          <planeGeometry args={[0.86, 1.86]} />
          <meshStandardMaterial
            color="#f4c430"
            emissive="#f4c430"
            emissiveIntensity={0.35}
            roughness={0.35}
            metalness={0.1}
            transparent
            opacity={0.16}
          />
        </mesh>
        <mesh position={[0, 0.86, 0.05]}>
          <boxGeometry args={[0.22, 0.06, 0.01]} />
          <meshStandardMaterial color="#111112" />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.8} color="#ffe9a8" />
      <directionalLight position={[-4, -2, -3]} intensity={0.7} color="#8a6a2f" />
      <pointLight position={[0, 0, 3]} intensity={0.6} color="#f4c430" />

      <Phone position={[-1.6, 0.3, -0.4]} rotation={[0.1, 0.5, 0]} scale={1.05} speed={0.9} />
      <Phone position={[1.7, -0.4, 0.2]} rotation={[-0.08, -0.4, 0]} scale={0.85} speed={1.15} />
      <Phone position={[0.15, 0.9, -1]} rotation={[0.15, 0.2, 0]} scale={0.62} speed={1.35} />

      <Sparkles count={60} scale={[7, 5, 4]} size={2} speed={0.25} color="#f4c430" opacity={0.5} />
    </>
  );
}

export function FloatingPhonesScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
