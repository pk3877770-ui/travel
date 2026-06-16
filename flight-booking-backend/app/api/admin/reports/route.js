import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Lead from "@/models/Lead";

export async function GET(req) {
  try {
    await dbConnect();

    // 1. Daily Sales (Last 30 Days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const dailySales = await Booking.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      { 
        $group: { 
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, 
          sales: { $sum: 1 },
          revenue: { $sum: "$totalAmount" }
        } 
      },
      { $sort: { _id: 1 } }
    ]);

    // 2. Monthly Revenue (Confirmed bookings)
    const monthlyRevenue = await Booking.aggregate([
      { $match: { status: "confirmed" } },
      { 
        $group: { 
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, 
          revenue: { $sum: "$totalAmount" },
          bookings: { $sum: 1 }
        } 
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Format monthly data
    const formattedMonthlyRevenue = monthlyRevenue.map(item => {
      const date = new Date(item._id.year, item._id.month - 1, 1);
      return {
        month: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
        revenue: item.revenue,
        bookings: item.bookings
      };
    });

    // 3. Popular Routes
    const popularRoutes = await Booking.aggregate([
      { $match: { status: "confirmed" } },
      { 
        $group: { 
          _id: { from: "$flight.from", to: "$flight.to" }, 
          count: { $sum: 1 } 
        } 
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]).then(data => data.map(d => ({
      route: `${d._id.from} - ${d._id.to}`,
      count: d.count
    })));

    // 4. Conversion Reports (Total Inquiries vs Confirmed Bookings)
    const totalInquiries = await Lead.countDocuments();
    const totalConfirmedBookings = await Booking.countDocuments({ status: "confirmed" });
    const conversionRate = totalInquiries > 0 
      ? ((totalConfirmedBookings / totalInquiries) * 100).toFixed(2) 
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        dailySales,
        monthlyRevenue: formattedMonthlyRevenue,
        popularRoutes,
        conversions: {
          inquiries: totalInquiries,
          bookings: totalConfirmedBookings,
          rate: parseFloat(conversionRate)
        }
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Fetch reports error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
