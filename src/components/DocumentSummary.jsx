import React, { useState } from 'react';
import { Printer, Download, FileSpreadsheet, Save, CheckCircle } from 'lucide-react';
import { googleSheetsAPI } from '../services/googleSheetsAPI';
import { handleDownloadPDF, handleExportCSV, handlePrint } from '../utils/exportUtils';

const DocumentSummary = ({ 
  type, 
  cart, 
  customerDetails, 
  grandTotal, 
  onBack, 
  summaryRef 
}) => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await googleSheetsAPI.saveDocument(type, {
        cart,
        customerDetails,
        grandTotal
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving document:', error);
      alert('Error saving document. Please try again.');
    }
    setSaving(false);
  };

  const typeTitle = {
    quotation: 'QUOTATION',
    proposal: 'BUSINESS PROPOSAL',
    invoice: 'INVOICE'
  };

  const typeColor = {
    quotation: 'border-blue-600',
    proposal: 'border-purple-600',
    invoice: 'border-green-600'
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Document Preview */}
      <div ref={summaryRef} className="bg-white rounded-lg shadow-lg p-8 mb-6 print-content">
        {/* Header */}
        <div className={`text-center mb-8 border-b-4 ${typeColor[type]} pb-6`}>
          <h1 className="text-5xl font-bold text-indigo-900 mb-3">{typeTitle[type]}</h1>
          <p className="text-gray-600 text-lg">
            Date: {new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Document #{type.toUpperCase().substring(0, 3)}-{Date.now().toString().slice(-8)}
          </p>
        </div>

        {/* Customer Information */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
            Customer Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Customer Name</p>
              <p className="text-lg font-semibold text-gray-800">{customerDetails.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Business Name</p>
              <p className="text-lg font-semibold text-gray-800">{customerDetails.businessName}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600 font-medium">Email Address</p>
              <p className="text-lg font-semibold text-gray-800">{customerDetails.email}</p>
            </div>
            {customerDetails.notes && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600 font-medium">Notes</p>
                <p className="text-gray-800 mt-1 whitespace-pre-wrap">{customerDetails.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Services Table */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Services & Add-ons</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300 bg-gray-50">
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Service</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Add-ons</th>
                  <th className="text-right py-3 px-4 font-bold text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="py-4 px-4 font-semibold text-gray-800">
                      {item.service.name}
                      <p className="text-xs text-gray-500 mt-1">
                        Base: ₹{item.service.basePrice.toLocaleString('en-IN')}
                      </p>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {item.addons.length > 0 ? (
                        <ul className="space-y-1">
                          {item.addons.map(addon => (
                            <li key={addon.id} className="flex justify-between">
                              <span>{addon.name}</span>
                              <span className="text-gray-500 ml-2">
                                +₹{addon.price.toLocaleString('en-IN')}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-400">No add-ons</span>
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

        {/* Grand Total */}
        <div className="bg-indigo-50 p-6 rounded-lg border-2 border-indigo-200">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-800">Grand Total:</span>
            <span className="text-4xl font-bold text-indigo-600">
              ₹{grandTotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
          <p className="font-semibold">Thank you for your business!</p>
          <p className="mt-2">
            This {typeTitle[type].toLowerCase()} is valid for 30 days from the date of issue.
          </p>
          <p className="mt-1">For any queries, please contact us at your earliest convenience.</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 print-hidden">
        <button
          onClick={handleSave}
          disabled={saving || saved}
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2 disabled:bg-blue-400"
        >
          {saved ? (
            <>
              <CheckCircle size={20} />
              Saved!
            </>
          ) : saving ? (
            'Saving...'
          ) : (
            <>
              <Save size={20} />
              Save
            </>
          )}
        </button>

        <button
          onClick={handlePrint}
          className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2"
        >
          <Printer size={20} />
          Print
        </button>

        <button
          onClick={() => handleDownloadPDF(summaryRef, `${type}-${customerDetails.businessName}`)}
          className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
        >
          <Download size={20} />
          PDF
        </button>

        <button
          onClick={() => handleExportCSV(cart, customerDetails, grandTotal, type)}
          className="bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-semibold flex items-center justify-center gap-2"
        >
          <FileSpreadsheet size={20} />
          CSV
        </button>
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition font-semibold print-hidden"
      >
        Back to Home
      </button>
    </div>
  );
};

export default DocumentSummary;