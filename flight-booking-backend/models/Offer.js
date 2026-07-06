import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  validUntil: { type: Date, required: true },
  category: { type: String, enum: ["Flight Offers", "Bank Offers", "Hotel Offers", "Other"], default: "Other" },
  isActive: { type: Boolean, default: true },
  image: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.models.Offer || mongoose.model('Offer', offerSchema);
