// app/api/flights/route.js
import dbConnect from '@/lib/mongodb';
import Flight from '@/models/Flight';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const date = searchParams.get('date');

    let query = {};
    if (from) query.from = from;
    if (to) query.to = to;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      query.departure = { $gte: startDate, $lt: endDate };
    }

    const flights = await Flight.find(query).sort({ departure: 1 });
    return Response.json({ success: true, flights });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const flight = new Flight(data);
    await flight.save();
    return Response.json({ success: true, flight }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 400 });
  }
}