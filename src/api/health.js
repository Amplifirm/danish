export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );
  
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {
      res.status(200).json({ 
        message: 'ASPIRE 2025 API is running on Vercel',
        timestamp: new Date().toISOString(),
        environment: 'Vercel Serverless',
        status: 'healthy'
      });
    } catch (error) {
      console.error('Health check error:', error);
      res.status(500).json({ 
        message: 'Health check failed',
        error: error.message 
      });
    }
  }