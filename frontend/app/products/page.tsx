"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useProductStore, type Product } from "../productStore/products";

export default function ProductsPage() {
    const products = useProductStore((state) => state.products);
    const loading = useProductStore((state) => state.loading);
    const storeError = useProductStore((state) => state.error);
    const getAllProducts = useProductStore((state) => state.getAllProducts);
    const deleteProduct = useProductStore((state) => state.deleteProduct);
    const clearError = useProductStore((state) => state.clearError);
    const [search, setSearch] = useState("");
    const [pageError, setPageError] = useState("");


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
            // setDeletingId(product._id);
            setPageError("");
            await deleteProduct(product._id);
        } catch (error: any) {
            setPageError(error?.response?.data?.message || "Failed to delete product");
        } finally {
            // setDeletingId("");
        }
    };

    const error = pageError || storeError;

    return (
        <main className="min-h-screen w-full bg-white px-4 py-8 text-slate-900 sm:px-8">
            <div className="w-full">
                {/* Header */}
                <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">All Products</h1>
                        <p className="mt-1 text-sm text-slate-500">Manage your store products</p>
                    </div>
                  
                </header>

                {/* Search Bar */}
                <div className="mb-8 flex flex-col gap-3 sm:flex-row">
                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search products..."
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-black focus:bg-white sm:flex-1"
                    />
                    <button
                        type="button"
                        onClick={() => {
                            clearError();
                            getAllProducts().catch(() => undefined);
                        }}
                        className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        Refresh
                    </button>
                </div>

                {error && (
                    <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {loading && <p className="py-20 text-center text-slate-500">Loading products...</p>}

                {!loading && filteredProducts.length === 0 && (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-20 text-center">
                        <p className="text-base font-medium text-slate-700">No products found</p>
                        <p className="mt-1 text-sm text-slate-500">Try changing your search or add a new product.</p>
                    </div>
                )}

                {/* Full-Width Grid leh Sawirro Waaweyn */}
                <section className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {filteredProducts.map((product) => (
                        <article
                            key={product._id}
                            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                        >
                            {/* Sawirka oo WEYN */}
                            <div className="relative h-80 w-full bg-slate-100">
                                {product.images?.[0] ? (
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                                        No Image
                                    </div>
                                )}
                                <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                                    {product.category}
                                </span>
                            </div>

                            {/* Qeybta Nuxurka */}
                            <div className="flex flex-1 flex-col justify-between p-5">
                                <div>
                                    <div className="flex items-start justify-between gap-2">
                                        <h2 className="text-lg font-bold text-slate-900">{product.title}</h2>
                                        <p className="text-lg font-extrabold text-slate-900">${product.price.toFixed(2)}</p>
                                    </div>
                                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">{product.description}</p>
                                </div>

                                <div className="mt-6 border-t border-slate-100 pt-4">
                                    <div className="mb-3 flex items-center justify-between text-xs font-medium">
                                        <span className={product.stock > 0 ? "text-emerald-600" : "text-red-600"}>
                                            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={`/products/${product._id}`}
                                            className="flex-1 rounded-lg border border-slate-200 py-2 text-center text-xs font-semibold text-slate-800 transition hover:bg-slate-50"
                                        >
                                            View
                                        </Link>
                                       
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