import { http } from "@/services/http";

const stubUser = {
  id: "local-user",
  name: "Trip Tailor User",
};

async function withStub(request, fallback) {
  try {
    const response = await request();
    return response.data;
  } catch {
    return fallback;
  }
}

export const authService = {
  signIn: (payload) =>
    withStub(() => http.post("/auth/signin", payload), {
      user: { ...stubUser, email: payload.email },
      accessToken: "phase-2-local-token",
    }),
  signUp: (payload) =>
    withStub(() => http.post("/auth/signup", payload), {
      user: { ...stubUser, name: payload.name, email: payload.email },
      accessToken: "phase-2-local-token",
    }),
  forgotPassword: (payload) =>
    withStub(() => http.post("/auth/forgot-password", payload), {
      email: payload.email,
      status: "sent",
    }),
  me: () => withStub(() => http.get("/auth/me"), stubUser),
};
