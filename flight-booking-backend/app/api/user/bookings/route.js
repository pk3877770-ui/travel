import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import jwt from "jsonwebtoken";
import { sendBookingConfirmation, sendCancellationNotification } from "@/lib/notifications";

const getUserIdFromToken = (req) => {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret_key");
    return decoded.id;
  } catch (err) {
    return null;
  }
};

export async function GET(req) {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, bookings }, { status: 200 });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    const bookingReference = "KAR-" + Math.random().toString(36).substring(2, 10).toUpperCase();

    const booking = await Booking.create({
      user: userId,
      flight: data.flight,
      travelers: data.travelers || 1,
      passengerDetails: data.passengerDetails || { name: "Unknown", email: "unknown@example.com", passport: "N/A" },
      totalAmount: data.flight.price * (data.travelers || 1),
      bookingReference
    });

    // Attempt to send email/sms asynchronously (don't await so it doesn't block the UI response)
    sendBookingConfirmation(booking);

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { bookingId, action } = await req.json();

    if (action === "cancel") {
      const booking = await Booking.findOneAndUpdate(
        { _id: bookingId, user: userId },
        { status: "cancelled" },
        { new: true }
      );
      if (!booking) {
        return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
      }

      // Send cancellation alert
      sendCancellationNotification(booking);

      return NextResponse.json({ success: true, booking }, { status: 200 });
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
