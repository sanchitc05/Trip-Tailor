from app.models import CostBreakdown, DayItinerary, TripRecommendationResponse, Waypoint
from app.routers import trips


def fake_recommendation():
    return TripRecommendationResponse(
        destination="Kerala",
        duration=5,
        itinerary=[
            DayItinerary(
                day=1,
                activities=["Arrive in Kochi", "Sunset walk at Marine Drive"],
                meals={"breakfast": "Hotel buffet"},
                estimated_cost=7000,
            )
        ],
        estimated_cost=40000,
        tips=["Carry light cotton clothing"],
        map_waypoints=[
            Waypoint(
                name="Kochi",
                latitude=9.9312,
                longitude=76.2673,
                day=1,
            )
        ],
        cost_breakdown=CostBreakdown(
            accommodation=14000,
            transportation=10000,
            food=8000,
            activities=6000,
            miscellaneous=2000,
            total=40000,
        ),
        waypoints=[
            Waypoint(
                name="Kochi",
                latitude=9.9312,
                longitude=76.2673,
                day=1,
            )
        ],
        generated_at="2026-05-17T12:00:00",
    )


def trip_payload():
    return {
        "destination": "Kerala",
        "duration": 5,
        "budget": 40000,
        "travel_style": "relaxation",
        "group_size": 2,
        "interests": ["food", "beaches"],
        "start_date": "2026-06-10",
        "end_date": "2026-06-14",
    }


def test_trip_recommendation_returns_service_payload(client, monkeypatch):
    def mock_generate_recommendation(**kwargs):
        assert kwargs["destination"] == "Kerala"
        assert kwargs["duration"] == 5
        assert kwargs["budget"] == 40000
        return fake_recommendation()

    monkeypatch.setattr(trips.ai_service, "generate_recommendation", mock_generate_recommendation)

    response = client.post("/api/trips/recommend", json=trip_payload())

    assert response.status_code == 200
    body = response.json()
    assert body["destination"] == "Kerala"
    assert body["estimated_cost"] == 40000
    assert body["cost_breakdown"]["transportation"] == 10000
    assert body["map_waypoints"][0]["name"] == "Kochi"


def test_trip_recommendation_maps_service_validation_errors(client, monkeypatch):
    def mock_generate_recommendation(**kwargs):
        raise ValueError("Unsupported destination")

    monkeypatch.setattr(trips.ai_service, "generate_recommendation", mock_generate_recommendation)

    response = client.post("/api/trips/recommend", json=trip_payload())

    assert response.status_code == 400
    assert response.json()["detail"] == "Unsupported destination"
