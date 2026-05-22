import { http } from "@/services/http";

export const authService = {
  signIn: async (payload) => {
    const formData = new FormData();
    formData.append("username", payload.email);
    formData.append("password", payload.password);
    
    const response = await http.post("/api/auth/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  signUp: async (payload) => {
    const response = await http.post("/api/auth/register", {
      email: payload.email,
      password: payload.password,
      full_name: payload.name,
    });
    return response.data;
  },
  forgotPassword: (payload) => http.post("/api/auth/forgot-password", payload),
  logout: () => http.post("/api/auth/logout"),
  me: async () => {
    const response = await http.get("/api/auth/me");
    return response.data;
  },
};
