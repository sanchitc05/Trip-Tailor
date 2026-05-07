import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AppLayout from "@/layouts/AppLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";

const LoadingStatePage = lazy(() =>
  import("@/pages/LoadingStatePage"),
);
const LandingPage = lazy(() =>
  import("@/pages/LandingPage"),
);
const ContactPage = lazy(() =>
  import("@/pages/ContactPage"),
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
    <Suspense fallback={<div className="p-8 text-sm text-slate-300">Loading Trip Tailor...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route path="/auth" element={<MainLayout />}>
          <Route path="sign-in" element={<AuthPage mode="signin" />} />
          <Route path="sign-up" element={<AuthPage mode="signup" />} />
          <Route path="forgot-password" element={<AuthPage mode="forgot" />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="trip-planner" element={<TripPlannerPage />} />
            <Route path="route-comparison" element={<RouteComparisonPage />} />
            <Route path="expense-calculator" element={<ExpenseCalculatorPage />} />
            <Route path="accommodations" element={<AccommodationPage />} />
            <Route path="recommendations" element={<RecommendationsPage />} />
            <Route path="map" element={<MapPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="empty" element={<EmptyStatePage />} />
            <Route path="loading" element={<LoadingStatePage />} />
          </Route>
        </Route>

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
}
