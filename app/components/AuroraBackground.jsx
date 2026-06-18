"use client";

import styles from "./AuroraBackground.module.css";

const AuroraBackground = () => (
    <div className={styles.wrap}>
        <div className={styles.base} />
        <div className={styles.band1} />
        <div className={styles.band2} />
        <div className={styles.band3} />
        <div className={styles.band4} />
        <div className={styles.shimmer} />
        <div className={styles.vignette} />
        <div className={styles.noise} />
    </div>
);

export default AuroraBackground;
