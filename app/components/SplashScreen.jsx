"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./SplashOverlay.module.css";

export default function SplashScreen({ name = "Sweetha Muniraj", durationMs = 1500 }) {
    const [fadeOut, setFadeOut] = useState(false);
    const fadeTimerRef = useRef(null);

    useEffect(() => {
        const actualDuration = durationMs || 1500;
        const fadeTime = Math.max(actualDuration - 300, 0);

        if (!fadeTimerRef.current) {
            fadeTimerRef.current = setTimeout(() => {
                setFadeOut(true);
            }, fadeTime);
        }

        return () => {
            if (fadeTimerRef.current) {
                clearTimeout(fadeTimerRef.current);
                fadeTimerRef.current = null;
            }
        };
    }, [durationMs]);

    return (
        <div className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ""}`} aria-label="Splash screen">
            <div className={styles.content}>
                <div className={styles.logoWrapper}>
                    <svg className={styles.logoSvg} viewBox="0 0 100 100">
                        <polygon
                            className={styles.octagon}
                            points="50,5 91.4,22.1 91.4,77.9 50,95 8.6,77.9 8.6,22.1"
                        />
                        <text x="50" y="58" textAnchor="middle" className={styles.logoText}>SM</text>
                    </svg>
                </div>

                <div className={styles.nameWrapper}>
                    <h1 className={styles.name}>{name}</h1>
                </div>
            </div>
        </div>
    );
}