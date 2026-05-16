import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";

const LoadingStatePage = lazy(() =>
  import("@/pages/LoadingStatePage"),
);
const HomePage = lazy(() =>
  import("@/pages/HomePage"),
);
const PlannerPage = lazy(() =>
  import("@/pages/PlannerPage"),
);
const ExpensePage = lazy(() =>
  import("@/pages/ExpensePage"),
);
const DestinationsPage = lazy(() =>
  import("@/pages/DestinationsPage"),
);
const AboutPage = lazy(() =>
  import("@/pages/AboutPage"),
);
const ContributorsPage = lazy(() =>
  import("@/pages/ContributorsPage"),
);
const ContactPage = lazy(() =>
  import("@/pages/ContactPage"),
);
const SignInPage = lazy(() =>
  import("@/pages/SignInPage"),
);
const AuthPage = lazy(() =>
  import("@/pages/AuthPage"),
);
const DashboardPage = lazy(() =>
  import("@/pages/DashboardPage"),
);
const TripPlannerPage = lazy(() =>
  import("@/pages/TripPlannerPage"),
);
const RouteComparisonPage = lazy(() =>
  import("@/pages/RouteComparisonPage"),
);
const ExpenseCalculatorPage = lazy(() =>
  import("@/pages/ExpenseCalculatorPage"),
);
const AccommodationPage = lazy(() =>
  import("@/pages/AccommodationPage"),
);
const RecommendationsPage = lazy(() =>
  import("@/pages/RecommendationsPage"),
);
const MapPage = lazy(() => import("@/pages/MapPage"));
const ProfilePage = lazy(() =>
  import("@/pages/ProfilePage"),
);
const EmptyStatePage = lazy(() =>
  import("@/pages/EmptyStatePage"),
);
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage"),
);

export default function AppRouter() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-slate-600 dark:text-slate-300">Loading Trip Tailor...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="plan" element={<PlannerPage />} />
          <Route path="expenses" element={<ExpensePage />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contributors" element={<ContributorsPage />} />

          <Route path="auth/sign-in" element={<Navigate to="/signin" replace />} />
          <Route path="auth/sign-up" element={<AuthPage mode="signup" />} />
          <Route path="auth/forgot-password" element={<AuthPage mode="forgot" />} />
          <Route path="trip-planner" element={<Navigate to="/plan" replace />} />
          <Route path="expense-calculator" element={<Navigate to="/expenses" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="route-comparison" element={<RouteComparisonPage />} />
          <Route path="accommodations" element={<AccommodationPage />} />
          <Route path="recommendations" element={<RecommendationsPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="empty" element={<EmptyStatePage />} />
          <Route path="loading" element={<LoadingStatePage />} />
          <Route path="404" element={<NotFoundPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
}
