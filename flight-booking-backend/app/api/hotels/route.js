import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Hotel from "@/models/Hotel";
import { mockHotels } from "@/lib/mockHotels";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")) : 20;

    // Try Database connection
    let dbWorking = false;
    let hotels = [];
    try {
      await dbConnect();
      dbWorking = true;
    } catch(e) {
      console.warn("Falling back to mock data due to DB connection failure");
    }

    if (dbWorking) {
      let query = {};
      if (location) {
        // Basic case-insensitive search on city or country
        query = {
          $or: [
            { "location.city": { $regex: location, $options: "i" } },
            { "location.country": { $regex: location, $options: "i" } },
          ]
        };
      }
      hotels = await Hotel.find(query).limit(limit).lean();
    }

    if (hotels.length > 0) {
      return NextResponse.json({ success: true, data: hotels });
    } else {
      // Fallback to Mock Data
      let filteredHotels = mockHotels;
      if (location) {
        const locLower = location.toLowerCase();
        filteredHotels = mockHotels.filter(h => 
          h.location.city.toLowerCase().includes(locLower) || 
          h.location.country.toLowerCase().includes(locLower)
        );
      }
      return NextResponse.json({ success: true, data: filteredHotels.slice(0, limit) });
    }
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Optional: Admin POST route to seed hotels
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const hotel = await Hotel.create(body);
    return NextResponse.json({ success: true, data: hotel }, { status: 201 });
  } catch (error) {
    console.error("Error creating hotel:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
