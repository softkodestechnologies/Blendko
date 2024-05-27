const allowedOrigins = () => {
    const origins = {
      origin: 'http://localhost:5000',
      credentials: true,
    };
  
    if (process.env.NODE_ENV === 'PRODUCTION') {
      return {
        origin: 'vercel-link',
        credentials: true,
        https: true,
      };
    }
  
    return origins;
  };
  
  module.exports = allowedOrigins;