import { useState, useEffect } from 'react';
import { addBill } from '../services/appsScript';
import { getQuotations } from '../services/appsScript';

const BillForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    quotationId: '',
    amount: '',
    status: 'Unpaid',
    date: new Date().toLocaleDateString(),
  });
  
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      const data = await getQuotations();
      setQuotations(data);
    } catch (error) {
      console.error('Error fetching quotations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuotationChange = (e) => {
    const quotationId = e.target.value;
    const selectedQuotation = quotations.find(q => q.id === quotationId);
    
    setFormData(prev => ({
      ...prev,
      quotationId,
      amount: selectedQuotation ? selectedQuotation.total : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate a simple ID
      const billWithId = {
        ...formData,
        id: `B${Date.now()}`,
      };
      
      await addBill(billWithId);
      alert('Bill added successfully!');
      setFormData({
        id: '',
        quotationId: '',
        amount: '',
        status: 'Unpaid',
        date: new Date().toLocaleDateString(),
      });
    } catch (error) {
      console.error('Error adding bill:', error);
      alert('Failed to add bill');
    }
  };

  if (loading) return <div className="text-center py-4">Loading quotations...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">Create New Bill</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Quotation</label>
          <select
            name="quotationId"
            value={formData.quotationId}
            onChange={handleQuotationChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a quotation</option>
            {quotations.map((q) => (
              <option key={q.id} value={q.id}>
                {q.customer} - ${q.total}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Create Bill
        </button>
      </form>
    </div>
  );
};

export default BillForm;