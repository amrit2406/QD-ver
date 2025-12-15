import React from 'react';
import { User, Building, Mail, FileText } from 'lucide-react';

const CustomerDetails = ({ 
  customerDetails, 
  onUpdateDetails, 
  onBack, 
  onProceed 
}) => {
  const isFormValid = () => {
    return (
      customerDetails.name.trim() !== '' &&
      customerDetails.businessName.trim() !== '' &&
      customerDetails.email.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerDetails.email)
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={onBack}
          className="text-indigo-600 mb-4 hover:underline font-medium"
        >
          ← Back to Services
        </button>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Customer Details</h2>
        <p className="text-gray-600 mb-6">Please provide customer information for the document</p>
        
        <div className="space-y-4 mb-6">
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <User className="inline mr-2" size={16} />
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={customerDetails.name}
              onChange={(e) => onUpdateDetails({ ...customerDetails, name: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition"
              placeholder="Enter customer name"
              required
            />
          </div>

          {/* Business Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Building className="inline mr-2" size={16} />
              Business Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={customerDetails.businessName}
              onChange={(e) => onUpdateDetails({ ...customerDetails, businessName: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition"
              placeholder="Enter business name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Mail className="inline mr-2" size={16} />
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={customerDetails.email}
              onChange={(e) => onUpdateDetails({ ...customerDetails, email: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition"
              placeholder="customer@business.com"
              required
            />
            {customerDetails.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerDetails.email) && (
              <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FileText className="inline mr-2" size={16} />
              Notes (Optional)
            </label>
            <textarea
              value={customerDetails.notes}
              onChange={(e) => onUpdateDetails({ ...customerDetails, notes: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition resize-none"
              rows="4"
              placeholder="Additional notes, special requirements, payment terms, or any other relevant information..."
            />
            <p className="text-xs text-gray-500 mt-1">
              {customerDetails.notes.length}/500 characters
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={onProceed}
          disabled={!isFormValid()}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 shadow-lg hover:shadow-xl"
        >
          Generate Document
        </button>
        
        {!isFormValid() && (
          <p className="text-sm text-gray-500 text-center mt-3">
            Please fill in all required fields with valid information
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;