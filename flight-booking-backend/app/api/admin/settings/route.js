import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Setting from "@/models/Setting";

export async function GET() {
  try {
    await dbConnect();
    // We only ever have one global setting document, so just find the first one
    let settings = await Setting.findOne({});
    
    // If it doesn't exist yet, return default settings structure
    if (!settings) {
      settings = {
        siteName: "Kramana Flight Booking",
        supportEmail: "support@kramana.com",
        contactPhone: "+91 8000 000 000",
        maintenanceMode: false,
        currency: "INR"
      };
    }
    
    return NextResponse.json({ success: true, settings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const updateData = await req.json();
    
    await dbConnect();

    // Use findOneAndUpdate with upsert: true to create if it doesn't exist, update if it does.
    // We search for any document by just {} because we only want 1 global document.
    const updatedSettings = await Setting.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json(
      { success: true, message: "Settings updated successfully", settings: updatedSettings },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
