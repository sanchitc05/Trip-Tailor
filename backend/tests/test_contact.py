def test_contact_endpoint_accepts_valid_message(client):
    response = client.post(
        "/api/contact",
        json={
            "name": "Trip Tailor User",
            "email": "traveler@example.com",
            "message": "I need help planning a five day itinerary.",
        },
    )

    assert response.status_code == 200
    assert response.json()["status"] == "success"


def test_contact_endpoint_validates_message_length(client):
    response = client.post(
        "/api/contact",
        json={
            "name": "Trip Tailor User",
            "email": "traveler@example.com",
            "message": "Too short",
        },
    )

    assert response.status_code == 422
