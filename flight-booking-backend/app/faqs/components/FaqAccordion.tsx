"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";

const categoryFaqs: Record<string, { question: string, answer: string }[]> = {
  "Flight Booking": [
    { question: "How do I book a flight on Kramana?", answer: "You can easily book a flight by using the search bar on our homepage. Enter your origin, destination, and travel dates, then select your preferred flight and complete the checkout process." },
    { question: "Can I book a flight for someone else?", answer: "Yes, you can book a flight for another person. Just make sure to enter their details exactly as they appear on their government-issued ID during the booking process." },
    { question: "Do I need to create an account to book a flight?", answer: "While you can book as a guest, we highly recommend creating an account so you can easily manage your bookings, save traveler details, and earn loyalty points." },
    { question: "Are taxes and fees included in the flight price?", answer: "Yes, all prices displayed during the checkout process include applicable taxes and airline fees. There are no hidden charges." },
  ],
  "Manage Booking": [
    { question: "How do I view my upcoming trips?", answer: "Log into your Kramana account and navigate to the 'My Bookings' section. You will see a list of all your upcoming and past trips." },
    { question: "Can I change my flight dates?", answer: "Yes, you can change your flight dates from the 'Manage Booking' section. Please note that change fees and fare differences may apply depending on the airline's policy." },
    { question: "How do I update my contact information?", answer: "You can update your contact information by going to 'My Profile' and editing your personal details. Changes will apply to future bookings." },
  ],
  "Payments": [
    { question: "What payment methods are accepted?", answer: "We accept all major credit and debit cards (Visa, MasterCard, Amex, RuPay), UPI, and select digital wallets." },
    { question: "Is it safe to use my credit card on Kramana?", answer: "Absolutely. We use industry-standard encryption and secure payment gateways to ensure your financial information is fully protected." },
    { question: "My payment failed, but money was deducted. What should I do?", answer: "Don't worry. If a payment fails but the amount is debited, it will automatically be refunded to your original payment method within 3-5 business days." },
  ],
  "Refunds": [
    { question: "How long does a refund take to process?", answer: "Once approved, refunds typically take 7-14 business days to reflect in your original payment method, depending on your bank." },
    { question: "Where can I check the status of my refund?", answer: "You can track your refund status by logging into your account, navigating to 'My Bookings', and clicking on the cancelled trip details." },
  ],
  "Cancellations": [
    { question: "How can I cancel my flight?", answer: "You can cancel your flight via the 'Manage Booking' portal. The applicable cancellation fee and refund amount will be displayed before you confirm." },
    { question: "Will I get a full refund if I cancel?", answer: "Refunds depend entirely on the airline's cancellation policy. Fully flexible tickets are mostly refundable, while promotional fares may be non-refundable. Service fees are non-refundable." },
  ],
  "Baggage Information": [
    { question: "What is the standard baggage allowance?", answer: "Baggage allowances vary by airline and cabin class. Generally, economy class includes 1 piece of cabin baggage (up to 7kg) and 1 piece of checked baggage (up to 15kg). Please check your specific ticket details." },
    { question: "How do I add extra baggage?", answer: "You can add extra baggage during the booking process or later via 'Manage Booking' up to 4 hours before departure. Pre-booking baggage is usually cheaper than paying at the airport." },
  ],
  "Check-in & Boarding": [
    { question: "When does web check-in open?", answer: "Web check-in typically opens 48 hours before the scheduled departure time for domestic flights and 24 hours for international flights." },
    { question: "Do I need to print my boarding pass?", answer: "For most airlines, a mobile boarding pass on your phone is sufficient. However, some smaller airports might still require a printed copy." },
  ],
  "Travel Documents": [
    { question: "What documents are required for domestic flights?", answer: "For domestic flights, you need a valid government-issued photo ID (such as an Aadhar card, PAN card, Passport, or Driving License) along with your e-ticket." },
    { question: "Do I need a visa for my international flight?", answer: "Visa requirements depend on your destination and nationality. Please check with the respective embassy or consulate well in advance of your travel date." },
  ],
  "Special Assistance": [
    { question: "How do I request a wheelchair?", answer: "You can request wheelchair assistance during the booking process under the 'Special Requests' section, or by contacting our support team at least 48 hours before departure." },
    { question: "Can I travel with my pet?", answer: "Pet travel policies vary strictly by airline. Please check the specific airline's policy on pet travel before booking, as you may need to submit additional health documents." },
  ]
};

const categoryCounts = [
  { name: "Flight Booking", count: 14 },
  { name: "Manage Booking", count: 10 },
  { name: "Payments", count: 9 },
  { name: "Refunds", count: 8 },
  { name: "Cancellations", count: 9 },
  { name: "Baggage Information", count: 6 },
  { name: "Check-in & Boarding", count: 5 },
  { name: "Travel Documents", count: 4 },
  { name: "Special Assistance", count: 3 },
];

let generatedFaqs: any[] = [];
let id = 1;
for (const cat of categoryCounts) {
  const specificFaqs = categoryFaqs[cat.name] || categoryFaqs["Flight Booking"];
  for (let i = 0; i < cat.count; i++) {
    const faq = specificFaqs[i % specificFaqs.length];
    generatedFaqs.push({
      id: id++,
      category: cat.name,
      question: faq.question,
      answer: faq.answer
    });
  }
}

export default function FaqAccordion() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || "All FAQs";

  const faqs = categoryParam === "All FAQs" 
    ? generatedFaqs 
    : generatedFaqs.filter(f => f.category === categoryParam);

  const [openId, setOpenId] = useState<number | null>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
    setOpenId(null);
  }, [categoryParam]);

  const totalPages = Math.ceil(faqs.length / itemsPerPage);
  
  const currentFaqs = faqs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpenId(null);
  };

  return (
    <div className="flex-1 w-full min-w-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": currentFaqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">{categoryParam}</h2>
          <span className="text-sm font-medium text-slate-500">{faqs.length} Questions</span>
        </div>

        <div className="space-y-4">
          {currentFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            
            return (
              <div 
                key={faq.id}
                className={clsx(
                  "border rounded-xl overflow-hidden transition-colors duration-200",
                  isOpen ? "border-blue-100 bg-blue-50/30" : "border-slate-200 bg-white"
                )}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className={clsx(
                    "font-bold pr-8",
                    isOpen ? "text-blue-700" : "text-slate-800"
                  )}>
                    {faq.question}
                  </span>
                  <ChevronDown className={clsx(
                    "w-5 h-5 flex-shrink-0 transition-transform duration-300",
                    isOpen ? "text-blue-600 rotate-180" : "text-slate-400"
                  )} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5">
                        <p className="text-slate-600 text-sm leading-relaxed mb-6">
                          {faq.answer}
                        </p>
                        
                        <div className="flex items-center justify-between bg-blue-50/50 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-sm font-medium text-blue-900">
                            <span className="w-5 h-5 bg-blue-100 text-blue-600 flex items-center justify-center rounded-md text-xs">ℹ</span>
                            Was this answer helpful?
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm">
                              <ThumbsUp className="w-4 h-4" /> Yes
                            </button>
                            <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:text-red-600 hover:border-red-200 transition-colors shadow-sm">
                              <ThumbsDown className="w-4 h-4" /> No
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
