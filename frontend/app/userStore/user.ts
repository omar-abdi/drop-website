import { create } from "zustand";
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
  registerUser: (user: User) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  updateUser: (userId: string, user: Partial<User>) => Promise<User>;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  registerUser: async (user) => {
    const response = await axios.post(
      "http://localhost:3000/api/users/signup",
      user,
      {
        withCredentials: true,
      }
    );

    set({
      user: response.data.user,
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
      user: response.data.user,
    });
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
    });
  },
}));