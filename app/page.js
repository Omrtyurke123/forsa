import Link from "next/link";
import InstallButton from "./InstallButton";
import Logo from "./Logo";

const sections = [
  { name: "أقل عروض", desc: "المشاريع اللي عليها أقل منافسة، مرتبة عشان تلحق الفرصة قبل الزحمة.", color: "212 175 105", tag: "الأكثر طلبًا" },
  { name: "مستقل", desc: "مشاريع منصة مستقل أول ما تتنشر، من غير ما تفضل تعمل تحديث للصفحة.", color: "52 168 130" },
  { name: "خمسات", desc: "طلبات خمسات الجديدة لحظة بلحظة، مصنّفة حسب المجال.", color: "224 168 64" },
  { name: "نفذلي", desc: "مشاريع نفذلي في مكان واحد مع باقي المنصات، من غير تنقّل.", color: "92 140 230" },
  // { name: "جروبات تليجرام", desc: "جروبات خاصة للمشتركين بتوصلك فيها الفرص مباشرة على موبايلك.", color: "34 158 217", tag: "للمشتركين" },
];

const perks = [
  { t: "إشعار فوري", d: "الفرصة توصلك على تليجرام أول ما تتنشر." },
  { t: "جروب لكل منصة", d: "جروب لمستقل، وجروب لخمسات، وجروب لنفذلي، وجروب لأقل العروض." },
  { t: "جروبات خاصة", d: "الدخول للمشتركين بس، فمفيش زحمة ولا رسايل مالهاش لازمة." },
  { t: "قدّم قبل غيرك", d: "السرعة هي الفرق بين المشروع اللي تاخده والمشروع اللي يفوتك." },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* header */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-paper/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Logo />
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="px-3 py-2 text-sm text-muted transition hover:text-ink">
              تسجيل الدخول
            </Link>
            <Link href="/signup" className="btn-gold whitespace-nowrap !py-2 !px-4 text-sm">
              <span className="sm:hidden">جرّب مجانًا</span>
              <span className="hidden sm:inline">ابدأ تجربتك</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* hero */}
      <section className="relative mx-auto max-w-4xl px-5 pb-20 pt-20 text-center sm:pt-28">
        <div className="animate-rise">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-teal shadow-[0_0_10px_rgb(var(--teal))]" />
            تحديث مستمر لفرص العمل الحر
          </span>
        </div>
        <h1 className="animate-rise mt-7 text-4xl font-bold leading-[1.35] sm:text-6xl sm:leading-[1.3] [animation-delay:.08s]">
          كل فرص العمل الحر العربية
          <br />
          في مكان واحد، <span className="gold-text">قبل ما حد تاني يشوفها.</span>
        </h1>
        <p className="animate-rise mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted [animation-delay:.16s]">
          فرصة بتجمعلك مشاريع مستقل وخمسات ونفذلي أول ما تتنشر، وبترتب لك الأقل
          منافسة منها، عشان تقدّم بسرعة وتكسب أكتر.
        </p>
        <div className="animate-rise mt-10 flex flex-wrap items-center justify-center gap-3 [animation-delay:.24s]">
          <Link href="/signup" className="btn-gold text-base">
           ابدء التجربة
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
          <InstallButton />
        </div>
        {/* <p className="mt-5 text-sm text-muted">من غير بطاقة ائتمان • بعدها 49 جنيه في الشهر</p> */}

        {/* stat strip */}
        <div className="glass animate-rise mx-auto mt-16 grid max-w-2xl grid-cols-3 divide-x divide-x-reverse divide-white/10 rounded-2xl py-5 [animation-delay:.32s]">
          {[
            ["5", "منصات في مكان واحد"],
            ["شغل مستمر", "اكتر من 20 عرض ف الساعة"],
            ["اكبر المنصات ", "عروض مجمعة"],
          ].map(([n, l]) => (
            <div key={l} className="px-3">
              <div className="gold-text font-display text-2xl font-bold sm:text-3xl">{n}</div>
              <div className="mt-1 text-xs text-muted sm:text-sm">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-gold mx-auto max-w-4xl" />

      {/* platform sections */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="mb-12 text-center">
          <span className="eyebrow">تفاصيل المنصة</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">كل اللي محتاجه، مترتب لك</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {sections.map((s, i) => (
            <article key={s.name} className={`glass glass-hover group relative overflow-hidden rounded-2xl p-6 ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}>
              <div
                className="pointer-events-none absolute -top-16 -left-16 h-44 w-44 rounded-full opacity-25 blur-3xl transition group-hover:opacity-50"
                style={{ background: `rgb(${s.color})` }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl font-display text-lg font-bold"
                    style={{ background: `rgb(${s.color} / 0.15)`, color: `rgb(${s.color})`, border: `1px solid rgb(${s.color} / 0.35)` }}
                  >
                    {s.name[0]}
                  </span>
                  {s.tag && <span className="eyebrow !py-0.5 !text-xs">{s.tag}</span>}
                </div>
                <h3 className="mt-5 text-xl font-bold">{s.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* telegram perks */}
      {/* <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#229ED9]/20 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <span className="eyebrow">جروبات تليجرام</span>
              <h2 className="mt-4 text-3xl font-bold leading-snug sm:text-4xl">
                الفرصة بتوصلك <span className="gold-text">لحد عندك</span>
              </h2>
              <p className="mt-4 leading-8 text-muted">
                أول ما تشترك، بتقدر تنضم لجروبات تليجرام الخاصة بالمشتركين وتستقبل
                المشاريع الجديدة على موبايلك مباشرة.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {perks.map((p) => (
                <li key={p.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-center gap-2 font-display font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {p.t}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-muted">{p.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section> */}

      {/* final cta */}
      <section className="mx-auto max-w-3xl px-5 pb-28 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">جاهز تسبق منافسينك؟</h2>
        <p className="mt-4 text-muted">ابدأ تجربتك المجانية دلوقتي، وشوف الفرق من أول يوم.</p>
        <Link href="/signup" className="btn-gold mt-8 text-base">جرّب مجانًا </Link>
      </section>

      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-center text-sm text-muted sm:flex-row sm:text-right">
          <p>فرصة — منصة غير رسمية، بتجمّع وتعرض إعلانات منشورة على منصات العمل الحر العامة.</p>
          <div className="flex gap-5">
            <Link href="/terms" className="hover:text-ink">الشروط</Link>
            <Link href="/privacy" className="hover:text-ink">الخصوصية</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
