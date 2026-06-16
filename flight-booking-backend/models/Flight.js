// models/Flight.js
import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  airline: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  seatsAvailable: { type: Number, required: true, default: 200 },
  totalSeats: { type: Number, required: true, default: 200 },
  aircraft: { type: String, required: true },
  status: { type: String, enum: ['scheduled', 'delayed', 'cancelled'], default: 'scheduled' }
}, { timestamps: true });

export default mongoose.models.Flight || mongoose.model('Flight', flightSchema);