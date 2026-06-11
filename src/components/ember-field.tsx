"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * EmberField — GPU particle field behind the hero.
 * A drifting cloud of ember-colored points that swirl with curl-ish noise
 * in the vertex shader and repel softly from the cursor. Pure shader motion:
 * zero per-frame JS allocation, one draw call.
 */

const COUNT_DESKTOP = 2600;

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;     // world-space mouse on the z=0 plane
  uniform float uPixelRatio;
  attribute float aScale;
  attribute float aSeed;
  varying float vAlpha;
  varying float vWarm;

  // cheap pseudo-noise swirl
  vec3 swirl(vec3 p, float t, float seed) {
    float a = t * (0.05 + 0.08 * fract(seed * 7.13)) + seed * 6.2831;
    p.x += sin(a + p.y * 0.45) * 0.9;
    p.y += cos(a * 0.8 + p.x * 0.35) * 0.55;
    p.z += sin(a * 0.6 + seed * 3.0) * 0.4;
    return p;
  }

  void main() {
    vec3 pos = swirl(position, uTime, aSeed);

    // soft mouse repulsion
    vec2 d = pos.xy - uMouse;
    float dist = length(d);
    float push = smoothstep(2.2, 0.0, dist) * 1.1;
    pos.xy += normalize(d + 0.0001) * push;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * uPixelRatio * (26.0 / -mv.z);

    // twinkle + depth fade
    float tw = 0.55 + 0.45 * sin(uTime * (0.6 + fract(aSeed * 3.7)) + aSeed * 12.0);
    vAlpha = tw * smoothstep(-14.0, -2.0, mv.z);
    vWarm = fract(aSeed * 5.31);
  }
`;

const fragment = /* glsl */ `
  varying float vAlpha;
  varying float vWarm;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float disc = smoothstep(0.5, 0.08, d);
    // palette: deep emerald -> champagne gold -> carbon (drawn dark on porcelain)
    // starlight on the dusk sky: pale lavender -> warm champagne -> white
    vec3 oxblood = vec3(0.85, 0.80, 0.97);
    vec3 gold = vec3(0.96, 0.88, 0.70);
    vec3 ink  = vec3(1.0, 1.0, 1.0);
    vec3 col = mix(oxblood, gold, vWarm);
    col = mix(col, ink, smoothstep(0.7, 1.0, vWarm));
    gl_FragColor = vec4(col, disc * vAlpha * 0.55);
  }
`;

function Particles({ count }: { count: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(99, 99));

  const { positions, scales, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      scales[i] = 0.5 + Math.random() * 1.6;
      seeds[i] = Math.random();
    }
    return { positions, scales, seeds };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(99, 99) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    }),
    [],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      // map screen coords to world units on the z=0 plane
      mouse.current.set(
        (e.clientX / window.innerWidth - 0.5) * viewport.width,
        -(e.clientY / window.innerHeight - 0.5) * viewport.height,
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [viewport.width, viewport.height]);

  useFrame((state) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = state.clock.elapsedTime;
    (mat.current.uniforms.uMouse.value as THREE.Vector2).lerp(mouse.current, 0.08);
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

export default function EmberField() {
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Phones get native-fast scrolling, not a particle field.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || window.innerWidth < 768) return;
    setReady(true);
  }, []);

  // Stop rendering entirely once the hero scrolls out of view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!ready || !el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ready]);

  if (!ready) return null;

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        dpr={[1, 2]}
        frameloop={inView ? "always" : "never"}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Particles count={COUNT_DESKTOP} />
      </Canvas>
    </div>
  );
}
