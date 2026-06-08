import Amadeus from 'amadeus';

// Ensure you set AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET in your .env.local
export const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID || 'test_id',
  clientSecret: process.env.AMADEUS_CLIENT_SECRET || 'test_secret',
  // Defaults to test environment. Set to 'production' when ready.
  hostname: process.env.NODE_ENV === 'production' && process.env.AMADEUS_ENVIRONMENT === 'production' ? 'production' : 'test'
});
