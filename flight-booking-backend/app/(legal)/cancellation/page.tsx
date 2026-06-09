export default function CancellationPage() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-10">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Cancellation Policy</h2>
      <p className="text-slate-500 text-sm mb-8 font-medium">Last updated: 20 May 2025</p>
      
      <div className="text-slate-600 space-y-8 leading-relaxed">
        <p>
          We understand that travel plans can change. This policy details how you can cancel your bookings and any applicable fees.
        </p>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">1. How to Cancel</h3>
          <div className="space-y-4">
            <p>
              You can cancel your booking through your account dashboard on our website or by contacting our customer support team directly.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">2. Cancellation Fees</h3>
          <div className="space-y-4">
            <p>
              Cancellation fees may apply depending on the airline, hotel, or service provider's specific rules, as well as the timing of your cancellation. These fees will be deducted from any eligible refund.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">3. Time Limits</h3>
          <div className="space-y-4">
            <p>
              Certain bookings must be cancelled within a specific timeframe to be eligible for any refund or credit. Please review your booking confirmation for exact details.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">4. No-Shows</h3>
          <div className="space-y-4">
            <p>
              If you fail to show up for a booked flight or hotel reservation without prior cancellation, you will generally forfeit the entire amount paid and will not be eligible for a refund.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
