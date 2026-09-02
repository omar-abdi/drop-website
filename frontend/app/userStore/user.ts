import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id?: string | number;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  gender?: string;
  address?: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type UserStore = {
  user: User | null;

  loading: boolean;
  error: string | null;
  registerUser: (user: User) => Promise<{ success: boolean; message: string }>;
  loginUser: (credentials: LoginCredentials) => Promise<{ success: boolean; message: string; user?: User | null }>;
  clearError: () => void;
  logout: () => void;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      
      loading: false,
      error: null,

      registerUser: async (user) => {
        set({ loading: true, error: null });

        try {
          const response = await fetch(`${API_URL}/api/users/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data?.message || "Signup failed. Please try again.");
          }

          set({ user: data, loading: false, error: null });
          return { success: true, message: "Account created successfully." };
        } catch (err) {
          const message = err instanceof Error ? err.message : "Something went wrong.";
          set({ loading: false, error: message });
          return { success: false, message };
        }
      },

      loginUser: async ({ email, password }) => {
        set({ loading: true, error: null });

        try {
          const response = await fetch(`${API_URL}/api/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data?.message || "Login failed. Please try again.");
          }

          const loggedInUser = data?.user ?? { email };

          set({ user: loggedInUser, 
             loading: false, error: null
             });

          return {
            success: true,
            message: "Login successful.",
            user: loggedInUser,
          };
        } catch (err) {
          const message = err instanceof Error ? err.message : "Something went wrong.";
          set({ loading: false, error: message });
          return { success: false, message };
        }
      },

      clearError: () => set({ error: null }),
      logout: () => set({ user: null,  error: null }),
    }),
    {
      name: "ecommerce-user-store",
    }
  )
);