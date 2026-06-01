import type { Metadata } from 'next';
import dynamicImport from 'next/dynamic';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import Hero from '@/components/Hero';

const HomeInteractiveShell = dynamicImport(
  () => import('@/components/HomeInteractiveShell'),
  {
    loading: () => <div className="min-h-[1200px]" />,
  }
);

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/');
  return mapSEOToMetadata(seo);
}

export default function Page() {
  return (
    <>
      <Hero />
      <HomeInteractiveShell />

      <section id="newsletter" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-dark -z-10" />
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] bg-accent rounded-full blur-[160px] animate-pulse-slow" />
            <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-blue-600/30 rounded-full blur-[140px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
          </div>
          <div className="container max-w-5xl mx-auto px-6 relative z-10">
            <div className="bg-white/[0.03] backdrop-blur-[40px] border border-white/10 rounded-[4rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
              <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 px-6 py-2 rounded-full mb-8">
                <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">The Sovereign List</span>
              </div>
              <h2 className="text-white text-5xl md:text-7xl font-black font-outfit mb-6 tracking-tighter leading-tight">
                Join the <span className="shimmer-text italic">Kramana Elite</span>
              </h2>
              <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-medium opacity-80">
                Subscribe to our private network for secret itineraries, luxury aviation insights, and priority access to our signature journeys.
              </p>
              <div className="max-w-2xl mx-auto">
                <form
                  action="#"
                  className="flex flex-col md:flex-row gap-4 w-full"
                >
                  <div className="flex-1 relative group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your elite email address"
                      required
                      className="w-full bg-white/5 border border-white/10 px-10 py-6 rounded-[2rem] text-white placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-bold text-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-accent hover:bg-accent-hover text-primary-dark px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-accent/20 flex items-center justify-center gap-4"
                  >
                    Request Access
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
          <div className="container max-w-7xl mx-auto px-6">
            <h2 className="text-xl font-bold mb-8 text-slate-800 dark:text-slate-200 font-outfit">Explore Kramana Destinations & Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-xs">Luxury Flights</h3>
                <ul className="space-y-3">
                  <li><a href="/flights?to=Dubai" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">First Class to Dubai</a></li>
                  <li><a href="/flights?to=London" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Business Class to London</a></li>
                  <li><a href="/flights?to=Paris" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Private Jet to Paris</a></li>
                  <li><a href="/flights?to=New+York" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Premium Flights to New York</a></li>
                  <li><a href="/flights?type=charter" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Private Charter Services</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-xs">Exclusive Hotels</h3>
                <ul className="space-y-3">
                  <li><a href="/hotels?location=Maldives" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Luxury Resorts in Maldives</a></li>
                  <li><a href="/hotels?location=Santorini" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Boutique Hotels Santorini</a></li>
                  <li><a href="/hotels?location=Bali" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Private Villas in Bali</a></li>
                  <li><a href="/hotels?location=Monaco" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">5-Star Stays in Monaco</a></li>
                  <li><a href="/hotels" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">All Premium Accommodations</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-xs">Holiday Packages</h3>
                <ul className="space-y-3">
                  <li><a href="/holiday-packages?theme=honeymoon" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Luxury Honeymoon Packages</a></li>
                  <li><a href="/holiday-packages?theme=safari" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">African Safari Itineraries</a></li>
                  <li><a href="/holiday-packages?theme=culture" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">European Cultural Tours</a></li>
                  <li><a href="/holiday-packages?theme=wellness" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Wellness & Spa Retreats</a></li>
                  <li><a href="/holiday-packages" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Bespoke Holiday Planning</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-xs">Concierge & Info</h3>
                <ul className="space-y-3">
                  <li><a href="/services" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Our Premium Services</a></li>
                  <li><a href="/about" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">About Kramana Brand</a></li>
                  <li><a href="/help-center" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Travel Help Center</a></li>
                  <li><a href="/ticket-inquiry" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Flight Status & Inquiry</a></li>
                  <li><a href="/contact" className="text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Contact Our Concierge</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
