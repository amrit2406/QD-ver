// src/components/AddOnPanel.jsx

import { useQuote } from '../context/QuoteContext';

export default function AddOnPanel({ serviceId, addons, onClose }) {
  const { state, dispatch } = useQuote();

  const selectedAddons = state.addons[serviceId] || [];

  const isSelected = (addonId) =>
    selectedAddons.some(a => a.id === addonId);

  const toggleAddon = (addon) => {
    if (isSelected(addon.id)) {
      dispatch({
        type: 'REMOVE_ADDON',
        payload: { serviceId, addonId: addon.id }
      });
    } else {
      dispatch({
        type: 'ADD_ADDON',
        payload: { serviceId, addon }
      });
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Available Add-Ons</h3>
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-black"
        >
          Close
        </button>
      </div>

      <div className="space-y-3">
        {addons.map(addon => (
          <div
            key={addon.id}
            className="flex justify-between items-center border rounded-lg p-3"
          >
            <div>
              <p className="font-medium">{addon.name}</p>
              <p className="text-sm text-gray-600">{addon.description}</p>
              <p className="text-sm font-semibold">₹{addon.price}</p>
            </div>

            <button
              onClick={() => toggleAddon(addon)}
              className={`px-4 py-2 rounded-lg text-sm text-white ${
                isSelected(addon.id)
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isSelected(addon.id) ? 'Remove' : 'Add'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
