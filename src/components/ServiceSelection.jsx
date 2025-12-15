
import { Plus,Trash2  } from 'lucide-react';

// Service Selection Component
function ServiceSelection({ services, onServiceSelect, cart, onRemoveItem, onProceed, onBack }) {
  return (
    <div>
      <button onClick={onBack} className="text-indigo-600 hover:underline mb-4 font-medium">
        ← Back to Home
      </button>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(service => (
            <div key={service.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-400 transition">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-indigo-600">₹{service.basePrice.toLocaleString('en-IN')}</span>
                <button
                  onClick={() => onServiceSelect(service)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                >
                  <Plus size={20} />
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {cart.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Cart Summary</h2>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center border-b py-3">
              <div>
                <p className="font-semibold">{item.service.name}</p>
                {item.addons.length > 0 && (
                  <p className="text-sm text-gray-600">+ {item.addons.map(a => a.name).join(', ')}</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-indigo-600">₹{item.total.toLocaleString('en-IN')}</span>
                <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-xl font-bold">Total: ₹{cart.reduce((sum, item) => sum + item.total, 0).toLocaleString('en-IN')}</div>
            <button
              onClick={onProceed}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Proceed to Customer Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceSelection;