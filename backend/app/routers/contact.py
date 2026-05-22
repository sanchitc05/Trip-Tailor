from fastapi import APIRouter
from app.schemas.contact import ContactMessage

router = APIRouter(prefix="/api", tags=["contact"])


@router.post("/contact")
async def send_contact_message(message: ContactMessage):
    """
    Handle contact form submissions.
    TODO: Integrate with email service (SendGrid, Mailgun, etc.)
    """

    # In production, send email here
    # For now, just return success
    print(f"Contact message received: {message.dict()}")

    return {
        "status": "success",
        "message": "Your message has been received. We'll get back to you soon!",
    }
