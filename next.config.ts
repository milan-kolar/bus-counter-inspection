import type { NextConfig } from "next";

// Inicializace PWA wrapperu
// Používáme require, protože next-pwa nemá oficiální TS typy
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Vypnout PWA při vývoji
});

const nextConfig: NextConfig = {
  output: "export", // Nutné pro statický build
  images: {
    unoptimized: true, // Nutné pro export obrázků bez serveru
  },
};

// Obalení konfigurace PWA wrapperem
export default withPWA(nextConfig);