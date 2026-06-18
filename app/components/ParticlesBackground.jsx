"use client";

import { useEffect, useRef } from "react";
import styles from "./ParticlesBackground.module.css";

export default function ParticlesBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId;
        let particles = [];
        let lastWidth = typeof window !== "undefined" ? window.innerWidth : 0;

        // Handle resize
        const handleResize = () => {
            if (!canvas) return;
            const width = window.innerWidth;
            const height = window.innerHeight;
            // Avoid resetting/re-initializing on vertical scrollbar toggling (e.g. mobile address bar height shift)
            if (width === lastWidth && particles.length > 0) return;
            lastWidth = width;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        // Initialize particles
        const initParticles = () => {
            if (!canvas) return;
            particles = [];
            // Optimize mobile rendering loop by dynamically scaling down particles
            const count = canvas.width < 768 ? 40 : 120;
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    // Particle size between 1 and 3 px
                    size: Math.random() * 2 + 1,
                    // Y-move speed: 0.3 to 0.8
                    speedY: Math.random() * 0.5 + 0.3,
                    // Gentle side-to-side floating speed
                    speedX: Math.random() * 0.2 - 0.1,
                    // Opacity between 0.25 and 0.7
                    opacity: Math.random() * 0.45 + 0.25,
                    // Slightly blurred dots
                    blur: Math.random() > 0.7
                });
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        // Animation loop
        const animate = () => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Update position
                p.y += p.speedY;
                p.x += p.speedX;

                // Reset position if it goes past the bottom boundary
                if (p.y > canvas.height) {
                    p.y = -5;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x > canvas.width) {
                    p.x = 0;
                } else if (p.x < 0) {
                    p.x = canvas.width;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                // Use slightly off-white and light gray colors with customized opacity
                ctx.fillStyle = `rgba(245, 245, 250, ${p.opacity})`;

                if (p.blur) {
                    ctx.shadowBlur = 3;
                    ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className={styles.wrap}>
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    );
}
