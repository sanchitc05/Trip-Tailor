# Trip Tailor Roadmap

## Phase 0 — Dev Environment Setup ✅

- frontend/ scaffolded with React + Vite + React Router + Zustand + Axios
- backend/ scaffolded with FastAPI + uvicorn + pydantic + python-dotenv
- legacy/ contains all old HTML/CSS pages for reference

## Phase 1 — Frontend Foundation ✅

- src/ structure: components/, pages/, hooks/, store/, services/, utils/
- Root clutter removed (node_modules, desktop.ini, index2.html, root logos cleaned up)
- Logos moved to frontend/public/

## Phase 2 — Port Legacy Pages to React

- Port all 8 legacy HTML pages to React components under frontend/src/pages/:
  Home, TripRecommendation, ContactUs, SignIn, TravelExpenseCalculator,
  Destinations, Booking, Feedback
- Each page gets its own CSS module or Tailwind classes
- React Router routes wired in App.jsx

## Phase 3 — AI Trip Planner

- Gemini API integration in backend/app/routers/ai.py
- POST /api/ai/plan endpoint accepts destination, days, budget
- Mapbox GL JS integration in frontend for route visualization
- TripPlanner page in React consumes the endpoint

## Phase 4 — API Layer

- Axios instance in frontend/src/services/api.js with base URL + interceptors
- All pages use services/ for API calls, no inline fetch()
- CORS configured in backend/app/main.py for frontend dev origin (localhost:5173)

## Phase 5 — Testing

- Frontend: Vitest + React Testing Library, at least one test per page component
- Backend: pytest, at least one test per router
- Both run in ci.yml on pull requests

## Phase 6 — CI/CD ✅ (after this task)

- ci.yml runs frontend tests + backend pytest on PRs
- deploy.yml deploys frontend to Vercel on push to main
