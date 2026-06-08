import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import User from "@/models/User";
import Contact from "@/models/Contact";

export async function GET() {
  try {
    await dbConnect();

    // 1. Total Bookings
    const totalBookings = await Booking.countDocuments();

    // 2. Revenue
    const revenueAggregation = await Booking.aggregate([
      { $match: { status: { $in: ["confirmed", "completed"] } } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;

    // 3. Users
    const totalUsers = await User.countDocuments();

    // 4. Inquiry Leads (from Contact form)
    const totalLeads = await Contact.countDocuments();

    return NextResponse.json({
      success: true,
      stats: {
        bookings: totalBookings,
        revenue: totalRevenue,
        users: totalUsers,
        leads: totalLeads
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Fetch admin stats error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
