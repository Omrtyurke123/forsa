# فرصة — منصة وظائف العمل الحر

منصة بتجمّع وتعرض مشاريع مستقل وخمسات ونفذلي، مع نظام اشتراكات
ودفع يدوي (فودافون كاش / انستاباي).

## 1) إعداد Supabase

1. اعمل حساب على supabase.com وأنشئ مشروع جديد (اختار منطقة قريبة، زي Frankfurt).
2. من SQL Editor، افتح `supabase/schema.sql` اللي في المشروع ده، انسخ محتواه كامل، الصقه، واضغط Run.
3. من Storage، اعمل Bucket جديد اسمه بالظبط `payment-proofs`، واخليه **Private** (مش Public).
4. من Authentication → Providers، تأكد إن Email مفعّل (مفعّل بالديفولت).
5. من Authentication → Settings، ممكن توقف "Confirm email" مؤقتًا عشان
   المستخدم يقدر يدخل على طول بعد التسجيل من غير تأكيد إيميل، أو تسيبها
   شغالة لو عايز تأكيد إيميل حقيقي.
6. من Project Settings → API، هتلاقي 3 قيم محتاجها بعدين:
   - Project URL
   - anon public key
   - service_role key (سري جدًا)

## 2) أول أدمن

بعد ما تسجّل حساب لنفسك على المنصة (من /signup)، روح لـ Supabase →
Table Editor → profiles، دوّر على صفك، وغيّر `is_admin` لـ `true`.
كده تقدر تدخل على `/admin`.

## 3) تشغيل المشروع محليًا (اختياري، للتجربة قبل النشر)

```bash
npm install
cp .env.example .env.local   # واملأ القيم من supabase
npm run dev
```

## 4) النشر على Vercel

1. ارفع فولدر المشروع ده كريبو جديد على GitHub (منفصل عن ريبو البوت).
2. من vercel.com، اعمل New Project واختار الريبو ده.
3. في Environment Variables ضيف:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. اضغط Deploy. هتاخد رابط زي `forsa.vercel.app` (وتقدر تربط دومين خاص بعدين).

## 5) ربط البوت بالمنصة

في ريبو البوت (mostaql_bot)، ضيف Secret جديدين:
- `SUPABASE_URL` (نفس Project URL)
- `SUPABASE_SERVICE_ROLE_KEY` (نفس المفتاح السري)

وضيفهم في الـ `env:` بتاعة الخطوتين "Run bot" و"Run forwarder" في ملفات
الـ workflow (موجودين كمثال محتاجين تضافهم زي باقي الأسرار). بعدها كل
جولة بحث وكل رسالة فورية هتتكتب في المنصة تلقائي.

## ملاحظات مهمة

- `SUPABASE_SERVICE_ROLE_KEY` مفتاح خطير جدًا — بيتخطى كل الحماية.
  موجود في كود السيرفر بس (API routes) وفي GitHub Secrets، وأبدًا
  في كود المتصفح أو أي مكان عام.
- التجربة المجانية مضبوطة 3 أيام من تاريخ التسجيل (`trial_days` في جدول
  `profiles`)، وتقدر تغيّرها لكل مستخدم من Table Editor لو حبيت.
- السعر الحالي 99 جنيه/شهر (جدول `plans`) — عدّله من Table Editor
  أو من Supabase SQL Editor.
- دي أول نسخة (MVP). التصميم بسيط ومرتب بس مفيهوش كل التفاصيل
  (مفيش استرجاع كلمة مرور، مفيش إشعارات إيميل عند التفعيل، إلخ) —
  نقدر نضيفهم خطوة خطوة.
