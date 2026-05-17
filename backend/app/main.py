from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import auth, contact, trips

app = FastAPI(title=settings.app_name)
frontend_origin = "http://localhost:5173"

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(dict.fromkeys([frontend_origin, *settings.cors_origins])),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(contact.router)
app.include_router(trips.router)


@app.get("/health")
async def health_check():
    return {"status": "ok"}
