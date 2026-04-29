import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    
    // Server-side deduplication: Check if an identical lead was created recently (last 5 minutes)
    const type = (data.type || "Flight Search").replace("Flights Search", "Flight Search");
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const existingLead = await Lead.findOne({
      from: data.from,
      to: data.to,
      date: data.date,
      type,
      createdAt: { $gte: fiveMinutesAgo }
    });

    if (existingLead) {
      return NextResponse.json({ success: true, message: "Duplicate lead ignored", lead: existingLead });
    }

    const lead = await Lead.create({
      from: data.from,
      to: data.to,
      date: data.date,
      travelers: data.travelers,
      type
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Lead creation failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save lead" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
