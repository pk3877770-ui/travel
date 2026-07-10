import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  bookingReference: {
    type: String,
    unique: true,
    required: true
  },

  paymentId: {
    type: String,
    default: ""
  },

  paymentMethod: {
    type: String,
    enum: ["Stripe", "Razorpay", "PayPal"],
    default: "Stripe"
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Success", "Failed"],
    default: "Pending"
  },

  status: {
    type: String,
    enum: ["confirmed", "cancelled", "pending"],
    default: "confirmed"
  },

  flight: {

    flightNumber: String,

    airline: String,

    from: String,

    to: String,

    departureTime: String,

    arrivalTime: String,

    date: String,

    price: Number

  },

  travelers: {
    type: Number,
    default: 1
  },

  passengerDetails: {

    title: String,

    firstName: String,

    lastName: String,

    name: String,

    email: String,

    phone: String,

    dob: String,

    gender: String,

    nationality: String,

    passport: String,

    baggage: Boolean

  },

  seatNumber: {
    type: String,
    default: ""
  },

  totalAmount: Number

}, { timestamps: true });

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);