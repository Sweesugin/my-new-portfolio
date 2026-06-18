"use client";
import ScrollTimeline from "../components/ScrollTimeline";
import { experienceData } from "../../utils/data/experience-data";

export default function ExperiencePage() {
    return (
        <main className="container section-padding" style={{ background: 'var(--bg-primary)' }}>
            <ScrollTimeline title="Internship Experience" items={experienceData} />
        </main>
    );
}
