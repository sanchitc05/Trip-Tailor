import { http } from "@/services/http";

export const tripService = {
  /**
   * Get AI-powered trip recommendation
   * @param {Object} params - Trip parameters
   * @param {string} params.destination - Target destination
   * @param {number} params.duration - Number of days
   * @param {number} params.budget - Budget in INR
   * @param {string} params.travel_style - Travel style (adventure, relaxation, cultural, luxury)
   * @param {number} params.group_size - Number of travelers
   * @param {Array} params.interests - Optional list of interests
   * @returns {Promise} Trip recommendation with itinerary and cost breakdown
   */
  getRecommendation: async (params) => {
    try {
      const response = await http.post("/api/trips/recommend", {
        destination: params.destination,
        duration: params.duration,
        budget: params.budget,
        travel_style: params.travel_style,
        group_size: params.group_size,
        interests: params.interests || null,
        start_date: params.start_date || null,
        end_date: params.end_date || null,
      });
      return {
        ...response.data,
        estimated_cost:
          response.data.estimated_cost ?? response.data.cost_breakdown?.total ?? 0,
        map_waypoints: response.data.map_waypoints ?? response.data.waypoints ?? [],
      };
    } catch (error) {
      console.error("Trip recommendation error:", error);
      throw error.response?.data?.detail || "Failed to generate trip recommendation";
    }
  },
};
