import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Flight from "@/models/Flight";

export async function GET() {
  try {
    await dbConnect();
    const flights = await Flight.find({}).sort({ departure: 1 });
    return NextResponse.json({ success: true, flights }, { status: 200 });
  } catch (error) {
    console.error("Error fetching flights:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { flightNumber, airline, from, to, departure, arrival, duration, price, seatsAvailable, totalSeats, aircraft, status } = await req.json();

    if (!flightNumber || !airline || !from || !to || !departure || !arrival || !duration || price === undefined || !aircraft) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if flight number already exists
    const existingFlight = await Flight.findOne({ flightNumber });
    if (existingFlight) {
      return NextResponse.json(
        { success: false, message: "A flight with this number already exists" },
        { status: 400 }
      );
    }

    const newFlight = new Flight({
      flightNumber,
      airline,
      from,
      to,
      departure,
      arrival,
      duration,
      price: Number(price),
      seatsAvailable: seatsAvailable !== undefined ? Number(seatsAvailable) : 200,
      totalSeats: totalSeats !== undefined ? Number(totalSeats) : 200,
      aircraft,
      status: status || 'scheduled'
    });

    await newFlight.save();

    return NextResponse.json(
      { success: true, message: "Flight created successfully", flight: newFlight },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating flight:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
