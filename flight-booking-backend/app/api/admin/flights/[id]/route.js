import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Flight from "@/models/Flight";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const updateData = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Flight ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // If flightNumber is being updated, ensure it doesn't conflict
    if (updateData.flightNumber) {
      const existingFlight = await Flight.findOne({ flightNumber: updateData.flightNumber, _id: { $ne: id } });
      if (existingFlight) {
        return NextResponse.json(
          { success: false, message: "A flight with this number already exists" },
          { status: 400 }
        );
      }
    }

    const updatedFlight = await Flight.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedFlight) {
      return NextResponse.json(
        { success: false, message: "Flight not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Flight updated successfully", flight: updatedFlight },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating flight:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Flight ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const deletedFlight = await Flight.findByIdAndDelete(id);

    if (!deletedFlight) {
      return NextResponse.json(
        { success: false, message: "Flight not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Flight deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting flight:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
