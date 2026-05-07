import { http } from "@/services/http";

export const tripsApi = {
  getUpcomingTrips: () => http.get("/trips/upcoming"),
  generateItinerary: (payload) => http.post("/ai/itinerary", payload),
  getRecommendations: () => http.get("/recommendations"),
  compareRoutes: (params) => http.get("/routes/compare", { params }),
  getExpenseBreakdown: (params) => http.get("/expenses/breakdown", { params }),
  getHotels: (params) => http.get("/accommodations", { params }),
  toggleRecommendationSave: (id, saved) =>
    http.patch(`/recommendations/${id}/save`, { saved }),
};
