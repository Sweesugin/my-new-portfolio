"use client";
import GlowCard from "../components/GlowCard";
import useScrollReveal from "@/utils/hooks/useScrollReveal";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { projectsData } from "@/utils/data/projects-data";

const ProjectCaseStudyModal = dynamic(() => import("../components/ProjectCaseStudyModal"), {
    ssr: false,
    loading: () => null,
});

export default function ProjectsPage() {
    const containerRef = useScrollReveal(0.15);

    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <main className="container section-padding" ref={containerRef}>
            <h1 className="section-title">Latest <span className="text-primary-color">Projects</span></h1>

            <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
                {projectsData.map((project, idx) => (
                    <div
                        key={idx}
                        className={idx % 2 === 0 ? "fromLeft" : "fromRight"}
                        style={{ transitionDelay: `${idx * 0.1}s` }}
                    >
                        <GlowCard>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                                    gap: "3rem",
                                    alignItems: "center",
                                    padding: '40px',
                                }}
                            >
                                <div style={idx % 2 !== 0 ? { order: 2 } : {}}>
                                    <h2 style={{ color: "var(--accent-primary)", marginBottom: "1.5rem", fontSize: "var(--fs-h3)" }}>{project.title}</h2>
                                    <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "var(--fs-body)" }}>{project.desc}</p>
                                    <div style={{ display: "flex", gap: "1rem", alignItems: 'center' }}>
                                        <a href={project.github || "#"} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                                            <i className="fab fa-github"></i> Source Code
                                        </a>
                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            className="btn btn-glass"
                                            type="button"
                                            aria-label={`Open case study for ${project.title}`}>
                                            Case Study
                                        </button>
                                    </div>
                                </div>
                                <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 10px 20px rgba(0,0,0,0.4)", order: idx % 2 !== 0 ? 1 : 2 }}>
                                        <Image src={project.img} alt={project.title} width={600} height={400} style={{ width: "100%", height: "auto", display: "block" }} />
                                </div>
                            </div>
                        </GlowCard>
                    </div>
                ))}
            </div>
            {selectedProject && (
                <ProjectCaseStudyModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </main>
    );
}