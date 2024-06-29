/** @type {import('next').NextConfig} */
import i18next from "./next-i18next.config.js"
const nextConfig = {
    i18n: i18next.i18n,
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};

export default nextConfig;
