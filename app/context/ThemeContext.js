"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Always start "dark" — matches server render, prevents hydration mismatch
    const [theme, setTheme] = useState("dark");

    // After mount: read saved preference and apply it
    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") {
            setTheme(saved);
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        const isDark = theme === "dark";

        root.setAttribute("data-theme", theme);
        root.classList.toggle("dark", isDark);
        root.classList.toggle("light", !isDark);
        root.style.backgroundColor = isDark ? "#020617" : "#f0f6ff";
        document.body.style.backgroundColor = root.style.backgroundColor;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
