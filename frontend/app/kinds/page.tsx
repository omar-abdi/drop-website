"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Edit3, Search, Tag, Trash2 } from "lucide-react";
import { useKindStore } from "../productStore/kinds";

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

	const handleDelete = async (kind: (typeof kinds)[number]) => {
		if (!window.confirm(`Delete ${kind.title}?`)) return;
		try {
			setDeletingId(kind._id);
			setPageError("");
			await deleteKind(kind._id);
		} catch {
			setPageError("Unable to delete this category. Check your admin access.");
		} finally {
			setDeletingId("");
		}
	};

	const filteredKinds = useMemo(() => {
		const query = search.trim().toLowerCase();
		if (!query) return kinds;
		return kinds.filter((kind) =>  [ kind.images,kind.title, kind.category, kind.description].join(" ").toLowerCase().includes(query));
	}, [kinds, search]);

	
	const error = pageError || storeError;

	return (
		<main className="min-h-screen bg-slate-950 px-5 py-10 text-white sm:px-8">
			<div className="mx-auto max-w-6xl">
				<header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div><p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300"><Tag size={16} /> Store categories</p><h1 className="animate-pulse text-4xl font-bold tracking-tight sm:text-5xl">Soo dhowow, dalabkaaga dhiibo</h1><p className="mt-3 max-w-xl text-slate-400">Dooro nooca aad rabto, kadibna si fudud u eeg faahfaahinta dalabkaaga.</p></div>
					<div className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-right"><p className="text-3xl font-bold text-cyan-300">{kinds.length}</p><p className="text-xs uppercase tracking-wider text-slate-400">categories</p></div>
				</header>
				<div className="mb-7 flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-4 top-3.5 text-slate-500" size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search categories..." className="w-full rounded-xl border border-white/10 bg-white/[0.06] py-3 pl-11 pr-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300" /></div><button type="button" onClick={() => { clearError(); getAllKinds().catch(() => undefined); }} className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10">Refresh</button></div>
				{error && <div className="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">{error}</div>}
				{loading && <p className="py-16 text-center text-slate-400">Loading categories...</p>}
				{!loading && filteredKinds.length === 0 && <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center"><p className="text-lg font-semibold">No categories found</p><p className="mt-2 text-slate-400">Try a different search term.</p></div>}
				<section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredKinds.map((kind) => <article key={kind._id} className="group relative min-h-80 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-lg shadow-black/20 transition duration-500 hover:-translate-y-2 hover:border-cyan-300/60 hover:shadow-cyan-950/40"><div className="absolute inset-0 overflow-hidden">{kind.images?.[0] ? <img src={kind.images[0]} alt="" aria-hidden="true" className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110" /> : <div className="h-full w-full bg-cyan-300/10" />}<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/10 transition duration-500 group-hover:from-slate-950/95 group-hover:via-slate-950/55" /></div><div className="relative flex min-h-80 flex-col justify-end p-6"><div className="translate-y-2 transition duration-500 group-hover:translate-y-0"><div className="mb-6 flex items-start justify-between gap-3"><span className="rounded-full bg-cyan-300/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-100 backdrop-blur-sm">{kind.category || "Collection"}</span><span className="text-sm text-slate-200 drop-shadow">{kind.stock} items</span></div><h2 className="text-2xl font-semibold text-white drop-shadow">{kind.title}</h2><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-200/85">{kind.description}</p></div><div className="mt-7 flex items-center justify-between border-t border-white/20 pt-4"><div className="flex items-center gap-3"><Link href={`/kinds/${kind._id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition group-hover:gap-3 hover:text-white">View details <ArrowRight size={16} /></Link><Link href={`/productDashbroad/products/updateKinds?id=${kind._id}`} title={`Update ${kind.title}`} className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/40 px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-300/10"><Edit3 size={15} /> Update</Link></div><button type="button" title={`Delete ${kind.title}`} onClick={() => handleDelete(kind)} disabled={deletingId === kind._id} className="rounded-lg p-2 text-slate-200 transition hover:bg-red-400/20 hover:text-red-200 disabled:opacity-50"><Trash2 size={17} /></button></div></div></article>)}</section>
			</div>
		</main>
	);
}
