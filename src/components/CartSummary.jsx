import React from 'react';
import { Trash2 } from 'lucide-react';

const CartSummary = ({ cart, onRemoveItem, onProceed }) => {
  const getGrandTotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Cart Summary</h2>
      
      <div className="space-y-3 mb-6">
        {cart.map(item => (
          <div 
            key={item.id} 
            className="flex justify-between items-start border-b pb-3 last:border-b-0"
          >
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{item.service.name}</p>
              {item.addons.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  + {item.addons.map(a => a.name).join(', ')}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4 ml-4">
              <span className="font-bold text-indigo-600 whitespace-nowrap">
                ₹{item.total.toLocaleString('en-IN')}
              </span>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700 transition"
                title="Remove from cart"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between items-center text-xl font-bold">
          <span className="text-gray-700">Grand Total:</span>
          <span className="text-indigo-600">
            ₹{getGrandTotal().toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <button
        onClick={onProceed}
        className="w-full bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold text-lg"
      >
        Proceed to Customer Details
      </button>
    </div>
  );
};

export default CartSummary;