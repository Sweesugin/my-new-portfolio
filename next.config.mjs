import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: process.env.BUILD_DIR || ".next",
    webpack: (config, { isServer }) => {
        // Prevent bundlers from trying to resolve native 'canvas' on client
        if (!isServer) {
            config.resolve.fallback = {
                ...(config.resolve.fallback || {}),
                canvas: false,
            };
        }
        return config;
    },
};

export default nextConfig;
