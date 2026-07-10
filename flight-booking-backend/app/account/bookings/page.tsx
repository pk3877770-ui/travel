"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";

type Booking = {
    _id: string;
    bookingReference: string;
    status: string;
    totalAmount: number;
    createdAt: string;

    flight: {
        airline: string;
        from: string;
        to: string;
        departureTime: string;
        arrivalTime: string;
        date: string;
    };

    passengerDetails: {
        name: string;
        email: string;
    };

    seatNumber: string;
};

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    // Temporary user id
    // Later login system se replace karenge
    const userId = "647b2c9e78216b2341234567";

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            const res = await fetch(`/api/bookings?userId=${userId}`);
            const data = await res.json();

            if (data.success) {
                setBookings(data.bookings);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h2 className="text-xl font-bold">Loading Bookings...</h2>
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-3">
                        No Bookings Found
                    </h2>

                    <p className="text-gray-500">
                        Book your first flight.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-6xl mx-auto px-5">

                <h1 className="text-4xl font-bold mb-8">
                    My Bookings
                </h1>

                <div className="space-y-6">

                    {bookings.map((booking) => (

                        <div
                            key={booking._id}
                            className="bg-white rounded-xl shadow-md p-6"
                        >

                            <div className="flex justify-between">

                                <div>

                                    <h2 className="text-2xl font-bold">
                                        {booking.flight?.airline || "Unknown Airline"}
                                    </h2>
                                    <p className="text-gray-500">
                                        {booking.flight?.from || "Unknown"} → {booking.flight?.to || "Unknown"}
                                    </p>

                                </div>

                                <div>

                                    <span
                                        className={`px-4 py-2 rounded-full text-white ${booking.status === "confirmed"
                                                ? "bg-green-600"
                                                : "bg-red-500"
                                            }`}
                                    >
                                        {booking.status}
                                    </span>

                                </div>

                            </div>

                            <hr className="my-5" />

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                                <div>

                                    <p className="text-gray-500 text-sm">
                                        Passenger
                                    </p>

                                    <h3 className="font-semibold">
                                        {booking.passengerDetails?.name || "Unknown Passenger"}
                                    </h3>

                                </div>

                                <div>

                                    <p className="text-gray-500 text-sm">

                                        Booking Ref

                                    </p>

                                    <h3 className="font-semibold">

                                        {booking.bookingReference}

                                    </h3>

                                </div>

                                <div>

                                    <p className="text-gray-500 text-sm">

                                        Seat

                                    </p>

                                    <h3 className="font-semibold">

                                        {booking.seatNumber || "Not Selected"}

                                    </h3>

                                </div>

                                <div>

                                    <p className="text-gray-500 text-sm">

                                        Amount

                                    </p>

                                    <h3 className="font-semibold">

                                        {formatCurrency(booking.totalAmount)}

                                    </h3>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}