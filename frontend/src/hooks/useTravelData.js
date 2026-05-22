import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tripsApi } from "@/api/trips";
import { useToast } from "@/context/ToastContext";

export function useGenerateItinerary() {
  const { pushToast } = useToast();
  return useMutation({
    mutationFn: async (payload) => {
      // Adapt payload for backend TripRequest
      const backendPayload = {
        destination: payload.destination,
        duration: payload.duration || 1,
        budget: payload.budget || 1000,
        travel_style: payload.travelStyle || "balanced",
        group_size: payload.groupSize || 1,
        interests: payload.interests ? payload.interests.split(",").map(i => i.trim()) : [],
        start_date: payload.startDate || null,
        end_date: payload.endDate || null,
      };
      const response = await tripsApi.generateRecommendation(backendPayload);
      return response.data;
    },
    onError: () => pushToast("Unable to generate itinerary right now.", "error"),
  });
}

// Keep other hooks as stubs or update if backend ready
export function useRecommendations() {
  return useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const response = await tripsApi.getRecommendations();
      return response.data;
    },
    enabled: false, // Disable until backend implemented
  });
}

export function useRouteComparison(params) {
  return useQuery({
    queryKey: ["routes", "comparison", params],
    queryFn: async () => {
      const response = await tripsApi.compareRoutes(params);
      return response.data;
    },
    enabled: false,
  });
}

export function useHotels(params) {
  return useQuery({
    queryKey: ["hotels", params],
    queryFn: async () => {
      const response = await tripsApi.getHotels(params);
      return response.data;
    },
    enabled: false,
  });
}
