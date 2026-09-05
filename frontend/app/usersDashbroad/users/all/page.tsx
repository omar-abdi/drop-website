"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
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
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-4xl  rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
        <h1 className="mb-6 text-3xl font-bold">All Users</h1>

        {loading && <p className="text-slate-300">Loading users...</p>}

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-red-200">
            {error}
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <p className="text-slate-300">No users found.</p>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/5 text-slate-300">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">gender</th>
        
                  <th className="px-4 py-3">address</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-white/5">
                    <td className="px-4 py-3">{user.firstName} {user.lastName}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.phoneNumber || "-"}</td>
                    <td className="px-4 py-3">{user.gender || "-"}</td>
                    <td className="px-4 py-3">{user.address || "-"}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs text-cyan-300">
                        {user.isAdmin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/usersDashbroad/users/update?id=${user._id}`}
                          className="rounded-lg bg-cyan-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300"
                        >
                          Update
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(user._id)}
                          disabled={deletingId === user._id}
                          className="rounded-lg bg-red-500/20 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/30 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {deletingId === user._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}