import axios from "axios";
import { create } from "zustand";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"}/kinds`;

export type Kind = {
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

export type KindInput = Omit<Kind, "_id" | "createdAt" | "updatedAt">;

type KindStore = {
	kinds: Kind[];
	loading: boolean;
	error: string;
	getAllKinds: () => Promise<Kind[]>;
	getSingleKind: (kindId: string) => Promise<Kind>;
	updateKind: (kindId: string, kind: KindInput) => Promise<Kind>;
	deleteKind: (kindId: string) => Promise<void>;
	clearError: () => void;
};

const getErrorMessage = (error: unknown, fallback: string) =>
	axios.isAxiosError(error) ? error.response?.data?.message || fallback : fallback;

export const useKindStore = create<KindStore>((set) => ({
	kinds: [],
	loading: false,
	error: "",

	getAllKinds: async () => {
		set({ loading: true, error: "" });
		try {
			const response = await axios.get<Kind[]>(API_URL);
			set({ kinds: response.data });
			return response.data;
		} catch (error) {
			set({ error: getErrorMessage(error, "Failed to load categories") });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	getSingleKind: async (kindId) => {
		const response = await axios.get<Kind>(`${API_URL}/${kindId}`);
		return response.data;
	},

	updateKind: async (kindId, kind) => {
		const response = await axios.put<Kind>(`${API_URL}/${kindId}`, kind, { withCredentials: true });
		set((state) => ({ kinds: state.kinds.map((item) => (item._id === kindId ? response.data : item)) }));
		return response.data;
	},

	deleteKind: async (kindId) => {
		await axios.delete(`${API_URL}/${kindId}`, { withCredentials: true });
		set((state) => ({ kinds: state.kinds.filter((kind) => kind._id !== kindId) }));
	},

	clearError: () => set({ error: "" }),
}));
