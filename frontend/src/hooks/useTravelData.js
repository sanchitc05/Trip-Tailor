import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tripsApi } from "@/api/trips";
import {
  mockExpenseBreakdown,
  mockHotels,
  mockRecommendations,
  mockRoutes,
  mockUpcomingTrips,
} from "@/constants/mockData";
import {
  expenseSchema,
  hotelSchema,
  itinerarySchema,
  parseArray,
  recommendationSchema,
  routeSchema,
  tripSchema,
} from "@/utils/apiSchemas";
import { useToast } from "@/context/ToastContext";

async function withFallback(request, fallback) {
  try {
    const response = await request();
    return response.data;
  } catch {
    return fallback;
  }
}

export function useUpcomingTrips() {
  return useQuery({
    queryKey: ["trips", "upcoming"],
    queryFn: async () => {
      const data = await withFallback(() => tripsApi.getUpcomingTrips(), mockUpcomingTrips);
      return parseArray(tripSchema, data);
    },
  });
}

export function useRecommendations() {
  return useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const data = await withFallback(() => tripsApi.getRecommendations(), mockRecommendations);
      return parseArray(recommendationSchema, data);
    },
  });
}

export function useRouteComparison(params) {
  return useQuery({
    queryKey: ["routes", "comparison", params],
    queryFn: async () => {
      const data = await withFallback(() => tripsApi.compareRoutes(params), mockRoutes);
      return parseArray(routeSchema, data);
    },
  });
}

export function useExpenseBreakdown(params) {
  return useQuery({
    queryKey: ["expenses", "breakdown", params],
    queryFn: async () => {
      const data = await withFallback(
        () => tripsApi.getExpenseBreakdown(params),
        mockExpenseBreakdown,
      );
      return parseArray(expenseSchema, data);
    },
  });
}

export function useHotels(params) {
  return useQuery({
    queryKey: ["hotels", params],
    queryFn: async () => {
      const data = await withFallback(() => tripsApi.getHotels(params), mockHotels);
      return parseArray(hotelSchema, data);
    },
  });
}

export function useGenerateItinerary() {
  const { pushToast } = useToast();
  return useMutation({
    mutationFn: async (payload) => {
      const data = (await tripsApi.generateItinerary(payload)).data;
      return itinerarySchema.parse(data);
    },
    onError: () => pushToast("Unable to generate itinerary right now.", "error"),
  });
}

export function useToggleRecommendationSave() {
  const queryClient = useQueryClient();
  const { pushToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, saved }) =>
      (await tripsApi.toggleRecommendationSave(id, saved)).data,
    onMutate: async ({ id, saved }) => {
      await queryClient.cancelQueries({ queryKey: ["recommendations"] });
      const previous = queryClient.getQueryData(["recommendations"]);

      queryClient.setQueryData(["recommendations"], (old = []) =>
        old.map((item) => (item.id === id ? { ...item, saved } : item)),
      );

      return { previous };
    },
    onError: (_error, _vars, context) => {
      queryClient.setQueryData(["recommendations"], context?.previous);
      pushToast("Could not update saved recommendation.", "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    },
  });
}
