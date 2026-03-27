import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  token: Token;
  setToken: (token: Token) => void;
  logout: () => void;
}

type Token = string | null;

const storeConfig: StateCreator<
  AuthState,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set) => ({
  token: null,
  user: null,

  setToken: (token) => set({ token }),
  logout: () => set({ token: null }),
});

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(storeConfig, {
      name: "auth-storage",
    }),
  ),
);
