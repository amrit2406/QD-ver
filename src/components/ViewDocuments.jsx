import React, { useState, useRef, useEffect } from 'react';

// View Documents Component
function ViewDocuments({ type, onBack, onView }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, [type]);

  const loadDocuments = async () => {
    setLoading(true);
    const docs = await GoogleSheetsAPI.getDocuments(type);
    setDocuments(docs);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      await GoogleSheetsAPI.deleteDocument(id);
      loadDocuments();
    }
  };

  const typeColors = {
    quotation: 'bg-blue-100 text-blue-800',
    proposal: 'bg-purple-100 text-purple-800',
    invoice: 'bg-green-100 text-green-800'
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <button onClick={onBack} className="text-indigo-600 hover:underline mb-2">
              ← Back to Home
            </button>
            <h2 className="text-3xl font-bold text-gray-800 capitalize">All {type}s</h2>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading documents...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12">
            <FileText size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-600">No {type}s found</p>
            <p className="text-gray-500 mt-2">Create your first {type} to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map(doc => (
              <div key={doc.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-indigo-400 transition">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${typeColors[doc.type]}`}>
                    {doc.number}
                  </span>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{doc.customerDetails.businessName}</h3>
                <p className="text-sm text-gray-600 mb-2">{doc.customerDetails.name}</p>
                <p className="text-sm text-gray-500 mb-3">
                  {new Date(doc.createdAt).toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="text-xl font-bold text-indigo-600">
                    ₹{doc.grandTotal.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => onView(doc)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


export default ViewDocuments;