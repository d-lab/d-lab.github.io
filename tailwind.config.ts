import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted-foreground)",
        "surface-muted": "var(--surface-muted)",
        "surface-raised": "var(--surface-raised)",
        "surface-tint": "var(--surface-tint)",
        border: "var(--border-subtle)",
        "border-strong": "var(--border-strong)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        brand: "var(--brand)",
        "brand-foreground": "var(--brand-foreground)",
        "brand-muted": "var(--brand-muted)",
        "brand-border": "var(--brand-border)",
        gold: "var(--gold)",
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-inconsolata)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 18px 40px -24px var(--card-shadow)',
      },
      maxWidth: {
        reading: '46rem',
        frame: '72rem',
      },
    },
  },
  plugins: [
    typography
  ],
  darkMode: 'class',
};
export default config;
