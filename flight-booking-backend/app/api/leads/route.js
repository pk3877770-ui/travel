import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    console.log("Lead POST received:", JSON.stringify(data));

    // Normalize type
    const type = (data.type || "Flight Search")
      .trim()
      .replace(/Flights Search/gi, "Flight Search")
      .replace(/Flight Booking Lead/gi, "Flight Search");

    // Deduplication: block exact same lead within 30 seconds only
    try {
      const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);
      const existingLead = await Lead.findOne({
        from: data.from,
        to: data.to,
        date: data.date,
        type,
        createdAt: { $gte: thirtySecondsAgo },
      });

      if (existingLead) {
        console.log("Duplicate lead ignored:", existingLead._id);
        return NextResponse.json({ success: true, message: "Duplicate lead ignored", lead: existingLead });
      }
    } catch (dedupError) {
      // Don't block save if dedup check fails
      console.warn("Dedup check failed, proceeding with save:", dedupError.message);
    }

    const lead = await Lead.create({
      from: data.from || "",
      to: data.to || "",
      date: data.date || "",
      travelers: data.travelers || "1 Adult",
      type,
    });

    console.log("✅ Lead saved to MongoDB:", lead._id, lead.type);
    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("❌ Lead creation failed:", error.message, error.stack);
    return NextResponse.json(
      { success: false, message: "Failed to save lead", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    console.log(`Fetched ${leads.length} leads`);
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error("Lead fetch failed:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

