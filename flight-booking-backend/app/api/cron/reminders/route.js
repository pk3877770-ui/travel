import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { sendFlightReminder } from "@/lib/notifications";

export async function GET(req) {
  try {
    // Optionally secure this endpoint with a secret query param if hitting from a public cron service
    const authHeader = req.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();

    // Calculate time window: Now to 48 hours from now
    const now = new Date();
    const fortyEightHoursFromNow = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    // Fetch confirmed bookings where reminder has not been sent yet
    const upcomingBookings = await Booking.find({
      status: "confirmed",
      reminderSent: false,
    });

    let remindersSentCount = 0;

    for (const booking of upcomingBookings) {
      // Assuming flight.date is stored as an ISO string or parseable date string
      const flightDate = new Date(booking.flight.date);

      // If the flight is in the future but less than 48 hours away
      if (flightDate > now && flightDate <= fortyEightHoursFromNow) {
        await sendFlightReminder(booking);
        
        // Mark reminder as sent
        booking.reminderSent = true;
        await booking.save();
        
        remindersSentCount++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Cron job executed. Dispatched ${remindersSentCount} reminders.` 
    }, { status: 200 });

  } catch (error) {
    console.error("Flight reminders cron error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
