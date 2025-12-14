// api/proxy.js
export default async function handler(req, res) {
  const { action, sheet } = req.query;
  const webAppUrl = "https://script.google.com/macros/s/AKfycbxoYTLLb8XoLGizs95X0t0foMLY0_PS65qpLHGDamItB0TDsTapKASt273lxZrWpgNJ/exec"; // Your Google Apps Script URL
  
  try {
    const response = await fetch(`${webAppUrl}?action=${action}&sheet=${sheet}`, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    });
    
    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}