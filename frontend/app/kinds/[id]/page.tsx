"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Edit3, Package, Tag } from "lucide-react";
import { useParams } from "next/navigation";
import { useKindStore, type Kind } from "../../productStore/kinds";

export default function KindDetailsPage() {
	const params = useParams<{ id: string }>();
	const getSingleKind = useKindStore((state) => state.getSingleKind);
	const [kind, setKind] = useState<Kind | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [selectedImage, setSelectedImage] = useState("");

	useEffect(() => { if (!params.id) return; setLoading(true); getSingleKind(params.id).then((nextKind) => { setKind(nextKind); setSelectedImage(nextKind.images?.[0] || ""); }).catch(() => setError("This category could not be found.")).finally(() => setLoading(false)); }, [getSingleKind, params.id]);

	if (loading) return <main className="min-h-screen bg-slate-950 px-6 py-24 text-center text-slate-400">Loading category...</main>;
	if (error || !kind) return <main className="min-h-screen bg-slate-950 px-6 py-24 text-center text-red-200"><p>{error || "Category not found."}</p><Link href="/kinds" className="mt-5 inline-block text-cyan-300">Back to categories</Link></main>;

	const images = kind.images?.filter(Boolean) || [];

	return <main className="min-h-screen bg-slate-950 px-5 py-10 text-white sm:px-8"><div className="mx-auto max-w-5xl"><Link href="/kinds" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white"><ArrowLeft size={17} /> All categories</Link><section className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06]"><div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]"><div className="bg-cyan-300/10 p-6 sm:p-8"><div className="flex min-h-72 items-center justify-center overflow-hidden rounded-2xl bg-slate-950/30"><div className="relative h-72 w-full">{selectedImage ? <img src={selectedImage} alt={kind.title} className="h-full w-full object-contain" /> : <div className="flex h-full items-center justify-center"><Tag size={100} strokeWidth={1} className="text-cyan-200/50" /></div>}</div></div>{images.length > 1 && <div className="mt-4 grid grid-cols-4 gap-3">{images.map((image, index) => <button type="button" key={`${image}-${index}`} onClick={() => setSelectedImage(image)} className={`h-20 overflow-hidden rounded-xl border-2 bg-slate-950/30 transition ${selectedImage === image ? "border-cyan-300" : "border-transparent opacity-70 hover:opacity-100"}`}><img src={image} alt={`${kind.title} image ${index + 1}`} className="h-full w-full object-cover" /></button>)}</div>}</div><div className="p-7 sm:p-10"><div className="flex flex-wrap items-center justify-between gap-3"><span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200">{kind.category || "Collection"}</span><span className="text-sm text-slate-400">Updated {kind.updatedAt ? new Date(kind.updatedAt).toLocaleDateString() : "recently"}</span></div><h1 className="mt-6 text-4xl font-bold tracking-tight">{kind.title}</h1><p className="mt-4 leading-7 text-slate-400">{kind.description}</p><div className="mt-8 grid grid-cols-2 gap-3"><div className="rounded-xl border border-white/10 bg-slate-950/30 p-4"><Package size={18} className="text-cyan-300" /><p className="mt-3 text-2xl font-bold">{kind.stock}</p><p className="text-xs uppercase tracking-wider text-slate-500">Items in stock</p></div><div className="rounded-xl border border-white/10 bg-slate-950/30 p-4"><p className="text-2xl font-bold text-cyan-300">${kind.price.toFixed(2)}</p><p className="mt-3 text-xs uppercase tracking-wider text-slate-500">Starting price</p></div></div><Link href={`/productDashbroad/products/updateKinds?id=${kind._id}`} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"><Edit3 size={17} /> Edit category</Link></div></div></section></div></main>;
}
