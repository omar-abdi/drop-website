import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/api/products";

export type Product = {
	_id: string;
	title: string;
	description: string;
	price: number;
	category: string;
	images: string[];
	stock: number;
	createdAt?: string;
	updatedAt?: string;
};

export type ProductInput = Omit<Product, "_id" | "createdAt" | "updatedAt">;

type ProductStore = {
	products: Product[];
	loading: boolean;
	error: string;
	getAllProducts: () => Promise<Product[]>;
	getSingleProduct: (productId: string) => Promise<Product>;
	addProduct: (product: ProductInput) => Promise<Product>;
	deleteProduct: (productId: string) => Promise<void>;
	clearError: () => void;
};

export const useProductStore = create<ProductStore>((set) => ({
	products: [],
	loading: false,
	error: "",

	getAllProducts: async () => {
		set({ loading: true, error: "" });
		try {
			const response = await axios.get<Product[]>(`${API_URL}/all`);
			set({ products: response.data });
			return response.data;
		} catch (error: any) {
			const message = error?.response?.data?.message || "Failed to load products";
			set({ error: message });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	getSingleProduct: async (productId) => {
		const response = await axios.get<Product>(`${API_URL}/${productId}`);
		return response.data;
	},

	addProduct: async (product) => {
		const response = await axios.post<Product>(`${API_URL}/add`, product, {
			withCredentials: true,
		});
		set((state) => ({ products: [response.data, ...state.products] }));
		return response.data;
	},

	deleteProduct: async (productId) => {
		await axios.delete(`${API_URL}/${productId}`, {
			withCredentials: true,
		});
		set((state) => ({
			products: state.products.filter((product) => product._id !== productId),
		}));
	},

	clearError: () => set({ error: "" }),
}));
