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

        <div id="ticket-content" className="bg-white p-8 font-mono text-[11px] leading-[1.2] text-black w-full max-w-[800px] mx-auto shadow-lg relative">
          <div className="font-bold uppercase text-[13px]">{passenger.name || "JULIAN LOPEZ / BROWN"}</div>
          <div className="border-b-[3px] border-black mt-1 mb-3"></div>

          <table className="w-full mb-5 text-[11px]">
            <tbody>
              <tr><td className="w-24 font-bold align-top">From:</td><td>{selectedFlight?.airline || 'United Airlines, Inc.'} &lt;no-reply@{(selectedFlight?.airline || 'united').toLowerCase().replace(/\\s+/g, '')}.com&gt;</td></tr>
              <tr><td className="font-bold align-top">Sent:</td><td>{new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}</td></tr>
              <tr><td className="font-bold align-top">To:</td><td>{passenger.name || 'Julian Lopez Brown'}, &lt;{passenger.email || 'julietabrownie@gmail.com'}&gt;</td></tr>
              <tr><td className="font-bold align-top">Subject:</td><td>MileagePlus Ticket itinerary and Receipt for Confirmation {bookingReference || "ER7020S"}</td></tr>
            </tbody>
          </table>

          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-[#002244] text-2xl font-bold font-sans uppercase tracking-widest">{selectedFlight?.airline || 'UNITED'}</span> 
              <span className="text-[10px] text-gray-600 font-sans ml-2">A STAR ALLIANCE MEMBER</span>
            </div>
            <div className="text-right">
              <div className="text-[11px]">Confirmation:</div>
              <div className="text-lg font-bold font-sans">{bookingReference || "ER7020S"}</div>
            </div>
          </div>

          <div className="mb-3"><strong>Issue Date:</strong> {new Date().toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'})}</div>

          <div className="border-b-[2px] border-black mb-[2px]"></div>
          <div className="border-b-[1px] border-black mb-2"></div>

          <table className="w-full text-left mb-4 text-[11px]">
            <thead>
              <tr>
                <th className="font-bold pb-1 w-1/4">Traveler</th>
                <th className="font-bold pb-1 w-1/4">Ticket Number</th>
                <th className="font-bold pb-1 w-1/4">Frequent Flyer</th>
                <th className="font-bold pb-1 w-1/4">Seats</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="uppercase whitespace-pre-line">{passenger.name ? passenger.name.replace(' ', '\\n') : 'JULIAN LOPEZ\\nBROWN'}</td>
                <td className="align-top">016{Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}</td>
                <td className="align-top">UA-X0000X058</td>
                <td className="align-top">{selectedSeat || 'C-15'}</td>
              </tr>
            </tbody>
          </table>

          <div className="border-b-[2px] border-black mb-[2px]"></div>
          <div className="border-b-[1px] border-black mb-2"></div>

          <div className="font-bold mb-2">FLIGHT INFORMATION</div>
          <table className="w-full text-left mb-2 text-[11px]">
            <thead>
              <tr>
                <th className="font-bold pb-2 w-[15%]">Day, Date</th>
                <th className="font-bold pb-2 w-[15%]">Flight Class</th>
                <th className="font-bold pb-2 w-[30%]">Departure City and Time</th>
                <th className="font-bold pb-2 w-[30%]">Arrival City and Time</th>
                <th className="font-bold pb-2 w-[10%] text-right">Aircraft Meal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="align-top py-1">{selectedFlight?.date || 'Wed, Dec 27'}</td>
                <td className="align-top py-1">Economy</td>
                <td className="align-top py-1 uppercase">{selectedFlight?.from || 'QUEBEC CITY, (YQB)'}<br/>{selectedFlight?.departureTime || '6:04a'}</td>
                <td className="align-top py-1 uppercase">{selectedFlight?.to || 'NEWARK, (EWR)'}<br/>{selectedFlight?.arrivalTime || '8:15a'}</td>
                <td className="align-top py-1 text-right">UA 3783</td>
              </tr>
              <tr className="bg-[#e5e7eb]">
                <td className="align-top py-1 px-1 -ml-1">{selectedFlight?.date || 'Wed, Dec 27'}</td>
                <td className="align-top py-1">Economy</td>
                <td className="align-top py-1 uppercase">{selectedFlight?.to || 'NEWARK, (EWR)'}<br/>11:00a</td>
                <td className="align-top py-1 uppercase">TORONTO, (YYZ)<br/>12:45p</td>
                <td className="align-top py-1 text-right pr-1">AC 8877</td>
              </tr>
              <tr>
                <td className="align-top py-1">{selectedFlight?.date || 'Wed, Dec 27'}</td>
                <td className="align-top py-1">Economy</td>
                <td className="align-top py-1 uppercase">TORONTO, (YYZ)<br/>5:55p</td>
                <td className="align-top py-1 uppercase">WINNIPEG, (YWG)<br/>7:39p</td>
                <td className="align-top py-1 text-right">AC 267</td>
              </tr>
            </tbody>
          </table>
          <div className="italic text-[11px] mb-2">Operated by Air Canada Express - Jazz</div>
          <div className="bg-[#e5e7eb] h-6 mb-4 w-full"></div>

          <div className="border-b-[2px] border-black mb-[2px]"></div>
          <div className="border-b-[1px] border-black mb-2"></div>

          <div className="font-bold mb-4">FARE INFORMATION</div>

          <div className="flex mb-6 text-[11px]">
            <div className="w-[40%] pr-2">
              <table className="w-full">
                <tbody>
                  <tr><td className="font-bold pb-1 w-[70%]">Fare Breakdown</td><td></td></tr>
                  <tr><td className="pb-1">Airfare:</td><td className="text-right pb-1">{((selectedFlight?.price || 754.80) * 0.8).toFixed(2)}</td></tr>
                  <tr><td className="pb-1">Departure Tax:</td><td className="text-right pb-1">12.36</td></tr>
                  <tr><td className="pb-1">Pax Terminal Facilities Charge:</td><td className="text-right pb-1">10.60</td></tr>
                  <tr><td className="pb-1">Security Charge:</td><td className="text-right pb-1">5.50</td></tr>
                  <tr><td className="pb-1">Passenger Service Charge:</td><td className="text-right pb-1">15.00</td></tr>
                  <tr><td className="pb-1">Per Person Total:</td><td className="text-right pb-1">{((selectedFlight?.price || 754.80) * 0.95).toFixed(2)}</td></tr>
                  <tr><td className="py-2">&nbsp;</td><td></td></tr>
                  <tr><td className="font-bold">Ticket Total:</td><td className="text-right font-bold">{(selectedFlight?.price || 754.80).toFixed(2)}</td></tr>
                </tbody>
              </table>
            </div>
            
            <div className="w-[30%] px-2">
              <div className="font-bold mb-1">MileagePlus Account Debited:</div>
              <div className="mb-4">L0754601</div>
              
              <div className="font-bold mb-1">Form of Payment:</div>
              <div>VISA</div>
              <div>Last Four Digits 0024</div>
            </div>
            
            <div className="w-[30%] pl-2">
              <div className="font-bold mb-1">MileagePlus Miles Debited/</div>
              <div className="font-bold mb-1">Award Used:</div>
              <div>37500/WC77K</div>
            </div>
          </div>

          <div className="mb-8">The airfare you paid on this itinerary totals: {(selectedFlight?.price || 754.80).toFixed(2)} USD</div>

          <div className="flex text-[11px] mb-6">
            <div className="w-24 shrink-0">Award Rules:</div>
            <div>
              Additional charges may apply for changes in addition to any fare rules listed.<br/>
              RWD WC77K/NONEND/-TRAN:VALID UA/A3/CA<br/>
              All changes must be made prior to the departure date, or the ticket has no value.
            </div>
          </div>

          <div className="border-b-[2px] border-black mb-8"></div>
          
          {/* Actions - will not be visible in downloaded image due to data-html2canvas-ignore */}
          <div data-html2canvas-ignore="true" className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto w-full font-sans pb-4">
            <button 
              onClick={handleDownloadTicket}
              disabled={isDownloading}
              className="flex-1 bg-[#0A58CA] hover:bg-blue-700 text-white py-3 rounded text-sm font-bold transition-colors flex justify-center items-center gap-2 disabled:opacity-70 shadow"
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
              className="flex-1 bg-white border border-[#0A58CA] text-[#0A58CA] hover:bg-blue-50 py-3 rounded text-sm font-bold flex items-center justify-center transition-colors shadow"
            >
              Manage Booking
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
