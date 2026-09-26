import React from "react";

const stats = [
  { label: "Total Users", value: "1,250", change: "+12.5%", tone: "bg-slate-900 text-white" },
  { label: "Active Users", value: "980", change: "+8.2%", tone: "bg-white text-slate-900" },
  { label: "New Users", value: "120", change: "+24%", tone: "bg-slate-200 text-slate-900" },
];

function UsersDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Overview</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Users Dashboard</h1>
        </div>
        <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
          + Add User
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-2xl border border-slate-200 p-6 shadow-sm ${stat.tone}`}>
            <p className="text-sm font-medium opacity-70">{stat.label}</p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <h2 className="text-3xl font-bold tracking-tight">{stat.value}</h2>
              <span className="rounded-full bg-white/15 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
            <span className="text-sm text-slate-500">Last 7 days</span>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="font-medium text-slate-800">New customer registration</p>
                  <p className="text-sm text-slate-500">2 hours ago</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  Success
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Quick Tips</h3>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            <li className="rounded-xl bg-slate-50 p-3">Review recent signups to improve conversion.</li>
            <li className="rounded-xl bg-slate-50 p-3">Check inactive accounts once a week.</li>
            <li className="rounded-xl bg-slate-50 p-3">Keep profile information up to date.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UsersDashboard;