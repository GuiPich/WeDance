import { create } from "zustand";

import { saveToken, removeToken } from "../services/storage";

type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

type AuthState = {
  token: string | null;

  user: User | null;

  setUser: (user: User) => void;

  login: (token: string) => Promise<void>;

  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,

  user: null,

  setUser: (user) =>
    set({
      user,
    }),

  login: async (token) => {
    await saveToken(token);

    set({
      token,
    });
  },

  logout: async () => {
    await removeToken();

    set({
      token: null,
      user: null,
    });
  },
}));
