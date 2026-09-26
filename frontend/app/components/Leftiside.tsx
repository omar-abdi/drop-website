"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  LayoutDashboard,
  PackagePlus,
  Tags,
} from "lucide-react";

function Leftiside() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
      pathname === href
        ? "bg-slate-900 font-semibold text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
    }`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-200 bg-white p-5 shadow-[4px_0_24px_rgba(15,23,42,0.04)]">
      <div className="mb-9 border-b border-slate-100 pb-6">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
          <Boxes size={22} strokeWidth={2.2} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Admin Panel</p>
      </div>

      <nav className="space-y-2">
        <Link
          href="/productDashbroad"
          className={linkClass("/productDashbroad")}
        >
          <LayoutDashboard size={18} strokeWidth={2} />
          Dashboard
        </Link>

       

       

        <Link
          href="/productDashbroad/products/all"
          className={linkClass("/productDashbroad/products/all")}
        >
          <Boxes size={18} strokeWidth={2} />
          All Products
        </Link>
        <Link
          href="/productDashbroad/products/kinds"
          className={linkClass("/productDashbroad/products/kinds")}
        >
          <Tags size={18} strokeWidth={2} />
          kinds
        </Link>

        <Link
          href="/productDashbroad/products/addProduct"
          className={linkClass("/productDashbroad/products/addProduct")}
        >
          <PackagePlus size={18} strokeWidth={2} />
          Add Product
        </Link>
      </nav>
    </aside>
  );
}

export default Leftiside;