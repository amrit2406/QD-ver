// src/pages/CustomerPage.jsx

import { useNavigate } from 'react-router-dom';
import { useQuote } from '../context/QuoteContext';
import CustomerForm from '../components/CustomerForm';

export default function CustomerPage() {
  const { dispatch } = useQuote();
  const navigate = useNavigate();

  const handleSubmit = (customerData) => {
    dispatch({ type: 'SET_CUSTOMER', payload: customerData });
    navigate('/quotation');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Customer Details</h1>
      <CustomerForm onSubmit={handleSubmit} />
    </div>
  );
}
