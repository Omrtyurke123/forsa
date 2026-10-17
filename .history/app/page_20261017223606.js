import Link from "next/link";
import InstallButton from "./InstallButton";

const sections = [
  {
    name: "أقل عروض",
    desc: "مشاريع من مستقل ونفذلي وكفيل، مرتبة حسب أقل عدد مقدمين — أعلى فرصة للفوز.",
    color: "bg-ink",
  },
  { name: "مستقل", desc: "كل مشروع جديد يُنشر، لحظة بلحظة.", color: "bg-mostaql" },
  { name: "خمسات", desc: "كل طلب جديد يُنشر، لحظة بلحظة.", color: "bg-khamsat" },
  { name: "نفذلي", desc: "كل مشروع جديد يُنشر، لحظة بلحظة.", color: "bg-nafezly" }
  // {
  //   name: "جروبات تليجرام",
  //   desc: "للوظائف بتوصلك اشعارات من خلال انضمامك في مجموعات تلجرام",
  //   color: "bg-[#229ED9]",
  // },
];

export default function Home() {
  return (
    <main>
      <header className="flex items-center justify-between max-w-5xl mx-auto px-6 py-6">
        <span className="font-display font-bold text-xl">فرصة</span>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/login" className="text-muted hover:text-ink">
            تسجيل الدخول
          </Link>
          <Link
            href="/signup"
            className="bg-ink text-paper px-4 py-2 rounded-sm hover:bg-teal transition-colors"
          >
            ابدأ تجربتك المجانية
          </Link>
        </nav>
      </header>

      <section className="max-w-5xl mx-auto px-6 pt-10 pb-16">
        <h1 className="font-display font-bold text-4xl md:text-5xl leading-[1.3] max-w-2xl">
          كل فرص العمل الحر في مكان واحد، قبل ما حد تاني يشوفها.
        </h1>
        <p className="mt-5 text-lg text-muted max-w-xl leading-relaxed">
          فرصة بتجمعلك مشاريع مستقل وخمسات ونفذلي أول ما تتنشر، وبترتب لك
          الأقل منافسة منها، عشان تقدّم بسرعة وتكسب أكتر.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <Link
            href="/signup"
            className="inline-block bg-gold text-ink font-bold px-6 py-3 rounded-sm hover:brightness-95 transition"
          >
            جرّب مجانًا 
          </Link>
          <InstallButton />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-line border border-line rounded-sm overflow-hidden">
          {sections.map((s) => (
            <div key={s.name} className="bg-panel p-5">
              <span className={`inline-block w-2 h-2 rounded-full ${s.color} mb-3`} />
              <h3 className="font-bold mb-1">{s.name}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="max-w-5xl mx-auto px-6 py-8 text-sm text-muted border-t border-line">
        فرصة — منصة غير رسمية، بتجمّع وتعرض إعلانات منشورة على منصات العمل
        الحر العامة.
        <p className="text-xs text-ink/50 mt-6 text-center">
          باستخدامك المنصة أو اشتراكك، إنت موافق على{" "}
          <a href="/terms" className="text-teal underline">شروط الاستخدام</a>{" "}
          و{" "}
          <a href="/privacy" className="text-teal underline">سياسة الخصوصية</a>.
        </p>
      </footer>
    </main>
  );
}