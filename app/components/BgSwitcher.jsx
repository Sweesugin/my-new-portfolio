"use client";

import { useTheme } from "../context/ThemeContext";
import styles from "./BgSwitcher.module.css";

const LABELS = ["Orbs", "Aurora", "Stars"];

const BgSwitcher = ({ current, onChange }) => {
    const { theme } = useTheme();
    // Hidden — switcher removed from UI
    return null;
};

export default BgSwitcher;
