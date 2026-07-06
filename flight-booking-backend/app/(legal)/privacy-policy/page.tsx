import { getSEOMetadata, mapSEOToMetadata } from "@/lib/seo";


export async function generateMetadata() {
  const seo = await getSEOMetadata("/privacy");
  return mapSEOToMetadata(seo);
}

export default function PrivacyPage() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-10">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h2>
      <p className="text-slate-500 text-sm mb-8 font-medium">Last updated: 20 May 2025</p>
      
      <div className="text-slate-600 space-y-8 leading-relaxed">
        <p>
          At FlyAway, we are committed to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner.
        </p>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">1. Information We Collect</h3>
          <div className="space-y-4">
            <p>
              We collect information that you provide directly to us when you use our services, such as when you create an account, make a booking, or contact our customer support.
            </p>
            <p>
              This may include your name, email address, phone number, payment details, and travel preferences.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">2. How We Use Your Information</h3>
          <div className="space-y-4">
            <p>
              We use the information we collect to process your bookings, manage your account, provide customer support, and improve our services.
            </p>
            <p>
              We may also use your information to send you marketing communications, if you have opted in to receive them.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">3. Sharing of Information</h3>
          <div className="space-y-4">
            <p>
              We may share your information with third-party service providers who assist us in operating our website, processing payments, or providing related travel services.
            </p>
            <p>
              We do not sell or rent your personal information to third parties.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">4. Security</h3>
          <div className="space-y-4">
            <p>
              We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">5. Your Rights</h3>
          <div className="space-y-4">
            <p>
              You have the right to access, correct, or delete your personal information. You can manage your preferences through your account settings or by contacting us directly.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
