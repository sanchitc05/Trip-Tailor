import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { toast } from "react-hot-toast";

export function useExpenses({ skip = 0, limit = 10, category } = {}) {
  return useQuery({
    queryKey: ["expenses", { skip, limit, category }],
    queryFn: async () => {
      const response = await api.get("/api/expenses/", {
        params: { skip, limit, category },
      });
      return response.data;
    },
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (expenseData) => {
      const response = await api.post("/api/expenses/", expenseData);
      return response.data;
    },
    onMutate: async (newExpense) => {
      await queryClient.cancelQueries({ queryKey: ["expenses"] });
      const previousExpenses = queryClient.getQueryData(["expenses"]);
      queryClient.setQueryData(["expenses"], (old) => [
        ...(old || []),
        { 
          ...newExpense, 
          id: `temp-${Date.now()}`, 
          created_at: new Date().toISOString() 
        },
      ]);
      return { previousExpenses };
    },
    onError: (err, newExpense, context) => {
      queryClient.setQueryData(["expenses"], context.previousExpenses);
      toast.error("Failed to save expense.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (expenseId) => {
      await api.delete(`/api/expenses/${expenseId}`);
    },
    onMutate: async (expenseId) => {
      await queryClient.cancelQueries({ queryKey: ["expenses"] });
      const previousExpenses = queryClient.getQueryData(["expenses"]);
      queryClient.setQueryData(["expenses"], (old) => 
        old?.filter((exp) => exp.id !== expenseId)
      );
      return { previousExpenses };
    },
    onError: (err, expenseId, context) => {
      queryClient.setQueryData(["expenses"], context.previousExpenses);
      toast.error("Failed to delete expense.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}

