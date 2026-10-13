-- ============================================================
-- فرصة (Forsa) — قاعدة بيانات المنصة
-- نفذ الملف ده كامل في Supabase: SQL Editor → New query → Run
-- ============================================================

-- ---------- 1) الملفات الشخصية (مرتبطة بمستخدمي Supabase Auth) ----------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  is_admin boolean not null default false,
  trial_started_at timestamptz not null default now(),
  trial_days int not null default 3,
  subscription_active boolean not null default false,
  subscription_expires_at timestamptz,
  created_at timestamptz not null default now()
);

-- إنشاء صف profile تلقائي عند تسجيل مستخدم جديد
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'phone');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ---------- 2) المشاريع/الوظائف ----------
-- feed_type: 'low_offers'  → قسم "أقل عروض" (من البوت الرئيسي، مستقل+نفذلي+كفيل)
--            'instant'     → الأقسام الفورية (مستقل/خمسات/نفذلي لحظة بلحظة)
create table if not exists jobs (
  id bigserial primary key,
  feed_type text not null check (feed_type in ('low_offers', 'instant')),
  source text not null,              -- مستقل / خمسات / نفذلي / كفيل
  title text,
  description text,
  budget text,
  offers_count int,                  -- بيتسجل بس في low_offers
  raw_text text,                     -- النص الكامل (للأقسام الفورية)
  url text,
  posted_label text,                 -- "منذ 3 ساعات" .. كما جاية من المصدر
  external_id text,                  -- معرف فريد من المصدر لمنع التكرار
  created_at timestamptz not null default now(),
  unique (feed_type, source, external_id)
);

create index if not exists jobs_feed_type_created_idx
  on jobs (feed_type, created_at desc);

-- ---------- 3) خطط الاشتراك ----------
create table if not exists plans (
  id bigserial primary key,
  name text not null,
  price_egp numeric not null,
  duration_days int not null,
  is_active boolean not null default true
);

insert into plans (name, price_egp, duration_days)
select 'شهري', 99, 30
where not exists (select 1 from plans);

-- ---------- 4) طلبات الدفع اليدوي ----------
create table if not exists payments (
  id bigserial primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  plan_id bigint references plans(id),
  method text not null check (method in ('vodafone_cash', 'instapay')),
  sender_phone text,
  transaction_ref text,
  proof_path text,                   -- مسار الصورة في Supabase Storage
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_by uuid references profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- 5) تفعيل RLS ----------
alter table profiles enable row level security;
alter table jobs enable row level security;
alter table plans enable row level security;
alter table payments enable row level security;

-- profiles: كل مستخدم يشوف ويعدّل بياناته بس
drop policy if exists "profiles_select_own" on profiles;
create policy "profiles_select_own" on profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on profiles;
create policy "profiles_update_own" on profiles
  for update using (auth.uid() = id);

-- jobs: أي مستخدم مسجّل دخول يقدر يقرا (الحجب الفعلي بيحصل في الـ API حسب الاشتراك)
drop policy if exists "jobs_select_authenticated" on jobs;
create policy "jobs_select_authenticated" on jobs
  for select using (auth.role() = 'authenticated');

-- plans: الكل يشوفها
drop policy if exists "plans_select_all" on plans;
create policy "plans_select_all" on plans
  for select using (true);

-- payments: المستخدم يشوف ويضيف طلباته بس
drop policy if exists "payments_select_own" on payments;
create policy "payments_select_own" on payments
  for select using (auth.uid() = user_id);

drop policy if exists "payments_insert_own" on payments;
create policy "payments_insert_own" on payments
  for insert with check (auth.uid() = user_id);

-- ملاحظة: كتابة jobs وقراءة/تعديل كل الـ payments (للأدمن) بتتم من السيرفر
-- باستخدام مفتاح service_role، اللي بيتخطى RLS بالكامل. متستخدمش المفتاح
-- ده غير في كود السيرفر (API routes) وأبدًا في كود المتصفح.
