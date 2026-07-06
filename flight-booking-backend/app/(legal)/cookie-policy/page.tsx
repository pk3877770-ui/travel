import { getSEOMetadata, mapSEOToMetadata } from "@/lib/seo";


export async function generateMetadata() {
  const seo = await getSEOMetadata("/cookie");
  return mapSEOToMetadata(seo);
}

export default function CookiePage() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-10">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Cookie Policy</h2>
      <p className="text-slate-500 text-sm mb-8 font-medium">Last updated: 20 May 2025</p>
      
      <div className="text-slate-600 space-y-8 leading-relaxed">
        <p>
          This Cookie Policy explains how FlyAway uses cookies and similar technologies to recognize you when you visit our website.
        </p>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">1. What are Cookies?</h3>
          <div className="space-y-4">
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">2. Why Do We Use Cookies?</h3>
          <div className="space-y-4">
            <p>
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as &quot;essential&quot; or &quot;strictly necessary&quot; cookies.
            </p>
            <p>
              Other cookies also enable us to track and target the interests of our users to enhance the experience on our website.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">3. Types of Cookies We Use</h3>
          <div className="space-y-4">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Essential Cookies:</strong> Necessary for the website to function properly.</li>
              <li><strong>Performance and Functionality Cookies:</strong> Used to enhance the performance and functionality of our website but are non-essential to their use.</li>
              <li><strong>Analytics and Customization Cookies:</strong> Collect information that is used either in aggregate form to help us understand how our website is being used, or to help us customize our website for you.</li>
              <li><strong>Advertising Cookies:</strong> Used to make advertising messages more relevant to you.</li>
            </ul>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">4. How Can I Control Cookies?</h3>
          <div className="space-y-4">
            <p>
              You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
