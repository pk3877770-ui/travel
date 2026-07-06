import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Offer from "@/models/Offer";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const updateData = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Offer ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // If code is being updated, ensure it doesn't conflict
    if (updateData.code) {
      const existingOffer = await Offer.findOne({ code: updateData.code, _id: { $ne: id } });
      if (existingOffer) {
        return NextResponse.json(
          { success: false, message: "An offer with this code already exists" },
          { status: 400 }
        );
      }
    }

    const updatedOffer = await Offer.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedOffer) {
      return NextResponse.json(
        { success: false, message: "Offer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Offer updated successfully", offer: updatedOffer },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating offer:", error);
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
        { success: false, message: "Offer ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const deletedOffer = await Offer.findByIdAndDelete(id);

    if (!deletedOffer) {
      return NextResponse.json(
        { success: false, message: "Offer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Offer deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting offer:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
