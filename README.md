# Trip Tailor Frontend (React + Vite)

Trip Tailor frontend has been redesigned into a modern, scalable React architecture with premium UI foundations for AI-first travel planning workflows.

## Stack

- React 18 + Vite
- Tailwind CSS v4
- React Router DOM
- Framer Motion
- Axios (with interceptors)
- Zustand for global state
- TanStack Query
- Radix UI primitives
- Recharts for analytics visualizations

## Frontend Architecture

```text
src/
├── animations/
├── api/
├── assets/
├── components/
├── constants/
├── context/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── store/
├── styles/
└── utils/
```

## Implemented Pages

- Landing page
- Authentication (Sign In / Sign Up / Forgot Password)
- Dashboard
- Trip Planner
- Route Comparison
- Expense Calculator
- Accommodation Finder
- Recommendation System
- Interactive Map
- User Profile
- Contact Page
- Error/empty/loading states

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure env:
   ```bash
   cp .env.example .env
   ```
3. Run development server:
   ```bash
   npm run dev
   ```
4. Build production bundle:
   ```bash
   npm run build
   ```

## Environment Variables

Use `.env` with:

- `VITE_API_BASE_URL`
- `VITE_MAP_PROVIDER`
- `VITE_MAPBOX_TOKEN`
- `VITE_GOOGLE_MAPS_API_KEY`

## API Layer

- `src/services/http.js`: central Axios instance + auth/error interceptors
- `src/api/`: domain API modules for auth, trips, recommendations, and planner actions

## State Layer

- `src/store/useAppStore.js`: auth, trip, preferences, recommendation, and UI state

## Production Hardening (Phase 2)

- Protected application routes via `src/routes/ProtectedRoute.jsx`
- Form validation and schema-driven auth forms using React Hook Form + Zod
- Auth hooks with TanStack Query in `src/hooks/useAuth.js`
- Mapbox scaffolding with env-driven provider/token in `src/components/map/MapWrapper.jsx`
- Vitest + Testing Library setup under `src/tests/`

## Data Integration (Phase 3)

- Route-level page splitting (`src/pages/*.jsx`) for cleaner code splitting
- Query hooks in `src/hooks/useTravelData.js` for:
  - upcoming trips
  - route comparison
  - recommendations
  - hotels
  - expense breakdown
  - itinerary generation mutation
- API-first with safe fallback mock data in `src/constants/mockData.js` for local/dev resilience

## Reliability Layer (Phase 4)

- Runtime API contract validation with Zod in `src/utils/apiSchemas.js`
- Global error boundary in `src/components/errors/AppErrorBoundary.jsx`
- Global async error toast pipeline via `src/context/ToastContext.jsx` + Query/Muation cache error hooks
- Optimistic recommendation save/unsave mutation in `useToggleRecommendationSave`

## Next Engineering Steps

- Connect each page to live Django/FastAPI endpoints
- Add robust form schemas using React Hook Form + Zod
- Add map provider SDK (Mapbox or Google Maps) into `MapWrapper`
- Introduce test suite (Vitest + React Testing Library + Playwright)
