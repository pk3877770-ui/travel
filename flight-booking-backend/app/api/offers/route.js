import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Offer from "@/models/Offer";

export async function GET() {
  try {
    await dbConnect();
    // Only return active offers that have not expired yet
    const offers = await Offer.find({ 
      isActive: true,
      validUntil: { $gte: new Date() }
    }).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, offers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching public offers:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
