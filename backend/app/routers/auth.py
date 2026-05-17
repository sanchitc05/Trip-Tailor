import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.models import TokenResponse, UserLogin, UserSignup
from app.utils.auth import create_access_token, decode_token, hash_password, verify_password

router = APIRouter(prefix="/api/auth", tags=["auth"])
security = HTTPBearer(auto_error=False)

# In-memory user storage (replace with database in production)
users_db = {}


@router.post("/signup", response_model=TokenResponse)
async def signup(user_data: UserSignup):
    """Register a new user"""

    # Check if user already exists
    for user in users_db.values():
        if user["email"] == user_data.email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

    # Create new user
    user_id = str(uuid.uuid4())
    users_db[user_id] = {
        "user_id": user_id,
        "email": user_data.email,
        "password_hash": hash_password(user_data.password),
        "full_name": user_data.full_name,
    }

    # Create access token
    access_token = create_access_token(user_id)

    return TokenResponse(
        access_token=access_token,
        user_id=user_id,
        user={
            "id": user_id,
            "email": user_data.email,
            "name": user_data.full_name,
        },
    )


@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    """Login user and return JWT token"""

    # Find user by email
    user = None
    for u in users_db.values():
        if u["email"] == credentials.email:
            user = u
            break

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    # Verify password
    if not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    # Create access token
    access_token = create_access_token(user["user_id"])

    return TokenResponse(
        access_token=access_token,
        user_id=user["user_id"],
        user={
            "id": user["user_id"],
            "email": user["email"],
            "name": user["full_name"],
        },
    )


@router.post("/logout")
async def logout():
    """Logout user (client-side removes token)"""
    return {"message": "Logout successful"}


@router.get("/me")
async def me(credentials: HTTPAuthorizationCredentials | None = Depends(security)):
    """Return the current authenticated user from the JWT token."""

    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    user_id = decode_token(credentials.credentials)
    if not user_id or user_id not in users_db:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    user = users_db[user_id]
    return {
        "id": user["user_id"],
        "email": user["email"],
        "name": user["full_name"],
    }
