import { NextResponse } from 'next/server';
import { amadeus } from '@/lib/amadeus';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function POST(request) {
  try {
    const { validatedOffer, travelers, userId } = await request.json();

    if (!validatedOffer || !travelers || !userId) {
      return NextResponse.json({ success: false, error: 'Missing booking parameters' }, { status: 400 });
    }

    try {
      // Structure the passengers exactly how Amadeus expects them
      const amadeusTravelers = travelers.map((t, index) => ({
        id: (index + 1).toString(),
        dateOfBirth: t.dob || '1990-01-01', // Formatting is strict YYYY-MM-DD
        name: {
          firstName: t.firstName.toUpperCase(),
          lastName: t.lastName.toUpperCase()
        },
        gender: "MALE", // Simplified for this example
        contact: {
          emailAddress: t.email,
          phones: [{ deviceType: "MOBILE", countryCallingCode: "91", number: t.phone }]
        },
        documents: [{
          documentType: "PASSPORT",
          birthPlace: "New York",
          issuanceLocation: "New York",
          issuanceDate: "2015-04-14",
          number: t.passport,
          expiryDate: "2025-04-14",
          issuanceCountry: "US",
          validityCountry: "US",
          nationality: "US",
          holder: true
        }]
      }));

      // Call Amadeus Flight Create Orders API to generate the actual PNR
      const bookingResponse = await amadeus.booking.flightOrders.post(
        JSON.stringify({
          data: {
            type: 'flight-order',
            flightOffers: [validatedOffer],
            travelers: amadeusTravelers
          }
        })
      );

      const pnr = bookingResponse.data.associatedRecords[0].reference; // Real PNR

      // Save the booking locally now that Amadeus confirmed it
      await dbConnect();
      
      const segment = validatedOffer.itineraries[0].segments[0];
      
      const localBooking = new Booking({
        user: userId,
        flight: {
          from: segment.departure.iataCode,
          to: segment.arrival.iataCode,
          date: segment.departure.at.split('T')[0],
          airline: segment.carrierCode,
          price: parseFloat(validatedOffer.price.total),
          departureTime: segment.departure.at,
          arrivalTime: segment.arrival.at,
        },
        travelers: travelers.length,
        passengerDetails: {
          name: travelers[0].firstName + " " + travelers[0].lastName,
          email: travelers[0].email,
          passport: travelers[0].passport,
        },
        totalAmount: parseFloat(validatedOffer.price.total),
        status: "confirmed",
        bookingReference: pnr, // Save the real Amadeus PNR
      });

      await localBooking.save();

      return NextResponse.json({ 
        success: true, 
        message: 'Flight booked successfully!',
        pnr: pnr,
        bookingId: localBooking._id
      });

    } catch (amadeusError) {
      console.error("Amadeus Booking Error:", amadeusError.description || amadeusError.message);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to create PNR with the airline.' 
      }, { status: 502 });
    }

  } catch (error) {
    console.error("Flight Booking Finalization Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
