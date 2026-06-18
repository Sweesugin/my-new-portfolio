"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import styles from "./ConstellationBackground.module.css";

const STAR_COUNT   = 130;
const CONNECT_DIST = 140; // px — max distance to draw a line

function initStars(W, H) {
    return Array.from({ length: STAR_COUNT }, () => ({
        x:       Math.random() * W,
        y:       Math.random() * H,
        r:       0.4 + Math.random() * 1.4,
        speed:   0.008 + Math.random() * 0.018,
        phase:   Math.random() * Math.PI * 2,
        depth:   0.5 + Math.random() * 0.5,   // parallax depth 0.5–1
        vx:      (Math.random() - 0.5) * 0.12,
        vy:      (Math.random() - 0.5) * 0.12,
    }));
}

const ConstellationBackground = () => {
    const canvasRef = useRef(null);
    const { theme }  = useTheme();
    const starsRef   = useRef([]);
    const mouseRef   = useRef({ x: 0, y: 0 });
    const targetRef  = useRef({ x: 0, y: 0 });
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduced(mq.matches);
        const h = (e) => setReduced(e.matches);
        mq.addEventListener("change", h);
        return () => mq.removeEventListener("change", h);
    }, []);

    useEffect(() => {
        const resize = () => {
            const c = canvasRef.current;
            if (!c) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            c.width  = window.innerWidth  * dpr;
            c.height = window.innerHeight * dpr;
            starsRef.current = initStars(window.innerWidth, window.innerHeight);
        };
        const onMouse = (e) => {
            targetRef.current = {
                x: (e.clientX - window.innerWidth  / 2) * 0.018,
                y: (e.clientY - window.innerHeight / 2) * 0.018,
            };
        };
        window.addEventListener("resize",    resize,  { passive: true });
        window.addEventListener("mousemove", onMouse, { passive: true });
        resize();
        return () => {
            window.removeEventListener("resize",    resize);
            window.removeEventListener("mousemove", onMouse);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let id;

        const draw = (t) => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const W   = canvas.width  / dpr;
            const H   = canvas.height / dpr;

            // Smooth mouse lerp
            mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.05;
            mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.05;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.scale(dpr, dpr);

            const stars = starsRef.current;

            // Drift stars slowly
            if (!reduced) {
                stars.forEach((s) => {
                    s.x += s.vx;
                    s.y += s.vy;
                    if (s.x < 0) s.x = W;
                    if (s.x > W) s.x = 0;
                    if (s.y < 0) s.y = H;
                    if (s.y > H) s.y = 0;
                });
            }

            // Draw connection lines first (below stars)
            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    const a  = stars[i];
                    const b  = stars[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d  = Math.sqrt(dx * dx + dy * dy);
                    if (d > CONNECT_DIST) continue;

                    const alpha = (1 - d / CONNECT_DIST) * 0.10;
                    ctx.beginPath();
                    ctx.moveTo(
                        a.x + mouseRef.current.x * a.depth,
                        a.y + mouseRef.current.y * a.depth
                    );
                    ctx.lineTo(
                        b.x + mouseRef.current.x * b.depth,
                        b.y + mouseRef.current.y * b.depth
                    );
                    ctx.strokeStyle = `rgba(99, 179, 237, ${alpha})`;
                    ctx.lineWidth   = 0.5;
                    ctx.stroke();
                }
            }

            // Draw stars
            stars.forEach((s) => {
                const twinkle = 0.55 + Math.sin(t * s.speed + s.phase) * 0.45;
                const px = s.x + mouseRef.current.x * s.depth;
                const py = s.y + mouseRef.current.y * s.depth;

                // Glow halo
                const glow = ctx.createRadialGradient(px, py, 0, px, py, s.r * 4);
                glow.addColorStop(0,   `rgba(180, 220, 255, ${0.18 * twinkle})`);
                glow.addColorStop(1,   "transparent");
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(px, py, s.r * 4, 0, Math.PI * 2);
                ctx.fill();

                // Star core
                ctx.fillStyle = `rgba(210, 235, 255, ${0.75 * twinkle})`;
                ctx.beginPath();
                ctx.arc(px, py, s.r, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.restore();
            id = requestAnimationFrame(draw);
        };

        id = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(id);
    }, [theme, reduced]);

    return (
        <div className={styles.wrap}>
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.vignette} />
            <div className={styles.noise} />
        </div>
    );
};

export default ConstellationBackground;
