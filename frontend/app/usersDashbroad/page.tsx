import React from "react";

function UsersDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Users Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Manage and view all users.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="mt-2 text-3xl font-bold">1,250</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Active Users</p>
          <h2 className="mt-2 text-3xl font-bold">980</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">New Users</p>
          <h2 className="mt-2 text-3xl font-bold">120</h2>
        </div>
      </div>
    </div>
  );
}

export default UsersDashboard;