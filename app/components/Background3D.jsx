"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.2;
    
    // Parallax shift based on mouse
    vec2 parallax = uMouse * 0.02;
    uv += parallax;

    // Layer 1: Blue Deep Glow
    float d1 = distance(uv, vec2(0.8 + sin(time * 0.5) * 0.2, 0.2 + cos(time * 0.3) * 0.2));
    vec3 color1 = vec3(0.23, 0.51, 0.96) * exp(-d1 * 2.5); // #3B82F6 base

    // Layer 2: Violet Depth
    float d2 = distance(uv, vec2(0.2 + cos(time * 0.4) * 0.15, 0.7 + sin(time * 0.6) * 0.15));
    vec3 color2 = vec3(0.55, 0.36, 0.96) * exp(-d2 * 3.0); // #8B5CF6 base

    // Layer 3: Subtle Cyan Accent
    float d3 = distance(uv, vec2(0.5 + sin(time * 0.2) * 0.3, 0.5 + cos(time * 0.25) * 0.3));
    vec3 color3 = vec3(0.13, 0.83, 0.93) * exp(-d3 * 4.5); // #22D3EE base

    // Combine layers on a very dark base
    vec3 finalColor = vec3(0.039, 0.059, 0.11) + (color1 + color2 + color3) * 0.45;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function Scene() {
    const meshRef = useRef();
    const { viewport, size } = useThree();
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMouse({
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: -(e.clientY / window.innerHeight - 0.5) * 2,
            });
        };

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mq.matches);
        const listener = (e) => setReducedMotion(e.matches);
        mq.addEventListener("change", listener);

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            mq.removeEventListener("change", listener);
        };
    }, []);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }), []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        uniforms.uTime.value = reducedMotion ? time * 0.1 : time;

        // Smooth mouse follow
        uniforms.uMouse.value.x = THREE.MathUtils.lerp(uniforms.uMouse.value.x, mouse.x, 0.05);
        uniforms.uMouse.value.y = THREE.MathUtils.lerp(uniforms.uMouse.value.y, mouse.y, 0.05);
    });

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

export default function Background3D() {
    return (
        <div
            className="bg-3d-surface"
            style={{
                position: "fixed",
                inset: 0,
                zIndex: -1,
                pointerEvents: "none",
                background: "#0A0F1C", // Base fallback
            }}
        >
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Scene />
            </Canvas>
        </div>
    );
}
