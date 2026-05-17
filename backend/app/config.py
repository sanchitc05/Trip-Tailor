import os
from functools import lru_cache

from dotenv import load_dotenv

load_dotenv()


class Settings:
    # App
    app_name: str = os.getenv("APP_NAME", "Trip Tailor API")
    environment: str = os.getenv("ENVIRONMENT", "development")

    # APIs
    google_api_key: str = os.getenv("GOOGLE_API_KEY", os.getenv("GEMINI_API_KEY", ""))
    gemini_api_key: str = google_api_key

    # CORS
    cors_origins: list[str] = [
        origin.strip()
        for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
        if origin.strip()
    ]

    # JWT
    secret_key: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    algorithm: str = "HS256"
    access_token_expire_hours: int = 24


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
