
"use client";

import { useState } from "react";
import { useUserStore } from "../userStore/user";
import Link from "next/link";

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
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { registerUser } = useUserStore();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      await registerUser(form);

      setSuccessMessage("Account created successfully.");
      setForm(initialForm);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Signup failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900 p-8">
        <h1 className="mb-8 text-3xl font-bold">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid gap-5 sm:grid-cols-2">
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
              required
              className="rounded-xl bg-slate-800 px-4 py-3"
            />

            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              required
              className="rounded-xl bg-slate-800 px-4 py-3"
            />
          </div>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full rounded-xl bg-slate-800 px-4 py-3"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full rounded-xl bg-slate-800 px-4 py-3"
          />

          <input
            type="tel"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone number"
            required
            className="w-full rounded-xl bg-slate-800 px-4 py-3"
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-slate-800 px-4 py-3"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            required
            rows={3}
            className="w-full rounded-xl bg-slate-800 px-4 py-3"
          />

          {error && (
            <p className="rounded-xl bg-red-500/10 p-3 text-red-300">
              {error}
            </p>
          )}

          {successMessage && (
            <p className="rounded-xl bg-green-500/10 p-3 text-green-300">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-600 px-5 py-3 font-semibold"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <Link
            href="/login"
            className="block text-center text-cyan-400"
          >
            Already have an account? Login
          </Link>

        </form>
      </div>
    </div>
  );
}

