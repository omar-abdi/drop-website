"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useProductStore, type Product } from "../../productStore/products";

export default function ProductDetailsPage() {
	const params = useParams<{ id: string }>();
	const getSingleProduct = useProductStore((state) => state.getSingleProduct);
	const [product, setProduct] = useState<Product | null>(null);
	const [selectedImage, setSelectedImage] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!params.id) return;

		setLoading(true);
		setError("");
		getSingleProduct(params.id)
			.then((loadedProduct) => {
				setProduct(loadedProduct);
				setSelectedImage(loadedProduct.images?.[0] || "");
			})
			.catch((requestError: any) => {
				setError(requestError?.response?.data?.message || "Failed to load product");
			})
			.finally(() => setLoading(false));
	}, [getSingleProduct, params.id]);

	if (loading) {
		return <main className="min-h-screen px-4 py-20 text-center text-slate-500">Loading product...</main>;
	}

	if (error || !product) {
		return (
			<main className="min-h-screen px-4 py-20 text-center">
				<p className="text-red-600">{error || "Product not found"}</p>
				<Link href="/products" className="mt-5 inline-block font-semibold text-slate-900 underline">
					Back to products
				</Link>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-white px-4 py-8 text-slate-900 sm:px-8">
			<div className="mx-auto max-w-6xl">
				<Link href="/products" className="mb-8 inline-block text-sm font-semibold text-slate-600 hover:text-black">
					&larr; Back to products
				</Link>

				<section className="grid gap-10 md:grid-cols-2 md:items-start">
					<div>
						<div className="overflow-hidden rounded-2xl bg-slate-100">
						{selectedImage ? (
							<img src={selectedImage} alt={product.title} className="aspect-square h-full w-full object-cover" />
						) : (
							<div className="flex aspect-square items-center justify-center text-slate-400">No Image</div>
						)}
						</div>

						{product.images?.length > 1 && (
							<div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
								{product.images.map((image, index) => (
									<button
										key={`${image}-${index}`}
										type="button"
										onClick={() => setSelectedImage(image)}
										aria-label={`View image ${index + 1}`}
										className={`aspect-square overflow-hidden rounded-lg border-2 bg-slate-100 transition ${
											selectedImage === image ? "border-slate-900" : "border-transparent hover:border-slate-300"
										}`}
									>
										<img src={image} alt={`${product.title} view ${index + 1}`} className="h-full w-full object-cover" />
									</button>
								))}
							</div>
						)}
					</div>

					<div className="py-2">
						<p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{product.category}</p>
						<h1 className="mt-2 text-4xl font-bold tracking-tight">{product.title}</h1>
						<p className="mt-5 text-3xl font-extrabold">${product.price.toFixed(2)}</p>
						<p className="mt-6 leading-7 text-slate-600">{product.description}</p>
						<p className={`mt-6 font-semibold ${product.stock > 0 ? "text-emerald-600" : "text-red-600"}`}>
							{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
						</p>
					</div>
				</section>
			</div>
		</main>
	);
}
