import { getSEOMetadata, mapSEOToMetadata } from "@/lib/seo";


export async function generateMetadata() {
  const seo = await getSEOMetadata("/terms");
  return mapSEOToMetadata(seo);
}

export default function TermsPage() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-10">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Terms & Conditions</h2>
      <p className="text-slate-500 text-sm mb-8 font-medium">Last updated: 20 May 2025</p>
      
      <div className="text-slate-600 space-y-8 leading-relaxed">
        <p>
          Please read these terms and conditions carefully before using the FlyAway website and services.
        </p>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">1. Acceptance of Terms</h3>
          <div className="space-y-4">
            <p>
              By accessing or using our website and services, you agree to be bound by these Terms & Conditions and our Privacy Policy.
            </p>
            <p>
              If you do not agree with any part of these terms, you must not use our services.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">2. Use of Services</h3>
          <div className="space-y-4">
            <p>
              You agree to use our services only for lawful purposes and in accordance with these terms. You are responsible for maintaining the confidentiality of your account and password.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">3. Bookings and Payments</h3>
          <div className="space-y-4">
            <p>
              All bookings are subject to availability and confirmation. Prices are displayed in the currency selected and include applicable taxes unless stated otherwise. Payments must be completed to confirm a booking.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">4. Cancellations and Refunds</h3>
          <div className="space-y-4">
            <p>
              Cancellations and refund eligibility are governed by our Cancellation Policy and Refund Policy.
            </p>
            <p>
              Please review these policies for detailed information.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">5. Changes to Terms</h3>
          <div className="space-y-4">
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website.
            </p>
            <p>
              Your continued use of the services constitutes acceptance of the updated terms.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
