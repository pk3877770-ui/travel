const fs = require('fs');
const envContent = fs.readFileSync('.env.local', 'utf-8');
const mongoUriLine = envContent.split('\n').find(line => line.startsWith('MONGODB_URI='));
process.env.MONGODB_URI = mongoUriLine ? mongoUriLine.substring(mongoUriLine.indexOf('=') + 1).replace(/["'\r]/g, '').trim() : '';

const mongoose = require('mongoose');

async function cleanDuplicates() {
  await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
  
  // Define Lead schema locally for the script
  const LeadSchema = new mongoose.Schema({
    from: String,
    to: String,
    date: String,
    travelers: String,
    type: String
  }, { timestamps: true });
  
  const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

  const leads = await Lead.find({}).sort({ createdAt: -1 });
  const seen = new Set();
  let deletedCount = 0;

  for (const lead of leads) {
    const key = `${lead.from}-${lead.to}-${lead.date}-${lead.travelers}-${lead.type}`.toLowerCase();
    
    // Also consider "Flight Search" vs "Flights Search" as duplicate
    const normalizedKey = key.replace("flights search", "flight search");

    if (seen.has(normalizedKey)) {
      await Lead.findByIdAndDelete(lead._id);
      deletedCount++;
    } else {
      seen.add(normalizedKey);
    }
  }

  console.log(`Deleted ${deletedCount} duplicate leads.`);
  process.exit(0);
}

cleanDuplicates();
