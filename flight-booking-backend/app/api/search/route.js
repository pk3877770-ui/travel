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

    // Record the search as a lead
    if (from || to) {
      try {
        await Lead.create({
          from,
          to,
          date,
          travelers: travelers || "1 Adult",
          type: "Flight Search"
        });
      } catch (e) {
        console.error("Failed to record lead:", e);
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

    const flights = await Flight.find(query).limit(10);

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
