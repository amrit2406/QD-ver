import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const AddOnsSelection = () => {
  const { cart, addAddOnToService, removeAddOnFromService } = useAppContext();
  const navigate = useNavigate();
  const [openServiceId, setOpenServiceId] = useState(null);

  const toggleAddOn = (serviceId, addOn, isSelected) => {
    if (isSelected) {
      removeAddOnFromService(serviceId, addOn.id);
    } else {
      addAddOnToService(serviceId, addOn);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Select Add-Ons</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">No services selected. Please add services first.</p>
      ) : (
        cart.map(({ service, addOns }) => (
          <div key={service.id} className="mb-6 border rounded p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{service.name}</h2>
              <button
                onClick={() =>
                  setOpenServiceId(openServiceId === service.id ? null : service.id)
                }
                className="text-blue-600 hover:underline"
                aria-expanded={openServiceId === service.id}
                aria-controls={`addons-panel-${service.id}`}
              >
                {openServiceId === service.id ? "Hide Add-Ons" : "Add Add-Ons"}
              </button>
            </div>

            {openServiceId === service.id && (
              <div
                id={`addons-panel-${service.id}`}
                className="mt-4 border-t pt-4 space-y-2 animate-fadeIn"
                style={{ animationDuration: "0.3s" }}
              >
                {service.addOns.length === 0 ? (
                  <p className="text-gray-600">No add-ons available for this service.</p>
                ) : (
                  service.addOns.map((addOn) => {
                    const isSelected = addOns.some((a) => a.id === addOn.id);
                    return (
                      <label
                        key={addOn.id}
                        className={`flex items-center space-x-4 p-2 rounded cursor-pointer select-none ${
                          isSelected ? "bg-blue-100" : "hover:bg-blue-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleAddOn(service.id, addOn, isSelected)}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="flex-grow">{addOn.name}</span>
                        <span>₹{addOn.price.toLocaleString()}</span>
                      </label>
                    );
                  })
                )}
              </div>
            )}
          </div>
        ))
      )}

      <div className="flex justify-end">
        <button
          onClick={() => navigate("/customer")}
          disabled={cart.length === 0}
          className={`px-6 py-2 rounded text-white ${
            cart.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddOnsSelection;
