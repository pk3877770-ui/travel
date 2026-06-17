import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const payload = await request.json();

    if (!payload.userId || !payload.flight || !payload.passengerDetails) {
      return NextResponse.json({ success: false, error: 'Missing booking parameters' }, { status: 400 });
    }

    await dbConnect();
    
    const pnr = `FB-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    
    const localBooking = new Booking({
      user: payload.userId,
      flight: payload.flight,
      travelers: payload.travelers || 1,
      passengerDetails: payload.passengerDetails,
      totalAmount: payload.totalAmount,
      status: "confirmed",
      bookingReference: pnr,
    });

    await localBooking.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Flight booked successfully!',
      pnr: pnr,
      bookingId: localBooking._id
    });

  } catch (error) {
    console.error("Flight Booking Finalization Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
