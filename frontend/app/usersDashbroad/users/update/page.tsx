"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "../../../userStore/user";

type UserForm = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address: string;
  isAdmin: boolean;
};

const emptyForm: UserForm = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  gender: "",
  address: "",
  isAdmin: false,
};

function UpdateUserForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("id");
  const { updateUser } = useUserStore();
  const [form, setForm] = useState<UserForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("User id is missing");
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/all", {
          withCredentials: true,
        });
        const user = response.data.find((item: UserForm & { _id: string }) => item._id === userId);

        if (!user) {
          setError("User not found");
          return;
        }

        setForm({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          gender: user.gender || "",
          address: user.address || "",
          isAdmin: Boolean(user.isAdmin),
        });
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId) return;

    try {
      setSaving(true);
      setError("");
      await updateUser(userId, form);
      router.push("/usersDashbroad/users/all");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-slate-300">Loading user...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Update User</h1>
          <Link href="/usersDashbroad/users/all" className="text-sm text-cyan-300 hover:text-cyan-200">
            Back to users
          </Link>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          {(["firstName", "lastName", "email", "phoneNumber", "gender", "address"] as const).map((field) => (
            <label key={field} className="space-y-2 text-sm text-slate-300">
              <span className="capitalize">{field.replace(/([A-Z])/g, " $1")}</span>
              <input
                name={field}
                type={field === "email" ? "email" : "text"}
                value={form[field]}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>
          ))}

          <label className="flex items-center gap-3 text-sm text-slate-300 sm:col-span-2">
            <input
              name="isAdmin"
              type="checkbox"
              checked={form.isAdmin}
              onChange={handleChange}
              className="h-4 w-4"
            />
            Admin user
          </label>

          <button
            type="submit"
            disabled={saving || Boolean(error && !userId)}
            className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
          >
            {saving ? "Updating..." : "Update user"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function UpdateUserPage() {
  return (
    <Suspense fallback={<p className="p-6 text-slate-300">Loading...</p>}>
      <UpdateUserForm />
    </Suspense>
  );
}
