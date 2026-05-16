# Trip Tailor

Trip Tailor is organized as a monorepo with a React + Vite frontend, a FastAPI backend, and archived legacy HTML/CSS/JS pages for migration reference.

## Repository Layout

```text
Trip-Tailor/
|-- .github/workflows/  GitHub Actions workflows
|-- frontend/           React + Vite app
|-- backend/            FastAPI app
|-- legacy/             Original HTML/CSS/JS pages for reference
|-- contributors/       Contributor recognition page
|-- .gitignore
|-- README.md
|-- LICENSE
`-- Code of Conduct.md
```

## Frontend

The frontend lives in `frontend/`.

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Key paths:

- `frontend/src/components/` shared React components
- `frontend/src/components/ui/` reusable UI primitives
- `frontend/src/pages/` route-level pages
- `frontend/src/hooks/` custom React hooks
- `frontend/src/store/` Zustand state slices
- `frontend/src/services/` Axios and backend API clients
- `frontend/public/` static public assets, including logos

## Backend

The backend lives in `backend/`.

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

Key paths:

- `backend/app/main.py` FastAPI app entry point
- `backend/app/config.py` settings and environment loading
- `backend/app/routers/` route modules
- `backend/app/models/` Pydantic request/response models
- `backend/app/services/` business logic and external API calls
- `backend/app/utils/` shared backend helpers

The API exposes `GET /health` for a basic health check.

## Legacy Archive

The `legacy/` folder contains the original HTML/CSS/JS pages before the React + Vite migration. Treat it as reference material only; new features should go into `frontend/` and `backend/`.
