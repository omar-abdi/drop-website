"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { PencilLine, Trash2, Users } from "lucide-react";
import { useUserStore } from "../../../userStore/user";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  gender?: string;
  address?: string;
  isAdmin?: boolean;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const { deleteUser } = useUserStore();

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get("http://localhost:3000/api/users/all", {
          withCredentials: true,
        });

        setUsers(response.data || []);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      setDeletingId(userId);
      setError("");
      await deleteUser(userId);
      setUsers((currentUsers) => currentUsers.filter((user) => user._id !== userId));
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to delete user");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
              <Users size={20} strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Members</p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">All Users</h1>
            </div>
          </div>

          <div className="rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-700">
            {users.length} total users
          </div>
        </div>

        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-600">Loading users...</div>
        )}

        {error && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-600">
            No users found.
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Phone</th>
                    <th className="px-4 py-3 font-semibold">Gender</th>
                    <th className="px-4 py-3 font-semibold">Address</th>
                    <th className="px-4 py-3 font-semibold">Role</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {users.map((user) => (
                    <tr key={user._id} className="transition hover:bg-slate-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                            {(user.firstName?.[0] || "U").toUpperCase()}
                          </div>
                          <span className="font-medium text-slate-900">
                            {user.firstName} {user.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-700">{user.email}</td>
                      <td className="px-4 py-4 text-slate-700">{user.phoneNumber || "-"}</td>
                      <td className="px-4 py-4 text-slate-700">{user.gender || "-"}</td>
                      <td className="px-4 py-4 text-slate-700">{user.address || "-"}</td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${user.isAdmin ? "bg-violet-100 text-violet-700" : "bg-cyan-100 text-cyan-700"}`}>
                          {user.isAdmin ? "Admin" : "User"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <Link
                            href={`/usersDashbroad/users/update?id=${user._id}`}
                            className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                          >
                            <PencilLine size={14} />
                            Update
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(user._id)}
                            disabled={deletingId === user._id}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <Trash2 size={14} />
                            {deletingId === user._id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}