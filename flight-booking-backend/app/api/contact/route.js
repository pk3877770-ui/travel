import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    
    // Server-side deduplication: Check if identical message from same email exists recently
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const existingContact = await Contact.findOne({
      email: data.email,
      subject: data.subject,
      message: data.message,
      createdAt: { $gte: tenMinutesAgo }
    });

    if (existingContact) {
      return NextResponse.json({ success: true, message: "Duplicate inquiry ignored", contact: existingContact });
    }

    const contact = await Contact.create({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message
    });


    console.log("Contact inquiry saved successfully:", contact);
    return NextResponse.json({ success: true, contact });
  } catch (error) {
    console.error("Contact inquiry creation failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save inquiry" },
      { status: 500 }
    );
  }
}
