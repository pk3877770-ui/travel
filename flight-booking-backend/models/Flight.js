import mongoose from "mongoose";

const FlightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  airline: { type: String, required: true },
  departure: {
    city: { type: String, required: true },
    code: { type: String, required: true },
    time: { type: String, required: true },
  },
  destination: {
    city: { type: String, required: true },
    code: { type: String, required: true },
    time: { type: String, required: true },
  },
  price: { type: Number, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  class: { type: String, enum: ["Economy", "Business", "First"], default: "Economy" },
});

export default mongoose.models.Flight || mongoose.model("Flight", FlightSchema);