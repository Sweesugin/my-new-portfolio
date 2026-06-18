"use client";

import { ThemeProvider } from "../context/ThemeContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LightSplineBackground from "./LightSplineBackground";
import SideSocialBar from "./SideSocialBar";
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(() => import("./ParticlesBackground"), {
    ssr: false,
    loading: () => null,
});

const SparkleTrail = dynamic(() => import("./SparkleTrail"), {
    ssr: false,
    loading: () => null,
});

export default function ClientLayout({ children }) {
    return (
        <ThemeProvider>
            <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
    );
}

function LayoutContent({ children }) {
    return (
        <>
            <ParticlesBackground />
            <LightSplineBackground />
            <SparkleTrail />
            <SideSocialBar />
            <Navbar />
            {children}
            <Footer />
        </>
    );
}