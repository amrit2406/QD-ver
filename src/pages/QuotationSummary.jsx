import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveData } from "../api/googleSheetsApi";  // Import saveData API call

const QuotationSummary = () => {
  const {
    cart,
    customer,
    gst,
    setGst,
    discount,
    setDiscount,
    setConfirmedQuote,
  } = useAppContext();
  const navigate = useNavigate();
  const [discountType, setDiscountType] = useState(discount.type);
  const [discountValue, setDiscountValue] = useState(discount.value);
  const [gstInput, setGstInput] = useState(gst);
  const summaryRef = useRef();

  const subTotal = cart.reduce((acc, item) => {
    const servicePrice = item.service.price;
    const addOnsPrice = item.addOns.reduce((a, b) => a + b.price, 0);
    return acc + servicePrice + addOnsPrice;
  }, 0);

  const discountAmount =
    discountType === "percent"
      ? (subTotal * discountValue) / 100
      : discountValue;

  const gstAmount = ((subTotal - discountAmount) * gstInput) / 100;

  const total = subTotal - discountAmount + gstAmount;

  // Updated handleConfirm with async save
  const handleConfirm = async () => {
    const dataToSave = {
      customerName: customer.name,
      phone: customer.phone,
      email: customer.email,
      gst: customer.gst,
      services: cart,
      gstPercent: gstInput,
      discountType: discountType,
      discountValue: discountValue,
      subtotal: subTotal,
      gstAmount: gstAmount,
      discountAmount: discountAmount,
      total: total,
      status: "Quotation",
    };

    try {
      // Save data to Google Sheets
      const id = await saveData(dataToSave);
      console.log("Quotation saved with ID:", id);

      // Update context state confirming the quote and navigate
      setConfirmedQuote({
        ...dataToSave,
        id,
      });
      navigate("/finalbill");
    } catch (error) {
      alert("Failed to save quotation: " + error.message);
    }
  };

  const printQuotation = () => {
    window.print();
  };

  const downloadPdf = () => {
    if (!summaryRef.current) return;
    html2canvas(summaryRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("quotation.pdf");
    });
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `Quotation for ${customer.name}\nTotal Amount: ₹${total.toFixed(
        2
      )}\nPlease check your email for the full quotation PDF.`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Quotation Summary</h1>
      <div ref={summaryRef} className="border p-6 rounded shadow mb-6 bg-white">
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
            <span>₹{subTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center mb-2">
            <label htmlFor="gstInput">GST % (optional):</label>
            <input
              id="gstInput"
              type="number"
              min="0"
              max="100"
              className="border px-2 py-1 rounded w-20"
              value={gstInput}
              onChange={(e) => {
                const value = Math.min(100, Math.max(0, Number(e.target.value)));
                setGstInput(value);
              }}
            />
          </div>

          <div className="flex justify-between items-center mb-2 space-x-2">
            <label>Discount:</label>
            <select
              className="border px-2 py-1 rounded"
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
            >
              <option value="percent">%</option>
              <option value="flat">₹ Flat</option>
            </select>
            <input
              type="number"
              min="0"
              className="border px-2 py-1 rounded w-28"
              value={discountValue}
              onChange={(e) => setDiscountValue(Math.max(0, Number(e.target.value)))}
            />
          </div>

          <div className="flex justify-between font-bold mt-4 text-lg border-t pt-3">
            <span>Total:</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="space-x-3">
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          onClick={printQuotation}
        >
          Print Quotation
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={downloadPdf}
        >
          Download as PDF
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={shareOnWhatsApp}
        >
          Share via WhatsApp
        </button>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          onClick={handleConfirm}
        >
          Confirm Quotation
        </button>
      </div>
    </div>
  );
};

export default QuotationSummary;
