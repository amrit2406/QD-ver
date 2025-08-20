import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveData } from "../api/googleSheetsApi"; // Import your saveData function

const FinalBill = () => {
  const { confirmedQuote, clearCart, setConfirmedQuote } = useAppContext();
  const navigate = useNavigate();
  const billRef = useRef();

  if (!confirmedQuote) {
    navigate("/");
    return null;
  }

  const { cart, customer, gst, discount, totals } = confirmedQuote;

  const printBill = () => {
    window.print();
  };

  const downloadPdf = () => {
    if (!billRef.current) return;
    html2canvas(billRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("final-bill.pdf");
    });
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `Final Bill for ${customer.name}\nTotal Amount: ₹${totals.total.toFixed(
        2
      )}\nThank you for your business!`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  // New function to save final bill to Google Sheets before clearing
  const handleSaveFinalBill = async () => {
    try {
      // Prepare data object matching your Google Sheets schema
      const dataToSave = {
        customerName: customer.name,
        phone: customer.phone,
        email: customer.email,
        gst: customer.gst,
        services: cart,
        gstPercent: gst,
        discountType: discount.type,
        discountValue: discount.value,
        subtotal: totals.subTotal,
        gstAmount: totals.gstAmount,
        discountAmount: totals.discountAmount,
        total: totals.total,
        status: "Final bill",
      };

      const id = await saveData(dataToSave);
      console.log("Final bill saved with ID:", id);

      // After saving clear app state and navigate home
      clearCart();
      setConfirmedQuote(null);
      navigate("/");
    } catch (error) {
      alert("Failed to save final bill: " + error.message);
    }
  };

  // Optionally you can re-map handleNewQuote to save first
  const handleNewQuote = () => {
    handleSaveFinalBill();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Final Bill</h1>

      <div
        ref={billRef}
        className="border p-6 rounded shadow bg-white print:p-0 print:border-0 print:shadow-none"
      >
        <h2 className="text-xl font-bold mb-4">Customer Details</h2>
        <p>Name: {customer.name}</p>
        <p>Phone: {customer.phone}</p>
        <p>Email: {customer.email}</p>
        {customer.gst && <p>GST Number: {customer.gst}</p>}

        <h2 className="text-xl font-bold mt-8 mb-4">Selected Services & Add-Ons</h2>
        {cart.map(({ service, addOns }) => (
          <div
            key={service.id}
            className="mb-4 border-b pb-3 last:border-none last:pb-0"
          >
            <div className="flex justify-between">
              <p className="font-semibold">{service.name}</p>
              <p>₹{service.price.toLocaleString()}</p>
            </div>
            {addOns.length > 0 && (
              <ul className="ml-4 text-sm mt-2">
                {addOns.map((a) => (
                  <li key={a.id} className="flex justify-between">
                    <span>{a.name}</span>
                    <span>₹{a.price.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between mb-2">
            <label>Subtotal:</label>
            <span>₹{totals.subTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between mb-2">
            <label>Discount:</label>
            <span>
              {discount.type === "percent"
                ? `${discount.value}%`
                : `₹${discount.value.toLocaleString()}`}
            </span>
          </div>

          <div className="flex justify-between mb-2">
            <label>GST:</label>
            <span>{gst}%</span>
          </div>

          <div className="flex justify-between font-bold mt-4 text-lg border-t pt-3">
            <span>Total:</span>
            <span>₹{totals.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="space-x-3 mt-6">
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          onClick={printBill}
        >
          Print Bill
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={downloadPdf}
        >
          Download PDF
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={shareOnWhatsApp}
        >
          Share via WhatsApp
        </button>
        <button
          onClick={handleNewQuote}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Create New Quotation
        </button>
      </div>
    </div>
  );
};

export default FinalBill;
