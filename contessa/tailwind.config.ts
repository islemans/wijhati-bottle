import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.css",
  ],
  theme: {
    extend: {
      // Brand tokens are resolved at runtime via CSS variables — these
      // Tailwind aliases let you write `bg-brand-primary` in JSX while
      // the actual value comes from `var(--brand-primary)` set by the
      // Theme Engine, so the admin can change colors without redeploying.
      colors: {
        brand: {
          background: "var(--brand-background)",
          surface: "var(--brand-surface)",
          primary: "var(--brand-primary)",
          gold: "var(--brand-gold)",
          foreground: "var(--brand-foreground)",
          muted: "var(--brand-muted)",
          border: "var(--brand-border)",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        "card-hover": "var(--shadow-card-hover)",
        "menu-float": "var(--shadow-menu-float)",
        "button-glow": "var(--shadow-button-glow)",
      },
    },
  },
  plugins: [],
};

export default config;
