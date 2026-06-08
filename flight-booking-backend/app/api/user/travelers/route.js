import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import mongoose from "mongoose";

const getUserIdFromToken = (req) => {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret_key");
    return decoded.id;
  } catch (err) {
    return null;
  }
};

export async function GET(req) {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      travelers: user.savedTravelers || []
    }, { status: 200 });
  } catch (error) {
    console.error("Travelers GET error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const travelerData = await req.json();

    const user = await User.findById(userId);
    user.savedTravelers.push({
      ...travelerData,
      _id: new mongoose.Types.ObjectId()
    });
    await user.save();

    return NextResponse.json({ success: true, travelers: user.savedTravelers }, { status: 200 });
  } catch (error) {
    console.error("Travelers POST error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const travelerId = searchParams.get('id');

    if (!travelerId) {
      return NextResponse.json({ success: false, message: "Traveler ID required" }, { status: 400 });
    }

    const user = await User.findById(userId);
    user.savedTravelers = user.savedTravelers.filter(t => t._id.toString() !== travelerId);
    await user.save();

    return NextResponse.json({ success: true, travelers: user.savedTravelers }, { status: 200 });
  } catch (error) {
    console.error("Travelers DELETE error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
