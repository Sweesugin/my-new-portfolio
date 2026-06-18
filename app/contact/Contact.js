"use client";
import GlowCard from "../components/GlowCard";

export default function ContactPage() {
    return (
        <main className="container section-padding">
            <h1 className="section-title">Get In <span className="text-primary-color">Touch</span></h1>

            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                <GlowCard className="fade-up">
                    <div style={{ padding: "40px" }}>
                        <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: "1.5rem", color: "var(--text-primary)" }}>Contact Information</h2>
                        <p style={{ color: "var(--text-secondary)", marginBottom: "2.5rem", fontSize: "var(--fs-body)" }}>
                            If you have any questions or concerns, please don't hesitate to contact me. I am open to any work
                            opportunities that align with my skills and interests.
                        </p>

                        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
                            <a href="mailto:sweesugin2118@gmail.com" style={{ textDecoration: 'none', width: "50px", height: "50px", borderRadius: "50%", background: "var(--card-bg-glass)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-primary)", fontSize: "var(--fs-h3)", border: "1px solid var(--card-border)", boxShadow: "0 0 15px var(--shadow-glow)", flexShrink: 0 }}>
                                <i className="fas fa-envelope"></i>
                            </a>
                            <div>
                                <div style={{ color: "var(--text-secondary)", fontSize: "var(--fs-small)", textTransform: "uppercase", letterSpacing: "1px" }}>Email</div>
                                <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>sweesugin2118@gmail.com</div>
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
                            <a href="https://linkedin.com/in/sweetha-muniraj" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: "50px", height: "50px", borderRadius: "50%", background: "var(--card-bg-glass)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-primary)", fontSize: "var(--fs-h3)", border: "1px solid var(--card-border)", boxShadow: "0 0 15px var(--shadow-glow)", flexShrink: 0 }}>
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <div>
                                <div style={{ color: "var(--text-secondary)", fontSize: "var(--fs-small)", textTransform: "uppercase", letterSpacing: "1px" }}>LinkedIn</div>
                                <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>linkedin.com/in/sweetha-muniraj</div>
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
                            <a href="https://github.com/sweetha-m" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: "50px", height: "50px", borderRadius: "50%", background: "var(--card-bg-glass)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-primary)", fontSize: "var(--fs-h3)", border: "1px solid var(--card-border)", boxShadow: "0 0 15px var(--shadow-glow)", flexShrink: 0 }}>
                                <i className="fab fa-github"></i>
                            </a>
                            <div>
                                <div style={{ color: "var(--text-secondary)", fontSize: "var(--fs-small)", textTransform: "uppercase", letterSpacing: "1px" }}>GitHub</div>
                                <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>github.com/sweetha-m</div>
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                            <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "var(--card-bg-glass)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-primary)", fontSize: "var(--fs-h3)", border: "1px solid var(--card-border)", boxShadow: "0 0 15px var(--shadow-glow)", flexShrink: 0 }}>
                                <i className="fas fa-location-dot"></i>
                            </div>
                            <div>
                                <div style={{ color: "var(--text-secondary)", fontSize: "var(--fs-small)", textTransform: "uppercase", letterSpacing: "1px" }}>Address</div>
                                <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>Namakkal, Tamilnadu</div>
                            </div>
                        </div>
                    </div>
                </GlowCard>
            </div>
        </main>
    );
}
