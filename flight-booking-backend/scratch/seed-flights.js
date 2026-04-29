const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

async function checkFlights() {
  const envPath = path.join(process.cwd(), '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/MONGODB_URI=["']?([^"'\s\r\n]+)["']?/);
  const uri = match ? match[1] : null;
  
  if (!uri) throw new Error('MONGODB_URI not found in .env.local');
  await mongoose.connect(uri);
  const FlightSchema = new mongoose.Schema({
    from: String,
    to: String,
    date: String,
    price: Number,
    airline: String,
    logo: String
  });
  
  const Flight = mongoose.models.Flight || mongoose.model('Flight', FlightSchema);
  const count = await Flight.countDocuments();
  console.log('Flight Count:', count);
  
  if (count === 0) {
    console.log('Seeding flights...');
    await Flight.insertMany([
      { from: 'Delhi', to: 'Mumbai', date: '2026-05-01', price: 4500, airline: 'Air India', logo: 'AI' },
      { from: 'Delhi', to: 'Mumbai', date: '2026-05-01', price: 4200, airline: 'IndiGo', logo: '6E' },
      { from: 'Delhi', to: 'Mumbai', date: '2026-05-02', price: 4300, airline: 'Vistara', logo: 'UK' },
      { from: 'Mumbai', to: 'Delhi', date: '2026-05-01', price: 4600, airline: 'SpiceJet', logo: 'SG' }
    ]);
    console.log('Seeded 4 flights.');
  }
  
  process.exit(0);
}

checkFlights().catch(err => {
  console.error(err);
  process.exit(1);
});
