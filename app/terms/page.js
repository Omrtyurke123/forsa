export const metadata = {
  title: "شروط الاستخدام | فرصة",
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 leading-relaxed">
      <h1 className="font-display font-bold text-3xl mb-2">شروط الاستخدام</h1>
      <p className="text-sm text-ink/60 mb-8">آخر تحديث: [التاريخ]</p>

      <section className="mb-6">
        <h2 className="font-bold text-xl mb-3">1. طبيعة الخدمة</h2>
        <p>
          فرصة منصة تجمّع وتعرض فرص عمل حر منشورة علنًا على مواقع ومنصات
          تليجرام عامة (مثل مستقل، خمسات، نفذلي، كفيل). المنصة لا تنشر هذه
          الفرص ولا تملكها ولا تضمن دقتها أو استمرار توفرها.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-xl mb-3">2. إنشاء الحساب</h2>
        <p>
          لازم تنشئ حساب بإيميل صحيح عشان تستخدم المنصة. انت مسؤول عن سرية
          بيانات دخولك وعن أي نشاط يحصل من خلال حسابك.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-xl mb-3">3. التجربة المجانية</h2>
        <p>
          كل حساب جديد بيحصل على فترة تجربة مجانية (3 أيام) للوصول الكامل
          للمنصة. بعد انتهاء الفترة، الوصول الكامل بيتطلب اشتراك مدفوع.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-xl mb-3">4. الاشتراك والدفع</h2>
        <ul className="list-disc pr-5 space-y-2">
          <li>الاشتراك شهري، ويتجدد يدويًا — مفيش خصم تلقائي من حسابك.</li>
          <li>
            الدفع بيتم عن طريق تحويل يدوي (فودافون كاش / InstaPay) على الرقم
            الموضح في صفحة الاشتراك.
          </li>
          <li>
            بعد التحويل، بترفع صورة الإيصال، وفريق فرصة بيراجع الطلب ويفعّل
            اشتراكك خلال 24 ساعة.
          </li>
          <li>
            في نهاية مدة الاشتراك (شهر من تاريخ التفعيل)، الوصول الكامل
            بيتوقف تلقائيًا لحد ما تجدد الاشتراك بنفس الطريقة.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-xl mb-3">5. سياسة الاسترجاع</h2>
        <p>
          المبالغ المدفوعة غير قابلة للاسترجاع بعد تفعيل الاشتراك.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-xl mb-3">6. الاستخدام المقبول</h2>
        <p>
          ممنوع استخدام المنصة لأي غرض غير قانوني، أو محاولة الوصول لبيانات
          مستخدمين آخرين، أو إعادة نشر محتوى المنصة تجاريًا بدون إذن.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-xl mb-3">7. حدود المسؤولية</h2>
        <p>
          فرصة مش مسؤولة عن دقة أو صحة أو جودة العروض المعروضة، ولا عن أي
          تعامل أو خلاف ينشأ بينك وبين صاحب العرض الأصلي أو الموقع المصدر.
          استخدامك للمنصة على مسؤوليتك الشخصية.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-xl mb-3">8. تعديل الشروط</h2>
        <p>
          ممكن نعدّل الشروط دي من وقت لآخر. استمرارك في استخدام المنصة بعد
          أي تعديل يعتبر موافقة على الشروط الجديدة.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-xl mb-3">9. التواصل</h2>
        <p>
          لأي استفسار بخصوص الشروط دي، تواصل معنا على{" "}
          <a href="mailto:forsa@forsa.com" className="text-teal font-bold">
            forsa@forsa.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}