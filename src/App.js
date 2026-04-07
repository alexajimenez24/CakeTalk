import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import SavedCakesPage from "./pages/SavedCakesPage";
import SetBudgetPage from "./pages/SetBudgetPage";
import VenuePage from "./pages/VenuePage";
import FlavorPage from "./pages/FlavorPage";
import DesignPage from "./pages/DesignPage";
import SubmitPage from "./pages/SubmitPage";
import ThankYouPage from "./pages/ThankYouPage";

function ProtectedRoute({ children }) {
  const currentUser = localStorage.getItem("caketalk_current_user");
  return currentUser ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/saved"
        element={
          <ProtectedRoute>
            <SavedCakesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/budget"
        element={
          <ProtectedRoute>
            <SetBudgetPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/venue"
        element={
          <ProtectedRoute>
            <VenuePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/flavor"
        element={
          <ProtectedRoute>
            <FlavorPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/design"
        element={
          <ProtectedRoute>
            <DesignPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/submit"
        element={
          <ProtectedRoute>
            <SubmitPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/thank-you"
        element={
          <ProtectedRoute>
            <ThankYouPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}