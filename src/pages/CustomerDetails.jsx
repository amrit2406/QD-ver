import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const CustomerDetails = () => {
  const { customer, updateCustomer } = useAppContext();
  const [formData, setFormData] = useState(customer);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!/^\d{10}$/.test(formData.phone)) errs.phone = "Enter valid 10-digit phone";
    if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Enter valid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateCustomer(formData);
      navigate("/summary");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Customer Details</h1>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Customer Name*</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={formData.name}
            onChange={(e) =>
              setFormData((f) => ({ ...f, name: e.target.value }))
            }
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone Number*</label>
          <input
            type="tel"
            className="w-full border px-3 py-2 rounded"
            value={formData.phone}
            onChange={(e) =>
              setFormData((f) => ({ ...f, phone: e.target.value }))
            }
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email Address*</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={formData.email}
            onChange={(e) =>
              setFormData((f) => ({ ...f, email: e.target.value }))
            }
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">GST Number (optional)</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={formData.gst}
            onChange={(e) =>
              setFormData((f) => ({ ...f, gst: e.target.value }))
            }
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default CustomerDetails;
