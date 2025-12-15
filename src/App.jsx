import React, { useState, useRef, useEffect } from 'react';
import HomePage from './components/HomePage';
import ViewDocuments from './components/ViewDocuments';
import ServiceSelection from './components/ServiceSelection';
import AddonsPage from './components/AddonsPage';
import CustomerDetails from './components/CustomerDetails';
import DocumentSummary from './components/DocumentSummary';
import { SERVICES } from './data/services';
import { googleSheetsAPI } from './services/googleSheetsAPI';

function App() {
  // Page navigation state
  const [page, setPage] = useState('home');
  const [documentType, setDocumentType] = useState(null);
  const [step, setStep] = useState('services');

  // Cart and service selection state
  const [cart, setCart] = useState([]);
  const [currentService, setCurrentService] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Customer details state
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    businessName: '',
    email: '',
    notes: ''
  });

  // Document viewing state
  const [viewingDocument, setViewingDocument] = useState(null);

  // Reference for PDF generation
  const summaryRef = useRef(null);

  // Initialize Google Sheets API on mount
  useEffect(() => {
    googleSheetsAPI.initialize();
  }, []);

  // Navigation handler
  const handleNavigate = (destination) => {
    if (destination.startsWith('view-')) {
      // Extract document type from 'view-quotations' -> 'quotation'
      const type = destination.replace('view-', '').slice(0, -1);
      setDocumentType(type);
      setPage('view');
      setViewingDocument(null);
    } else {
      // Create new document
      setDocumentType(destination);
      setPage('create');
      setStep('services');
      resetCart();
    }
  };

  // Service selection handler
  const handleServiceSelect = (service) => {
    setCurrentService(service);
    setSelectedAddons([]);
    setStep('addons');
  };

  // Toggle addon selection
  const toggleAddon = (addon) => {
    setSelectedAddons(prev => 
      prev.find(a => a.id === addon.id) 
        ? prev.filter(a => a.id !== addon.id) 
        : [...prev, addon]
    );
  };

  // Add service with addons to cart
  const addToCart = () => {
    const newItem = {
      id: Date.now(),
      service: currentService,
      addons: selectedAddons,
      total: currentService.basePrice + selectedAddons.reduce((sum, addon) => sum + addon.price, 0)
    };
    
    setCart([...cart, newItem]);
    setCurrentService(null);
    setSelectedAddons([]);
    setStep('services');
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  // Calculate grand total
  const getGrandTotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  };

  // Reset cart and form
  const resetCart = () => {
    setCart([]);
    setCustomerDetails({
      name: '',
      businessName: '',
      email: '',
      notes: ''
    });
    setCurrentService(null);
    setSelectedAddons([]);
  };

  // Reset to home page
  const resetToHome = () => {
    setPage('home');
    setDocumentType(null);
    setStep('services');
    resetCart();
    setViewingDocument(null);
  };

  // View document details
  const handleViewDocument = (doc) => {
    setViewingDocument(doc);
  };

  // Go back from viewing document
  const handleBackFromDocument = () => {
    setViewingDocument(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      {/* HOME PAGE */}
      {page === 'home' && (
        <HomePage onNavigate={handleNavigate} />
      )}

      {/* VIEW DOCUMENTS PAGE */}
      {page === 'view' && !viewingDocument && (
        <ViewDocuments 
          type={documentType} 
          onBack={resetToHome}
          onView={handleViewDocument}
        />
      )}

      {/* VIEW SINGLE DOCUMENT */}
      {page === 'view' && viewingDocument && (
        <div className="max-w-5xl mx-auto">
          <button 
            onClick={handleBackFromDocument}
            className="text-indigo-600 hover:underline mb-4 font-medium"
          >
            ← Back to List
          </button>
          <DocumentSummary
            ref={summaryRef}
            type={viewingDocument.type}
            cart={viewingDocument.cart}
            customerDetails={viewingDocument.customerDetails}
            grandTotal={viewingDocument.grandTotal}
            onBack={resetToHome}
            summaryRef={summaryRef}
          />
        </div>
      )}

      {/* CREATE DOCUMENT - SERVICE SELECTION */}
      {page === 'create' && step === 'services' && (
        <ServiceSelection 
          services={SERVICES}
          onServiceSelect={handleServiceSelect}
          cart={cart}
          onRemoveItem={removeFromCart}
          onProceed={() => setStep('customer')}
          onBack={resetToHome}
        />
      )}

      {/* CREATE DOCUMENT - ADDONS PAGE */}
      {page === 'create' && step === 'addons' && currentService && (
        <AddonsPage 
          service={currentService}
          selectedAddons={selectedAddons}
          onToggleAddon={toggleAddon}
          onAddToCart={addToCart}
          onBack={() => setStep('services')}
        />
      )}

      {/* CREATE DOCUMENT - CUSTOMER DETAILS */}
      {page === 'create' && step === 'customer' && (
        <CustomerDetails 
          customerDetails={customerDetails}
          onUpdateDetails={setCustomerDetails}
          onBack={() => setStep('services')}
          onProceed={() => setStep('summary')}
        />
      )}

      {/* CREATE DOCUMENT - SUMMARY */}
      {page === 'create' && step === 'summary' && (
        <DocumentSummary 
          ref={summaryRef}
          type={documentType}
          cart={cart}
          customerDetails={customerDetails}
          grandTotal={getGrandTotal()}
          onBack={resetToHome}
          summaryRef={summaryRef}
        />
      )}
    </div>
  );
}

export default App;