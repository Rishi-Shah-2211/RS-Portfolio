"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function Orb() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.18;
    ref.current.rotation.y = t * 0.22;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.6, 12]} />
        <MeshDistortMaterial
          color="#7d1f2e"
          roughness={0.28}
          metalness={0.42}
          distort={0.42}
          speed={1.6}
          envMapIntensity={1.1}
        />
      </mesh>
    </Float>
  );
}

export default function Sculpture({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 2]} intensity={1.4} color="#fcf8ee" />
          <directionalLight position={[-3, -2, -1]} intensity={0.65} color="#a07c3f" />
          <pointLight position={[0, 2, 3]} intensity={1.05} color="#7d1f2e" />
          <Orb />
        </Suspense>
      </Canvas>
    </div>
  );
}
