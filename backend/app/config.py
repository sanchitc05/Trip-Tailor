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

    # Database
    database_url: str = os.getenv(
        "DATABASE_URL", "postgresql+asyncpg://postgres:password@localhost:5432/trip_tailor"
    )

    # JWT
    secret_key: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    algorithm: str = os.getenv("ALGORITHM", "HS256")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))
    refresh_token_expire_days: int = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7"))


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
