"use client";

import React, { createContext, useContext, useState } from "react";

export type Flight = {
  id: string | number;
  _id?: string;
  from?: string;
  to?: string;
  departureTime?: string;
  arrivalTime?: string;
  durationHours?: string;
  price: string | number;
  airline: string;
  flightNumber?: string;
  class?: string;
  date?: string;
  stops?: number | string;
  dur?: string;
  dep?: string;
  arr?: string;
  logo?: string;
  flightNum?: string;
  arrDay?: string;
};

export type PassengerDetails = {
  name: string;
  email: string;
  passport: string;
  dob: string;
  returnDate: string;
  phone: string;
  bookingDate: string;
  countryCode: string;
};

interface BookingContextType {
  selectedFlight: Flight | null;
  setSelectedFlight: (flight: Flight | null) => void;
  passenger: PassengerDetails;
  setPassenger: React.Dispatch<React.SetStateAction<PassengerDetails>>;
  selectedSeat: string | null;
  setSelectedSeat: (seat: string | null) => void;
  paymentGateway: "razorpay" | "stripe";
  setPaymentGateway: (gateway: "razorpay" | "stripe") => void;
  bookingReference: string | null;
  setBookingReference: (ref: string | null) => void;
  resetBooking: () => void;
}

const defaultPassenger = {
  name: "",
  email: "",
  passport: "",
  dob: "",
  returnDate: "",
  phone: "",
  bookingDate: "",
  countryCode: "+91",
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [passenger, setPassenger] = useState<PassengerDetails>(defaultPassenger);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [paymentGateway, setPaymentGateway] = useState<"razorpay" | "stripe">("razorpay");
  const [bookingReference, setBookingReference] = useState<string | null>(null);

  const resetBooking = () => {
    setSelectedFlight(null);
    setPassenger(defaultPassenger);
    setSelectedSeat(null);
    setPaymentGateway("razorpay");
    setBookingReference(null);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedFlight,
        setSelectedFlight,
        passenger,
        setPassenger,
        selectedSeat,
        setSelectedSeat,
        paymentGateway,
        setPaymentGateway,
        bookingReference,
        setBookingReference,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
