"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Menu, Package, Plus, Tags, X } from "lucide-react";

function Leftiside() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) =>
    `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-300 ${
      pathname === href
        ? "bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-950/20"
        : "text-slate-400 hover:translate-x-1 hover:bg-white/10 hover:text-white"
    }`;

  const closeMenu = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close dashboard menu" : "Open dashboard menu"}
        onClick={() => setOpen((current) => !current)}
        className="fixed left-4 top-4 z-50 rounded-xl border border-white/10 bg-slate-950 p-3 text-white shadow-xl transition hover:border-cyan-300/50 md:hidden"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && <button type="button" aria-label="Close dashboard menu" onClick={closeMenu} className="fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm md:hidden" />}

      <aside className={`fixed left-0 top-0 z-40 flex h-screen w-72 flex-col border-r border-white/10 bg-slate-950 p-5 text-white shadow-2xl shadow-black/30 transition-transform duration-500 md:w-64 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-10 flex items-center justify-between animate-[fade-in_500ms_ease-out]">
          <Link href="/productDashbroad" onClick={closeMenu} className="group flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300 text-xl font-black text-slate-950 shadow-lg shadow-cyan-950/30 transition duration-300 group-hover:rotate-6 group-hover:scale-105">S</span>
            <span><strong className="block text-lg tracking-tight">StoreX</strong><small className="text-xs text-slate-500">Admin workspace</small></span>
          </Link>
        </div>

        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-600">Workspace</p>
        <nav className="space-y-2">
          <Link href="/productDashbroad" onClick={closeMenu} className={linkClass("/productDashbroad")}><LayoutDashboard size={18} /><span>Dashboard</span></Link>
          <Link href="/productDashbroad/products/all" onClick={closeMenu} className={linkClass("/productDashbroad/products/all")}><Package size={18} /><span>All products</span></Link>
          <Link href="/productDashbroad/products/kinds" onClick={closeMenu} className={linkClass("/productDashbroad/products/kinds")}><Tags size={18} /><span>All kinds</span></Link>
          <Link href="/productDashbroad/products/addProduct" onClick={closeMenu} className={linkClass("/productDashbroad/products/addProduct")}><Plus size={18} /><span>Add product</span></Link>
        </nav>

        <div className="mt-auto rounded-2xl border border-cyan-300/10 bg-cyan-300/5 p-4 animate-[fade-in_700ms_ease-out]">
          <p className="text-sm font-semibold text-cyan-200">Keep selling</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">Manage your catalog from one calm place.</p>
        </div>
      </aside>
    </>
  );
}

export default Leftiside;