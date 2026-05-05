import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Helper function to send confirmation email
const sendConfirmationEmail = async (userEmail, booking) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.ethereal.email",
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER || "dummy_user",
        pass: process.env.SMTP_PASS || "dummy_pass",
      },
    });

    const mailOptions = {
      from: '"Karmana Luxury Travels" <no-reply@karmana.com>',
      to: userEmail,
      subject: `Booking Confirmed: ${booking.bookingReference}`,
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b; padding: 30px; border-radius: 12px; background-color: #0f172a; color: #f8fafc;">
          <h2 style="color: #f59e0b; text-align: center; letter-spacing: 2px; text-transform: uppercase;">Karmana Sovereign</h2>
          <p>Dear ${booking.passengerDetails.name},</p>
          <p>Your luxury flight has been successfully booked and confirmed. Please find your itinerary details below:</p>
          
          <div style="background-color: #1e293b; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #334155;">
            <p style="margin: 0 0 10px 0;"><span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Booking Reference</span><br/><strong style="color: #10b981; font-size: 20px;">${booking.bookingReference}</strong></p>
            <p style="margin: 0 0 10px 0;"><span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Route</span><br/><strong>${booking.flight.from} &rarr; ${booking.flight.to}</strong></p>
            <p style="margin: 0 0 10px 0;"><span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Airline</span><br/><strong>${booking.flight.airline}</strong></p>
            <p style="margin: 0 0 10px 0;"><span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Date</span><br/><strong>${booking.flight.date}</strong></p>
            <p style="margin: 0 0 0 0; padding-top: 10px; border-top: 1px solid #334155;"><span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Total Paid</span><br/><strong style="color: #f59e0b; font-size: 18px;">₹${booking.totalAmount}</strong></p>
          </div>
          
          <p style="color: #cbd5e1;">You can manage your booking and view your digital ticket by logging into your Karmana Profile.</p>
          <p style="color: #cbd5e1;">Safe travels,<br/><strong style="color: #f59e0b;">The Karmana Team</strong></p>
        </div>
      `,
    };

    if (process.env.SMTP_HOST) {
        await transporter.sendMail(mailOptions);
        console.log("Confirmation email sent to:", userEmail);
    } else {
        console.log("Mock Email Sent to:", userEmail, "for booking", booking.bookingReference);
    }
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
  }
};

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

    // Attempt to send email asynchronously (don't await so it doesn't block the UI response)
    const passengerEmail = data.passengerDetails?.email || "user@example.com";
    sendConfirmationEmail(passengerEmail, booking);

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
      return NextResponse.json({ success: true, booking }, { status: 200 });
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
