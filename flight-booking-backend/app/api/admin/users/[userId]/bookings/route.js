import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { userId } = params;

    const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, bookings }, { status: 200 });
  } catch (error) {
    console.error("Fetch user bookings error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
