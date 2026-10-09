import { createBrowserRouter, Navigate } from "react-router";
import { AuthProvider } from "../context/AuthContext";
import MarketingLayout from "../layouts/MarketingLayout";
import AppLayout from "../layouts/AppLayout";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../pages/marketing/HomePage";
import FeaturesPage from "../pages/marketing/FeaturesPage";
import PricingPage from "../pages/marketing/PricingPage";
import AboutPage from "../pages/marketing/AboutPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPage from "../pages/auth/ForgotPage";
import DashboardPage from "../pages/app/DashboardPage";
import SolutionsPage from "../pages/app/SolutionsPage";
import SolutionDetailPage from "../pages/app/SolutionDetailPage";
import ParleyPage from "../pages/app/ParleyPage";
import KnowledgePage from "../pages/app/KnowledgePage";
import AnalyticsPage from "../pages/app/AnalyticsPage";
import FuelPage from "../pages/app/FuelPage";
import TeamPage from "../pages/app/TeamPage";
import SettingsPage from "../pages/app/SettingsPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminOrgsPage from "../pages/admin/AdminOrgsPage";
import AdminSolutionsPage from "../pages/admin/AdminSolutionsPage";
import AdminRequestsPage from "../pages/admin/AdminRequestsPage";
import AdminAnalyticsPage from "../pages/admin/AdminAnalyticsPage";

export const router = createBrowserRouter([
  {
    Component: AuthProvider,
    children: [
      {
        Component: MarketingLayout,
        children: [
          { index: true, Component: HomePage },
          { path: "/features", Component: FeaturesPage },
          { path: "/pricing", Component: PricingPage },
          { path: "/about", Component: AboutPage },
        ],
      },
      { path: "/login", Component: LoginPage },
      { path: "/register", Component: RegisterPage },
      { path: "/forgot-password", Component: ForgotPage },
      {
        Component: AppLayout,
        children: [
          { path: "/dashboard", Component: DashboardPage },
          { path: "/solutions", Component: SolutionsPage },
          { path: "/solutions/detail", Component: SolutionDetailPage },
          { path: "/parley", Component: ParleyPage },
          { path: "/knowledge", Component: KnowledgePage },
          { path: "/analytics", Component: AnalyticsPage },
          { path: "/fuel", Component: FuelPage },
          { path: "/team", Component: TeamPage },
          { path: "/settings", Component: SettingsPage },
          {
            Component: AdminLayout,
            children: [
              { path: "/admin", Component: AdminDashboard },
              { path: "/admin/orgs", Component: AdminOrgsPage },
              { path: "/admin/solutions", Component: AdminSolutionsPage },
              { path: "/admin/requests", Component: AdminRequestsPage },
              { path: "/admin/analytics", Component: AdminAnalyticsPage },
            ],
          },
        ],
      },
      { path: "*", Component: () => <Navigate to="/" replace /> },
    ],
  },
]);
