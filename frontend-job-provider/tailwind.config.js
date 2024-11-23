/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // Adjust based on your framework and project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8B5CF6",
          light: "#F1E6FF",
          dark: "#6D28D9",
        },
        secondary: {
          DEFAULT: "#34D399",
          light: "#ECFDF5",
          dark: "#10B981",
        },
      },
    },
  },
  plugins: [],
};
