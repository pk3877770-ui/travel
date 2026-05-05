import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    flight: {
      from: { type: String, required: true },
      to: { type: String, required: true },
      date: { type: String, required: true },
      airline: { type: String, required: true },
      price: { type: Number, required: true },
      departureTime: { type: String },
      arrivalTime: { type: String },
    },
    travelers: {
      type: Number,
      default: 1,
    },
    passengerDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      passport: { type: String, required: true },
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
    }
  },
  { timestamps: true }
);

const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;
