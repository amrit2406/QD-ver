import React from 'react';
import { Check } from 'lucide-react';

const AddonsPage = ({ 
  service, 
  selectedAddons, 
  onToggleAddon, 
  onAddToCart, 
  onBack 
}) => {
  const calculateTotal = () => {
    return service.basePrice + selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={onBack}
          className="text-indigo-600 mb-4 hover:underline font-medium"
        >
          ← Back to Services
        </button>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{service.name}</h2>
        <p className="text-gray-600 mb-6">{service.description}</p>
        
        {/* Base Price */}
        <div className="bg-indigo-50 p-4 rounded-lg mb-6 border-2 border-indigo-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Base Price:</span>
            <span className="text-2xl font-bold text-indigo-600">
              ₹{service.basePrice.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Add-ons Section */}
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Available Add-ons {service.addons.length > 0 && `(${service.addons.length})`}
        </h3>
        
        {service.addons.length > 0 ? (
          <div className="space-y-3 mb-6">
            {service.addons.map(addon => {
              const isSelected = !!selectedAddons.find(a => a.id === addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => onToggleAddon(addon)}
                  className={`border-2 p-4 rounded-lg cursor-pointer transition duration-200 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 shadow-md'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                        isSelected 
                          ? 'bg-indigo-600 border-indigo-600' 
                          : 'border-gray-300'
                      }`}>
                        {isSelected && <Check size={16} className="text-white" />}
                      </div>
                      <span className="font-semibold text-gray-800">{addon.name}</span>
                    </div>
                    <span className="font-bold text-indigo-600">
                      +₹{addon.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg mb-6">
            <p className="text-gray-500">No add-ons available for this service.</p>
          </div>
        )}

        {/* Total Price */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border-2 border-gray-300">
          <div className="flex justify-between items-center text-xl font-bold">
            <span className="text-gray-700">Total Price:</span>
            <span className="text-indigo-600">
              ₹{calculateTotal().toLocaleString('en-IN')}
            </span>
          </div>
          {selectedAddons.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              Base: ₹{service.basePrice.toLocaleString('en-IN')} + Add-ons: ₹
              {selectedAddons.reduce((sum, a) => sum + a.price, 0).toLocaleString('en-IN')}
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold text-lg shadow-lg hover:shadow-xl"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default AddonsPage;