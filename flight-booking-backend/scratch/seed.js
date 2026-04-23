const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://pk3877770_db_user:f99ZqMShMT9u8N3U@karmana.u3x3mwe.mongodb.net/karmana?appName=karmana";

const FlightSchema = new mongoose.Schema({
  flightNumber: String,
  airline: String,
  departure: { city: String, code: String, time: String },
  destination: { city: String, code: String, time: String },
  price: Number,
  date: String,
  class: String,
});

const Flight = mongoose.models.Flight || mongoose.model('Flight', FlightSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    await Flight.deleteMany({}); // Optional: clear existing
    
    const flights = [
      {
        flightNumber: "KA-101",
        airline: "Karmana Air",
        departure: { city: "New Delhi", code: "DEL", time: "10:00 AM" },
        destination: { city: "Mumbai", code: "BOM", time: "12:00 PM" },
        price: 5500,
        date: "2026-05-15",
        class: "Economy"
      },
      {
        flightNumber: "KA-202",
        airline: "Karmana Air",
        departure: { city: "London", code: "LHR", time: "02:00 PM" },
        destination: { city: "New York", code: "JFK", time: "05:00 PM" },
        price: 45000,
        date: "2026-05-20",
        class: "Business"
      },
      {
        flightNumber: "KA-303",
        airline: "Karmana Air",
        departure: { city: "Dubai", code: "DXB", time: "08:00 AM" },
        destination: { city: "Paris", code: "CDG", time: "01:00 PM" },
        price: 32000,
        date: "2026-05-25",
        class: "First"
      }
    ];

    await Flight.insertMany(flights);
    console.log("Seeded 3 flights successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
