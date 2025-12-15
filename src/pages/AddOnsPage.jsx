// src/pages/AddOnsPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuote } from '../context/QuoteContext';
import AddOnPanel from '../components/AddOnPanel';
import addonsData from '../data/addons';

export default function AddOnsPage() {
  const { state } = useQuote();
  const navigate = useNavigate();
  const [activeServiceId, setActiveServiceId] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Select Add-Ons</h1>

      <div className="space-y-4">
        {state.services.map(service => (
          <div key={service.id} className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">{service.name}</h2>
                <p className="text-sm text-gray-600">Base Price: ₹{service.price}</p>
              </div>

              <button
                onClick={() => setActiveServiceId(service.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Add Add-Ons
              </button>
            </div>

            {activeServiceId === service.id && (
              <AddOnPanel
                serviceId={service.id}
                addons={addonsData[service.id] || []}
                onClose={() => setActiveServiceId(null)}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => navigate('/customer')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
