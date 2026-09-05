"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Leftiside() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `block rounded-lg px-4 py-3 ${
      pathname === href
        ? "bg-gray-100 font-medium text-gray-900"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white p-5">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>

      <nav className="space-y-2">
        <Link
          href="/productDashbroad"
          className={linkClass("/usersDashbroad")}
        >
          Dashboard
        </Link>

        <Link
          href="/productDashbroad/products/all"
          className={linkClass("/productDashbroad/products/all")}
        >
          All Products
        </Link>

        <Link
          href="/productDashbroad/profile"
          className={linkClass("/usersDashbroad/profile")}
        >
          Profile
        </Link>

       

        <Link
          href="/productDashbroad/products/addProduct"
          className={linkClass("/productDashbroad/products/addProduct")}
        >
          Add Product
        </Link>
      </nav>
    </aside>
  );
}

export default Leftiside;