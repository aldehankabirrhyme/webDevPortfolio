import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";

import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsConditions";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Public */}
          <Route path="/" element={<App />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </HelmetProvider>
);
