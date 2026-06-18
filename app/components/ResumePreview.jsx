"use client";

import React, { useEffect, useRef, useState } from "react";

const PDF_PATH = "/resume.pdf";
const PDF_JS_SRC = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDF_WORKER_SRC = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

export default function ResumePreview() {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [timedOut, setTimedOut] = useState(false);
    const canvasRef = useRef(null);
    const loadedRef = useRef(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!loadedRef.current) setTimedOut(true);
        }, 6000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let cancelled = false;

        async function loadScript() {
            if (window.pdfjsLib) return window.pdfjsLib;

            await new Promise((resolve, reject) => {
                const existing = document.getElementById("pdfjs-browser-runtime");
                if (existing) {
                    existing.addEventListener("load", () => resolve(), { once: true });
                    existing.addEventListener("error", reject, { once: true });
                    return;
                }

                const script = document.createElement("script");
                script.id = "pdfjs-browser-runtime";
                script.src = PDF_JS_SRC;
                script.async = true;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error("Failed to load PDF.js runtime"));
                document.head.appendChild(script);
            });

            return window.pdfjsLib;
        }

        async function renderPdf() {
            try {
                const canvas = canvasRef.current;
                if (!canvas) return;

                const pdfjsLib = await loadScript();
                if (cancelled) return;

                pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC;

                const loadingTask = pdfjsLib.getDocument({
                    url: PDF_PATH,
                });

                const pdf = await loadingTask.promise;
                if (cancelled) return;

                const page = await pdf.getPage(1);
                if (cancelled) return;

                const containerWidth = canvas.parentElement?.clientWidth || 800;
                const viewport = page.getViewport({ scale: 1 });
                const scale = Math.min(containerWidth / viewport.width, 1.5);
                const scaledViewport = page.getViewport({ scale });

                const context = canvas.getContext("2d");
                if (!context) throw new Error("Canvas context unavailable");

                const outputScale = window.devicePixelRatio || 1;
                canvas.width = Math.floor(scaledViewport.width * outputScale);
                canvas.height = Math.floor(scaledViewport.height * outputScale);
                canvas.style.width = `${scaledViewport.width}px`;
                canvas.style.height = `${scaledViewport.height}px`;

                context.setTransform(outputScale, 0, 0, outputScale, 0, 0);
                await page.render({ canvasContext: context, viewport: scaledViewport }).promise;

                if (!cancelled) {
                    loadedRef.current = true;
                    setLoaded(true);
                }
            } catch (err) {
                if (!cancelled) setError(true);
            }
        }

        renderPdf();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div style={{ position: "relative", height: "100%", background: "#111216", overflow: "auto" }}>
            {(!loaded && !timedOut) && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", color: "var(--text-muted)", zIndex: 1 }}>
                    <i className="fas fa-spinner fa-spin" style={{ fontSize: "1.6rem", color: "var(--accent-primary)" }} />
                    <span>Loading preview…</span>
                </div>
            )}

            {(error || timedOut) && !loaded && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", color: "var(--text-muted)", zIndex: 1 }}>
                    <span>Preview unavailable.</span>
                </div>
            )}

            <canvas
                ref={canvasRef}
                aria-label="Resume preview"
                style={{ display: loaded && !error ? "block" : "none", margin: "0 auto" }}
            />

            <div style={{ position: "absolute", bottom: 12, right: 12 }}>
                <a href={PDF_PATH} download className="cta-button">Download PDF</a>
            </div>
        </div>
    );
}
