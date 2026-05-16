import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi } from "@/api/auth";
import { useAppStore } from "@/store/useAppStore";

export function useCurrentUser() {
  const token = useAppStore((s) => s.auth.token);
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => (await authApi.me()).data,
    enabled: Boolean(token),
  });
}

export function useSignIn() {
  const login = useAppStore((s) => s.login);
  return useMutation({
    mutationFn: async (payload) => (await authApi.signIn(payload)).data,
    onSuccess: (data) => {
      login({ user: data.user, token: data.accessToken });
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: async (payload) => (await authApi.signUp(payload)).data,
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (payload) => (await authApi.forgotPassword(payload)).data,
  });
}
