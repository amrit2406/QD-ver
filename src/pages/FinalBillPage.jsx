// src/pages/FinalBillPage.jsx

import { useQuote } from '../context/QuoteContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function FinalBillPage() {
  const { state } = useQuote();

  const downloadPDF = () => {
    const input = document.getElementById('bill-content');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('final-bill.pdf');
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Final Bill</h1>

      <div id="bill-content" className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Customer Details</h2>
        <p>Name: {state.customer.name}</p>
        <p>Phone: {state.customer.phone}</p>
        <p>Email: {state.customer.email}</p>
        {state.customer.gst && <p>GST: {state.customer.gst}</p>}

        <h2 className="text-xl font-semibold mt-4">Services & Add-Ons</h2>
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
          <p>GST: ₹{state.pricing.gstAmount}</p>
          <p>Discount: -₹{state.pricing.discountAmount}</p>
          <p className="font-bold">Total: ₹{state.pricing.total}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button onClick={downloadPDF} className="bg-blue-600 text-white px-6 py-2 rounded">Download PDF</button>
        <button onClick={() => window.print()} className="bg-gray-600 text-white px-6 py-2 rounded">Print</button>
        <button onClick={() => alert('WhatsApp sharing not implemented yet')} className="bg-green-600 text-white px-6 py-2 rounded">Share via WhatsApp</button>
      </div>
    </div>
  );
}