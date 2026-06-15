// models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  passengerDetails: [{
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['M', 'F'], required: true },
    seatNumber: { type: String }
  }],
  totalAmount: { type: Number, required: true },
  bookingStatus: { 
    type: String, 
    enum: ['confirmed', 'pending', 'cancelled'], 
    default: 'confirmed' 
  },
  pnr: { type: String, unique: true, required: true }
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);