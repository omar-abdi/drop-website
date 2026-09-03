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

  logout: () => {
    set({
      user: null,
    });
  },
}));