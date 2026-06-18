"use client";

import { useRef } from "react";

export default function GlowCard({ children, className = "", style = {} }) {
    const cardRef = useRef(null);
    const overlayRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current || !overlayRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Center coordinates
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Degree of tilt
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        cardRef.current.style.transition = "transform 0.1s ease-out, box-shadow 0.3s ease";
        
        overlayRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, var(--accent-primary), transparent 40%)`;
        overlayRef.current.style.opacity = "0.15";
    };

    const handleMouseLeave = () => {
        if (!cardRef.current || !overlayRef.current) return;
        cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        cardRef.current.style.transition = "all 0.5s ease";
        overlayRef.current.style.opacity = "0";
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`glow-card-container ${className}`}
            style={{
                ...style,
                transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                transition: "all 0.5s ease",
            }}
        >
            <div ref={overlayRef} className="glow-overlay" style={{ opacity: 0 }} />
            {children}
        </div>
    );
}
