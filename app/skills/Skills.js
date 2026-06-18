"use client";
import GlowCard from "../components/GlowCard";
import Certifications from "../components/Certifications";
import {
    FaAws,
    FaChartPie,
    FaCss3Alt,
    FaDocker,
    FaFigma,
    FaCode,
    FaGitAlt,
    FaGithub,
    FaHtml5,
    FaJava,
    FaMicrosoft,
    FaPython,
    FaReact,
} from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";
import {
    SiCanva,
    SiC,
    SiGooglecloud,
    SiMongodb,
    SiMysql,
} from "react-icons/si";

export default function SkillsPage() {
    const skills = [
        { name: "Java", Icon: FaJava, color: "#f89820" },
        { name: "C", Icon: SiC, color: "#A8B9CC" },
        { name: "Python", Icon: FaPython, color: "#3776AB" },
        { name: "MERN Stack", Icon: FaReact, color: "#61DAFB" },
        { name: "HTML", Icon: FaHtml5, color: "#E34F26" },
        { name: "CSS", Icon: FaCss3Alt, color: "#1572B6" },
        { name: "Google Cloud Platform", Icon: SiGooglecloud, color: "#4285F4" },
        { name: "Amazon Web Services", Icon: FaAws, color: "#FF9900" },
        { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
        { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
        { name: "Power BI", Icon: FaChartPie, color: "#F2C811" },
        { name: "UiPath", Icon: FaRobot, color: "#F36C21" },
        { name: "Figma", Icon: FaFigma, color: "#F24E1E" },
        { name: "Canva", Icon: SiCanva, color: "#00C4CC" },
        { name: "Microsoft Tools", Icon: FaMicrosoft, color: "#00A4EF" },
        { name: "Git", Icon: FaGitAlt, color: "#F05032" },
        { name: "GitHub", Icon: FaGithub, color: "#FFFFFF" },
        { name: "Docker", Icon: FaDocker, color: "#2496ED" },
    ];



    return (
        <main className="container section-padding">
            <h1 className="section-title">Technical <span className="text-secondary-color">Expertise</span></h1>

            <div className="skills-grid" style={{ marginBottom: "5rem" }}>
                {skills.map((skill, idx) => (
                    <GlowCard key={idx} className="fade-up" style={{ animationDelay: `${idx * 0.04}s` }}>
                        {(() => {
                            const IconComponent = skill.Icon || FaCode;

                            return (
                        <div className="skill-badge" style={{ "--skill-accent": skill.color }}>
                            <span className="skill-badge-icon" aria-hidden="true">
                                <IconComponent size={24} color={skill.color} />
                            </span>
                            <span className="skill-badge-label">{skill.name}</span>
                        </div>
                            );
                        })()}
                    </GlowCard>
                ))}
            </div>

            <Certifications />

        </main>
    );
}
