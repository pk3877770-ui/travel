import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  from: String,
  to: String,
  date: String,
  travelers: String,
  type: { type: String, default: "Flight Search" }, // Flights, Hotels, etc.
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
