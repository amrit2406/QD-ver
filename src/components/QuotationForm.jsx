import { useState } from 'react';
import { addQuotation } from '../services/appsScript';

const QuotationForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    customer: '',
    items: '',
    total: '',
    status: 'Draft',
    date: new Date().toLocaleDateString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate a simple ID (in a real app, you'd want a more robust method)
      const quotationWithId = {
        ...formData,
        id: `Q${Date.now()}`,
      };
      
      await addQuotation(quotationWithId);
      alert('Quotation added successfully!');
      setFormData({
        id: '',
        customer: '',
        items: '',
        total: '',
        status: 'Draft',
        date: new Date().toLocaleDateString(),
      });
    } catch (error) {
      console.error('Error adding quotation:', error);
      alert('Failed to add quotation');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create New Quotation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer</label>
          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Items</label>
          <textarea
            name="items"
            value={formData.items}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Amount</label>
          <input
            type="number"
            name="total"
            value={formData.total}
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
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Quotation
        </button>
      </form>
    </div>
  );
};

export default QuotationForm;