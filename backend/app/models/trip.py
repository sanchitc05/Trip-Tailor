from datetime import date
from typing import List, Optional

from pydantic import BaseModel, Field


class TripRequest(BaseModel):
    """Request body for trip recommendation."""

    destination: str = Field(..., description="Target destination")
    duration: int = Field(..., ge=1, le=30, description="Number of days (1-30)")
    budget: float = Field(..., gt=0, description="Budget in INR")
    travel_style: str = Field(
        ..., description="Travel style: adventure, relaxation, cultural, luxury"
    )
    group_size: int = Field(..., ge=1, le=20, description="Number of people")
    interests: Optional[List[str]] = Field(
        default=None, description="Optional specific interests or activities"
    )
    start_date: Optional[date] = Field(default=None, description="Travel start date")
    end_date: Optional[date] = Field(default=None, description="Travel end date")


class TripRequestBody(TripRequest):
    """Backward-compatible alias used by the initial implementation."""


class DayItinerary(BaseModel):
    """Single day itinerary entry."""
    day: int
    activities: List[str]
    meals: Optional[dict] = None
    estimated_cost: float


class CostBreakdown(BaseModel):
    """Breakdown of estimated costs."""
    accommodation: float
    transportation: float
    food: float
    activities: float
    miscellaneous: float
    total: float


class Waypoint(BaseModel):
    """Map waypoint for the trip."""
    name: str
    latitude: float
    longitude: float
    day: int


class TripResponse(BaseModel):
    """AI-generated trip recommendation response."""

    destination: str
    duration: int
    itinerary: List[DayItinerary]
    estimated_cost: float
    tips: List[str]
    map_waypoints: List[Waypoint]
    cost_breakdown: Optional[CostBreakdown] = None
    waypoints: Optional[List[Waypoint]] = None
    generated_at: str


class TripRecommendationResponse(TripResponse):
    """Backward-compatible alias used by the initial implementation."""


class ContactMessage(BaseModel):
    """Contact form submission."""
    name: str = Field(..., min_length=2)
    email: str = Field(..., description="Valid email address")
    message: str = Field(..., min_length=10)


# Auth Models
class UserSignup(BaseModel):
    """User signup request."""
    email: str
    password: str = Field(..., min_length=8)
    full_name: str


class UserLogin(BaseModel):
    """User login request."""
    email: str
    password: str


class TokenResponse(BaseModel):
    """JWT token response."""
    access_token: str
    token_type: str = "bearer"
    user_id: str
    user: Optional[dict] = None
