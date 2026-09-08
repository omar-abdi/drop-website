"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useProductStore, type Product } from "../../../productStore/products";

export default function ProductsPage() {
	const products = useProductStore((state) => state.products);
	const loading = useProductStore((state) => state.loading);
	const storeError = useProductStore((state) => state.error);
	const getAllProducts = useProductStore((state) => state.getAllProducts);
	const deleteProduct = useProductStore((state) => state.deleteProduct);
	const clearError = useProductStore((state) => state.clearError);
	const [search, setSearch] = useState("");
	const [pageError, setPageError] = useState("");
	const [deletingId, setDeletingId] = useState("");

	useEffect(() => {
		getAllProducts().catch(() => undefined);
	}, [getAllProducts]);

	const filteredProducts = useMemo(() => {
		const query = search.trim().toLowerCase();
		if (!query) return products;

		return products.filter((product) =>
			[product.title, product.category, product.description]
				.join(" ")
				.toLowerCase()
				.includes(query)
		);
	}, [products, search]);

	const handleDelete = async (product: Product) => {
		if (!window.confirm(`Delete ${product.title}?`)) return;

		try {
			setDeletingId(product._id);
			setPageError("");
			await deleteProduct(product._id);
		} catch (error: any) {
			setPageError(error?.response?.data?.message || "Failed to delete product");
		} finally {
			setDeletingId("");
		}
	};

	const error = pageError || storeError;

	return (
		<main className="min-h-screen bg-slate-950 px-6 py-8 text-white md:ml-64">
			<div className="mx-auto max-w-7xl">
				<header className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
					<div>
						<p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-400">
							Catalog / Inventory
						</p>
						<h1 className="text-4xl font-bold tracking-tight">All products</h1>
						<p className="mt-2 text-slate-400">Manage your products in one place.</p>
					</div>
					<Link
						href="/productDashbroad/products/addProduct"
						className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
					>
						+ Add product
					</Link>
				</header>

				<section className="mb-6 grid gap-4 sm:grid-cols-3">
					<div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
						<p className="text-sm text-slate-400">Total products</p>
						<p className="mt-2 text-3xl font-bold">{products.length}</p>
					</div>
					<div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
						<p className="text-sm text-slate-400">In stock</p>
						<p className="mt-2 text-3xl font-bold text-emerald-300">
							{products.filter((product) => product.stock > 0).length}
						</p>
					</div>
					<div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
						<p className="text-sm text-slate-400">Low stock</p>
						<p className="mt-2 text-3xl font-bold text-amber-300">
							{products.filter((product) => product.stock > 0 && product.stock < 10).length}
						</p>
					</div>
				</section>

				<div className="mb-6 flex flex-col gap-3 sm:flex-row">
					<input
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Search products..."
						className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 sm:flex-1"
					/>
					<button
						type="button"
						onClick={() => {
							clearError();
							getAllProducts().catch(() => undefined);
						}}
						className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
					>
						Refresh
					</button>
				</div>

				{error && (
					<div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
						{error}
					</div>
				)}

				{loading && <p className="py-12 text-center text-slate-400">Loading products...</p>}

				{!loading && filteredProducts.length === 0 && (
					<div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-16 text-center">
						<p className="text-lg font-semibold">No products found</p>
						<p className="mt-2 text-slate-400">Add a product or change your search.</p>
					</div>
				)}

				<section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
					{filteredProducts.map((product) => (
						<article
							key={product._id}
							className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-xl shadow-black/10"
						>
							<div className="relative aspect-[16/10] bg-slate-900">
								{product.images?.[0] ? (
									<img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" />
								) : (
									<div className="flex h-full items-center justify-center text-sm text-slate-500">No image</div>
								)}
								<span className="absolute right-3 top-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs text-slate-200">
									{product.category}
								</span>
							</div>

							<div className="p-5">
								<div className="flex items-start justify-between gap-4">
									<h2 className="text-lg font-semibold">{product.title}</h2>
									<p className="font-bold text-cyan-300">${product.price.toFixed(2)}</p>
								</div>
								<p className="mt-2 line-clamp-2 text-sm text-slate-400">{product.description}</p>
								<div className="mt-4 flex items-center justify-between gap-3 text-sm">
									<span className={product.stock > 0 ? "text-emerald-300" : "text-red-300"}>
										{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
									</span>
									<div className="flex gap-2">
										
										<button
											type="button"
											onClick={() => handleDelete(product)}
											disabled={deletingId === product._id}
											className="rounded-lg bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-200 hover:bg-red-500/25 disabled:opacity-50"
										>
											{deletingId === product._id ? "Deleting..." : "Delete"}
										</button>
									</div>
								</div>
							</div>
						</article>
					))}
				</section>
			</div>
		</main>
	);
}
