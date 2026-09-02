import React from "react";
import Link from "next/link";

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white p-5">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>

      <nav className="space-y-2">
        <Link
          href="/usersDashboard"
          className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
        >
          Dashboard
        </Link>

        <Link
          href="/usersDashboard/users"
          className="block rounded-lg bg-gray-100 px-4 py-3 font-medium text-gray-900"
        >
          Users
        </Link>

        <Link
          href="/usersDashboard/settings"
          className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;