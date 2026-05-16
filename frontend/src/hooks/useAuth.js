import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { useAppStore } from "@/store/useAppStore";

export function useCurrentUser() {
  const token = useAppStore((s) => s.auth.token);
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.me,
    enabled: Boolean(token),
  });
}

export function useSignIn() {
  const login = useAppStore((s) => s.login);
  return useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      login({ user: data.user, token: data.accessToken });
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: authService.signUp,
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: authService.forgotPassword,
  });
}
