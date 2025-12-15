// src/components/CustomerForm.jsx

import { useState } from 'react';

export default function CustomerForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    gst: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      alert('Name and Phone are required');
      return;
    }

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Customer Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        name="gst"
        placeholder="GST Number (Optional)"
        value={form.gst}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg"
      >
        Next
      </button>
    </form>
  );
}
