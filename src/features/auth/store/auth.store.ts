import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  token: Token;
  setToken: (token: Token) => void;
  logout: () => void;
}

export type Token = string | undefined;

const storeConfig: StateCreator<
  AuthState,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set) => ({
  token: undefined,

  setToken: (token) => set({ token }),
  logout: () => set({ token: undefined }),
});

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(storeConfig, {
      name: "auth-storage",
    }),
  ),
);
