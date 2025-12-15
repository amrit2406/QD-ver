// src/utils/calculateTotals.js

export function calculateTotals(services, addons, gstPercent = 0, discount = 0, discountType = 'PERCENT') {
  // Calculate subtotal
  let subtotal = services.reduce((sum, service) => sum + service.price, 0);

  // Add addons
  for (let serviceId in addons) {
    subtotal += addons[serviceId].reduce((sum, addon) => sum + addon.price, 0);
  }

  // GST
  const gstAmount = (subtotal * gstPercent) / 100;

  // Discount
  let discountAmount = 0;
  if (discountType === 'PERCENT') {
    discountAmount = ((subtotal + gstAmount) * discount) / 100;
  } else if (discountType === 'FLAT') {
    discountAmount = discount;
  }

  const total = subtotal + gstAmount - discountAmount;

  return {
    subtotal,
    gstAmount,
    discountAmount,
    total
  };
}
