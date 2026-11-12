/** @type {import('tailwindcss').Config} */
const c = (v) => `rgb(var(--${v}) / <alpha-value>)`;

module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: c("ink"),       // النص الأساسي (فاتح)
        paper: c("paper"),   // الخلفية (غامقة)
        panel: c("panel"),   // الكروت
        line: c("line"),     // الحدود
        muted: c("muted"),   // النص الثانوي
        gold: c("gold"),
        teal: c("teal"),
        danger: c("danger"),
        mostaql: c("mostaql"),
        khamsat: c("khamsat"),
        nafezly: c("nafezly"),
        kafiil: c("kafiil"),
        veil: c("veil"),
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        sm: "0.625rem",
        DEFAULT: "0.75rem",
        md: "0.875rem",
        lg: "1.125rem",
        xl: "1.5rem",
        "2xl": "1.75rem",
      },
      boxShadow: {
        gold: "0 10px 40px -10px rgb(212 175 105 / 0.45)",
        card: "0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 20px 50px -30px rgb(0 0 0 / 0.9)",
      },
      keyframes: {
        rise: { from: { opacity: 0, transform: "translateY(14px)" }, to: { opacity: 1, transform: "none" } },
        shimmer: { "100%": { transform: "translateX(-100%)" } },
      },
      animation: {
        rise: "rise .7s cubic-bezier(.2,.7,.2,1) both",
      },
    },
  },
  plugins: [],
};
