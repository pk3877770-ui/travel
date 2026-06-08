import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  features: [{ type: String }],
  image: { type: String },
});

const ReviewSchema = new mongoose.Schema({
  author: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    city: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
  },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  images: [{ type: String }],
  amenities: [{ type: String }],
  rooms: [RoomSchema],
  reviews: [ReviewSchema],
}, { timestamps: true });

export default mongoose.models.Hotel || mongoose.model("Hotel", HotelSchema);
