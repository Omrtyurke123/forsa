import "./globals.css";
import { IBM_Plex_Sans_Arabic, Tajawal } from "next/font/google";

const display = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["600", "700"],
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
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
};

export const viewport = {
  themeColor: "#111111",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={`${display.variable} ${body.variable}`}>
      <body className="bg-paper text-ink font-body">{children}</body>
    </html>
  );
}