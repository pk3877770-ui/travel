import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Flight from "@/models/Flight";
import Lead from "@/models/Lead";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");
    const travelers = searchParams.get("travelers");

    // Record the search in the 'leads' collection
    if (from || to) {
      try {
        const type = "Flight Search";
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        
        const existingLead = await Lead.findOne({
          from,
          to,
          date,
          type,
          createdAt: { $gte: fiveMinutesAgo }
        });

        if (!existingLead) {
          const lead = await Lead.create({
            from,
            to,
            date,
            travelers: travelers || "1",
            type
          });
          console.log("Recorded flight search lead:", lead);
        } else {
          console.log("Duplicate flight lead ignored:", existingLead._id);
        }
      } catch (e) {
        console.error("Failed to record flight lead:", e);
      }
    }

    let query = {};

    if (from) {
      query.from = { $regex: from, $options: "i" };
    }
    if (to) {
      query.to = { $regex: to, $options: "i" };
    }
    if (date) {
      query.date = date;
    }

    let flights = await Flight.find(query).limit(10);
    
    // Fallback Mock Data for demo/unreachable DB purposes
    if (flights.length === 0) {
      flights = [
        {
          _id: "mock1",
          from: from || "Delhi",
          to: to || "Mumbai",
          date: date || "2026-05-01",
          price: 4500,
          airline: "Air India",
          logo: "AI",
          departureTime: "08:00",
          arrivalTime: "10:15",
          class: "First Class"
        },
        {
          _id: "mock2",
          from: from || "Delhi",
          to: to || "Mumbai",
          date: date || "2026-05-01",
          price: 4200,
          airline: "IndiGo",
          logo: "6E",
          departureTime: "11:30",
          arrivalTime: "13:45",
          class: "Business"
        },
        {
          _id: "mock3",
          from: from || "Delhi",
          to: to || "Mumbai",
          date: date || "2026-05-01",
          price: 5800,
          airline: "Vistara",
          logo: "UK",
          departureTime: "15:00",
          arrivalTime: "17:15",
          class: "Luxury"
        }
      ];
    }

    return NextResponse.json({ success: true, count: flights.length, flights });
  } catch (error) {
    console.error("Search Error:", error);
    return NextResponse.json(
      { success: false, message: "Search failed" },
      { status: 500 }
    );
  }
}

// Optional: POST to seed data
export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    
    // Safety check for user-defined admin key or just local dev
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ message: "Disabled in production" }, { status: 403 });
    }

    const flights = await Flight.insertMany(data);
    return NextResponse.json({ success: true, count: flights.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
