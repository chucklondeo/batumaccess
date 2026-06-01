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
        water: "#22d3ee",
        wood: "#34d399",
        gold: "#f6c85f",
        fire: "#ff7a3d",
        steel: "#8ea4bf"
      },
      boxShadow: {
        glow: "0 0 48px rgba(34, 211, 238, 0.28)",
        gold: "0 0 38px rgba(246, 200, 95, 0.22)"
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(circle at center, rgba(34,211,238,0.15), transparent 32rem)",
        "glass-line": "linear-gradient(120deg, rgba(255,255,255,0.2), rgba(255,255,255,0.02))"
      }
    }
  },
  plugins: []
};

export default config;

