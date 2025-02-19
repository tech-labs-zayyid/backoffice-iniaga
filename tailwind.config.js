/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tussock: {
          50: "#f9f6ed",
          100: "#f1ead0",
          200: "#e4d4a4",
          300: "#d4b770",
          400: "#c59b46",
          500: "#b7893b",
          600: "#9d6c31",
          700: "#7e512a",
          800: "#6a4329",
          900: "#5b3928",
          950: "#341e14",
        },
      },
    },
  },
  plugins: [],
  media: false,
  darkMode: "class",
};
