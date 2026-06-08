import { NextResponse } from 'next/server';
import { amadeus } from '@/lib/amadeus';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const originLocationCode = searchParams.get('from');
    const destinationLocationCode = searchParams.get('to');
    const departureDate = searchParams.get('date');
    const adults = searchParams.get('travelers') ? parseInt(searchParams.get('travelers')) : 1;

    if (!originLocationCode || !destinationLocationCode || !departureDate) {
      return NextResponse.json({ success: false, error: 'Missing required search parameters' }, { status: 400 });
    }

    try {
      // Call Amadeus Flight Offers Search API
      const response = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode,
        destinationLocationCode,
        departureDate,
        adults: adults,
        max: 20, // Limit results
        currencyCode: "INR" // Enforce INR pricing for consistency
      });

      // Map Amadeus complex response to simplified frontend format
      const flights = response.data.map((offer) => {
        const itinerary = offer.itineraries[0];
        const segment = itinerary.segments[0];
        const airlineCode = segment.carrierCode;
        
        // Try to get airline name from dictionary if available, else use code
        const airlineName = response.result.dictionaries?.carriers?.[airlineCode] || airlineCode;
        
        return {
          id: offer.id,
          amadeusOffer: offer, // Send the raw offer for the pricing endpoint
          airline: airlineName,
          from: segment.departure.iataCode,
          to: segment.arrival.iataCode,
          departure: segment.departure.at,
          arrival: segment.arrival.at,
          duration: itinerary.duration.replace('PT', '').replace('H', 'h ').replace('M', 'm'),
          price: parseFloat(offer.price.total),
          currency: offer.price.currency,
          seatsAvailable: offer.numberOfBookableSeats,
        };
      });

      return NextResponse.json({ success: true, flights });

    } catch (amadeusError) {
      console.error("Amadeus API Error:", amadeusError.description || amadeusError.message);
      
      // If it's a 401 Unauthorized, it means API keys are missing/invalid
      if (amadeusError.response?.statusCode === 401) {
        return NextResponse.json({ 
          success: false, 
          error: 'Amadeus API Authentication failed. Please ensure AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET are set in your .env file.' 
        }, { status: 401 });
      }

      return NextResponse.json({ success: false, error: 'Failed to fetch real flights from Amadeus' }, { status: 500 });
    }

  } catch (error) {
    console.error("Flight Search Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}