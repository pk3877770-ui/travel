export default function RefundPage() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-10">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Refund Policy</h2>
      <p className="text-slate-500 text-sm mb-8 font-medium">Last updated: 20 May 2025</p>
      
      <div className="text-slate-600 space-y-8 leading-relaxed">
        <p>
          We want you to be completely satisfied with your booking. This policy outlines the terms under which refunds are provided.
        </p>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">1. Eligibility for Refunds</h3>
          <div className="space-y-4">
            <p>
              Refunds are subject to the fare rules of the airline or the cancellation policy of the hotel associated with your booking. Some fares and rates are non-refundable.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">2. Processing Time</h3>
          <div className="space-y-4">
            <p>
              Once a refund is approved, it may take 7 to 14 business days for the amount to reflect in your original payment method, depending on your bank or credit card issuer.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">3. Service Fees</h3>
          <div className="space-y-4">
            <p>
              Please note that service fees or booking fees charged by FlyAway at the time of booking are generally non-refundable unless stated otherwise.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">4. Requesting a Refund</h3>
          <div className="space-y-4">
            <p>
              To request a refund, please contact our customer support team with your booking reference details. We will process your request in accordance with the applicable policies.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
