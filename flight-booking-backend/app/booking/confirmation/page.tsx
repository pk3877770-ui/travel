"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useBooking } from "@/context/BookingContext";
import { Check } from "lucide-react";
import Link from "next/link";
import Stepper, { Step } from "@/components/Stepper";

export default function ConfirmationPage() {
  const router = useRouter();
  const { selectedFlight, passenger, selectedSeat, bookingReference, resetBooking } = useBooking();

  useEffect(() => {
    if (!bookingReference && !selectedFlight) {
      // router.push("/");
    }
  }, [bookingReference, selectedFlight, router]);

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadTicket = async () => {
    const ticketElement = document.getElementById("ticket-content");
    if (!ticketElement) return;

    try {
      setIsDownloading(true);
      
      // Next.js intercepts non-fatal console.errors from html-to-image (like cross-origin cssRules)
      // and turns them into full-screen error overlays. We temporarily suppress them here.
      const originalConsoleError = console.error;
      const originalConsoleWarn = console.warn;
      
      console.error = (...args: any[]) => {
        if (args[0] && args[0].name === 'SecurityError') return;
        if (typeof args[0] === 'string' && args[0].includes('cssRules')) return;
        originalConsoleError.apply(console, args);
      };
      
      console.warn = (...args: any[]) => {
        if (args[0] && args[0].name === 'SecurityError') return;
        if (typeof args[0] === 'string' && args[0].includes('cssRules')) return;
        originalConsoleWarn.apply(console, args);
      };

      let imgData;
      try {
        imgData = await toPng(ticketElement, { 
          quality: 1.0, 
          pixelRatio: 2,
          filter: (node) => {
            if (node.getAttribute && node.getAttribute('data-html2canvas-ignore') === 'true') {
              return false;
            }
            return true;
          }
        });
      } finally {
        // Always restore console
        console.error = originalConsoleError;
        console.warn = originalConsoleWarn;
      }
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Ticket-${bookingReference || "FB1234567890"}.pdf`);
    } catch (error) {
      console.error("Failed to download ticket", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const steps: Step[] = [
    { name: "Search", status: "completed" },
    { name: "Passenger", status: "completed" },
    { name: "Seat", status: "completed" },
    { name: "Payment", status: "completed" },
    { name: "Confirmation", status: "current" }
  ];

  return (
    <div className="pt-24 pb-16 bg-[#001233] min-h-screen font-sans flex items-start justify-center">
      <div className="container max-w-[900px] mx-auto px-4">
        
        <Stepper steps={steps} />

        <div id="ticket-content" className="bg-white rounded-xl shadow-lg overflow-hidden pb-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-12 text-center md:text-left">
            <div className="w-20 h-20 rounded-full border-[3px] border-[#22c55e] flex items-center justify-center shrink-0">
              <Check className="w-8 h-8 text-[#22c55e]" strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Booking Confirmed!</h1>
              <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-sm">
                Your booking has been confirmed and<br />
                ticket has been sent to<br />
                {passenger.email || "rahulsharma@email.com"}
              </p>
            </div>
          </div>

          <div className="px-8 md:px-16">
            
            {/* Booking Reference Box */}
            <div className="border border-slate-200 rounded-lg p-6 flex items-center justify-between mb-8">
              <div>
                <div className="text-[10px] font-bold text-slate-400 mb-1">Booking Reference</div>
                <div className="text-xl font-bold text-[#0A58CA]">{bookingReference || "FB1234567890"}</div>
              </div>
              <div className="border border-[#22c55e] bg-green-50 text-[#22c55e] font-bold text-xs px-4 py-2 rounded">
                PNR: AB1C2D
              </div>
            </div>

            {/* Booking Details */}
            <div className="mb-8">
              <h2 className="text-xs font-bold text-slate-800 mb-4">Booking Details</h2>
              <div className="border border-slate-200 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center relative">
                
                <div className="flex-1 w-full pb-6 md:pb-0 md:pr-6">
                  <div className="font-bold text-sm text-slate-800 mb-2">Delhi <span className="mx-1 text-slate-400 text-xs">→</span> Mumbai</div>
                  <div className="text-xs font-medium text-slate-500 mb-2">20 May 2025 | 06:20 - 08:50</div>
                  <div className="text-xs font-medium text-slate-500">IndiGo 6E-5324</div>
                </div>

                {/* Vertical Divider (or horizontal on mobile) */}
                <div className="w-full h-px md:w-px md:h-20 bg-slate-100 absolute left-0 md:left-1/2 top-1/2 md:top-auto -translate-y-1/2 md:translate-y-0" />

                <div className="flex-1 w-full pt-6 md:pt-0 md:pl-8">
                  <div className="font-bold text-sm text-slate-800 mb-2">Mumbai <span className="mx-1 text-slate-400 text-xs">→</span> Delhi</div>
                  <div className="text-xs font-medium text-slate-500 mb-2">27 May 2025 | 19:20 - 21:55</div>
                  <div className="text-xs font-medium text-slate-500">IndiGo 6E-6345</div>
                </div>

              </div>
            </div>

            {/* Traveler Summary */}
            <div className="grid grid-cols-3 gap-4 mb-10 pl-6">
              <div>
                <div className="text-[10px] font-bold text-slate-400 mb-2">Traveler</div>
                <div className="text-xs font-bold text-slate-800">{passenger.name || "Rahul Sharma"}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 mb-2">Seat</div>
                <div className="text-xs font-bold text-slate-800">{selectedSeat || "6A"}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 mb-2">Baggage</div>
                <div className="text-xs font-bold text-slate-800">15 kg</div>
              </div>
            </div>

            {/* Actions */}
            <div data-html2canvas-ignore="true" className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto sm:mx-0 mt-8">
              <button 
                onClick={handleDownloadTicket}
                disabled={isDownloading}
                className="flex-1 bg-[#0A58CA] hover:bg-blue-700 text-white py-3 rounded text-sm font-bold transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {isDownloading ? (
                  <>Downloading...</>
                ) : (
                  <>Download Ticket</>
                )}
              </button>
              <Link 
                href="/profile/bookings"
                onClick={() => resetBooking()}
                className="flex-1 bg-white border border-[#0A58CA] text-[#0A58CA] hover:bg-blue-50 py-3 rounded text-sm font-bold flex items-center justify-center transition-colors"
              >
                Manage Booking
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
