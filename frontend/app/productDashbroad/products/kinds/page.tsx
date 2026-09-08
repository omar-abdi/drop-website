"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Edit3, Search, Tag, Trash2 } from "lucide-react";
import { useKindStore, type Kind } from "../../../productStore/kinds";

export default function KindsPage() {
    const kinds = useKindStore((state) => state.kinds);
    const loading = useKindStore((state) => state.loading);
    const storeError = useKindStore((state) => state.error);
    const getAllKinds = useKindStore((state) => state.getAllKinds);
    const deleteKind = useKindStore((state) => state.deleteKind);
    const clearError = useKindStore((state) => state.clearError);
    const [search, setSearch] = useState("");
    const [pageError, setPageError] = useState("");
    const [deletingId, setDeletingId] = useState("");

    useEffect(() => { getAllKinds().catch(() => undefined); }, [getAllKinds]);

    const filteredKinds = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return kinds;
        return kinds.filter((kind) => [kind.title, kind.category, kind.description].join(" ").toLowerCase().includes(query));
    }, [kinds, search]);

    const handleDelete = async (kind: Kind) => {
        if (!window.confirm(`Delete ${kind.title}?`)) return;
        try { setDeletingId(kind._id); setPageError(""); await deleteKind(kind._id); getAllKinds().catch(() => undefined); }
        catch { setPageError("Unable to delete this category. Check your admin access."); }
        finally { setDeletingId(""); }
    };

    const error = pageError || storeError;

    return (
        <main className="min-h-screen bg-slate-950 px-5 py-10 text-white sm:px-8">
            <div className="mx-auto max-w-6xl">
                <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div><p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300"><Tag size={16} /> Store categories</p><h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Find your kind.</h1><p className="mt-3 max-w-xl text-slate-400">Browse the collections that shape your store and keep every product easy to discover.</p></div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-right"><p className="text-3xl font-bold text-cyan-300">{kinds.length}</p><p className="text-xs uppercase tracking-wider text-slate-400">categories</p></div>
                </header>
                <div className="mb-7 flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-4 top-3.5 text-slate-500" size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search categories..." className="w-full rounded-xl border border-white/10 bg-white/[0.06] py-3 pl-11 pr-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300" /></div><button type="button" onClick={() => { clearError(); getAllKinds().catch(() => undefined); }} className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10">Refresh</button></div>
                {error && <div className="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">{error}</div>}
                {loading && <p className="py-16 text-center text-slate-400">Loading categories...</p>}
                {!loading && filteredKinds.length === 0 && <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center"><p className="text-lg font-semibold">No categories found</p><p className="mt-2 text-slate-400">Try a different search term.</p></div>}
                <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredKinds.map((kind) => <article key={kind._id} className="group flex min-h-56 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.09]"><div><div className="mb-6 flex items-start justify-between gap-3"><span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200">{kind.category || "Collection"}</span><span className="text-sm text-slate-500">{kind.stock} items</span></div><h2 className="text-2xl font-semibold">{kind.title}</h2><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{kind.description}</p></div><div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4"><div className="flex items-center gap-3"><Link href={`/kinds/${kind._id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">View details <ArrowRight size={16} /></Link><Link href={`/productDashbroad/products/updateKinds?id=${kind._id}`} title={`Update ${kind.title}`} className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/30 px-3 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-300/10"><Edit3 size={15} /> Update</Link></div><button type="button" title={`Delete ${kind.title}`} onClick={() => handleDelete(kind)} disabled={deletingId === kind._id} className="rounded-lg p-2 text-slate-500 transition hover:bg-red-400/10 hover:text-red-300 disabled:opacity-50"><Trash2 size={17} /></button></div></article>)}</section>
            </div>
        </main>
    );
}
