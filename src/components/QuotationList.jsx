import { useState, useEffect } from 'react';
import { getQuotations, deleteQuotation } from '../services/appsScript';

const QuotationList = () => {
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quotation?')) {
      try {
        await deleteQuotation(id);
        setQuotations(quotations.filter(q => q.id !== id));
      } catch (error) {
        console.error('Error deleting quotation:', error);
      }
    }
  };

  if (loading) return <div className="text-center py-4">Loading quotations...</div>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Quotations</h2>
      {quotations.length === 0 ? (
        <p className="text-gray-500">No quotations found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quotations.map((quotation) => (
                <tr key={quotation.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quotation.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quotation.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{quotation.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${quotation.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${quotation.status === 'Accepted' ? 'bg-green-100 text-green-800' : 
                        quotation.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                        quotation.status === 'Sent' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {quotation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quotation.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button 
                      onClick={() => handleDelete(quotation.id)} 
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QuotationList;