const PROXY_URL = "/api/proxy";

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxoYTLLb8XoLGizs95X0t0foMLY0_PS65qpLHGDamItB0TDsTapKASt273lxZrWpgNJ/exec";
export const getQuotations = async () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const callbackName = `jsonp_callback_${Date.now()}`;
    
    window[callbackName] = (data) => {
      delete window[callbackName];
      document.body.removeChild(script);
      resolve(data);
    };
    
    script.src = `${WEB_APP_URL}?action=get&sheet=Quotations&callback=${callbackName}`;
    script.onerror = () => {
      delete window[callbackName];
      document.body.removeChild(script);
      reject(new Error('Failed to load data'));
    };
    
    document.body.appendChild(script);
  });
};

export const addQuotation = async (quotation) => {
  const response = await fetch(`${PROXY_URL}?action=add&sheet=Quotations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quotation),
  });
  return await response.json();
};

// Update other functions similarly...

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