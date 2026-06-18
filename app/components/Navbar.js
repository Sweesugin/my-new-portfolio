"use client";

import { useEffect, useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const links = [
    { name: "About",      id: "about" },
    { name: "Experience", id: "experience" },
    { name: "Skills",     id: "skills" },
    { name: "Projects",   id: "projects" },
    { name: "Resume",     id: "resume" },
    { name: "Contact",    id: "contact" },
];

export default function Navbar() {
    const [active, setActive] = useState("about");
    const { theme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { threshold: 0.4, rootMargin: "-60px 0px 0px 0px" }
        );
        links.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const scrollTo = useCallback((id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        setMobileOpen(false);
    }, []);

    return (
        <nav className="navbar">
                <div className="nav-container">
                <button
                    className={`hamburger ${mobileOpen ? 'open' : ''}`}
                    aria-expanded={mobileOpen}
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    onClick={() => setMobileOpen((s) => !s)}
                >
                    <span className="hamburger-box">
                        <span className="hamburger-inner" />
                    </span>
                </button>
                <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
                    {links.map((link) => (
                        <li key={link.id}>
                            <button
                                onClick={() => scrollTo(link.id)}
                                className={`nav-link ${active === link.id ? "active" : ""}`}
                                style={{ background: "none", border: "none", cursor: "pointer", font: "inherit" }}
                            >
                                {link.name}
                            </button>
                        </li>
                    ))}
                    <li><ThemeToggle /></li>
                </ul>
            </div>
        </nav>
    );
}
