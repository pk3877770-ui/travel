import mongoose from "mongoose";

const FlightSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: String, required: true },
  travelers: { type: Number, default: 1 },
  airline: { type: String, default: "Karmana Air" },
  flightNumber: { type: String, default: "KA-000" },
  price: { type: Number, default: 4500 },
  departureTime: { type: String, default: "10:00 AM" },
  arrivalTime: { type: String, default: "12:00 PM" },
});

export default mongoose.models.Flight || mongoose.model("Flight", FlightSchema);