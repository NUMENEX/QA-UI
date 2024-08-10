// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D8B4FE", // Light purple
        secondary: "#F3E8FF", // Very light purple
        accent: "#A78BFA", // Darker purple for accents
        gray: {
          800: "#2D3748", // Dark gray for text
          900: "#1A202C", // Even darker gray for stronger contrast
        },
      },
    },
  },
  plugins: [],
};
