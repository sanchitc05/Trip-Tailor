import uuid
import enum
from datetime import datetime

from sqlalchemy import Column, DateTime, Float, ForeignKey, String, Date, Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database import Base


class ExpenseCategory(str, enum.Enum):
    fuel = "fuel"
    ticket = "ticket"
    hotel = "hotel"
    food = "food"
    misc = "misc"


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    trip_id = Column(UUID(as_uuid=True), ForeignKey("trips.id", ondelete="CASCADE"), nullable=True)
    category = Column(SAEnum(ExpenseCategory), nullable=False)  # fuel, ticket, hotel, food, misc
    amount = Column(Float, nullable=False)
    currency = Column(String, default="INR")
    description = Column(String, nullable=True)
    date = Column(Date, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="expenses")
    trip = relationship("Trip", back_populates="expenses")

