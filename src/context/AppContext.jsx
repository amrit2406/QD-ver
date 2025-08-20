import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [services, setServices] = useState([]); // All available services (static or fetch)
  const [cart, setCart] = useState([]); // [{ serviceId, service, addOns: [] }]
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    gst: "",
  });
  const [gst, setGst] = useState(0);
  const [discount, setDiscount] = useState({ type: "percent", value: 0 });
  const [confirmedQuote, setConfirmedQuote] = useState(null);

  const addServiceToCart = (service) => {
    if (!cart.find((c) => c.service.id === service.id)) {
      setCart((prev) => [...prev, { service, addOns: [] }]);
    }
  };

  const addAddOnToService = (serviceId, addOn) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.service.id === serviceId) {
          if (!item.addOns.find((a) => a.id === addOn.id)) {
            return { ...item, addOns: [...item.addOns, addOn] };
          } 
        }
        return item;
      })
    );
  };

  const removeAddOnFromService = (serviceId, addOnId) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.service.id === serviceId) {
          return { ...item, addOns: item.addOns.filter((a) => a.id !== addOnId) };
        }
        return item;
      })
    );
  };

  const updateCustomer = (data) => {
    setCustomer(data);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        services,
        setServices,
        cart,
        addServiceToCart,
        addAddOnToService,
        removeAddOnFromService,
        customer,
        updateCustomer,
        gst,
        setGst,
        discount,
        setDiscount,
        confirmedQuote,
        setConfirmedQuote,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
