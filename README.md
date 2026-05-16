# Trip Tailor ✈️

An AI-powered trip planning web app that generates personalized itineraries, maps routes, and tracks travel expenses — all in one place.

**Live:** [trip-tailor-eight.vercel.app](https://trip-tailor-eight.vercel.app)

---

## Features

- **AI Trip Planner** — Fill in your destination, dates, budget, travel style, and group size. Google Gemini AI generates a full itinerary with cost breakdowns and local tips.
- **Interactive Map** — Waypoints from the AI-generated itinerary are plotted on a Mapbox map so you can visualize your route.
- **Expense Calculator** — Track and chart travel expenses with interactive Recharts graphs.
- **Destinations Gallery** — Browse popular Indian destinations with filterable cards.
- **Dark / Light Theme** — System-wide toggle persisted via Zustand state.
- **Auth System** — Sign up, log in, and log out with JWT-based authentication.
- **Contact Form** — Reach out directly from the app.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Zustand, React Query, React Router, Mapbox GL, Recharts |
| **Backend** | FastAPI, Pydantic, Google Gemini AI, python-jose (JWT), passlib |
| **Testing** | Vitest + Testing Library (frontend), pytest + httpx (backend) |
| **CI/CD** | GitHub Actions (lint + test on every PR) |
| **Deployment** | Vercel (frontend), Railway / Render (backend) |

---

## Repository Layout

```text
Trip-Tailor/
├── frontend/                React + Vite app
│   ├── src/
│   │   ├── assets/          Images and static assets
│   │   ├── components/      Shared React components
│   │   │   ├── ui/          Reusable UI primitives
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   ├── ReviewsCarousel.jsx
│   │   │   ├── FAQSection.jsx
│   │   │   ├── DestinationCard.jsx
│   │   │   ├── ScrollToTopButton.jsx
│   │   │   └── TripMap.jsx
│   │   ├── hooks/           Custom React hooks
│   │   ├── pages/           Route-level pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── PlannerPage.jsx
│   │   │   ├── ExpensePage.jsx
│   │   │   ├── DestinationsPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── SignInPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   └── ContributorsPage.jsx
│   │   ├── services/        API clients (Axios)
│   │   │   ├── api.js       Base Axios instance with interceptors
│   │   │   ├── tripService.js
│   │   │   └── authService.js
│   │   ├── store/           Zustand state slices
│   │   │   └── useAppStore.js
│   │   ├── utils/           Helper utilities
│   │   └── App.jsx          Router + Layout wrapper
│   ├── tests/               Vitest + Testing Library specs
│   ├── .env.example
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── package.json
│
├── backend/                 FastAPI app
│   ├── app/
│   │   ├── main.py          App entry point + CORS config
│   │   ├── config.py        Settings and env loading
│   │   ├── routers/
│   │   │   ├── trips.py     POST /api/trips/recommend
│   │   │   ├── auth.py      POST /api/auth/signup, login, logout
│   │   │   └── contact.py   POST /api/contact
│   │   ├── models/
│   │   │   └── trip.py      TripRequest / TripResponse Pydantic models
│   │   ├── services/
│   │   │   └── ai_service.py  Google Gemini API integration
│   │   └── utils/           Shared backend helpers
│   ├── tests/               pytest + httpx test suite
│   ├── .env.example
│   └── requirements.txt
│
├── legacy/                  Original HTML/CSS/JS pages (read-only reference)
├── contributors/            Contributor recognition page
├── .github/workflows/       GitHub Actions CI pipeline
├── .gitignore
├── LICENSE
├── Code of Conduct.md
└── ROADMAP.md
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18 and **npm**
- **Python** ≥ 3.10
- API keys for **Google Gemini** and **Mapbox**

### Frontend

```bash
cd frontend
npm install
copy .env.example .env          # fill in VITE_API_BASE_URL and VITE_MAPBOX_TOKEN
npm run dev                     # → http://localhost:5173
```

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements.txt
copy .env.example .env          # fill in GOOGLE_API_KEY
uvicorn app.main:app --reload   # → http://localhost:8000
```

Verify both servers are running, then open [http://localhost:5173](http://localhost:5173).

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Basic health check |
| `POST` | `/api/trips/recommend` | AI-generated itinerary (destination, duration, budget, travel style, group size) |
| `POST` | `/api/auth/signup` | Create a new account |
| `POST` | `/api/auth/login` | Log in and receive a JWT |
| `POST` | `/api/auth/logout` | Invalidate the session |
| `POST` | `/api/contact` | Submit a contact form message |

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero section, feature cards, reviews carousel, FAQ accordion |
| `/plan` | AI Trip Planner | Multi-step form → AI itinerary + cost chart + Mapbox map |
| `/expenses` | Expense Calculator | Interactive budget tracker with Recharts visualizations |
| `/destinations` | Destinations | Browsable grid of popular Indian destination cards |
| `/contact` | Contact | Contact form wired to the backend |
| `/signin` | Sign In | Auth form with react-hook-form + zod validation |
| `/about` | About Us | Team and mission information |
| `/contributors` | Contributors | Contributor recognition |

---

## Environment Variables

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

### Backend (`backend/.env`)

```env
GOOGLE_API_KEY=your_gemini_api_key_here
```

> **Never commit** `.env` or `.env.local` files. Both are gitignored.

---

## Testing

```bash
# Frontend — Vitest + Testing Library
cd frontend
npm test

# Backend — pytest + httpx
cd backend
pytest
```

---

## CI/CD

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every PR to `main`:

1. **Frontend** — `npm ci && npm test`
2. **Backend** — `pip install -r requirements.txt && pytest`

PRs are blocked from merging if any test fails.

### Deployment

| Platform | Service |
|---|---|
| **Vercel** | Frontend — auto-deploys from `main` |
| **Railway / Render** | Backend — FastAPI server |
| **Supabase / MongoDB Atlas** | Database (when added) |

Set all environment variables in the platform dashboards — never in the repository.

---

## Contributing

1. **Fork** the repo and **clone** your fork.
2. Create a **feature branch** (`git checkout -b feature/my-feature`).
3. Make your changes — keep pages thin, push logic into hooks and services.
4. Run the test suites to make sure nothing breaks.
5. **Open a PR** into `main`.

Please read the [Code of Conduct](Code%20of%20Conduct.md) before contributing.

---

## License

This project is licensed under the terms of the [MIT License](LICENSE).
