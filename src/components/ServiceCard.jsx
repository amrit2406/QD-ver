// src/components/ServiceCard.jsx

import { useState } from 'react';
import Modal from './Modal';

export default function ServiceCard({ service, onAdd }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-2">{service.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{service.shortDesc}</p>
        <p className="font-bold text-gray-800">₹{service.price}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setShowDetails(true)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
        >
          Show Details
        </button>

        <button
          onClick={onAdd}
          className="flex-1 bg-blue-600 text-white rounded-lg px-3 py-2 text-sm hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>

      {showDetails && (
        <Modal onClose={() => setShowDetails(false)} title={service.name}>
          <p className="text-sm text-gray-700 mb-2">{service.description}</p>
          <p className="font-semibold">Price: ₹{service.price}</p>
        </Modal>
      )}
    </div>
  );
}
