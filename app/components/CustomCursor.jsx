"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const cursorRef = useRef(null);
    const trailingRef = useRef(null);

    useEffect(() => {
        const onMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsHidden(false);
        };

        const onMouseDown = () => setIsPointer(true);
        const onMouseUp = () => setIsPointer(false);

        const onMouseOver = (e) => {
            const target = e.target;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsPointer(isClickable);
        };

        const onMouseLeave = () => setIsHidden(true);
        const onMouseEnter = () => setIsHidden(false);

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mousedown", onMouseDown, { passive: true });
        window.addEventListener("mouseup", onMouseUp, { passive: true });
        window.addEventListener("mouseover", onMouseOver, { passive: true });
        document.addEventListener("mouseleave", onMouseLeave, { passive: true });
        document.addEventListener("mouseenter", onMouseEnter, { passive: true });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mouseenter", onMouseEnter);
        };
    }, []);

    // Trailing effect using requestAnimationFrame for smoothness
    useEffect(() => {
        let trailingX = 0;
        let trailingY = 0;
        let rafId;

        const updateTrailing = () => {
            const lerpSpeed = 0.15;
            trailingX += (position.x - trailingX) * lerpSpeed;
            trailingY += (position.y - trailingY) * lerpSpeed;

            if (trailingRef.current) {
                trailingRef.current.style.transform = `translate3d(${trailingX}px, ${trailingY}px, 0)`;
            }
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
            }
            rafId = requestAnimationFrame(updateTrailing);
        };

        rafId = requestAnimationFrame(updateTrailing);
        return () => cancelAnimationFrame(rafId);
    }, [position]);

    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null; // Hide on touch devices
    }

    return (
        <>
            <div
                ref={cursorRef}
                className={`${styles.cursorDot} ${isPointer ? styles.pointer : ""} ${isHidden ? styles.hidden : ""}`}
            />
            <div
                ref={trailingRef}
                className={`${styles.cursorTrailing} ${isPointer ? styles.pointer : ""} ${isHidden ? styles.hidden : ""}`}
            />
        </>
    );
}
