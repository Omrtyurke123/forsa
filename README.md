# فرصة — النسخة الجديدة (تصميم فخم)

مشروع مستقل بالكامل، مش محتاج تركّبه على القديم.

1. فك الضغط في أي فولدر جديد.
2. انسخ `.env.example` لـ `.env.local` وحط قيم Supabase (نفس قيم مشروعك القديم).
3. في الترمنال:
   npm install
   npm run dev -- -p 3001
4. افتح http://localhost:3001

قبل النشر عدّل:
- app/dashboard/page.js  ← روابط جروبات تليجرام (REPLACE_ME)
- app/subscribe/page.js  ← رقم التحويل (TRANSFER_NUMBER)
- app/terms و app/privacy ← نصوص الصفحات
