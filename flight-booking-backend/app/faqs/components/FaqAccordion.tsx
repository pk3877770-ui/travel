"use client";

import { useState } from "react";
import { ChevronDown, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import Pagination from "@/components/Pagination";

const baseFaqs = [
  {
    question: "How do I book a flight on FlyAway?",
    answer: "You can book a flight by searching for your preferred route, selecting your flight, entering traveler details, choosing seats (if available), and completing the payment. You will receive a confirmation email with your e-ticket."
  },
  {
    question: "Can I change my flight after booking?",
    answer: "Yes, you can change your flight through the 'Manage Booking' section. Please note that change fees and fare differences may apply depending on your ticket type."
  },
  {
    question: "How do I check my booking status?",
    answer: "Log into your account and navigate to 'My Trips' to see your current booking status. You can also use the PNR lookup tool on the homepage."
  },
  {
    question: "What is the baggage allowance for my flight?",
    answer: "Baggage allowances vary by airline and cabin class. Generally, economy class includes 1 piece of cabin baggage (up to 7kg) and 1 piece of checked baggage (up to 15kg). Please check your specific ticket details."
  },
  {
    question: "How do I add extra baggage?",
    answer: "You can add extra baggage during the booking process or later via 'Manage Booking' up to 4 hours before departure."
  },
  {
    question: "What is your refund policy?",
    answer: "Refunds depend on the airline's cancellation policy. Fully flexible tickets are mostly refundable, while promotional fares may be non-refundable. Service fees are non-refundable."
  },
  {
    question: "How long does it take to process a refund?",
    answer: "Once approved, refunds typically take 7-14 business days to reflect in your original payment method."
  },
  {
    question: "How can I cancel my flight?",
    answer: "You can cancel your flight via 'Manage Booking'. The applicable cancellation fee and refund amount will be displayed before you confirm."
  },
  {
    question: "What documents are required for domestic flights?",
    answer: "For domestic flights, you need a valid government-issued photo ID (such as Aadhar card, PAN card, Passport, or Driving License) along with your e-ticket."
  },
  {
    question: "How do I check-in for my flight?",
    answer: "Web check-in opens 48 hours before departure. You can check-in online via our website or the airline's website using your PNR. Alternatively, you can use the airport kiosks or check-in counters."
  }
];

// Generate 68 mock FAQs
const faqs = Array.from({ length: 68 }).map((_, i) => ({
  id: i + 1,
  question: baseFaqs[i % baseFaqs.length].question,
  answer: baseFaqs[i % baseFaqs.length].answer
}));

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<number | null>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
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
            "mainEntity": baseFaqs.map(faq => ({
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
          <h2 className="text-2xl font-bold text-slate-900">All FAQs</h2>
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
