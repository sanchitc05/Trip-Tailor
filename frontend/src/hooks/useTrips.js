import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { toast } from "react-hot-toast";

export function useTrips({ skip = 0, limit = 10, status } = {}) {
  return useQuery({
    queryKey: ["trips", { skip, limit, status }],
    queryFn: async () => {
      const response = await api.get("/api/trips/", {
        params: { skip, limit, status },
      });
      return response.data;
    },
  });
}

export function useCreateTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tripData) => {
      const response = await api.post("/api/trips/", tripData);
      return response.data;
    },
    onMutate: async (newTrip) => {
      await queryClient.cancelQueries({ queryKey: ["trips"] });
      const previousTrips = queryClient.getQueryData(["trips"]);
      queryClient.setQueryData(["trips"], (old) => [
        ...(old || []),
        { 
          ...newTrip, 
          id: `temp-${Date.now()}`, 
          created_at: new Date().toISOString() 
        },
      ]);
      return { previousTrips };
    },
    onError: (err, newTrip, context) => {
      queryClient.setQueryData(["trips"], context.previousTrips);
      toast.error("Failed to save trip. Restoring previous state.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
}

export function useDeleteTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tripId) => {
      await api.delete(`/api/trips/${tripId}`);
    },
    onMutate: async (tripId) => {
      await queryClient.cancelQueries({ queryKey: ["trips"] });
      const previousTrips = queryClient.getQueryData(["trips"]);
      queryClient.setQueryData(["trips"], (old) => 
        old?.filter((trip) => trip.id !== tripId)
      );
      return { previousTrips };
    },
    onError: (err, tripId, context) => {
      queryClient.setQueryData(["trips"], context.previousTrips);
      toast.error("Failed to delete trip.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
}

