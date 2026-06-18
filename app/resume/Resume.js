"use client";
import GlowCard from "../components/GlowCard";
import dynamic from "next/dynamic";

const ResumePreview = dynamic(() => import("../components/ResumePreview"), {
    ssr: false,
    loading: () => (
        <div style={{ height: "85vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", gap: "12px" }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: "1.6rem", color: "var(--accent-primary)" }} />
            <span>Loading preview…</span>
        </div>
    ),
});

const PDF_PATH = "/resume.pdf";

export default function ResumePage() {
    return (
        <main className="container section-padding">
            <h1 className="section-title">
                My <span className="text-primary-color">Resume</span>
            </h1>
            <div className="resume-container fade-up" style={{ maxWidth: "900px", margin: "0 auto" }}>
                <GlowCard>
                    <div className="responsive-padding-card">
                        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem", gap: "12px", flexWrap: "wrap" }}>
                            <a
                                href={PDF_PATH}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn"
                                style={{ padding: "10px 20px", fontSize: "var(--fs-small)", display: "inline-flex", alignItems: "center", gap: "8px" }}
                            >
                                <i className="fas fa-external-link-alt"></i> Open in New Tab
                            </a>
                            <a
                                href={PDF_PATH}
                                download
                                className="cta-button"
                                style={{ padding: "10px 20px", fontSize: "var(--fs-small)", display: "inline-flex", alignItems: "center", gap: "8px" }}
                            >
                                <i className="fas fa-download"></i> Download Resume
                            </a>
                        </div>
                        <div className="max-w-5xl mx-auto" style={{ minHeight: "85vh", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border-color)", background: "#111216" }}>
                            <ResumePreview />
                        </div>
                    </div>
                </GlowCard>
            </div>
        </main>
    );
}
