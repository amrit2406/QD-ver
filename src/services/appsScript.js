const WEB_APP_URL = import.meta.env.VITE_WEB_APP_URL;

export const getQuotations = async () => {
  const response = await fetch(`${WEB_APP_URL}?action=get&sheet=Quotations`);
  return await response.json();
};

export const addQuotation = async (quotation) => {
  const response = await fetch(`${WEB_APP_URL}?action=add&sheet=Quotations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quotation),
  });
  return await response.json();
};

export const updateQuotation = async (quotation) => {
  const response = await fetch(`${WEB_APP_URL}?action=update&sheet=Quotations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quotation),
  });
  return await response.json();
};

export const deleteQuotation = async (id) => {
  const response = await fetch(`${WEB_APP_URL}?action=delete&sheet=Quotations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  return await response.json();
};

export const getBills = async () => {
  const response = await fetch(`${WEB_APP_URL}?action=get&sheet=Bills`);
  return await response.json();
};

export const addBill = async (bill) => {
  const response = await fetch(`${WEB_APP_URL}?action=add&sheet=Bills`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bill),
  });
  return await response.json();
};

export const updateBill = async (bill) => {
  const response = await fetch(`${WEB_APP_URL}?action=update&sheet=Bills`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bill),
  });
  return await response.json();
};

export const deleteBill = async (id) => {
  const response = await fetch(`${WEB_APP_URL}?action=delete&sheet=Bills`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  return await response.json();
};