"use client";

import React, { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function ProjectCaseStudyModal({ project, isOpen, onClose }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const showModal = isOpen !== undefined ? isOpen : !!project;
    const caseStudy = project?.caseStudy;

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Escape") onClose();
        },
        [onClose]
    );

    // Lock / unlock body scroll when modal opens / closes
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [showModal, handleKeyDown]);

    if (!showModal || !mounted) return null;

    const stages = [
        {
            title: "Challenge",
            text: caseStudy?.challenge || "Details not available.",
            colorClass: "text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-400/10 ring-1 ring-amber-500/20 dark:ring-amber-400/20",
            bulletColor: "bg-amber-500",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            )
        },
        {
            title: "Approach",
            text: caseStudy?.approach || "Details not available.",
            colorClass: "text-blue-600 dark:text-cyan-400 bg-blue-500/10 dark:bg-cyan-400/10 ring-1 ring-blue-500/20 dark:ring-cyan-400/20",
            bulletColor: "bg-blue-600 dark:bg-cyan-400",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            )
        },
        {
            title: "Outcome",
            text: caseStudy?.outcome || "Details not available.",
            colorClass: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-400/10 ring-1 ring-emerald-500/20 dark:ring-emerald-400/20",
            bulletColor: "bg-emerald-500",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { x: -24, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/75 backdrop-blur-md px-4 py-8"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-[36px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#070b1a]/95 text-slate-900 dark:text-white p-6 md:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.65)] animate-open"
                style={{ scrollbarWidth: "thin" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between gap-4 mb-6">
                    {/* Badge */}
                    <span className="inline-flex items-center rounded-full border border-blue-500/30 dark:border-cyan-500/30 bg-blue-500/10 dark:bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-600 dark:text-cyan-400">
                        Case Study
                    </span>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-950 dark:hover:text-white"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Title & Description */}
                <div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white leading-tight max-w-full break-words">
                        {caseStudy?.title || project?.title || "Project"}
                    </h2>

                    <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                        {caseStudy?.description || project?.desc || "Case study details for this project."}
                    </p>
                </div>

                {/* Divider */}
                <div className="my-6 h-px w-full bg-slate-200 dark:bg-white/10" />

                {/* Vertical Timeline */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative space-y-10"
                    style={{
                        marginLeft: "1.5rem",
                        paddingLeft: "2.25rem",
                        borderLeft: "2px solid var(--border-color, rgba(255,255,255,0.1))",
                    }}
                >
                    {stages.map((stage, idx) => (
                        <motion.div key={idx} variants={itemVariants} className="relative">
                            {/* Dot icon wrapper (Consistent 40px - 48px size) */}
                            <div
                                className="absolute flex items-center justify-center rounded-full bg-white dark:bg-[#070b1a] border border-slate-200 dark:border-white/10 shadow-sm ring-4 ring-white dark:ring-[#070b1a]"
                                style={{
                                    left: "-3.5rem", // Centered exactly on the 2px border (-2.25rem padding - 1.25rem radius)
                                    top: "6px",
                                    width: "2.5rem", // 40px
                                    height: "2.5rem", // 40px
                                    zIndex: 10,
                                }}
                            >
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${stage.colorClass}`}>
                                    {stage.icon}
                                </div>
                            </div>

                            {/* Stage Card */}
                            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] p-6 md:p-8 shadow-sm">
                                <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${stage.bulletColor}`} />
                                    {stage.title}
                                </h3>
                                <p className="text-sm md:text-base leading-7 text-slate-600 dark:text-slate-300 max-w-full">
                                    {stage.text}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>,
        document.body
    );
}