"use client";

import { useEffect, useState } from "react";

export default function InstallButton() {
  const [prompt, setPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const ua = window.navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua));

    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleClick() {
    if (prompt) {
      prompt.prompt();
      await prompt.userChoice;
      setPrompt(null);
      return;
    }
    if (isIOS) {
      alert("لإضافة التطبيق: دوس زرار المشاركة ⬆️ تحت، واختار \"Add to Home Screen\".");
    }
  }

  if (!prompt && !isIOS) return null; // الموقع أصلًا متثبت أو مش مدعوم

  return (
    <button
      onClick={handleClick}
      className="bg-ink text-paper text-sm font-bold px-6 py- rounded-sm hover:bg-teal transition"
    >text-ink font-bold px-6 py-3
      تحميل التطبيق
    </button>
  );
}