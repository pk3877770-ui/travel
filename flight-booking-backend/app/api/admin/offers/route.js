import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Offer from "@/models/Offer";

export async function GET(req) {
  try {
    await dbConnect();
    const offers = await Offer.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, offers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { title, description, code, discountPercentage, validUntil, isActive, image } = await req.json();

    if (!title || !code || !discountPercentage || !validUntil) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if code already exists
    const existingOffer = await Offer.findOne({ code });
    if (existingOffer) {
      return NextResponse.json(
        { success: false, message: "An offer with this code already exists" },
        { status: 400 }
      );
    }

    const newOffer = new Offer({
      title,
      description,
      code,
      discountPercentage,
      validUntil,
      isActive: isActive !== undefined ? isActive : true,
      image,
    });

    await newOffer.save();

    return NextResponse.json(
      { success: true, message: "Offer created successfully", offer: newOffer },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating offer:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
