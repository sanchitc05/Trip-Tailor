def signup_payload(**overrides):
    payload = {
        "email": "traveler@example.com",
        "password": "secret123",
        "full_name": "Trip Tailor User",
    }
    payload.update(overrides)
    return payload


def test_signup_returns_jwt_and_user(client):
    response = client.post("/api/auth/signup", json=signup_payload())

    assert response.status_code == 200
    body = response.json()
    assert body["token_type"] == "bearer"
    assert body["access_token"]
    assert body["user"]["email"] == "traveler@example.com"


def test_signup_rejects_duplicate_email(client):
    client.post("/api/auth/signup", json=signup_payload())

    response = client.post("/api/auth/signup", json=signup_payload())

    assert response.status_code == 400
    assert response.json()["detail"] == "Email already registered"


def test_login_me_and_logout_flow(client):
    client.post("/api/auth/signup", json=signup_payload())

    login_response = client.post(
        "/api/auth/login",
        json={"email": "traveler@example.com", "password": "secret123"},
    )

    assert login_response.status_code == 200
    token = login_response.json()["access_token"]

    me_response = client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert me_response.status_code == 200
    assert me_response.json()["name"] == "Trip Tailor User"

    logout_response = client.post("/api/auth/logout")

    assert logout_response.status_code == 200
    assert logout_response.json()["message"] == "Logout successful"


def test_login_rejects_invalid_credentials(client):
    client.post("/api/auth/signup", json=signup_payload())

    response = client.post(
        "/api/auth/login",
        json={"email": "traveler@example.com", "password": "wrong-password"},
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"


def test_me_requires_authentication(client):
    response = client.get("/api/auth/me")

    assert response.status_code == 401
    assert response.json()["detail"] == "Not authenticated"
