import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import User from "@/models/User";
import Contact from "@/models/Contact";

const dayLabel = (d) => d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

// Demo payload used when the DB is unreachable or has no bookings yet
function mockPayload() {
  const counts = [120, 180, 95, 210, 150, 175, 230];
  const weekly = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    weekly.push({ label: dayLabel(d), count: counts[6 - i] });
  }
  return {
    bookings: 1284,
    revenue: 4820000,
    users: 932,
    leads: 214,
    weekly,
    topRoutes: [
      { name: "DEL - BOM", value: 35 },
      { name: "DEL - BLR", value: 25 },
      { name: "BOM - DEL", value: 20 },
      { name: "DEL - HYD", value: 10 },
      { name: "Others", value: 10 },
    ],
    recentBookings: [
      { name: "Rahul Sharma", route: "DEL - BOM", price: 14049 },
      { name: "Neha Singh", route: "BOM - DEL", price: 15390 },
      { name: "Amit Verma", route: "DEL - BLR", price: 6280 },
      { name: "Pooja Patel", route: "DEL - HYD", price: 5120 },
      { name: "Vikram Joshi", route: "BLR - DEL", price: 7450 },
    ],
    mock: true,
  };
}

export async function GET() {
  try {
    await dbConnect();

    const totalBookings = await Booking.countDocuments();

    // No real data yet — serve demo so the dashboard isn't empty
    if (totalBookings === 0) {
      return NextResponse.json({ success: true, stats: mockPayload() }, { status: 200 });
    }

    // Revenue
    const revenueAgg = await Booking.aggregate([
      { $match: { status: { $in: ["confirmed", "completed"] } } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].totalRevenue : 0;

    const totalUsers = await User.countDocuments();
    const totalLeads = await Contact.countDocuments();

    // Weekly bookings (last 7 days)
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - 6);
    const weeklyAgg = await Booking.aggregate([
      { $match: { createdAt: { $gte: start } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
    ]);
    const weeklyMap = Object.fromEntries(weeklyAgg.map((w) => [w._id, w.count]));
    const weekly = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      weekly.push({ label: dayLabel(d), count: weeklyMap[key] || 0 });
    }

    // Top routes
    const routesAgg = await Booking.aggregate([
      { $group: { _id: { from: "$flight.from", to: "$flight.to" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 4 },
    ]);
    const topCount = routesAgg.reduce((s, r) => s + r.count, 0);
    const topRoutes = routesAgg.map((r) => ({
      name: `${r._id.from} - ${r._id.to}`,
      value: Math.round((r.count / totalBookings) * 100),
    }));
    const othersPct = Math.max(0, Math.round(((totalBookings - topCount) / totalBookings) * 100));
    if (othersPct > 0) topRoutes.push({ name: "Others", value: othersPct });

    // Recent bookings
    const recent = await Booking.find().sort({ createdAt: -1 }).limit(5).lean();
    const recentBookings = recent.map((b) => ({
      name: b.passengerDetails?.name || "Guest",
      route: `${b.flight?.from || "—"} - ${b.flight?.to || "—"}`,
      price: b.totalAmount || 0,
    }));

    return NextResponse.json(
      {
        success: true,
        stats: { bookings: totalBookings, revenue: totalRevenue, users: totalUsers, leads: totalLeads, weekly, topRoutes, recentBookings },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch admin stats error (serving demo):", error?.message || error);
    return NextResponse.json({ success: true, stats: mockPayload() }, { status: 200 });
  }
}
