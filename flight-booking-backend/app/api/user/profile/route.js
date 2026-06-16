import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

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
      profile: {
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        address: user.address || "",
        dateOfBirth: user.dateOfBirth || null,
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: data.name,
          phone: data.phone,
          address: data.address,
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        }
      },
      { new: true }
    );

    return NextResponse.json({ success: true, profile: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Profile PUT error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
