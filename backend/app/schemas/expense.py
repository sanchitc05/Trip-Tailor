from datetime import date, datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field, field_validator
from app.models.expense import ExpenseCategory


class ExpenseCreate(BaseModel):
    category: ExpenseCategory
    amount: float = Field(..., gt=0, le=10_000_000)
    currency: str = Field("INR", max_length=10)
    description: Optional[str] = Field(None, max_length=500)
    date: date
    trip_id: Optional[UUID] = None

    @field_validator('currency', 'description', mode='before')
    @classmethod
    def strip_whitespace(cls, v):
        if isinstance(v, str):
            v = v.strip()
            if not v:
                return None
        return v




class ExpenseOut(ExpenseCreate):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ExpenseListOut(BaseModel):
    items: List[ExpenseOut]
    total: int
    skip: int
    limit: int


