import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

type User = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  gender?: string;
  address?: string;
  isAdmin?: boolean;
};

type UserStore = {
  user: User | null;
  authChecked: boolean;
  registerUser: (user: User) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<User | null>;
  deleteUser: (userId: string) => Promise<void>;
  updateUser: (userId: string, user: Partial<User>) => Promise<User>;
  logout: () => void;
};

const withoutSensitiveData = (user: User): User => {
  const { password: _password, ...safeUser } = user;
  return safeUser;
};

export const useUserStore = create<UserStore>()(persist((set) => ({
  user: null,
  authChecked: false,

  registerUser: async (user) => {
    const response = await axios.post(
      "http://localhost:3000/api/users/signup",
      user,
      {
        withCredentials: true,
      }
    );

    set({
      user: withoutSensitiveData(response.data.user || response.data),
    });
  },

  loginUser: async (email, password) => {
    const response = await axios.post(
      "http://localhost:3000/api/users/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    set({
      user: withoutSensitiveData(response.data.user),
    });
  },

  checkAuth: async () => {
    try {
      const response = await axios.get<{ user: User }>("http://localhost:3000/api/users/me", {
        withCredentials: true,
      });
      const safeUser = withoutSensitiveData(response.data.user);
      set({ user: safeUser, authChecked: true });
      return safeUser;
    } catch {
      set({ user: null, authChecked: true });
      return null;
    }
  },

  deleteUser: async (userId) => {
    await axios.delete(`http://localhost:3000/api/users/${userId}`, {
      withCredentials: true,
    });
  },

  updateUser: async (userId, user) => {
    const response = await axios.put(
      `http://localhost:3000/api/users/${userId}`,
      user,
      {
        withCredentials: true,
      }
    );

    return response.data;
  },

  logout: () => {
    set({
      user: null,
      authChecked: true,
    });
  },
}), {
  name: "storex-current-user",
  partialize: (state) => ({ user: state.user }),
}));