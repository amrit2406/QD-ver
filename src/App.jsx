import { useState, useEffect } from 'react';
import QuotationForm from './components/QuotationForm';
import QuotationList from './components/QuotationList';
import BillForm from './components/BillForm';
import BillList from './components/BillList';
import { getQuotations } from './services/appsScript';

function App() {
  const [quotations, setQuotations] = useState([]);
  const [activeTab, setActiveTab] = useState('quotations');

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const data = await getQuotations();
        setQuotations(data);
      } catch (error) {
        console.error('Error fetching quotations:', error);
      }
    };

    fetchQuotations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quotation & Bill Manager</h1>
          <p className="text-gray-600 mt-2">Manage your quotations and bills with Google Sheets</p>
        </header>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('quotations')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'quotations'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Quotations
              </button>
              <button
                onClick={() => setActiveTab('bills')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'bills'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Bills
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'quotations' ? (
              <>
                <QuotationForm />
                <QuotationList />
              </>
            ) : (
              <>
                <BillForm quotations={quotations} />
                <BillList />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;