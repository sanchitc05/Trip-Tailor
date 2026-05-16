import { create } from "zustand";

export const useAppStore = create((set) => ({
  auth: { user: null, token: null },
  ui: { sidebarOpen: true, theme: "dark" },
  trip: { destination: "", dates: null, budget: 1500, interests: [] },
  preferences: { travelStyle: "balanced", transport: "flight" },
  recommendations: [],
  login: (payload) => set({ auth: payload }),
  logout: () => set({ auth: { user: null, token: null } }),
  updateTrip: (trip) => set((state) => ({ trip: { ...state.trip, ...trip } })),
  toggleSidebar: () =>
    set((state) => ({ ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen } })),
}));
