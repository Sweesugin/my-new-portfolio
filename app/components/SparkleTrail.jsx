"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const SparkleTrail = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();
    const particles = useRef([]);
    const mouse = useRef({ x: 0, y: 0 });
    const lerpMouse = useRef({ x: 0, y: 0 });
    const lastMouse = useRef({ x: 0, y: 0 });
    const isHovering = useRef(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const lastTime = useRef(0);

    useEffect(() => {
        // Detect touch device
        const checkTouch = () => {
            setIsTouchDevice(
                "ontouchstart" in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia("(pointer: coarse)").matches
            );
        };
        checkTouch();
    }, []);

    useEffect(() => {
        if (isTouchDevice) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        const scaleCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            // Reset any previous transform and set scale for crisp retina rendering
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        scaleCanvas();
        window.addEventListener("resize", scaleCanvas);

        class Particle {
            constructor(x, y, isClickBurst = false) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * (isHovering.current ? 4 : 3) + 2;
                if (theme === "light") this.size += 1; // 3-7px for light theme

                const angle = Math.random() * Math.PI * 2;
                const force = isClickBurst ? (Math.random() * 8 + 4) : (Math.random() * 3 + 1);
                this.vx = Math.cos(angle) * force;
                this.vy = Math.sin(angle) * force;

                this.life = Math.random() * 500 + 500; // 500-1000ms
                this.maxLife = this.life;
                this.opacity = 1;
                this.isStar = Math.random() > 0.7;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.1;

                // Colors based on theme
                const darkColors = ["#00e5ff", "#8c52ff"];
                const lightColors = ["#0099cc", "#6a00ff", "#00c2ff"];
                const palette = theme === "dark" ? darkColors : lightColors;
                this.color = palette[Math.floor(Math.random() * palette.length)];
            }

            update(deltaTime) {
                this.x += this.vx;
                this.y += this.vy;
                this.vx *= 0.99; // Less friction for better flow
                this.vy *= 0.99;
                this.life -= deltaTime;
                this.opacity = Math.max(this.life / this.maxLife, 0);
                if (this.isStar) this.rotation += this.rotationSpeed;
            }

            draw(ctx) {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();

                // Glow effect
                if (theme === "dark") {
                    ctx.shadowBlur = isHovering.current ? 22 : 15;
                    ctx.shadowColor = this.color;
                    ctx.globalCompositeOperation = "lighter";
                } else {
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = "rgba(0,0,0,0.1)"; // Subtle shadow instead of glow for contrast on light
                    ctx.globalCompositeOperation = "source-over";
                }

                if (this.isStar) {
                    this.drawStar(ctx, this.x, this.y, 4, this.size, this.size / 2.5);
                } else {
                    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                }

                ctx.fillStyle = this.color;
                ctx.fill();

                // Dark inner core for light theme visibility
                if (theme === "light") {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size / 5, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(0,0,0,0.15)";
                    ctx.fill();
                }

                ctx.restore();
            }

            drawStar(ctx, x, y, points, outer, inner) {
                let cx = x;
                let cy = y;
                let rot = this.rotation;
                let step = Math.PI / points;
                ctx.moveTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer);
                for (let i = 0; i < points; i++) {
                    rot += step;
                    ctx.lineTo(cx + Math.cos(rot) * inner, cy + Math.sin(rot) * inner);
                    rot += step;
                    ctx.lineTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer);
                }
                ctx.closePath();
            }
        }

        const animate = (time) => {
            if (!lastTime.current) lastTime.current = time;
            const deltaTime = time - lastTime.current;
            lastTime.current = time;

            // Interpolate mouse for smoother flow
            lerpMouse.current.x += (mouse.current.x - lerpMouse.current.x) * 0.35;
            lerpMouse.current.y += (mouse.current.y - lerpMouse.current.y) * 0.35;

            // Clear canvas in CSS pixels (canvas is scaled by dpr)
            const dpr = window.devicePixelRatio || 1;
            ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

            // Spawn particles on movement
            const dist = Math.hypot(lerpMouse.current.x - lastMouse.current.x, lerpMouse.current.y - lastMouse.current.y);
            if (dist > 0.5) {
                const count = Math.min(Math.floor(dist / 3) + 1, isHovering.current ? 8 : 4);
                for (let i = 0; i < count; i++) {
                    if (particles.current.length < 300) {
                        particles.current.push(new Particle(lerpMouse.current.x, lerpMouse.current.y));
                    }
                }
            }
            lastMouse.current = { ...lerpMouse.current };

            // Update and draw
            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                p.update(deltaTime);
                if (p.life <= 0) {
                    particles.current.splice(i, 1);
                } else {
                    p.draw(ctx);
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };

            const target = e.target;
            isHovering.current =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer';
        };

        const handleClick = (e) => {
            const count = Math.random() * 10 + 15; // Cap burst
            for (let i = 0; i < count; i++) {
                if (particles.current.length < 300) {
                    particles.current.push(new Particle(e.clientX, e.clientY, true));
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mousedown", handleClick, { passive: true });

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", scaleCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme, isTouchDevice]);

    if (isTouchDevice) return null;

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 9999,
            }}
        />
    );
};

export default SparkleTrail;
