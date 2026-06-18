"use client";

import { useEffect, useRef } from "react";
import styles from "./ScrollTimeline.module.css";

const ScrollTimeline = ({ title, items }) => {
    const sectionRef = useRef(null);
    const progressRef = useRef(null);
    const rowRefs = useRef([]);

    useEffect(() => {
        // 1. Reveal Animation (IntersectionObserver)
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.reveal);
                    }
                });
            },
            { threshold: 0.1 }
        );

        rowRefs.current.forEach((row) => {
            if (row) observer.observe(row);
        });

        // 2. Scroll Progress Logic (requestAnimationFrame)
        let requestRunning = false;

        const updateProgress = () => {
            if (!sectionRef.current || !progressRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Start calculating when the top of the section hits the middle of viewport
            // End calculation when the bottom of the section hits the middle of viewport
            const startTrigger = viewportHeight / 2;
            const sectionHeight = rect.height;
            const currentPos = startTrigger - rect.top;

            let progress = (currentPos / sectionHeight) * 100;
            progress = Math.min(Math.max(progress, 0), 100);

            progressRef.current.style.height = `${progress}%`;
            requestRunning = false;
        };

        const handleScroll = () => {
            if (!requestRunning) {
                requestAnimationFrame(updateProgress);
                requestRunning = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        updateProgress(); // Initial call

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, [items]);

    return (
        <section className={styles.timelineSection} ref={sectionRef}>
            <h2 className={styles.sectionTitle}>{title}</h2>

            <div className={styles.timelineContainer}>
                {/* Continuous Center Line */}
                <div className={styles.lineBase}>
                    <div className={styles.lineProgress} ref={progressRef}></div>
                </div>

                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className={styles.timelineRow}
                        ref={(el) => (rowRefs.current[idx] = el)}
                    >
                        {/* Left Column: Info */}
                        <div className={styles.leftCol}>
                            {item.certificateUrl ? (
                                <a
                                    href={item.certificateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.certificateLink}
                                    title="View Certificate"
                                >
                                    <h3 className={styles.itemTitle}>
                                        {item.leftTitle} <i className="fas fa-external-link-alt" style={{ fontSize: '0.8rem', marginLeft: '5px' }}></i>
                                    </h3>
                                </a>
                            ) : (
                                <h3 className={styles.itemTitle}>{item.leftTitle}</h3>
                            )}
                            <h4 className={styles.itemSubtitle}>{item.leftSubtitle}</h4>
                            <p className={styles.itemDesc}>{item.description}</p>
                        </div>

                        {/* Center Column: Marker */}
                        <div className={styles.centerCol}>
                            <div className={styles.markerDot}></div>
                        </div>

                        {/* Right Column: Date */}
                        <div className={styles.rightCol}>
                            <span className={styles.dateLabel}>{item.rightLabel}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ScrollTimeline;
