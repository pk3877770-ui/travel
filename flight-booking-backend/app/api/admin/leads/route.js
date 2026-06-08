import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import Lead from "@/models/Lead";
import Subscriber from "@/models/Subscriber";

export async function GET(req) {
  try {
    await dbConnect();

    // Fetch all three data sets concurrently
    const [contacts, inquiries, subscribers] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }),
      Lead.find().sort({ createdAt: -1 }),
      Subscriber.find().sort({ createdAt: -1 })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        contacts,
        inquiries,
        subscribers
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Fetch leads error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
