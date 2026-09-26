"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck, User } from "lucide-react";
import { useUserStore } from "../../userStore/user";

export default function ProfilePage() {
  const { user } = useUserStore();

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 p-6 md:p-8">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">Account</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Profile</h1>
          <p className="mt-3 text-slate-600">Please log in to view your profile details.</p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Go to login
          </Link>
        </div>
      </main>
    );
  }

  const initials = `${user.firstName?.[0] || "U"}${user.lastName?.[0] || user.email?.[0] || "A"}`.toUpperCase();

  const details = [
    { label: "Email", value: user.email || "-", icon: Mail },
    { label: "Phone number", value: user.phoneNumber || "-", icon: Phone },
    { label: "Gender", value: user.gender || "-", icon: User },
    { label: "Address", value: user.address || "-", icon: MapPin },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 p-6 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">Profile</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">My account</h1>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <ShieldCheck size={14} />
            {user.isAdmin ? "Administrator" : "Standard user"}
          </span>
        </div>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-700 p-6 text-white md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/12 text-xl font-bold shadow-inner backdrop-blur-sm">
                  {initials}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {user.firstName || "User"} {user.lastName || "Profile"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-200">{user.email}</p>
                </div>
              </div>

              <button className="inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15">
                Edit profile
              </button>
            </div>
          </div>

          <div className="grid gap-4 p-6 md:grid-cols-2 md:p-8">
            {details.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-cyan-700 shadow-sm">
                  <Icon size={18} strokeWidth={2.2} />
                </div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}