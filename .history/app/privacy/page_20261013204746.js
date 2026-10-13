export const metadata = {
  title: "سياسة الخصوصية | فرصة",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 leading-relaxed">
      <h1 className="font-display font-bold text-3xl mb-2">سياسة الخصوصية</h1>
      <p className="text-sm text-ink/60 mb-8">آخر تحديث: [التاريخ]</p>

      <section className="mb-6">
        <h2 className="font-bold text-xl mb-3">1. البيانات اللي بنجمعها</h2>
        <ul className="list-disc pr-5 space-y-2">
          <li>بيانات الحساب: الاسم، البريد الإلكتروني، رقم الهاتف (إن وُجد).</li>
          <li>
            بيانات الدفع: صورة إيصال التحويل البنكي/المحفظة اللي بترفعها
            عند الاشتراك (بتُستخدم فقط للتحقق من عملية الدفع).
          </li>
          <li>بيانات الاستخدام الأساسية (تاريخ إنشاء الحساب، حالة الاشتراك).</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-xl mb-3">2. إزاي بنستخدم البيانات</h2>
        <p>
          بنستخدم بياناتك عشان ندير حسابك، نفعّل اشتراكك بعد التحقق من
          الدفع، ونتواصل معاك بخصوص حسابك لو احتاج الأمر. مش بنبيع أو نأجر
          بياناتك لأي طرف تالت.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-xl mb-3">3. تخزين البيانات</h2>
        <p>
          بياناتك متخزنة بشكل آمن عند مزود خدمة قواعد البيانات اللي بنستخدمه
          (Supabase)، وصور إيصالات الدفع متخزنة في مساحة تخزين خاصة مش متاحة
          إلا لفريق المراجعة.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-xl mb-3">4. ملفات تعريف الارتباط (Cookies)</h2>
        <p>
          بنستخدم كوكيز أساسية بس عشان تسجيل الدخول والحفاظ على جلستك فعّالة
          — مفيش كوكيز تتبّع أو إعلانات.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-xl mb-3">5. حقوقك</h2>
        <p>
          تقدر تطلب تعديل بياناتك أو حذف حسابك بالكامل في أي وقت عن طريق
          التواصل معانا على البريد الموضح تحت.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-xl mb-3">6. مدة الاحتفاظ بالبيانات</h2>
        <p>
          العروض المعروضة على المنصة بتتمسح تلقائيًا بعد يومين من نشرها.
          بيانات حسابك الشخصية بتفضل محفوظة طول ما حسابك فعّال، أو لحد ما
          تطلب حذفها.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-xl mb-3">7. تعديل السياسة</h2>
        <p>
          ممكن نحدّث سياسة الخصوصية دي من وقت لآخر، وهنوضح تاريخ آخر تحديث
          فوق الصفحة دايمًا.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-xl mb-3">8. التواصل</h2>
        <p>
          لأي سؤال بخصوص خصوصية بياناتك، راسلنا على{" "}
          <a href="mailto:forsa@forsa.com" className="text-teal font-bold">
            forsa@forsa.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}