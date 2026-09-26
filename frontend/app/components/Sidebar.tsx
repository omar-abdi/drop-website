"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, UserRound, UserCog, ShieldCheck } from "lucide-react";

function Sidebar() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
      pathname === href
        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
    }`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-200 bg-white/95 p-5 shadow-[4px_0_24px_rgba(15,23,42,0.04)] backdrop-blur-sm">
      <div className="mb-9 border-b border-slate-100 pb-6">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
          <ShieldCheck size={20} strokeWidth={2.2} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">Users</h1>
        <p className="mt-1 text-sm text-slate-500">Admin Panel</p>
      </div>

      <nav className="space-y-2">
        <Link href="/usersDashbroad" className={linkClass("/usersDashbroad")}>
          <LayoutDashboard size={18} strokeWidth={2} />
          Dashboard
        </Link>

        <Link href="/usersDashbroad/users/all" className={linkClass("/usersDashbroad/users/all")}>
          <UserRound size={18} strokeWidth={2} />
          All Users
        </Link>

        <Link href="/usersDashbroad/profile" className={linkClass("/usersDashbroad/profile")}>
          <UserCog size={18} strokeWidth={2} />
          Profile
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;