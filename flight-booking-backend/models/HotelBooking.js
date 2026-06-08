import mongoose from "mongoose";

const HotelBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    hotelName: {
      type: String,
      required: true,
    },
    room: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    guests: {
      adults: { type: Number, default: 1 },
      children: { type: Number, default: 0 },
    },
    guestDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["confirmed", "pending", "cancelled"],
      default: "confirmed",
    },
    bookingReference: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const HotelBooking = mongoose.models.HotelBooking || mongoose.model("HotelBooking", HotelBookingSchema);
export default HotelBooking;
