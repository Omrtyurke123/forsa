export const metadata = {
  title: "من نحن | فرصة",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 leading-relaxed">
      <h1 className="font-display font-bold text-3xl mb-6">من نحن</h1>

      <p className="mb-4">
        <b>فرصة</b> منصة بتجمع فرص العمل الحر من أكبر مواقع الفريلانسنج
        العربية في مكان واحد، وبتوصّلها لك أول ما تتنشر، عشان توفر وقتك
        وتزود فرصتك في الحصول على مشاريع.
      </p>

      <p className="mb-4">
        بدل ما تفضل بتفتح أكتر من موقع كل شوية، فرصة بتجمعلك العروض من مستقل
        وخمسات ونفذلي وكفيل في مكان واحد، وبتبعتلك تحديث فوري لحظة نزول
        الطلب، عشان تكون من أول اللي يرد عليه.
      </p>

      <h2 className="font-bold text-xl mt-8 mb-3">إخلاء مسؤولية</h2>
      <p className="mb-4">
        فرصة منصة مستقلة غير تابعة رسميًا لمواقع مستقل أو خمسات أو نفذلي أو
        كفيل. دورنا هو تجميع العروض المنشورة علنًا على هذه المواقع وعرضها
        بشكل منظم لتسهيل الوصول إليها. أي تعامل أو اتفاق على مشروع يتم
        مباشرة بينك وبين الموقع الأصلي صاحب العرض.
      </p>

      <h2 className="font-bold text-xl mt-8 mb-3">تواصل معنا</h2>
      <p>
        لأي استفسار أو اقتراح، تقدر تتواصل معنا على{" "}
        <a href="mailto:forsa@forsa.com" className="text-teal font-bold">
          forsa@forsa.com
        </a>
        .
      </p>
    </main>
  );
}