// src/app/router.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import { useQuote } from "../context/QuoteContext";

import ServicesPage from "../pages/ServicesPage";
import AddOnsPage from "../pages/AddOnsPage";
import CustomerPage from "../pages/CustomerPage";
import QuotationPage from "../pages/QuotationPage";
import FinalBillPage from "../pages/FinalBillPage";

function ProtectedRoute({ condition, redirectTo, children }) {
  return condition ? children : <Navigate to={redirectTo} replace />;
}

export default function Router() {
  const { state } = useQuote();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/services" replace />} />

      <Route path="/services" element={<ServicesPage />} />

      <Route
        path="/addons"
        element={
          <ProtectedRoute
            condition={state.services.length > 0}
            redirectTo="/services"
          >
            <AddOnsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer"
        element={
          <ProtectedRoute
            condition={state.services.length > 0}
            redirectTo="/services"
          >
            <CustomerPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quotation"
        element={
          <ProtectedRoute condition={!!state.customer} redirectTo="/customer">
            <QuotationPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bill"
        element={
          <ProtectedRoute condition={state.confirmed} redirectTo="/quotation">
            <FinalBillPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
