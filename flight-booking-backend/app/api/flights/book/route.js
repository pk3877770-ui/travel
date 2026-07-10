import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import crypto from "crypto";
import { sendBookingConfirmation } from "@/lib/notifications";

export async function POST(request) {
  try {
    await dbConnect();

    const payload = await request.json();

    // Validation
    if (!payload.userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    if (!payload.flight) {
      return NextResponse.json(
        { success: false, error: "Flight details are missing" },
        { status: 400 }
      );
    }

    if (!payload.passengerDetails) {
      return NextResponse.json(
        { success: false, error: "Passenger details are missing" },
        { status: 400 }
      );
    }

    // Generate Booking Reference
    const bookingReference =
      "FB-" + crypto.randomBytes(4).toString("hex").toUpperCase();

    // Save Booking
    const booking = await Booking.create({
      user: payload.userId,

      bookingReference,

      paymentId: payload.paymentId || "",

      paymentMethod: payload.paymentMethod || "Stripe",

      paymentStatus: "Success",

      status: "confirmed",

      flight: {
        flightNumber: payload.flight.flightNumber || "",
        airline: payload.flight.airline,
        from: payload.flight.from,
        to: payload.flight.to,
        departureTime: payload.flight.departureTime,
        arrivalTime: payload.flight.arrivalTime,
        date: payload.flight.date,
        price: payload.flight.price,
      },

      travelers: payload.travelers || 1,

      passengerDetails: {
        title: payload.passengerDetails.title,
        firstName: payload.passengerDetails.firstName,
        lastName: payload.passengerDetails.lastName,
        name: payload.passengerDetails.name,
        email: payload.passengerDetails.email,
        phone: payload.passengerDetails.phone,
        dob: payload.passengerDetails.dob,
        gender: payload.passengerDetails.gender,
        nationality: payload.passengerDetails.nationality,
        passport: payload.passengerDetails.passport,
        baggage: payload.passengerDetails.baggage,
      },

      seatNumber: payload.seatNumber || "",

      totalAmount: payload.totalAmount,
    });

    // Send Email (optional)
    try {
      await sendBookingConfirmation({
        bookingReference,
        flight: booking.flight,
        passengerDetails: booking.passengerDetails,
        totalAmount: booking.totalAmount,
      });
    } catch (e) {
      console.log("Email not sent:", e.message);
    }

    return NextResponse.json({
      success: true,
      bookingReference,
      booking,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}