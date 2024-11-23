/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,html}", // Adjust based on your framework and project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3575E2",
          light: "#3575E2",
          dark: "#6D28D9",
        },
        secondary: {
          DEFAULT: "#0D2550",
          light: "#0D2550",
          dark: "#10B981",
        },
        accent: {
          DEFAULT: "#F87171",
          light: "#F87171",
          dark: "#F59E0B",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
