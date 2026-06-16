// app/api/bookings/route.js
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Flight from '@/models/Flight';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    const bookings = await Booking.find(userId ? { userId } : {})
      .populate('flightId')
      .sort({ createdAt: -1 });
    
    return Response.json({ success: true, bookings });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Check seat availability
    const flight = await Flight.findById(data.flightId);
    if (flight.seatsAvailable < data.passengerDetails.length) {
      return Response.json({ 
        success: false, 
        error: 'Insufficient seats available' 
      }, { status: 400 });
    }

    // Generate PNR
    const pnr = 'PNR' + Date.now() + Math.floor(Math.random() * 1000);
    data.pnr = pnr;

    const booking = new Booking(data);
    await booking.save();

    // Update flight seats
    flight.seatsAvailable -= data.passengerDetails.length;
    await flight.save();

    const populatedBooking = await Booking.findById(booking._id).populate('flightId');
    
    return Response.json({ success: true, booking: populatedBooking }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 400 });
  }
}