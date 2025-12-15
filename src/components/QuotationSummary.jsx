import React from 'react';
import { Printer, Download, FileSpreadsheet } from 'lucide-react';

const QuotationSummary = React.forwardRef(({ 
  cart, 
  customerDetails, 
  grandTotal,
  onPrint,
  onDownloadPDF,
  onExportCSV,
  onReset
}, ref) => {
  return (
    <div>
      <div ref={ref} className="bg-white rounded-lg shadow-lg p-8 mb-6 print-content">
        <div className="text-center mb-8 border-b-2 border-indigo-600 pb-6">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">QUOTATION</h1>
          <p className="text-gray-600 text-lg">
            Date: {new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-gray-500 text-sm mt-2">Quote #QT-{Date.now().toString().slice(-8)}</p>
        </div>

        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Customer Name</p>
              <p className="text-lg font-semibold text-gray-800">{customerDetails.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Business Name</p>
              <p className="text-lg font-semibold text-gray-800">{customerDetails.businessName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Email</p>
              <p className="text-lg font-semibold text-gray-800">{customerDetails.email}</p>
            </div>
            {customerDetails.notes && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600 font-medium">Notes</p>
                <p className="text-gray-800 mt-1">{customerDetails.notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Services & Add-ons</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300 bg-gray-50">
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Service</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Add-ons</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="py-4 px-4 font-semibold text-gray-800">{item.service.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {item.addons.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {item.addons.map(addon => (
                            <li key={addon.id}>{addon.name} (+₹{addon.price.toLocaleString('en-IN')})</li>
                          ))}
                        </ul>
                      ) : (
                        'No add-ons'
                      )}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-gray-800">
                      ₹{item.total.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-lg border-2 border-indigo-200">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-800">Grand Total:</span>
            <span className="text-3xl font-bold text-indigo-600">
              ₹{grandTotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
          <p>Thank you for your business!</p>
          <p className="mt-2">This quotation is valid for 30 days from the date of issue.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 print-hidden">
        <button
          onClick={onPrint}
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
        >
          <Printer size={20} />
          Print Quotation
        </button>
        <button
          onClick={onDownloadPDF}
          className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
        >
          <Download size={20} />
          Download PDF
        </button>
        <button
          onClick={onExportCSV}
          className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2"
        >
          <FileSpreadsheet size={20} />
          Export CSV
        </button>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition font-semibold print-hidden"
      >
        Create New Quotation
      </button>
    </div>
  );
});

QuotationSummary.displayName = 'QuotationSummary';

export default QuotationSummary;