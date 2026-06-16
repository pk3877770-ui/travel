import { NextResponse } from 'next/server';
import { amadeus } from '@/lib/amadeus';

export async function POST(request) {
  try {
    const { amadeusOffer } = await request.json();

    if (!amadeusOffer) {
      return NextResponse.json({ success: false, error: 'Missing flight offer object' }, { status: 400 });
    }

    try {
      // Call Amadeus Flight Offers Price API to confirm price & availability before checkout
      const pricingResponse = await amadeus.shopping.flightOffers.pricing.post(
        JSON.stringify({
          data: {
            type: 'flight-offers-pricing',
            flightOffers: [amadeusOffer]
          }
        })
      );

      // Return the newly validated offer (it might have a slightly updated price/taxes)
      const validatedOffer = pricingResponse.data.flightOffers[0];
      
      return NextResponse.json({ 
        success: true, 
        validatedOffer,
        finalPrice: parseFloat(validatedOffer.price.total),
        currency: validatedOffer.price.currency
      });

    } catch (amadeusError) {
      console.error("Amadeus Pricing Error:", amadeusError.description || amadeusError.message);
      return NextResponse.json({ 
        success: false, 
        error: 'The airline price has changed or the seat is no longer available. Please search again.' 
      }, { status: 409 });
    }

  } catch (error) {
    console.error("Flight Pricing Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
