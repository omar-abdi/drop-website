"use client";

import { useState } from "react";
import { useUserStore } from "../userStore/user";
import Link from "next/dist/client/link";

type SignupForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
  address: string;
 
};

const initialForm: SignupForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  gender: "",
  address: "",
 
};

export default function SignupPage() {
  const [form, setForm] = useState<SignupForm>(initialForm);
  const [successMessage, setSuccessMessage] = useState("");
  const { registerUser, loading, error, clearError } = useUserStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMessage("");

    const result = await registerUser(form);

    if (result.success) {
      setSuccessMessage(result.message);
      setForm(initialForm);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl shadow-cyan-950/30 backdrop-blur-sm lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-cyan-500 via-sky-600 to-indigo-700 p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2),transparent_35%)]" />
          <div className="relative z-10">
            <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium text-cyan-50">
              New account
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight">Create your store account</h1>
            <p className="mt-4 max-w-md text-base text-cyan-50/85">
              Join our marketplace and start managing your shopping experience with a secure, modern account.
            </p>
          </div>

          <div className="relative z-10 space-y-4 text-sm text-cyan-50/85">
            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-lg">✓</span>
              Secure registration
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-lg">⚡</span>
              Fast onboarding
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-lg">🔒</span>
              Trusted checkout
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">Sign up</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Welcome aboard</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-300">
                <span>First name</span>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                  required
                />
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                <span>Last name</span>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                  required
                />
              </label>
            </div>

            <label className="block space-y-2 text-sm text-slate-300">
              <span>Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                required
              />
            </label>

            <label className="block space-y-2 text-sm text-slate-300">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                required
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-300">
                <span>Phone number</span>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="+1234567890"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                  required
                />
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                <span>Gender</span>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                  required
                >
                  <option value="" className="bg-slate-900 text-slate-400">
                    Select gender
                  </option>
                  <option value="male" className="bg-slate-900">Male</option>
                  <option value="female" className="bg-slate-900">Female</option>

                </select>
              </label>
            </div>

            <label className="block space-y-2 text-sm text-slate-300">
              <span>Address</span>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Your full address"
                rows={3}
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                required
              />
            </label>

           

            {error && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
            <Link href="/login" className="text-cyan-400 transition hover:text-cyan-300">
              Already have an account? Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
