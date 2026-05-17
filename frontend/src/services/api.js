import axios from "axios";
import { useAppStore } from "../store/useAppStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

function showErrorToast(message) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("app-error", {
      detail: { message },
    }),
  );
}

api.interceptors.request.use(
  (config) => {
    const { auth } = useAppStore.getState();

    if (auth?.token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      useAppStore.getState().logout();

      if (typeof window !== "undefined" && window.location.pathname !== "/signin") {
        window.location.replace("/signin");
      }
    } else if (status === 500) {
      showErrorToast("A server error occurred. Please try again later.");
    }

    return Promise.reject(error);
  },
);

export default api;
