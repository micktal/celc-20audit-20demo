import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Ecarts from "./pages/Ecarts";
import PlanAction from "./pages/PlanAction";
import Livrables from "./pages/Livrables";
import DashboardKpi from "./pages/DashboardKpi";
import AnalyseIncidents from "./pages/analyse-incidents";
import { AuthProvider } from "@/state/auth";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/documents"
              element={
                <ProtectedRoute>
                  <Documents />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ecarts"
              element={
                <ProtectedRoute>
                  <Ecarts />
                </ProtectedRoute>
              }
            />

            <Route
              path="/plan-action"
              element={
                <ProtectedRoute>
                  <PlanAction />
                </ProtectedRoute>
              }
            />

            <Route
              path="/livrables"
              element={
                <ProtectedRoute>
                  <Livrables />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard-kpi"
              element={
                <ProtectedRoute>
                  <DashboardKpi />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analyse-incidents"
              element={
                <ProtectedRoute>
                  <AnalyseIncidents />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
