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
    withStub(() => http.post("/api/auth/login", payload), {
      user: { ...stubUser, email: payload.email },
      accessToken: "phase-2-local-token",
    }).then((data) => ({
      user: data.user ?? { ...stubUser, email: payload.email },
      accessToken: data.access_token ?? data.accessToken ?? "phase-2-local-token",
    })),
  signUp: (payload) =>
    withStub(
      () =>
        http.post("/api/auth/signup", {
          email: payload.email,
          password: payload.password,
          full_name: payload.name,
        }),
      {
        user: { ...stubUser, name: payload.name, email: payload.email },
        accessToken: "phase-2-local-token",
      },
    ).then((data) => ({
      user: data.user ?? { ...stubUser, name: payload.name, email: payload.email },
      accessToken: data.access_token ?? data.accessToken ?? "phase-2-local-token",
    })),
  forgotPassword: (payload) =>
    withStub(() => http.post("/api/auth/forgot-password", payload), {
      email: payload.email,
      status: "sent",
    }),
  logout: () => withStub(() => http.post("/api/auth/logout"), { message: "Logout successful" }),
  me: () =>
    withStub(() => http.get("/api/auth/me"), {
      ...stubUser,
      email: "user@example.com",
    }),
};
