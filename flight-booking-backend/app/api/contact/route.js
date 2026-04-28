import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    
    const contact = await Contact.create({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message
    });

    return NextResponse.json({ success: true, contact });
  } catch (error) {
    console.error("Contact inquiry creation failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save inquiry" },
      { status: 500 }
    );
  }
}
