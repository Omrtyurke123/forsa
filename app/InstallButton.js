"use client";
import { useEffect, useState } from "react";

export default function InstallButton({ className = "btn-ghost" }) {
  const [prompt, setPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    setIsIOS(/iphone|ipad|ipod/i.test(navigator.userAgent));
    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!prompt && !isIOS) return null;

  async function install() {
    if (prompt) {
      prompt.prompt();
      await prompt.userChoice;
      setPrompt(null);
    } else {
      alert("على الآيفون: اضغط زر المشاركة ثم «إضافة إلى الشاشة الرئيسية».");
    }
  }

  return (
    <button onClick={install} className={className}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" /></svg>
      تحميل التطبيق
    </button>
  );
}
