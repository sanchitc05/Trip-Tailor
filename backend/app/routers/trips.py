from fastapi import APIRouter, HTTPException, status

from app.models import TripRequest, TripRecommendationResponse
from app.services.ai_service import AITripService

router = APIRouter(prefix="/api/trips", tags=["trips"])

# Initialize AI service
ai_service = AITripService()


@router.post("/recommend", response_model=TripRecommendationResponse)
async def get_trip_recommendation(request: TripRequest):
    """
    Generate AI-powered trip recommendation using Google Gemini.

    Args:
        request: Trip request with destination, duration, budget, travel_style, group_size

    Returns:
        Comprehensive trip itinerary with cost breakdown and waypoints
    """

    try:
        recommendation = ai_service.generate_recommendation(
            destination=request.destination,
            duration=request.duration,
            budget=request.budget,
            travel_style=request.travel_style,
            group_size=request.group_size,
            interests=request.interests,
            start_date=request.start_date,
            end_date=request.end_date,
        )
        return recommendation

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate trip recommendation",
        )
