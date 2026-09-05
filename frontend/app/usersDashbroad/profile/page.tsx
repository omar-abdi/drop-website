"use client";

import Link from "next/link";
import { useUserStore } from "../../userStore/user";

export default function ProfilePage() {
  const { user } = useUserStore();

  if (!user) {
    return (
      <main className="ml-64 min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="mt-3 text-gray-500">Please log in to view your profile.</p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700"
          >
            Go to login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="ml-64 min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-cyan-600">Account</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">My Profile</h1>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 text-xl font-bold text-cyan-700">
              {(user.firstName?.[0] || user.email[0]).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user.firstName || ""} {user.lastName || ""}
              </h2>
              <p className="text-sm text-gray-500">{user.isAdmin ? "Administrator" : "User"}</p>
            </div>
          </div>

          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-gray-500">Email</dt>
              <dd className="mt-1 font-medium text-gray-900">{user.email}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Phone number</dt>
              <dd className="mt-1 font-medium text-gray-900">{user.phoneNumber || "-"}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Gender</dt>
              <dd className="mt-1 font-medium text-gray-900">{user.gender || "-"}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Address</dt>
              <dd className="mt-1 font-medium text-gray-900">{user.address || "-"}</dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  );
}