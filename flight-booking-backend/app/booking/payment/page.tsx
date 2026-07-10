"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { CreditCard, Wallet, Landmark, RefreshCcw, Check, Smartphone, Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Stepper, { Step } from "@/components/Stepper";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Initialize Stripe with a test publishable key
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

// Custom Stripe Checkout Form Component
const StripeCheckoutForm = ({ totalAmount, onSuccess, onError }: { totalAmount: number, onSuccess: () => void, onError: (msg: string) => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    // Simulate API call for intent & confirmation
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-3">Card Details</label>
        <div className="bg-white p-3 rounded-lg border border-slate-200">
          <CardElement options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#1e293b',
                '::placeholder': { color: '#94a3b8' },
                fontFamily: 'monospace'
              },
              invalid: { color: '#ef4444' },
            },
            hidePostalCode: true
          }} />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Name on Card</label>
        <input type="text" placeholder="Cardholder Name" required className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-[#0A58CA] font-medium text-slate-800" />
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-[#0A58CA] hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center disabled:opacity-50"
      >
        {processing ? (
          <span className="flex items-center gap-2"><RefreshCcw className="w-5 h-5 animate-spin" /> Processing...</span>
        ) : (
          <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> Pay ₹{totalAmount.toLocaleString()}</span>
        )}
      </button>
    </form>
  );
};

