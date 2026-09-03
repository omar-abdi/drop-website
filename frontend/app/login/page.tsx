
"use client";

import Link from "next/link";
import { useState } from "react";
import { useUserStore } from "../userStore/user";
import { useRouter } from "next/navigation";

type LoginForm = {
  email: string;
  password: string;
};

const initialForm: LoginForm = {
  email: "",
  password: "",
};

export default function LoginPage() {
    const router = useRouter();
  const [form, setForm] = useState<LoginForm>(initialForm);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      await loginUser(form.email, form.password);
      setSuccessMessage("Login successful.");
      router.push("/");

      setSuccessMessage("Login successful.");
      setForm(initialForm);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl shadow-cyan-950/30 backdrop-blur-sm lg:grid-cols-[1.1fr_0.9fr]">

        <div className="relative hidden overflow-hidden bg-gradient-to-br from-cyan-500 via-sky-600 to-indigo-700 p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2),transparent_35%)]" />

          <div className="relative z-10">
            <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium text-cyan-50">
              Welcome back
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight">
              Sign in to your account
            </h1>

            <p className="mt-4 max-w-md text-base text-cyan-50/85">
              Access your dashboard and continue shopping with a secure,
              personalized experience.
            </p>
          </div>

          <div className="relative z-10 space-y-4 text-sm text-cyan-50/85">
            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-lg">
                ✓
              </span>
              Fast access
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-lg">
                ⚡
              </span>
              Smart checkout
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-lg">
                🔒
              </span>
              Secure profile
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
              Login
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              Welcome back
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

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
                placeholder="Enter your password"
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                required
              />
            </label>

            <div className="flex items-center justify-between text-sm text-slate-300">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/20 bg-slate-900"
                />
                Remember me
              </label>

              <a
                href="#"
                className="text-cyan-400 transition hover:text-cyan-300"
              >
                Forgot password?
              </a>
            </div>

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
              {loading ? "Signing in..." : "Sign in"}
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-slate-300">
            Don&apos;t have an account?{" "}

            <Link
              href="/signup"
              className="font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

