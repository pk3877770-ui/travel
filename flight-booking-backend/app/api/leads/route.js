import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    
    const lead = await Lead.create({
      from: data.from,
      to: data.to,
      date: data.date,
      travelers: data.travelers,
      type: data.type || "Flight Search"
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