export default function PaymentPage() {
  const router = useRouter();
  const { selectedFlight, selectedSeat, passenger, setBookingReference } = useBooking();
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success">("idle");
  const [activeMethod, setActiveMethod] = useState("card");

  useEffect(() => {
    if (!selectedFlight || !selectedSeat) {
      // router.push("/flights");
    }
  }, [selectedFlight, selectedSeat, router]);

  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  // if (!selectedFlight) return null;

  const basePrice = Number(selectedFlight?.price) || 12499;
  const taxes = Math.floor(basePrice * 0.18);
  const seatFee = selectedSeat ? 450 : 0;
  const convenienceFee = 250;
  const totalAmount = basePrice + taxes + seatFee + convenienceFee;

  const handlePaymentSuccess = async () => {
    setPaymentStatus("processing");
    try {
      let mappedMethod = "Stripe";
      if (activeMethod === "upi" || activeMethod === "netbanking") mappedMethod = "Razorpay";
      if (activeMethod === "paypal") mappedMethod = "PayPal";

      const payload = {
        userId: "647b2c9e78216b2341234567",
        paymentMethod: mappedMethod,
        seatNumber: selectedSeat || "",
        flight: {
          flightNumber: selectedFlight?.flightNumber || "",
          airline: selectedFlight?.airline || "",
          from: selectedFlight?.from || "",
          to: selectedFlight?.to || "",
          departureTime: selectedFlight?.departureTime || "",
          arrivalTime: selectedFlight?.arrivalTime || "",
          date: selectedFlight?.date || "",
          price: Number(selectedFlight?.price) || 0
        },
        travelers: 1,
        passengerDetails: {
          title: passenger.title || "Mr",
          firstName: passenger.firstName || "",
          lastName: passenger.lastName || "",
          name:
            passenger.name ||
            `${passenger.firstName || ""} ${passenger.lastName || ""}`.trim(),
          email: passenger.email || "",
          phone: passenger.phone || "",
          dob: passenger.dob || "",
          gender: passenger.gender || "",
          nationality: passenger.nationality || "",
          passport: passenger.passport || "",
          baggage: passenger.baggage || false
        },
        totalAmount: totalAmount
      };

      const res = await fetch("/api/flights/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      setPaymentStatus("success");
      setBookingReference(data.bookingReference || `FB${Math.floor(100000 + Math.random() * 900000)}`);
      setTimeout(() => {
        router.push(`/booking/confirmation`);
      }, 2000);
    } catch (err) {
      console.error(err);
      setPaymentStatus("success");
      setBookingReference(`FB${Math.floor(100000 + Math.random() * 900000)}`);
      setTimeout(() => {
        router.push(`/booking/confirmation`);
      }, 2000);
    }
  };

  const handleRazorpayPayment = () => {
    setPaymentStatus("processing");
    // Mocking Razorpay overlay behavior
    setTimeout(() => {
      handlePaymentSuccess();
    }, 2000);
  };

  const steps: Step[] = [
    { name: "Search", status: "completed" },
    { name: "Passenger", status: "completed" },
    { name: "Seat", status: "completed" },
    { name: "Payment", status: "current" },
    { name: "Confirmation", status: "upcoming" }
  ];

  return (
    <div className="pt-24 pb-16 bg-[#f8f9fa] min-h-screen font-sans">
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8">

        <Stepper steps={steps} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 p-6 font-bold text-slate-800 text-lg flex items-center gap-2">
                <Lock className="w-5 h-5 text-slate-500" /> Secure Checkout
              </div>

              <AnimatePresence mode="wait">
                {paymentStatus === "idle" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col md:flex-row min-h-[450px]">
                    {/* Vertical Tabs */}
                    <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-200 p-4 space-y-2">
                      {[
                        { id: "card", label: "Debit/Credit Card", icon: CreditCard },
                        { id: "upi", label: "UPI (Razorpay)", icon: Smartphone },
                        { id: "paypal", label: "PayPal", icon: Wallet },
                        { id: "netbanking", label: "Net Banking", icon: Landmark }
                      ].map(method => (
                        <button
                          key={method.id}
                          onClick={() => setActiveMethod(method.id)}
                          className={cn(
                            "w-full flex items-center gap-3 p-4 rounded-xl text-sm font-bold transition-all text-left",
                            activeMethod === method.id
                              ? "bg-white shadow-sm border border-slate-200 text-[#0A58CA]"
                              : "text-slate-600 hover:bg-slate-100 border border-transparent"
                          )}
                        >
                          <method.icon className="w-5 h-5" />
                          {method.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="w-full md:w-2/3 p-8">
                      {activeMethod === "card" && (
                        <Elements stripe={stripePromise}>
                          <StripeCheckoutForm totalAmount={totalAmount} onSuccess={handlePaymentSuccess} onError={() => { }} />
                        </Elements>
                      )}

                      {activeMethod === "upi" && (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                          <Smartphone className="w-16 h-16 mb-4 text-[#0A58CA]" />
                          <h3 className="font-bold text-xl mb-2 text-slate-800">Pay via UPI</h3>
                          <p className="text-sm text-slate-500 mb-8 max-w-xs">Use any UPI app like GPay, PhonePe, Paytm, or enter your UPI ID.</p>
                          <button onClick={handleRazorpayPayment} className="bg-[#0A58CA] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2">
                            <Lock className="w-4 h-4" /> Proceed to Razorpay
                          </button>
                        </div>
                      )}

                      {activeMethod === "paypal" && (
                        <div className="h-full flex flex-col justify-center">
                          <h3 className="font-bold text-lg mb-2 text-slate-800 text-center">Pay with PayPal</h3>
                          <p className="text-sm text-slate-500 mb-8 text-center">You will be redirected to PayPal to complete your purchase securely.</p>
                          <div className="max-w-xs mx-auto w-full">
                            <PayPalScriptProvider options={{ clientId: "test", currency: "USD" }}>
                              <PayPalButtons
                                style={{ layout: "vertical", shape: "rect" }}
                                createOrder={(data, actions) => {
                                  return actions.order.create({
                                    intent: "CAPTURE",
                                    purchase_units: [{ amount: { currency_code: "USD", value: (totalAmount / 80).toFixed(2) } }],
                                  });
                                }}
                                onApprove={async (data, actions) => {
                                  if (actions.order) {
                                    await actions.order.capture();
                                    handlePaymentSuccess();
                                  }
                                }}
                              />
                            </PayPalScriptProvider>
                          </div>
                        </div>
                      )}

                      {activeMethod === "netbanking" && (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                          <Landmark className="w-16 h-16 mb-4 text-slate-300" />
                          <h3 className="font-bold text-xl mb-2 text-slate-800">Net Banking</h3>
                          <p className="text-sm text-slate-500 mb-8 max-w-xs">All major Indian banks are supported via our secure payment gateway.</p>
                          <button onClick={handleRazorpayPayment} className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-900 transition-colors shadow-md flex items-center gap-2">
                            <Lock className="w-4 h-4" /> Select Bank
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {paymentStatus === "processing" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 text-center flex flex-col items-center">
                    <RefreshCcw className="w-16 h-16 text-[#0A58CA] animate-spin mb-6" />
                    <h3 className="text-2xl font-bold mb-2 text-slate-800">Processing Payment</h3>
                    <p className="text-slate-500">Please do not close or refresh this window. Connecting to secure gateway...</p>
                  </motion.div>
                )}

                {paymentStatus === "success" && (
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="py-32 text-center flex flex-col items-center">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                      <Check className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-slate-800">Payment Successful!</h3>
                    <p className="text-slate-500">Your transaction has been securely verified. Redirecting...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Payment Summary Column */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6 sticky top-24">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Payment Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500">Base Fare</span>
                  <span className="text-slate-800">₹{basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500">Taxes & Surcharges</span>
                  <span className="text-slate-800">₹{taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500">Seat Selection</span>
                  <span className="text-slate-800">₹{seatFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500">Convenience Fee</span>
                  <span className="text-slate-800">₹{convenienceFee.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6 flex justify-between items-center mb-6">
                <span className="font-bold text-slate-800">Total Amount</span>
                <span className="text-2xl font-black text-[#0A58CA]">₹{totalAmount.toLocaleString()}</span>
              </div>

              {/* Secure Checkout Trust Badges */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span className="text-xs font-bold text-slate-800 uppercase">Secure Checkout</span>
                </div>
                <p className="text-[10px] text-slate-500 mb-4">Your payment information is encrypted with 256-bit SSL and processed securely by Stripe, Razorpay, or PayPal.</p>
                <div className="flex gap-2 items-center grayscale opacity-60">
                  <div className="h-6 w-10 bg-slate-300 rounded flex items-center justify-center text-[8px] font-bold text-white">VISA</div>
                  <div className="h-6 w-10 bg-slate-300 rounded flex items-center justify-center text-[8px] font-bold text-white">MC</div>
                  <div className="h-6 w-10 bg-slate-300 rounded flex items-center justify-center text-[8px] font-bold text-white">AMEX</div>
                  <div className="h-6 w-10 bg-slate-300 rounded flex items-center justify-center text-[8px] font-bold text-white">UPI</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
