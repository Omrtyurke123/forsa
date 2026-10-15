"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "simple", toggle: () => {} });

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("simple");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("forsa-dashboard-theme");
      if (saved === "aurora") setTheme("aurora");
    } catch {
      // متصفح رافض localStorage (وضع خاص مثلاً) — نسيب simple
    }
  }, []);

  function toggle() {
    setTheme((current) => {
      const next = current === "aurora" ? "simple" : "aurora";
      try {
        localStorage.setItem("forsa-dashboard-theme", next);
      } catch {}
      return next;
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div data-theme={theme} className="dashboard-theme-root">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function ThemeToggleButton() {
  const { theme, toggle } = useContext(ThemeContext);

  return (
    <button
      onClick={toggle}
      className="theme-toggle-btn text-xs font-bold px-3 py-1.5 rounded-full border border-line hover:border-ink transition"
    >
      {theme === "aurora" ? "✨ them" : "simple"}
    </button>
  );
}