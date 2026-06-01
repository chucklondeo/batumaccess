import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        void: "#04070f",
        obsidian: "#07111f",
        glass: "rgba(255,255,255,0.08)",
        water: "#16b8d9",
        wood: "#2fbf8f",
        gold: "#f3d37a",
        fire: "#d86b3d",
        steel: "#8ea4bf",
        silver: "#dce7f3",
        pearl: "#f8fbff"
      },
      boxShadow: {
        glow: "0 0 48px rgba(22, 184, 217, 0.26)",
        gold: "0 0 38px rgba(243, 211, 122, 0.22)"
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(circle at center, rgba(22,184,217,0.15), transparent 32rem)",
        "glass-line": "linear-gradient(120deg, rgba(255,255,255,0.2), rgba(255,255,255,0.02))"
      }
    }
  },
  plugins: []
};

export default config;
