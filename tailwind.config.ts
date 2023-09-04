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
        // Theme Colors
        primary: "var(--primary)",
        secondary: "rgb(var(--secondary)",
        "primary-text": "var(--primary-text)",
        "secondary-text": "var(--secondary-text)",
        "primary-bg": "var(--primary-bg)",
        "secondary-bg": "var(--secondary-bg)",
      },
    },
  },
  plugins: [],
};
export default config;
