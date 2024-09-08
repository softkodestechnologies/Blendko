const auth0 = new Auth0({
    domain: process.env.AUTH0-DOMAIN,
    clientId: process.env.AUTH0-CLIENT-ID,
    clientSecret: process.env.AUTH0-SECRET,
  });
  
  module.exports = auth0;