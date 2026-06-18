"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./About.module.css";
import useScrollReveal from "@/utils/hooks/useScrollReveal";
import GlowCard from "../components/GlowCard";

export default function About() {
    const containerRef = useScrollReveal(0.1);
    const photoRef = useRef(null);
    const [parallax, setParallax] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!photoRef.current) return;
        const { left, top, width, height } = photoRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 12;
        const y = ((e.clientY - top) / height - 0.5) * 12;
        setParallax({ x, y });
    };

    const handleMouseLeave = () => setParallax({ x: 0, y: 0 });

    const roles = [
        "Business Analyst",
        "UiPath Automation Developer",
        "MERN Stack Developer",
        "Cloud Computing Enthusiast",
        "AI & Automation Explorer",
        "Data Analytics Learner",
        "Continuous Learner",
    ];
    const [displayText, setDisplayText] = useState("");
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const typeRef = useRef(null);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        const typeSpeed = isDeleting ? 45 : 80;
        const pauseAfterType = 1700;
        const pauseAfterDelete = 400;

        typeRef.current = setTimeout(() => {
            if (!isDeleting) {
                const next = currentRole.slice(0, displayText.length + 1);
                setDisplayText(next);
                if (next === currentRole) {
                    typeRef.current = setTimeout(() => setIsDeleting(true), pauseAfterType);
                }
            } else {
                const next = currentRole.slice(0, displayText.length - 1);
                setDisplayText(next);
                if (next === "") {
                    setIsDeleting(false);
                    typeRef.current = setTimeout(
                        () => setRoleIndex((i) => (i + 1) % roles.length),
                        pauseAfterDelete
                    );
                }
            }
        }, typeSpeed);

        return () => clearTimeout(typeRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayText, isDeleting, roleIndex]);

    return (
        <div className={styles.pageContainer} ref={containerRef}>
            <header className={`${styles.headerLayout} fromLeft show`}>
                <div className={styles.headerLeft}>
                    <div className={styles.nameBlock}>
                        <h1 className={styles.name}>Sweetha Muniraj</h1>
                        <h2 className={styles.roleSubtitle}>Computer Science &amp; Business Systems Undergraduate</h2>
                        <div className={styles.typewriterRow}>
                            <span className={styles.typewriterText}>{displayText}</span>
                            <span className={styles.cursor} aria-hidden="true">|</span>
                        </div>
                    </div>
                    <div className={styles.statusBadgeWrapper}>
                        <span className={styles.statusBadge}>🔵 Open to Internships & Full-Time Roles</span>
                    </div>
                    <div className={styles.headerActions}>
                        <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="btn btn-primary">View Projects</button>
                        <a href="/resume.pdf" download="Sweetha_Muniraj_Resume.pdf" className="btn" style={{ border: '1px solid var(--border-color)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Download Resume</a>
                    </div>
                </div>
                <div className={styles.headerRight}>
                    <div
                        className={`${styles.photoContainer} floating`}
                        ref={photoRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0) scale(${parallax.x !== 0 ? 1.02 : 1})`,
                            animationDelay: '0.5s'
                        }}
                    >
                        <Image src="/profile.jpg" alt="Sweetha Muniraj" width={400} height={400} priority className={styles.profilePhoto} />
                    </div>
                </div>
            </header>

            <div className={styles.cardGrid}>
                <div className="fromLeft show" style={{ transitionDelay: '0.1s', display: 'flex' }}>
                    <GlowCard style={{ height: '100%', width: '100%' }}>
                        <div className={styles.aboutCard} style={{ padding: '32px', height: '100%' }}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}><i className="fas fa-graduation-cap"></i></div>
                                <h3 className={styles.sectionHeading}>Education</h3>
                            </div>
                            <div className={styles.divider}></div>
                            <div className={styles.cardMeta}>2023 – 2027</div>
                            <h4 className={styles.cardSubheading}>B.Tech – Computer Science & Business Systems</h4>
                            <p className={styles.eduSubtitle}>K S Rangasamy College of Technology</p>
                            <div className={styles.divider} style={{ margin: '20px 0' }}></div>
                            <div className={styles.cardMeta}>2022 – 2023</div>
                            <h4 className={styles.cardSubheading}>HSC (Higher Secondary Certificate)</h4>
                            <p className={styles.eduSubtitle}>SPK Gems School</p>
                        </div>
                    </GlowCard>
                </div>

                <div className="fromRight show" style={{ transitionDelay: '0.2s', display: 'flex' }}>
                    <GlowCard style={{ height: '100%', width: '100%' }}>
                        <div className={styles.aboutCard} style={{ padding: '32px', height: '100%' }}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}><i className="fas fa-code-branch"></i></div>
                                <h3 className={styles.sectionHeading}>What I Build</h3>
                            </div>
                            <div className={styles.divider}></div>
                            <ul className={styles.bulletList}>
                                {["Scalable web applications with clean architecture","Insight-driven analytics dashboards","Intelligent automation workflows","Custom API integrations and backend systems","Interactive and data-rich user interfaces"].map((item, i) => (
                                    <li key={i} className={styles.bulletItem}><i className="fas fa-check-circle"></i>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </GlowCard>
                </div>

                <div className="fromLeft show" style={{ transitionDelay: '0.3s' }}>
                    <GlowCard style={{ height: '100%' }}>
                        <div className={styles.aboutCard} style={{ padding: '32px' }}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}><i className="fas fa-award"></i></div>
                                <h3 className={styles.sectionHeading}>Professional Attributes</h3>
                            </div>
                            <div className={styles.divider}></div>
                            <div className={styles.tagRow}>
                                {["Strong Work Ethic","Time Management","Team Collaboration","Problem Solving","Adaptability","Continuous Learning"].map((t, i) => (
                                    <span key={i} className={styles.tag}>{t}</span>
                                ))}
                            </div>
                        </div>
                    </GlowCard>
                </div>

                <div className="fromRight show" style={{ transitionDelay: '0.4s' }}>
                    <GlowCard style={{ height: '100%' }}>
                        <div className={styles.aboutCard} style={{ padding: '32px' }}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}><i className="fas fa-bullseye"></i></div>
                                <h3 className={styles.sectionHeading}>Currently Seeking</h3>
                            </div>
                            <div className={styles.divider}></div>
                            <ul className={styles.bulletList}>
                                <li className={styles.bulletItem}><i className="fas fa-rocket"></i>Software Engineering Internships</li>
                                <li className={styles.bulletItem}><i className="fas fa-chart-line"></i>Data / Analytics Internships</li>
                                <li className={styles.bulletItem}><i className="fas fa-user-graduate"></i>Full-Time Entry-Level Roles (2027)</li>
                            </ul>
                        </div>
                    </GlowCard>
                </div>
            </div>

            <section className="reveal show">
                <GlowCard style={{ width: '100%' }}>
                    <div className={styles.ctaCard} style={{ padding: '48px', textAlign: 'center' }}>
                        <h2 className={styles.ctaText}>Let's build meaningful technology together</h2>
                        <div className={styles.ctaButtons}>
                            <a href="mailto:sweesugin2118@gmail.com" className="btn btn-primary">Email Me</a>
                            <a href="https://linkedin.com/in/sweetha-muniraj" target="_blank" rel="noopener noreferrer" className="btn" style={{ border: '1px solid var(--border-color)' }}>LinkedIn</a>
                            <a href="https://github.com/Sweesugin" target="_blank" rel="noopener noreferrer" className="btn" style={{ border: '1px solid var(--border-color)' }}>GitHub</a>
                        </div>
                    </div>
                </GlowCard>
            </section>
        </div>
    );
}
