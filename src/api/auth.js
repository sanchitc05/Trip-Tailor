import { http } from "@/services/http";

export const authApi = {
  signIn: (payload) => http.post("/auth/signin", payload),
  signUp: (payload) => http.post("/auth/signup", payload),
  forgotPassword: (payload) => http.post("/auth/forgot-password", payload),
  me: () => http.get("/auth/me"),
};
