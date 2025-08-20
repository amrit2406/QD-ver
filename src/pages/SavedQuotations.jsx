import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { fetchAll, fetchById } from "../api/googleSheetsApi";
import { useNavigate } from "react-router-dom";

const SavedQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setCart, setCustomer, setGst, setDiscount, setConfirmedQuote } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadQuotations() {
      setLoading(true);
      try {
        const all = await fetchAll();
        setQuotations(all);
      } catch (error) {
        alert("Failed to fetch saved quotations: " + error.message);
      } finally {
        setLoading(false);
      }
    }
    loadQuotations();
  }, []);

  const loadQuotation = async (id) => {
    try {
      const data = await fetchById(id);

      // Update context with fetched data to prefill app
      setCustomer({
        name: data.customerName,
        phone: data.phone,
        email: data.email,
        gst: data.gst,
      });

      setCart(data.services || []);
      setGst(data.gstPercent || 0);
      setDiscount({
        type: data.discountType || "percent",
        value: data.discountValue || 0,
      });

      setConfirmedQuote({
        id: data.id,
        cart: data.services || [],
        customer: {
          name: data.customerName,
          phone: data.phone,
          email: data.email,
          gst: data.gst,
        },
        gst: data.gstPercent,
        discount: {
          type: data.discountType,
          value: data.discountValue,
        },
        totals: {
          subTotal: data.subtotal,
          discountAmount: data.discountAmount,
          gstAmount: data.gstAmount,
          total: data.total,
        },
        status: data.status,
      });

      // Navigate based on saved status
      if (data.status === "Final bill") {
        navigate("/finalbill");
      } else {
        navigate("/quotation-summary");
      }
    } catch (error) {
      alert("Failed to load quotation: " + error.message);
    }
  };

  if (loading) {
    return <div className="p-6 max-w-4xl mx-auto">Loading saved quotations...</div>;
  }

  if (quotations.length === 0) {
    return <div className="p-6 max-w-4xl mx-auto">No saved quotations found.</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Saved Quotations</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">Customer Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map(({ id, customerName, timestamp, status }) => (
            <tr key={id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{customerName}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(timestamp).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">{status}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => loadQuotation(id)}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Load
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedQuotations;
