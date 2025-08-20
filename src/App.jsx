import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppContext } from "./context/AppContext";

// import ServiceSelection from "./pages/ServiceSelection";
// import AddOnsSelection from "./pages/AddOnsSelection";
// import CustomerDetails from "./pages/CustomerDetails";
// import QuotationSummary from "./pages/QuotationSummary";
// import FinalBill from "./pages/FinalBill";

import servicesData from "./data/servicesData"; // Static services with add-ons
import ServiceSelection from "./pages/ServiceSelection";
import CustomerDetails from "./pages/CustomerDetails";
import QuotationSummary from "./pages/QuotationSummary";
import FinalBill from "./pages/FinalBill";
import AddOnsSelection from "./pages/AddOnsSelection";

const App = () => {
  const { setServices, cart } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Load all services on app start (static import)
    setServices(servicesData);
  }, [setServices]);

  useEffect(() => {
    // Redirect to first step if no cart item
    if (cart.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  return (
    <Routes>
      <Route path="/" element={<ServiceSelection />} />
      <Route path="/addons" element={<AddOnsSelection />} />
      <Route path="/customer" element={<CustomerDetails />} />
      <Route path="/summary" element={<QuotationSummary />} />
      <Route path="/finalbill" element={<FinalBill />} />
    </Routes>
  );
};

export default App;
