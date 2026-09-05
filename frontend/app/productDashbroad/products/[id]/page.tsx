"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useProductStore, type Product } from "../../../productStore/products";

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const getSingleProduct = useProductStore((state) => state.getSingleProduct);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params.id) return;
    const loadProduct = async () => {
      try {
        setLoading(true);
        setProduct(await getSingleProduct(params.id));
        setSelectedImageIndex(0);
      } catch (requestError: any) {
        setError(requestError?.response?.data?.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [getSingleProduct, params.id]);

  if (loading) return <main className="min-h-screen bg-slate-950 p-8 text-slate-300 md:ml-64">Loading product...</main>;
  if (error || !product) return <main className="min-h-screen bg-slate-950 p-8 text-white md:ml-64"><div className="mx-auto max-w-3xl rounded-2xl border border-red-500/30 bg-red-500/10 p-6"><p className="text-red-200">{error || "Product not found"}</p><Link href="/productDashbroad/products/all" className="mt-5 inline-block text-cyan-300">Back to products</Link></div></main>;

  return <main className="min-h-screen bg-slate-950 px-6 py-8 text-white md:ml-64"><div className="mx-auto max-w-6xl"><Link href="/productDashbroad/products/all" className="text-sm text-cyan-300 hover:text-cyan-200">Back to all products</Link><div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]"><section><div className="aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-slate-900">{product.images[selectedImageIndex] ? <img src={product.images[selectedImageIndex]} alt={`${product.title} image ${selectedImageIndex + 1}`} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-slate-500">No image available</div>}</div>{product.images.length > 0 && <div className="mt-4 grid grid-cols-2 gap-3">{product.images.map((image, index) => <button key={`${image}-${index}`} type="button" onClick={() => setSelectedImageIndex(index)} className={`aspect-video overflow-hidden rounded-xl border-2 transition ${selectedImageIndex === index ? "border-cyan-400" : "border-white/10 opacity-70 hover:border-white/40 hover:opacity-100"}`} aria-label={`View image ${index + 1}`}><img src={image} alt={`${product.title} thumbnail ${index + 1}`} className="h-full w-full object-cover" /></button>)}</div>}</section><section className="rounded-3xl border border-white/10 bg-white/[0.06] p-7"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-400">Product details</p><h1 className="mt-3 text-4xl font-bold tracking-tight">{product.title}</h1><p className="mt-5 text-3xl font-bold text-cyan-300">${product.price.toFixed(2)}</p><p className="mt-6 leading-7 text-slate-300">{product.description}</p><dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-sm"><div><dt className="text-slate-500">Category</dt><dd className="mt-1 font-semibold">{product.category}</dd></div><div><dt className="text-slate-500">Stock</dt><dd className="mt-1 font-semibold">{product.stock}</dd></div><div><dt className="text-slate-500">Images</dt><dd className="mt-1 font-semibold">{product.images.length}</dd></div><div><dt className="text-slate-500">Status</dt><dd className="mt-1 font-semibold text-emerald-300">{product.stock > 0 ? "Available" : "Out of stock"}</dd></div></dl></section></div></div></main>;
}
