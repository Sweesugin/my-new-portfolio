"use client";

import styles from "./SideSocialBar.module.css";

export default function SideSocialBar() {
    const socialLinks = [
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/sweetha-muniraj/",
            icon: "fab fa-linkedin-in",
        },
        {
            name: "GitHub",
            url: "https://github.com/Sweesugin",
            icon: "fab fa-github",
        },
        {
            name: "Email",
            url: "mailto:sweesugin2118@gmail.com",
            icon: "fas fa-envelope",
        },
    ];

    return (
        <div className={styles.sideBarContainer}>
            {socialLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.url}
                    target={link.name === "Email" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={link.name}
                >
                    <i className={link.icon}></i>
                </a>
            ))}
        </div>
    );
}
