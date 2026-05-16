import { create } from "zustand";

const getInitialDarkMode = () => {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem("trip-tailor-dark-mode") !== "false";
};

export const useAppStore = create((set) => ({
  auth: { user: null, token: null },
  darkMode: getInitialDarkMode(),
  ui: { sidebarOpen: true, theme: getInitialDarkMode() ? "dark" : "light" },
  trip: { destination: "", dates: null, budget: 1500, interests: [] },
  preferences: { travelStyle: "balanced", transport: "flight" },
  recommendations: [],
  login: (payload) => set({ auth: payload }),
  logout: () => set({ auth: { user: null, token: null } }),
  updateTrip: (trip) => set((state) => ({ trip: { ...state.trip, ...trip } })),
  setDarkMode: (darkMode) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("trip-tailor-dark-mode", String(darkMode));
    }

    set((state) => ({
      darkMode,
      ui: { ...state.ui, theme: darkMode ? "dark" : "light" },
    }));
  },
  toggleDarkMode: () =>
    set((state) => {
      const darkMode = !state.darkMode;

      if (typeof window !== "undefined") {
        window.localStorage.setItem("trip-tailor-dark-mode", String(darkMode));
      }

      return {
        darkMode,
        ui: { ...state.ui, theme: darkMode ? "dark" : "light" },
      };
    }),
  toggleSidebar: () =>
    set((state) => ({ ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen } })),
}));
