from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func

from app.core.dependencies import get_current_user
from app.database import get_db
from app.models.trip import Trip, TripStatus
from app.models.user import User
from app.schemas.trip import TripCreate, TripOut, TripRequest, TripRecommendationResponse, TripListOut
from app.services.ai_service import AITripService

router = APIRouter(prefix="/api/trips", tags=["trips"])

# Initialize AI service
ai_service = AITripService()


@router.get("/", response_model=TripListOut)
async def get_trips(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=50),
    status: Optional[TripStatus] = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get trips for the current user with pagination and status filtering."""
    query = select(Trip).where(Trip.user_id == current_user.id)
    
    if status:
        query = query.where(Trip.status == status)
    
    # Get total count
    count_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(count_query)
    total = total_result.scalar()
    
    # Get items
    result = await db.execute(
        query.order_by(Trip.created_at.desc()).offset(skip).limit(limit)
    )
    trips = result.scalars().all()
    
    return {
        "items": trips,
        "total": total,
        "skip": skip,
        "limit": limit
    }


@router.post("/", response_model=TripOut, status_code=status.HTTP_201_CREATED)
async def create_trip(
    trip_in: TripCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new trip."""
    new_trip = Trip(
        **trip_in.dict(),
        user_id=current_user.id
    )
    db.add(new_trip)
    await db.commit()
    await db.refresh(new_trip)
    return new_trip


@router.get("/{trip_id}", response_model=TripOut)
async def get_trip(
    trip_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific trip by ID."""
    result = await db.execute(
        select(Trip).where(Trip.id == trip_id, Trip.user_id == current_user.id)
    )
    trip = result.scalars().first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    return trip


@router.delete("/{trip_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_trip(
    trip_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a trip."""
    result = await db.execute(
        select(Trip).where(Trip.id == trip_id, Trip.user_id == current_user.id)
    )
    trip = result.scalars().first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    await db.delete(trip)
    await db.commit()
    return None


@router.post("/recommend", response_model=TripRecommendationResponse)
async def get_trip_recommendation(
    request: TripRequest,
    current_user: User = Depends(get_current_user)
):
    """
    Generate AI-powered trip recommendation using Google Gemini.
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
