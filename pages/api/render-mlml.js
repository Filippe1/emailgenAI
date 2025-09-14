export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { mjml } = req.body;
  
    if (!mjml) {
      return res.status(400).json({ error: 'MJML content is required' });
    }
  
    try {
      const MJML_API_ID = process.env.MJML_API_ID;
      const MJML_API_SECRET = process.env.MJML_API_SECRET;
  
      if (!MJML_API_ID || !MJML_API_SECRET) {
        return res.status(500).json({ error: 'MJML API credentials not configured' });
      }
  
      const response = await fetch('https://api.mjml.io/v1/render', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${MJML_API_ID}:${MJML_API_SECRET}`).toString('base64')}`
        },
        body: JSON.stringify({ mjml })
      });
  
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`MJML API error: ${error}`);
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error rendering MJML:', error);
      res.status(500).json({ error: error.message || 'Failed to render MJML' });
    }
  }