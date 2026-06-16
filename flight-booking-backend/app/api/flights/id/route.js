// app/api/flights/[id]/route.js
import dbConnect from '@/lib/mongodb';
import Flight from '@/models/Flight';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const flight = await Flight.findById(params.id);
    if (!flight) {
      return Response.json({ success: false, error: 'Flight not found' }, { status: 404 });
    }
    return Response.json({ success: true, flight });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}