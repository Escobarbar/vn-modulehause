import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "static.tildacdn.net",
      },
      {
        protocol: "https",
        hostname: "thb.tildacdn.net",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/datenschutzrichtlinie",
        destination: "/datenschutz",
        permanent: true,
      },
      {
        source: "/datenschutzerklrung",
        destination: "/datenschutz",
        permanent: true,
      },
      {
        source: "/modell/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/lando-kerafront",
        destination: "/lando",
        permanent: true,
      },
      {
        source: "/hafen-kerafront-klickfalz",
        destination: "/hafen",
        permanent: true,
      },
      {
        source: "/anker-putz",
        destination: "/anker",
        permanent: true,
      },
      {
        source: "/flexibel-individuell",
        destination: "/kollektion",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
