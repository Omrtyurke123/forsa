import "./globals.css";
import { IBM_Plex_Sans_Arabic, Tajawal } from "next/font/google";
import ThemeToggle from "./ThemeToggle";

const display = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const body = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

export const metadata = {
  title: "فرصة — وظائف العمل الحر في مكان واحد",
  description:
    "وظائف البرمجة والتصميم من مستقل وخمسات ونفذلي، مرتبة ولحظية، في مكان واحد.",
  manifest: "/manifest.json",
  icons: { icon: "/icon-192.png", apple: "/icon-192.png" },
};

export const viewport = { themeColor: "#0A0C11" };

// يطبّق الثيم المحفوظ قبل أول رسم للصفحة، عشان ميحصلش وميض
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}else{document.documentElement.dataset.theme="dark"}}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-paper text-ink font-body min-h-screen">
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
