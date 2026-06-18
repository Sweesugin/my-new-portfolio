"use client";

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="social-links">
                    <a href="https://github.com/Sweesugin" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/sweetha-muniraj/" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://leetcode.com/u/sweetha-33/" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i className="fas fa-terminal" title="LeetCode"></i>
                    </a>
                    <a href="mailto:sweesugin2118@gmail.com" className="social-icon">
                        <i className="fas fa-envelope" title="Email"></i>
                    </a>
                </div>
                <p style={{ color: "var(--text-secondary)" }}>&copy; 2026 Sweetha Muniraj. Built with passion.</p>
            </div>
        </footer>
    );
}
