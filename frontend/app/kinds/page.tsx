"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Tag, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { useKindStore } from "../productStore/kinds";

export default function KindsPage() {
  const kinds = useKindStore((state) => state.kinds);
  const loading = useKindStore((state) => state.loading);
  const storeError = useKindStore((state) => state.error);
  const getAllKinds = useKindStore((state) => state.getAllKinds);
  const clearError = useKindStore((state) => state.clearError);

  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllKinds().catch(() => undefined);
  }, [getAllKinds]);

  const filteredKinds = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return kinds;
    return kinds.filter((kind) =>
      [kind.title, kind.category, kind.description]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [kinds, search]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-5 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <header className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300 backdrop-blur-md">
              <Tag size={14} className="animate-pulse" /> Store Categories
            </div>
            <h1 className="bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
              Soo dhowow, dalabkaaga dhiibo
            </h1>
            <p className="max-w-xl text-slate-400">
              Dooro nooca aad rabto, kadibna si fudud u eeg faahfaahinta iyo alaabta ku dhex jirta.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:border-cyan-500/40">
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-cyan-500/10 blur-xl" />
            <p className="text-4xl font-black text-cyan-300">{kinds.length}</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Categories Total</p>
          </div>
        </header>

        {/* Search and Action Bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Raadi category ama alaab..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder-slate-500 backdrop-blur-md transition duration-300 focus:border-cyan-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              clearError();
              getAllKinds().catch(() => undefined);
            }}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur-md transition duration-300 hover:bg-white/10 hover:text-white active:scale-95"
          >
            <Sparkles size={16} /> Refresh
          </button>
        </div>

        {/* Error Alert */}
        {storeError && (
          <div className="mb-8 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200 backdrop-blur-md">
            <AlertCircle size={18} className="shrink-0 text-red-400" />
            <span>{storeError}</span>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <Loader2 size={36} className="animate-spin text-cyan-400" />
            <p className="mt-4 text-sm font-medium">Soo raraya categories-ka...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredKinds.length === 0 && (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-20 text-center">
            <p className="text-xl font-semibold text-slate-300">Wax category ah ma doonin</p>
            <p className="mt-2 text-slate-500">Isku day in aad raadiso magac kale.</p>
          </div>
        )}

        {/* Grid Cards Section */}
        {!loading && filteredKinds.length > 0 && (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredKinds.map((kind) => (
              <article
                key={kind._id}
                className="group relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-950/50"
              >
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 overflow-hidden">
                  {kind.images?.[0] ? (
                    <img
                      src={kind.images[0]}
                      alt={kind.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-full w-full bg-slate-800" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent transition-opacity duration-500 group-hover:via-slate-950/80" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200 backdrop-blur-md">
                      {kind.category || "Collection"}
                    </span>
                    <span className="text-xs font-medium text-slate-300 backdrop-blur-sm">
                      {kind.stock} items
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-white drop-shadow-md transition-colors duration-300 group-hover:text-cyan-300">
                    {kind.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-300/90">
                    {kind.description}
                  </p>

                  {/* Actions Bar */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <Link
                      href={`/kinds/${kind._id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:gap-3 hover:text-white"
                    >
                      View details <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}