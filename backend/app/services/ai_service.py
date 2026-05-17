import json
from datetime import date
from datetime import datetime
import google.generativeai as genai

from app.config import settings
from app.models import TripRecommendationResponse, DayItinerary, CostBreakdown, Waypoint


class AITripService:
    """Service to generate AI-powered trip recommendations using Google Gemini"""

    def __init__(self):
        genai.configure(api_key=settings.google_api_key)
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    def generate_recommendation(
        self,
        destination: str,
        duration: int,
        budget: float,
        travel_style: str,
        group_size: int,
        interests: list = None,
        start_date: date | None = None,
        end_date: date | None = None,
    ) -> TripRecommendationResponse:
        """
        Generate a comprehensive trip itinerary using AI.

        Args:
            destination: Target destination
            duration: Number of days
            budget: Budget in INR
            travel_style: Type of travel (adventure, relaxation, cultural, luxury)
            group_size: Number of travelers
            interests: Optional list of interests/activities
            start_date: Optional travel start date
            end_date: Optional travel end date

        Returns:
            TripRecommendationResponse with itinerary and cost breakdown
        """

        interests_text = f"\nSpecial interests: {', '.join(interests)}" if interests else ""
        travel_dates_text = ""
        if start_date and end_date:
            travel_dates_text = f"\nTravel Dates: {start_date.isoformat()} to {end_date.isoformat()}"
        elif start_date:
            travel_dates_text = f"\nTravel Start Date: {start_date.isoformat()}"
        elif end_date:
            travel_dates_text = f"\nTravel End Date: {end_date.isoformat()}"

        prompt = f"""
You are an expert travel planner. Create a detailed trip itinerary based on these details:

Destination: {destination}
Duration: {duration} days
Budget: ₹{budget:,.0f}
Travel Style: {travel_style}
Group Size: {group_size} people{travel_dates_text}{interests_text}

Please provide the response in this EXACT JSON format (no markdown, just valid JSON):
{{
  "destination": "{destination}",
  "duration": {duration},
  "itinerary": [
    {{"day": 1, "activities": ["Activity 1", "Activity 2"], "meals": {{"breakfast": "...", "lunch": "...", "dinner": "..."}}, "estimated_cost": 5000}},
    {{"day": 2, "activities": ["Activity 1", "Activity 2"], "meals": {{"breakfast": "...", "lunch": "...", "dinner": "..."}}, "estimated_cost": 4500}}
  ],
    "estimated_cost": 60000,
  "cost_breakdown": {{
    "accommodation": 20000,
    "transportation": 15000,
    "food": 12000,
    "activities": 8000,
    "miscellaneous": 5000,
    "total": 60000
  }},
  "tips": [
    "Best time to visit",
    "What to pack",
    "Local customs",
    "Safety tips",
    "Money-saving tips"
  ],
    "map_waypoints": [
    {{"name": "Starting Point", "latitude": 0.0, "longitude": 0.0, "day": 1}},
    {{"name": "Next Point", "latitude": 1.0, "longitude": 1.0, "day": 2}}
  ]
}}

Important:
- Make sure the total budget equals or is close to ₹{budget:,.0f}
- Include realistic activities for {destination}
- Adjust costs based on the group size
- Provide 5-7 practical tips
- Include 4-6 waypoints representing key stops on the journey
- Ensure all waypoints have realistic coordinates for the destination
- Travel dates may be optional context in the request; use them if they are provided.
- Return ONLY valid JSON, no extra text
"""

        try:
            response = self.model.generate_content(prompt)
            response_text = response.text.strip()

            # Handle markdown code blocks if returned
            if response_text.startswith("```json"):
                response_text = response_text[7:]  # Remove ```json
            if response_text.startswith("```"):
                response_text = response_text[3:]  # Remove ```
            if response_text.endswith("```"):
                response_text = response_text[:-3]  # Remove trailing ```

            response_text = response_text.strip()

            # Parse the JSON response
            data = json.loads(response_text)

            # Convert to Pydantic models
            itinerary = [
                DayItinerary(
                    day=item["day"],
                    activities=item["activities"],
                    meals=item.get("meals"),
                    estimated_cost=item.get("estimated_cost", 0),
                )
                for item in data.get("itinerary", [])
            ]

            cost_data = data.get("cost_breakdown", {})
            estimated_cost = data.get("estimated_cost", cost_data.get("total", 0))
            cost_breakdown = CostBreakdown(
                accommodation=cost_data.get("accommodation", 0),
                transportation=cost_data.get("transportation", 0),
                food=cost_data.get("food", 0),
                activities=cost_data.get("activities", 0),
                miscellaneous=cost_data.get("miscellaneous", 0),
                total=cost_data.get("total", estimated_cost),
            )

            waypoints = [
                Waypoint(
                    name=wp["name"],
                    latitude=wp["latitude"],
                    longitude=wp["longitude"],
                    day=wp["day"],
                )
                for wp in data.get("map_waypoints", data.get("waypoints", []))
            ]

            return TripRecommendationResponse(
                destination=destination,
                duration=duration,
                itinerary=itinerary,
                estimated_cost=estimated_cost,
                cost_breakdown=cost_breakdown,
                tips=data.get("tips", []),
                map_waypoints=waypoints,
                waypoints=waypoints,
                generated_at=datetime.now().isoformat(),
            )

        except json.JSONDecodeError as e:
            # Fallback if JSON parsing fails
            raise ValueError(f"Failed to parse AI response: {str(e)}")
        except Exception as e:
            raise ValueError(f"AI service error: {str(e)}")
