import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Offer from "@/models/Offer";

export async function GET() {
  try {
    await dbConnect();
    // Only return active offers that have not expired yet
    let offers = await Offer.find({ 
      isActive: true,
      validUntil: { $gte: new Date() }
    }).sort({ createdAt: -1 });

    if (offers.length === 0) {
      // Fallback mock offers for demonstration if DB is empty
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      offers = [
        {
          _id: "mock1",
          title: "Flat 15% off on Domestic Flights",
          description: "Use code FLY15 and get 15% off up to $50 on all domestic flights.",
          code: "FLY15",
          discountPercentage: 15,
          validUntil: nextMonth,
          category: "Flight Offers",
          isActive: true
        },
        {
          _id: "mock2",
          title: "HDFC Bank Credit Card Offer",
          description: "Get 20% instant discount using HDFC bank credit cards.",
          code: "HDFC20",
          discountPercentage: 20,
          validUntil: nextMonth,
          category: "Bank Offers",
          isActive: true
        },
        {
          _id: "mock3",
          title: "Weekend Getaway Hotels",
          description: "Book hotels for the weekend and get 25% off your stay.",
          code: "WEEKEND25",
          discountPercentage: 25,
          validUntil: nextMonth,
          category: "Hotel Offers",
          isActive: true
        }
      ];
    }
    
    return NextResponse.json({ success: true, offers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching public offers, using mock data:", error);
    // Fallback mock offers if DB is unavailable
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const mockOffers = [
      {
        _id: "mock1",
        title: "Flat 15% off on Domestic Flights",
        description: "Use code FLY15 and get 15% off up to $50 on all domestic flights.",
        code: "FLY15",
        discountPercentage: 15,
        validUntil: nextMonth,
        category: "Flight Offers",
        isActive: true
      },
      {
        _id: "mock2",
        title: "HDFC Bank Credit Card Offer",
        description: "Get 20% instant discount using HDFC bank credit cards.",
        code: "HDFC20",
        discountPercentage: 20,
        validUntil: nextMonth,
        category: "Bank Offers",
        isActive: true
      },
      {
        _id: "mock3",
        title: "Weekend Getaway Hotels",
        description: "Book hotels for the weekend and get 25% off your stay.",
        code: "WEEKEND25",
        discountPercentage: 25,
        validUntil: nextMonth,
        category: "Hotel Offers",
        isActive: true
      }
    ];
    return NextResponse.json({ success: true, offers: mockOffers }, { status: 200 });
  }
}
