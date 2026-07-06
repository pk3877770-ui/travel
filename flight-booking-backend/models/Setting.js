import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  siteName: { type: String, default: "Kramana Flight Booking" },
  supportEmail: { type: String, default: "support@kramana.com" },
  contactPhone: { type: String, default: "+91 8000 000 000" },
  maintenanceMode: { type: Boolean, default: false },
  currency: { type: String, default: "INR" }
}, { timestamps: true });

export default mongoose.models.Setting || mongoose.model('Setting', settingSchema);
