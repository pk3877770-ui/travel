import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Hotel from "@/models/Hotel";
import { mockHotels } from "@/lib/mockHotels";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    let hotel = null;

    try {
      await dbConnect();
      hotel = await Hotel.findById(id).lean();
    } catch(e) {
      console.warn("Falling back to mock data due to DB connection failure");
      hotel = mockHotels.find(h => h._id === id || h._id.toString() === id);
    }

    if (!hotel) {
      // One last try with mock data if db worked but returned null (maybe seed failed)
      hotel = mockHotels.find(h => h._id === id || h._id.toString() === id);
    }

    if (!hotel) {
      return NextResponse.json({ success: false, error: "Hotel not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: hotel });
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
