# Trip Tailor Backend

FastAPI backend for Trip Tailor.

## Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

The API exposes a health check at `GET /health`.
