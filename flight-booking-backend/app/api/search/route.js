import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Flight from "@/models/Flight";
import Lead from "@/models/Lead";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");
    const travelers = searchParams.get("travelers");

    // Record the search in the 'leads' collection
    if (from || to) {
      try {
        const type = "Flight Search";
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        
        const existingLead = await Lead.findOne({
          from,
          to,
          date,
          type,
          createdAt: { $gte: fiveMinutesAgo }
        });

        if (!existingLead) {
          const lead = await Lead.create({
            from,
            to,
            date,
            travelers: travelers || "1",
            type
          });
          console.log("Recorded flight search lead:", lead);
        } else {
          console.log("Duplicate flight lead ignored:", existingLead._id);
        }
      } catch (e) {
        console.error("Failed to record flight lead:", e);
      }
    }

    let query = {};

    if (from) {
      query.from = { $regex: from, $options: "i" };
    }
    if (to) {
      query.to = { $regex: to, $options: "i" };
    }
    if (date) {
      query.date = date;
    }

    let flights = await Flight.find(query).limit(20);

    // Fallback Mock Data for demo/unreachable DB purposes
    if (!flights || flights.length === 0) {
      flights = buildMockFlights(from, to, date);
    }

    return NextResponse.json({ success: true, count: flights.length, flights });
  } catch (error) {
    // DB unreachable in local/dev — still return demo flights instead of failing
    console.error("Search Error (serving mock flights):", error?.message || error);
    const { searchParams } = new URL(req.url);
    const flights = buildMockFlights(
      searchParams.get("from"),
      searchParams.get("to"),
      searchParams.get("date")
    );
    return NextResponse.json({ success: true, count: flights.length, flights, mock: true });
  }
}

// Demo flight list — shape matches what the flights UI renders
function buildMockFlights(from, to, date) {
  const f = from || "DEL";
  const t = to || "BOM";
  const d = date || new Date().toISOString().split("T")[0];
  const L = (code) => `https://images.kiwi.com/airlines/64x64/${code}.png`;

  return [
    { airline: "IndiGo",    logo: L("6E"), departureTime: "06:20", arrivalTime: "08:50", dur: "2h 30m", stops: "Non Stop", price: 12499, class: "Economy" },
    { airline: "SpiceJet",  logo: L("SG"), departureTime: "05:30", arrivalTime: "08:00", dur: "2h 30m", stops: "Non Stop", price: 9890,  class: "Economy" },
    { airline: "Air India", logo: L("AI"), departureTime: "07:45", arrivalTime: "13:25", dur: "5h 40m", stops: "1 Stop",   price: 13290, class: "Economy" },
    { airline: "IndiGo",    logo: L("6E"), departureTime: "13:10", arrivalTime: "15:35", dur: "2h 25m", stops: "Non Stop", price: 10999, class: "Economy" },
    { airline: "Vistara",   logo: L("UK"), departureTime: "09:15", arrivalTime: "11:50", dur: "2h 35m", stops: "Non Stop", price: 14210, class: "Business" },
    { airline: "Akasa Air", logo: L("QP"), departureTime: "11:30", arrivalTime: "14:15", dur: "2h 45m", stops: "Non Stop", price: 11990, class: "Economy" },
    { airline: "Air India", logo: L("AI"), departureTime: "18:05", arrivalTime: "22:50", dur: "4h 45m", stops: "1 Stop",   price: 13750, class: "Economy" },
    { airline: "Vistara",   logo: L("UK"), departureTime: "16:40", arrivalTime: "19:20", dur: "2h 40m", stops: "Non Stop", price: 15600, class: "Business" },
    { airline: "Akasa Air", logo: L("QP"), departureTime: "22:15", arrivalTime: "00:45", dur: "2h 30m", stops: "Non Stop", price: 11250, class: "Economy" },
    { airline: "SpiceJet",  logo: L("SG"), departureTime: "20:45", arrivalTime: "02:55", dur: "6h 10m", stops: "1 Stop",   price: 12890, class: "Economy" },
  ].map((flight, i) => ({
    _id: `mock${i + 1}`,
    from: f,
    to: t,
    date: d,
    ...flight,
  }));
}

// Optional: POST to seed data
export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    
    // Safety check for user-defined admin key or just local dev
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ message: "Disabled in production" }, { status: 403 });
    }

    const flights = await Flight.insertMany(data);
    return NextResponse.json({ success: true, count: flights.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
