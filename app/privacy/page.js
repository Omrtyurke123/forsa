import Link from "next/link";
import Logo from "../Logo";

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <Logo />
      <h1 className="mt-10 text-3xl font-bold">الخصوصية</h1>
      <div className="glass mt-6 rounded-2xl p-6 leading-8 text-muted">
        اكتب هنا نص صفحة الخصوصية الخاص بالمنصة (استبدل هذا النص بنصك الحالي).
      </div>
      <Link href="/" className="mt-6 inline-block text-gold hover:underline">رجوع للرئيسية</Link>
    </main>
  );
}
