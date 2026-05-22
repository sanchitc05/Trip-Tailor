import { http } from "@/services/http";

export const tripsApi = {
  getTrips: () => http.get("/api/trips/"),
  getTrip: (id) => http.get(`/api/trips/${id}`),
  createTrip: (payload) => http.post("/api/trips/", payload),
  deleteTrip: (id) => http.delete(`/api/trips/${id}`),
  generateRecommendation: (payload) => http.post("/api/trips/recommend", payload),
  
  getExpenses: () => http.get("/api/expenses/"),
  getExpense: (id) => http.get(`/api/expenses/${id}`),
  createExpense: (payload) => http.post("/api/expenses/", payload),
  deleteExpense: (id) => http.delete(`/api/expenses/${id}`),

  // These might need backend implementation later
  getRecommendations: () => http.get("/recommendations"),
  compareRoutes: (params) => http.get("/routes/compare", { params }),
  getHotels: (params) => http.get("/accommodations", { params }),
};
