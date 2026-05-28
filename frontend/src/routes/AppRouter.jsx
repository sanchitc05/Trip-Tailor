import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/routes/ProtectedRoute";

const LoadingStatePage = lazy(() => import("@/pages/LoadingStatePage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const PlannerPage = lazy(() => import("@/pages/PlannerPage"));
const ExpensePage = lazy(() => import("@/pages/ExpensePage"));
const DestinationsPage = lazy(() => import("@/pages/DestinationsPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const SignInPage = lazy(() => import("@/pages/SignInPage"));
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const RouteComparisonPage = lazy(() => import("@/pages/RouteComparisonPage"));
const AccommodationPage = lazy(() => import("@/pages/AccommodationPage"));
const RecommendationsPage = lazy(() => import("@/pages/RecommendationsPage"));
const MapPage = lazy(() => import("@/pages/MapPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const EmptyStatePage = lazy(() => import("@/pages/EmptyStatePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export default function AppRouter() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-sm text-slate-600 dark:text-slate-300">
          Loading Trip Tailor...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<HomePage />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="register" element={<AuthPage mode="signup" />} />
          <Route path="forgot-password" element={<AuthPage mode="forgot" />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="plan" element={<PlannerPage />} />
            <Route path="expenses" element={<ExpensePage />} />
            <Route path="route-comparison" element={<RouteComparisonPage />} />
            <Route path="accommodations" element={<AccommodationPage />} />
            <Route path="recommendations" element={<RecommendationsPage />} />
            <Route path="map" element={<MapPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Redirects & Utilities */}
          <Route path="auth/sign-in" element={<Navigate to="/signin" replace />} />
          <Route path="auth/sign-up" element={<Navigate to="/register" replace />} />
          <Route
            path="auth/forgot-password"
            element={<Navigate to="/forgot-password" replace />}
          />
          <Route path="trip-planner" element={<Navigate to="/plan" replace />} />
          <Route path="expense-calculator" element={<Navigate to="/expenses" replace />} />
          <Route path="empty" element={<EmptyStatePage />} />
          <Route path="loading" element={<LoadingStatePage />} />
          <Route path="404" element={<NotFoundPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
}
