import Link from "next/link";

export default function Logo({ href = "/" }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 group">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#f3dca3] via-[#d4af69] to-[#a87a32] text-paper font-display font-bold text-lg shadow-gold">
        ف
      </span>
      <span className="font-display text-xl font-bold tracking-tight">فرصة</span>
    </Link>
  );
}
