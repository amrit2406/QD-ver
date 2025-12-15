// src/pages/ServicesPage.jsx

import { useNavigate } from 'react-router-dom';
import { useQuote } from '../context/QuoteContext';
import ServiceCard from '../components/ServiceCard';
import CartFloating from '../components/CartFloating';
import servicesData from '../data/services';

export default function ServicesPage() {
  const { state, dispatch } = useQuote();
  const navigate = useNavigate();

  const handleAddService = (service) => {
    dispatch({ type: 'ADD_SERVICE', payload: service });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Select Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {servicesData.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            onAdd={() => handleAddService(service)}
          />
        ))}
      </div>

      {state.services.length > 0 && (
        <CartFloating
          count={state.services.length}
          onProceed={() => navigate('/addons')}
        />
      )}
    </div>
  );
}
