"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "./about/About";
import ExperiencePage from "./experience/Experience";
import SkillsPage from "./skills/Skills";
import ProjectsPage from "./projects/Projects";
import ResumePage from "./resume/Resume";
import ContactPage from "./contact/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
    useEffect(() => {
        document.documentElement.style.scrollBehavior = "smooth";

        const timer = setTimeout(() => {
            try {
                const sections = document.querySelectorAll(".spa-section");

                // Add gsap-ready class so CSS sets opacity:0 for animation
                // If GSAP throws, the catch block removes these classes
                sections.forEach((section, i) => {
                    if (i !== 0) section.classList.add("gsap-ready");
                });

                sections.forEach((section, i) => {
                    if (i === 0) return;

                    gsap.fromTo(
                        section,
                        { opacity: 0, y: 80, scale: 0.95 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 1.4,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: section,
                                start: "top 70%",
                                end: "top 30%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );

                    const leftEls = section.querySelectorAll(".fromLeft");
                    if (leftEls.length > 0) {
                        gsap.fromTo(
                            leftEls,
                            { opacity: 0, x: -70, scale: 0.92 },
                            {
                                opacity: 1,
                                x: 0,
                                scale: 1,
                                duration: 1,
                                stagger: 0.15,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: section,
                                    start: "top 75%",
                                    toggleActions: "play none none reverse",
                                },
                            }
                        );
                    }

                    const rightEls = section.querySelectorAll(".fromRight");
                    if (rightEls.length > 0) {
                        gsap.fromTo(
                            rightEls,
                            { opacity: 0, x: 70, scale: 0.92 },
                            {
                                opacity: 1,
                                x: 0,
                                scale: 1,
                                duration: 1,
                                stagger: 0.15,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: section,
                                    start: "top 75%",
                                    toggleActions: "play none none reverse",
                                },
                            }
                        );
                    }

                    const fadeUpEls = section.querySelectorAll(".fade-up");
                    if (fadeUpEls.length > 0) {
                        gsap.fromTo(
                            fadeUpEls,
                            { opacity: 0, y: 50 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.9,
                                stagger: 0.12,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: section,
                                    start: "top 75%",
                                    toggleActions: "play none none reverse",
                                },
                            }
                        );
                    }

                    const revealEls = section.querySelectorAll(".reveal");
                    if (revealEls.length > 0) {
                        gsap.fromTo(
                            revealEls,
                            { opacity: 0, y: 40 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 1,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: section,
                                    start: "top 75%",
                                    toggleActions: "play none none reverse",
                                },
                            }
                        );
                    }

                    const cards = section.querySelectorAll(".glow-card-container");
                    if (cards.length > 0) {
                        gsap.fromTo(
                            cards,
                            { opacity: 0, y: 40, rotateX: 5 },
                            {
                                opacity: 1,
                                y: 0,
                                rotateX: 0,
                                duration: 0.9,
                                stagger: 0.1,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: section,
                                    start: "top 75%",
                                    toggleActions: "play none none reverse",
                                },
                            }
                        );
                    }
                });

                ScrollTrigger.refresh();
            } catch (err) {
                // GSAP failed — remove gsap-ready so all sections stay visible
                console.warn("GSAP animation init failed, falling back to visible sections:", err);
                document.querySelectorAll(".spa-section.gsap-ready").forEach((s) => {
                    s.classList.remove("gsap-ready");
                });
            }
        }, 250);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <div id="spa-root">
            <section id="about" className="spa-section panel">
                <About />
            </section>
            <section id="experience" className="spa-section panel">
                <ExperiencePage />
            </section>
            <section id="skills" className="spa-section panel">
                <SkillsPage />
            </section>
            <section id="projects" className="spa-section panel">
                <ProjectsPage />
            </section>
            <section id="resume" className="spa-section panel">
                <ResumePage />
            </section>
            <section id="contact" className="spa-section panel">
                <ContactPage />
            </section>
        </div>
    );
}
