const fs = require('fs');
const dns = require('dns');
// Set DNS servers to Google's to help resolve SRV records in restricted environments
dns.setServers(['8.8.8.8', '8.8.4.4']);

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

  // Define Contact schema locally
  const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
  }, { timestamps: true });
  const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

  // Clean Leads
  const leads = await Lead.find({}).sort({ createdAt: -1 });
  const seenLeads = new Set();
  let deletedLeadsCount = 0;

  for (const lead of leads) {
    const key = `${lead.from}-${lead.to}-${lead.date}-${lead.type}`.toLowerCase();
    const normalizedKey = key.replace("flights search", "flight search");
    if (seenLeads.has(normalizedKey)) {
      await Lead.findByIdAndDelete(lead._id);
      deletedLeadsCount++;
    } else {
      seenLeads.add(normalizedKey);
    }
  }

  // Clean Contacts
  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  const seenContacts = new Set();
  let deletedContactsCount = 0;

  for (const contact of contacts) {
    const key = `${contact.email}-${contact.subject}-${contact.message}`.toLowerCase().trim();
    if (seenContacts.has(key)) {
      await Contact.findByIdAndDelete(contact._id);
      deletedContactsCount++;
    } else {
      seenContacts.add(key);
    }
  }

  console.log(`Deleted ${deletedLeadsCount} duplicate leads and ${deletedContactsCount} duplicate contacts.`);
  process.exit(0);
}

cleanDuplicates();
