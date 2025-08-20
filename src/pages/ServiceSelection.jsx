import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ServiceSelection = () => {
  const { services, addServiceToCart, cart } = useAppContext();
  const navigate = useNavigate();
  const [modalService, setModalService] = useState(null);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Select Services</h1>

      {/* Service cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="border rounded-lg p-4 shadow-sm flex flex-col">
            <h2 className="text-xl font-bold mb-1">{service.name}</h2>
            <p className="flex-grow">{service.shortDesc}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setModalService(service)}
                className="text-blue-600 hover:underline"
              >
                Show Details
              </button>
              <button
                onClick={() => addServiceToCart(service)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                disabled={cart.some((c) => c.service.id === service.id)}
              >
                {cart.some((c) => c.service.id === service.id) ? "Added" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalService && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setModalService(null)}
        >
          <div
            className="bg-white max-w-md p-8 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">{modalService.name}</h3>
            <p>{modalService.fullDesc}</p>
            <p className="mt-2 font-semibold">
              Price: ₹{modalService.price.toLocaleString()}
            </p>
            <button
              onClick={() => setModalService(null)}
              className="mt-6 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Floating cart and proceed */}
      {cart.length > 0 && (
        <div className="fixed bottom-5 right-5 bg-blue-600 text-white rounded-full px-4 py-3 shadow-lg flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/addons")}
          title="Proceed to Add-Ons"
        >
          <span>🛒 {cart.length}</span>
          <span>Proceed to Next</span>
        </div>
      )}
    </div>
  );
};

export default ServiceSelection;
