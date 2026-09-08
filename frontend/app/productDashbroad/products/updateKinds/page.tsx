"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useKindStore, type KindInput } from "../../../productStore/kinds";

const emptyForm: KindInput = { title: "", description: "", price: 0, category: "", images: [], stock: 0 };

export default function UpdateKindsPage() {
	const searchParams = useSearchParams();
	const kindId = searchParams.get("id") || "";
	const getSingleKind = useKindStore((state) => state.getSingleKind);
	const updateKind = useKindStore((state) => state.updateKind);
	const [form, setForm] = useState<KindInput>(emptyForm);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	useEffect(() => { if (!kindId) { setLoading(false); setError("Choose a category to edit."); return; } getSingleKind(kindId).then((kind) => setForm({ title: kind.title, description: kind.description, price: kind.price, category: kind.category, images: kind.images || [], stock: kind.stock })).catch(() => setError("Unable to load this category.")).finally(() => setLoading(false)); }, [getSingleKind, kindId]);
	const setField = (field: keyof KindInput, value: string | number) => setForm((current) => ({ ...current, [field]: value }));
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSaving(true); setError(""); setMessage(""); try { await updateKind(kindId, form); setMessage("Category updated successfully."); } catch { setError("Unable to update. Check your admin access and try again."); } finally { setSaving(false); } };
	if (loading) return <main className="min-h-screen bg-slate-950 px-6 py-24 text-center text-slate-400">Loading editor...</main>;

	return <main className="min-h-screen bg-slate-950 px-5 py-10 text-white sm:px-8"><div className="mx-auto max-w-3xl"><Link href={kindId ? `/kinds/${kindId}` : "/kinds"} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white"><ArrowLeft size={17} /> Back</Link><div className="mt-8"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Category editor</p><h1 className="mt-3 text-4xl font-bold tracking-tight">Update category</h1><p className="mt-2 text-slate-400">Keep the details clear so customers can find the right collection.</p></div><form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-3xl border border-white/10 bg-white/[0.06] p-6 sm:p-8">{error && <div className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">{error}</div>}{message && <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-200">{message}</div>}<div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-medium text-slate-300">Title<input required value={form.title} onChange={(event) => setField("title", event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus:border-cyan-300" /></label><label className="text-sm font-medium text-slate-300">Category<input required value={form.category} onChange={(event) => setField("category", event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus:border-cyan-300" /></label><label className="text-sm font-medium text-slate-300">Price<input required min="0" step="0.01" type="number" value={form.price} onChange={(event) => setField("price", Number(event.target.value))} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus:border-cyan-300" /></label><label className="text-sm font-medium text-slate-300">Stock<input required min="0" type="number" value={form.stock} onChange={(event) => setField("stock", Number(event.target.value))} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus:border-cyan-300" /></label></div><label className="block text-sm font-medium text-slate-300">Description<textarea required rows={5} value={form.description} onChange={(event) => setField("description", event.target.value)} className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus:border-cyan-300" /></label><button type="submit" disabled={saving || !kindId} className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60">{saving ? <LoaderCircle size={17} className="animate-spin" /> : <Check size={17} />}{saving ? "Saving..." : "Save changes"}</button></form></div></main>;
}
