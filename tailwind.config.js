/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#152027",
        paper: "#F4F6F5",
        panel: "#FFFFFF",
        gold: "#C98A2C",
        teal: "#0B6E6E",
        line: "#DDE3E1",
        muted: "#5B6B68",
        danger: "#B3432B",
        mostaql: "#2F6F5E",
        khamsat: "#C98A2C",
        nafezly: "#2B5FA8",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
