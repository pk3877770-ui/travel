const mongoose = require('mongoose');

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

const Offer = mongoose.models.Offer || mongoose.model('Offer', offerSchema);

async function seedLocal() {
  const uri = 'mongodb://127.0.0.1:27017/flightbooking'; // Default local URI
  await mongoose.connect(uri);
  console.log("Connected to local MongoDB.");

  const categoryMap = {
    "KRAMANA10": "Flight Offers",
    "KRAMANA15": "Flight Offers",
    "FLY20": "Flight Offers",
    "HDFC1000": "Bank Offers",
    "ICICIFLY": "Bank Offers",
    "SBIWOW": "Bank Offers",
    "STAY25": "Hotel Offers",
    "WELCOME500": "Hotel Offers",
    "WEEKEND12": "Hotel Offers"
  };

  const offers = await Offer.find({});
  for (const offer of offers) {
    if (!offer.category || offer.category === "Other") {
      const newCategory = categoryMap[offer.code] || "Other";
      offer.category = newCategory;
      await offer.save();
      console.log(`Updated ${offer.code} to ${newCategory}`);
    }
  }

  await mongoose.disconnect();
  console.log("Disconnected. Done.");
}

seedLocal().catch(console.error);
