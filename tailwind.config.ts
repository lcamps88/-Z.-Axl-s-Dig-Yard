import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette from the design
        "sky-mist": "#C8DFF0",       // light blue section bg
        "sky-deep": "#A3C4DC",       // darker blue accent
        "forest": "#4A7C59",         // primary green (nav, buttons)
        "forest-dark": "#3A6347",    // dark green hover
        "forest-light": "#EAF4EC",   // light green tint
        "gold": "#F5C842",           // yellow accent / script color
        "gold-dark": "#D4A520",      // dark gold
        "gold-light": "#FDF3CC",     // light gold bg
        "sand-warm": "#F4A261",      // orange card accent
        "coral": "#E8896A",          // coral accent
        "nav-gold": "#F1C872",       // navbar pill background
        "nav-text": "#4B4B4B",       // navbar text/icon color
        "lavender": "#C4B5ED",       // hero secondary button
        "dusk": "#1E2D40",           // dark navy text
        "dusk-soft": "#3D5166",      // medium navy
        "mist": "#F0F5F9",           // near-white bg
        "white-pure": "#FFFFFF",
        "light-blue": "#446C9E",
        // Legacy support
        cream: "#FAF6F0",
        "cream-dark": "#F0EAE0",
        earth: "#4A7C59",
        "earth-dark": "#3A6347",
        charcoal: "#1E2D40",
        "warm-gray": "#5A6A7A",
        "mid-gray": "#8A9AAA",
        "light-gray": "#D8E4EC",
      },
      fontFamily: {
        display: ["var(--font-display)", "Poppins", "sans-serif"],
        body: ["var(--font-body)", "Nunito", "sans-serif"],
        script: ["var(--font-script)", "Pacifico", "cursive"],
        quicksand: ["Quicksand", "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(74, 124, 89, 0.12)",
        card: "0 2px 16px rgba(30, 45, 64, 0.08)",
        "card-hover": "0 8px 32px rgba(30, 45, 64, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
