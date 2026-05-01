const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://pk3877770_db_user:f99ZqMShMT9u8N3U@karmana.u3x3mwe.mongodb.net/travel?appName=karmana";

async function testConnection() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    const LeadSchema = new mongoose.Schema({
      from: String,
      to: String,
      date: String,
      travelers: String,
      type: String,
      createdAt: { type: Date, default: Date.now }
    });

    const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

    console.log("Fetching leads...");
    const leads = await Lead.find({}).limit(5);
    console.log("Current leads in DB:", leads);

    // console.log("Creating a test lead...");
    // const testLead = await Lead.create({
    //   from: "Test Origin",
    //   to: "Test Destination",
    //   date: "2026-12-25",
    //   travelers: "1 Adult",
    //   type: "Test Lead"
    // });
    // console.log("Test lead created:", testLead);

    await mongoose.disconnect();
    console.log("Disconnected.");
  } catch (err) {
    console.error("Error:", err);
  }
}

testConnection();
