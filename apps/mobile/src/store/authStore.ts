import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
  } | null;

  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  login: () =>
    set({
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      user: null,
    }),
}));
