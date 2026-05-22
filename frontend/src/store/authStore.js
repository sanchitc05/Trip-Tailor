import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isValidating: false,

      login: (tokens, user) =>
        set({
          user,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),

      setAccessToken: (token) => set({ accessToken: token }),

      validateSession: async () => {
        const { accessToken, logout } = get();
        if (!accessToken) {
          set({ isAuthenticated: false, isValidating: false });
          return;
        }

        set({ isValidating: true });
        try {
          const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
          const response = await axios.get(`${baseURL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          set({ user: response.data, isAuthenticated: true });
        } catch (error) {
          logout();
        } finally {
          set({ isValidating: false });
        }
      },
    }),
    {
      name: "trip-tailor-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

