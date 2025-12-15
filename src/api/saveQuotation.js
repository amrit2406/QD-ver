export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwuCj9Qc9iVpXVQ3zPud9ZGcXCJ7uoVnoMV-RFirNaVvRzhvhoTvT65I9jB5YaUg8xe/exec', {
      method: 'POST',
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error saving to Google Sheets:', err);
    res.status(500).json({ error: 'Failed to save quotation' });
  }
}
