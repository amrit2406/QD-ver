// src/pages/QuotationPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuote } from '../context/QuoteContext';
import { calculateTotals } from '../utils/calculateTotals';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function QuotationPage() {
  const { state, dispatch } = useQuote();
  const navigate = useNavigate();
  const [gst, setGst] = useState(state.pricing.gst);
  const [discount, setDiscount] = useState(state.pricing.discount);
  const [discountType, setDiscountType] = useState(state.pricing.discountType);

  const totals = calculateTotals(state.services, state.addons, gst, discount, discountType);

  const saveToSheet = async () => {
  const payload = {
    ID: state.customer.id || crypto.randomUUID(),
    Name: state.customer.name,
    Phone: state.customer.phone,
    Email: state.customer.email,
    GST: state.customer.gst,
    Services: state.services,
    AddOns: state.addons,
    Subtotal: totals.subtotal,
    GSTAmount: totals.gstAmount,
    DiscountAmount: totals.discountAmount,
    Total: totals.total
  };

  try {
    const res = await fetch('https://script.google.com/macros/s/AKfycbwuCj9Qc9iVpXVQ3zPud9ZGcXCJ7uoVnoMV-RFirNaVvRzhvhoTvT65I9jB5YaUg8xe/exec', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log('Saved to Google Sheets', data);
  } catch (err) {
    console.error('Error saving to Google Sheets', err);
  }
};

  const handleConfirm = () => {
    dispatch({ type: 'UPDATE_PRICING', payload: { gst, discount, discountType } });
    dispatch({ type: 'CONFIRM_QUOTATION' });
    navigate('/bill');
  };

  const downloadPDF = () => {
    const input = document.getElementById('quotation-content');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('quotation.pdf');
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quotation Summary</h1>

      <div id="quotation-content" className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Customer Details</h2>
        <p>Name: {state.customer.name}</p>
        <p>Phone: {state.customer.phone}</p>
        <p>Email: {state.customer.email}</p>
        {state.customer.gst && <p>GST: {state.customer.gst}</p>}

        <h2 className="text-xl font-semibold mt-4">Selected Services & Add-Ons</h2>
        <div className="space-y-2">
          {state.services.map(service => (
            <div key={service.id} className="border p-3 rounded">
              <p className="font-medium">{service.name} - ₹{service.price}</p>
              {state.addons[service.id] && state.addons[service.id].length > 0 && (
                <ul className="pl-4 list-disc">
                  {state.addons[service.id].map(addon => (
                    <li key={addon.id}>{addon.name} - ₹{addon.price}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2">
          <label className="flex items-center gap-2">
            GST (%)
            <input
              type="number"
              value={gst}
              onChange={e => setGst(Number(e.target.value))}
              className="border rounded p-1 w-20"
            />
          </label>

          <label className="flex items-center gap-2">
            Discount
            <input
              type="number"
              value={discount}
              onChange={e => setDiscount(Number(e.target.value))}
              className="border rounded p-1 w-20"
            />

            <select value={discountType} onChange={e => setDiscountType(e.target.value)} className="border rounded p-1">
              <option value="PERCENT">%</option>
              <option value="FLAT">₹</option>
            </select>
          </label>
        </div>

        <div className="mt-4">
          <p>Subtotal: ₹{totals.subtotal}</p>
          <p>GST: ₹{totals.gstAmount}</p>
          <p>Discount: -₹{totals.discountAmount}</p>
          <p className="font-bold">Total: ₹{totals.total}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button onClick={downloadPDF} className="bg-blue-600 text-white px-6 py-2 rounded">Download PDF</button>
        <button onClick={() => window.print()} className="bg-gray-600 text-white px-6 py-2 rounded">Print</button>
        <button onClick={handleConfirm} className="bg-green-600 text-white px-6 py-2 rounded">Confirm Quotation</button>
      </div>
    </div>
  );
}