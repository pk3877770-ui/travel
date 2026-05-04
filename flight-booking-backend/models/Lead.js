import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    from: { type: String, default: "" },
    to: { type: String, default: "" },
    date: { type: String, default: "" },
    travelers: { type: String, default: "1 Adult" },
    type: { type: String, default: "Flight Search" },
  },
  { timestamps: true } // Mongoose manages createdAt & updatedAt automatically
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
