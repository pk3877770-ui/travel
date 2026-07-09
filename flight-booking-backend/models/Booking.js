// models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flight: {
    from: { type: String, required: true },
    to: { type: String, required: true },
    date: { type: String, required: true },
    airline: { type: String, required: true },
    price: { type: Number, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true }
  },
  travelers: { type: Number, required: true },
  passengerDetails: {
    title: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    dob: { type: String },
    gender: { type: String },
    nationality: { type: String },
    passport: { type: String },
    baggage: { type: Boolean }
  },
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['confirmed', 'pending', 'cancelled'], 
    default: 'confirmed' 
  },
  bookingReference: { type: String, unique: true, required: true }
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);