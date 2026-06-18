"use client";

import { useEffect, useRef } from 'react';

const useScrollReveal = (threshold = 0.05) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                    } else {
                        entry.target.classList.remove('show');
                    }
                });
            },
            {
                threshold: threshold,
            }
        );

        const container = containerRef.current;
        if (container) {
            const elements = container.querySelectorAll('.fromLeft, .fromRight, .reveal');
            elements.forEach((el) => observer.observe(el));
        }

        return () => {
            if (container) {
                const elements = container.querySelectorAll('.fromLeft, .fromRight, .reveal');
                elements.forEach((el) => observer.unobserve(el));
            }
        };
    }, [threshold]);

    return containerRef;
};

export default useScrollReveal;
