import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

export function useCurrentUser() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.me,
    enabled: isAuthenticated,
  });
}

export function useSignIn() {
  const login = useAuthStore((s) => s.login);
  return useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      login(
        { access_token: data.access_token, refresh_token: data.refresh_token },
        data.user
      );
    },
  });
}

export function useSignUp() {
  const login = useAuthStore((s) => s.login);
  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: (data) => {
      login(
        { access_token: data.access_token, refresh_token: data.refresh_token },
        data.user
      );
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: authService.forgotPassword,
  });
}
