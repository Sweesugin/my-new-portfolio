"use client";

import { certificationsData } from "@/utils/data/certifications-data";
import useScrollReveal from "@/utils/hooks/useScrollReveal";
import Image from "next/image";

export default function Certifications() {
    const containerRef = useScrollReveal(0.2);

    return (
        <section className="py-20" ref={containerRef}>
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">
                    Professional <span className="text-blue-600 dark:text-cyan-400">Certifications</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificationsData.map((cert, i) => (
                        <div key={i} className="fromLeft" style={{ transitionDelay: `${i * 0.08}s` }}>
                            <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 shadow-lg hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Brand-colored logo panel remains colorful in both themes */}
                                <div className={`h-56 w-full flex items-center justify-center p-10 ${cert.bgColor}`}>
                                    <Image
                                        src={cert.logoUrl}
                                        alt={cert.title}
                                        width={160}
                                        height={96}
                                        unoptimized
                                        className="max-h-24 max-w-[70%] object-contain"
                                    />
                                </div>

                                <div className="p-6 min-h-[140px] flex flex-col justify-between flex-grow bg-white dark:bg-slate-950">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                                        {cert.title}
                                    </h3>
                                    <p className="mt-4 text-slate-600 dark:text-slate-400">
                                        — {cert.issuer}
                                    </p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
