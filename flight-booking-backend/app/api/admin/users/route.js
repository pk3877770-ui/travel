import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
  try {
    await dbConnect();
    // Exclude passwords
    const users = await User.find({}, "-password").sort({ createdAt: -1 });
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error("Fetch users error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: "Name, email and password are required." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ success: false, message: "Password must be at least 6 characters." }, { status: 400 });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ success: false, message: "A user with this email already exists." }, { status: 409 });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password, // hashed by the model's pre-save hook
      role: role === "admin" ? "admin" : "user",
    });

    const safeUser = user.toObject();
    delete safeUser.password;

    return NextResponse.json({ success: true, message: "User created successfully", user: safeUser }, { status: 201 });
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await dbConnect();
    const { userId, action } = await req.json();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    if (action === "block") {
      user.isBlocked = true;
      await user.save();
      return NextResponse.json({ success: true, message: "User blocked successfully", user }, { status: 200 });
    }

    if (action === "unblock") {
      user.isBlocked = false;
      await user.save();
      return NextResponse.json({ success: true, message: "User unblocked successfully", user }, { status: 200 });
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
