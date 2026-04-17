// script/seed.js
import mongoose from 'mongoose';
import dbConnect from '../lib/mongodb.js';
import Flight from '../models/Flight.js';

async function seed() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await dbConnect();
    console.log('✅ MongoDB Connected!');

    // Sample Flights Data
    const sampleFlights = [
      {
        flightNumber: 'AI101',
        airline: 'Air India',
        from: 'DEL',
        to: 'BOM',
        departure: new Date('2024-12-20T08:30:00'),
        arrival: new Date('2024-12-20T10:00:00'),
        duration: '1h 30m',
        price: 4500,
        seatsAvailable: 180,
        totalSeats: 200,
        aircraft: 'A320',
        status: 'scheduled'
      },
      {
        flightNumber: 'AI102',
        airline: 'Air India',
        from: 'BOM',
        to: 'DEL',
        departure: new Date('2024-12-20T11:30:00'),
        arrival: new Date('2024-12-20T13:45:00'),
        duration: '2h 15m',
        price: 5200,
        seatsAvailable: 150,
        totalSeats: 200,
        aircraft: 'A321',
        status: 'scheduled'
      },
      {
        flightNumber: '6E301',
        airline: 'IndiGo',
        from: 'DEL',
        to: 'BLR',
        departure: new Date('2024-12-20T09:15:00'),
        arrival: new Date('2024-12-20T11:30:00'),
        duration: '2h 15m',
        price: 3800,
        seatsAvailable: 120,
        totalSeats: 180,
        aircraft: 'A320neo',
        status: 'scheduled'
      },
      {
        flightNumber: 'UK801',
        airline: 'Vistara',
        from: 'BLR',
        to: 'DEL',
        departure: new Date('2024-12-20T14:20:00'),
        arrival: new Date('2024-12-20T16:45:00'),
        duration: '2h 25m',
        price: 6100,
        seatsAvailable: 90,
        totalSeats: 160,
        aircraft: 'B737',
        status: 'scheduled'
      }
    ];

    // Delete existing flights
    await Flight.deleteMany({});
    console.log('🗑️  Old flights deleted');

    // Insert new flights
    await Flight.insertMany(sampleFlights);
    console.log('✈️  Sample flights added successfully!');
    console.log(`📊 Total ${sampleFlights.length} flights inserted`);

    // Close connection
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seed();