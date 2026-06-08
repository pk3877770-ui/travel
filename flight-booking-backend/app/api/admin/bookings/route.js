import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET(req) {
  try {
    await dbConnect();
    // Fetch all bookings and populate user data if needed
    const bookings = await Booking.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, bookings }, { status: 200 });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { bookingId, action, payload } = body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
    }

    if (action === "cancel") {
      booking.status = "cancelled";
      booking.refundStatus = "pending";
      await booking.save();
      return NextResponse.json({ success: true, booking, message: "Booking cancelled, refund pending" }, { status: 200 });
    }

    if (action === "process_refund") {
      if (booking.status !== "cancelled") {
        return NextResponse.json({ success: false, message: "Booking must be cancelled first" }, { status: 400 });
      }
      booking.refundStatus = "processed";
      await booking.save();
      return NextResponse.json({ success: true, booking, message: "Refund processed successfully" }, { status: 200 });
    }

    if (action === "reissue") {
      // payload should contain updated flight details (date, airline, from, to)
      if (!payload || !payload.flight) {
        return NextResponse.json({ success: false, message: "Missing flight details for reissue" }, { status: 400 });
      }

      booking.flight = {
        ...booking.flight,
        ...payload.flight
      };
      booking.isReissued = true;
      
      // Optionally update status if it was cancelled
      if (booking.status === "cancelled") {
        booking.status = "confirmed";
        booking.refundStatus = "none";
      }

      await booking.save();
      return NextResponse.json({ success: true, booking, message: "Ticket reissued successfully" }, { status: 200 });
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
