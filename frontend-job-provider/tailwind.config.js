/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,html}", // Adjust based on your framework and project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        custom: ["Raleway", "sans-serif"],
      },
      fontWeight: {
        "extra-extrabold": "1000",
      },
      colors: {
        primary: {
          DEFAULT: "#3575E2", // Main primary color
          light: "#74A9F7", // Lighter shade of primary
          dark: "#2A5DB7", // Darker shade of primary
        },
        secondary: {
          DEFAULT: "#0D2550", // Main secondary color
          light: "#3B4F71", // Lighter shade of secondary
          dark: "#091A38", // Darker shade of secondary
        },
        accent: {
          DEFAULT: "#20242C", // Main accent color
          light: "#40454F", // Lighter shade of accent
          dark: "#101217", // Darker shade of accent
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
