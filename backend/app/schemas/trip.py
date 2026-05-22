from datetime import date, datetime
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, Field, field_validator
from app.models.trip import TripStatus


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
    """Backward-compatible alias for older service and router imports."""
    pass


class TripCreate(BaseModel):
    title: str = Field(..., max_length=100, min_length=1)
    origin: str = Field(..., max_length=100)
    destination: str = Field(..., max_length=100)
    travel_mode: str = Field(..., max_length=50)
    status: TripStatus = Field(default=TripStatus.planned)
    start_date: date
    end_date: date
    notes: Optional[str] = Field(None, max_length=1000)

    @field_validator('title', 'origin', 'destination', 'travel_mode', mode='before')
    @classmethod
    def strip_whitespace(cls, v):
        if isinstance(v, str):
            v = v.strip()
            if not v:
                raise ValueError('Field cannot be blank')
        return v



class TripOut(TripCreate):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TripListOut(BaseModel):
    items: List[TripOut]
    total: int
    skip: int
    limit: int


