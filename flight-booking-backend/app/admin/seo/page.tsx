import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logoutAction } from '../login/actions';
import { getAllSEOData, isMongoAvailable, getDefaultSEO } from '@/lib/seo';
import SeoForm from './SeoForm';
import Link from 'next/link';

// All known site pages for the sidebar
const ALL_PAGES = [
  '/',
  '/about',
  '/contact',
  '/flight-booking',
  '/hotel-booking',
  '/holiday-packages',
  '/services',
  '/terms',
  '/privacy',
  '/refund',
  '/help-center',
  '/ticket-inquiry',
];

export default async function SeoAdminPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  if (token?.value !== 'authenticated') {
    redirect('/admin/login');
  }

  const { edit } = await searchParams;
  const currentPage = edit || '/';

  const seoMap = await getAllSEOData();
  const mongoAvailable = await isMongoAvailable();
  const isDev = process.env.NODE_ENV !== 'production';

  // Merge ALL_PAGES with any extra entries to ensure sidebar always shows all pages
  const allPaths = [...new Set([...ALL_PAGES, ...Object.keys(seoMap)])];
  
  // Use specialized map data or fallback to global defaults
  const currentMetadata = seoMap[currentPage] || getDefaultSEO(currentPage);

  return (
    <div className="flex bg-[#030712] text-slate-100 font-sans min-h-screen selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Cinematic Sidebar */}
      <aside className="w-[340px] h-screen sticky top-0 bg-[#030712]/80 backdrop-blur-[40px] border-r border-white/[0.03] flex flex-col items-center shadow-[20px_0_50px_-20px_rgba(0,0,0,0.8)] z-30 transition-all duration-500">
        
        {/* Aesthetic Branding Block */}
        <div className="w-full p-12 border-b border-white/[0.03] bg-gradient-to-b from-white/[0.02] to-transparent relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h2 className="font-extrabold text-4xl text-white tracking-[-0.03em] text-center flex flex-col items-center gap-1">
                K<span className="text-amber-500 font-light italic text-5xl mt-[-5px]">A</span>RMANA
            </h2>
            <div className="flex items-center justify-center gap-3 mt-5">
                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-slate-700"></div>
                <p className="text-slate-500 text-[10px] text-center font-black tracking-[0.3em] uppercase">Control Center</p>
                <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-slate-700"></div>
            </div>
        </div>

        {/* Navigation Area */}
        <nav className="w-full px-6 py-6 border-b border-white/[0.03] flex flex-col gap-2">
            <p className="px-6 text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Systems</p>
            <Link 
                href="/admin/seo"
                className="px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center bg-amber-500 text-[#030712] shadow-lg shadow-amber-500/20"
            >
                <div className="w-1.5 h-1.5 rounded-full mr-4 bg-[#030712]"></div>
                <span className="text-[13px]">SEO Orchestration</span>
            </Link>
            <Link 
                href="/admin/leads"
                className="px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center text-slate-400 hover:bg-white/[0.05] hover:text-white"
            >
                <div className="w-1.5 h-1.5 rounded-full mr-4 bg-slate-800"></div>
                <span className="text-[13px]">Captured Leads</span>
            </Link>
        </nav>

        <nav className="flex-1 w-full overflow-y-auto px-6 py-6 flex flex-col gap-2 custom-scrollbar">
            <p className="px-6 text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Target Pages</p>
            {allPaths.map((pagePath) => {
                const isActive = currentPage === pagePath;
                const linkName = pagePath === '/' ? 'Home Page' : pagePath.replace(/[-/]/g, ' ').trim().replace(/\b\w/g, c => c.toUpperCase());
                const hasData = !!seoMap[pagePath];
                return (
                    <Link 
                        key={pagePath} 
                        href={`?edit=${encodeURIComponent(pagePath)}`}
                        className={`px-6 py-4.5 rounded-2xl font-semibold transition-all duration-500 flex items-center group relative overflow-hidden ${
                            isActive 
                            ? 'bg-amber-500 text-[#030712] translate-x-1 shadow-[0_10px_30px_-5px_rgba(245,158,11,0.3)] scale-[1.02]' 
                            : 'bg-white/[0.02] text-slate-400 hover:bg-white/[0.05] hover:text-white hover:translate-x-1 border border-white/[0.02]'
                        }`}
                    >
                        {/* Status Indicator */}
                        <div className={`w-2 h-2 rounded-full mr-5 transition-all duration-700 relative ${
                            isActive 
                            ? 'bg-[#030712] scale-125' 
                            : hasData 
                                ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                                : 'bg-slate-800'
                        }`}>
                            {isActive && <span className="absolute inset-0 rounded-full animate-ping bg-[#030712] opacity-20"></span>}
                        </div>
                        <span className="relative text-[13px] tracking-tight">{linkName}</span>
                        
                        {/* Hover Gradient Effect */}
                        {!isActive && <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>}
                    </Link>
                )
            })}
        </nav>

        {/* Interaction Footer */}
        <div className="w-full p-8 bg-[#030712]/60 border-t border-white/[0.03] mt-auto">
            <form action={logoutAction}>
                <button className="w-full px-4 py-5 bg-rose-500/5 text-rose-500 border border-rose-500/10 rounded-2xl font-black tracking-widest text-[11px] uppercase hover:bg-rose-500 hover:text-white hover:shadow-[0_15px_40px_-10px_rgba(244,63,94,0.4)] transition-all duration-500 group overflow-hidden relative">
                    <span className="relative z-10 group-hover:scale-110 block transition-transform">Terminate Session</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
            </form>
        </div>
      </aside>

      {/* Dynamic Main Stage */}
      <main className="flex-1 flex flex-col items-center p-14 lg:p-24 relative overflow-hidden selection:bg-amber-400/30">
        
        {/* Orchestration Lighting Effects */}
        <div className="absolute top-[0%] left-[50%] -translate-x-1/2 w-[1200px] h-[800px] bg-amber-500/[0.03] rounded-full blur-[160px] pointer-events-none -z-10"></div>
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-indigo-500/[0.03] rounded-full blur-[140px] pointer-events-none -z-10"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-[140px] pointer-events-none -z-10"></div>

        <div className="w-full max-w-5xl relative z-10">
            <header className="mb-16 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800"></div>
                    <span className="text-amber-500/50 font-mono text-[10px] tracking-[0.5em] uppercase">Matrix System v4.0</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800"></div>
                </div>
                
                <div className="flex flex-col items-start gap-2">
                    <h1 className="text-7xl font-black leading-[1] text-white tracking-tighter">
                        Metadata <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 font-light italic">Orchestration</span>
                    </h1>
                </div>

                <div className="flex items-center gap-6 mt-4">
                    <div className="flex flex-col">
                        <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">Target Cluster</span>
                        <div className="flex items-center gap-4">
                           <strong className="text-2xl font-medium text-slate-200 tracking-tight">{currentPage}</strong>
                           <div className="h-4 w-px bg-slate-800"></div>
                           <span className="text-emerald-500 font-mono text-xs flex items-center gap-2">
                               <span className="relative flex h-2 w-2">
                                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                               </span>
                               ACTIVE_LINK
                           </span>
                        </div>
                    </div>
                </div>
            </header>

            {!mongoAvailable && (
                <div className={`group p-8 mb-12 rounded-[2rem] border backdrop-blur-xl flex flex-col md:flex-row md:items-center gap-6 transition-all duration-500 hover:scale-[1.01] ${isDev ? 'bg-emerald-500/[0.03] border-emerald-500/10' : 'bg-amber-500/[0.03] border-amber-500/10'}`}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl transition-transform duration-500 group-hover:rotate-6 ${isDev ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h4 className={`text-lg font-bold mb-1 ${isDev ? 'text-emerald-400' : 'text-amber-400'}`}>
                           {isDev ? "Local persistence active" : "Cloud write-access is currently disabled"}
                        </h4>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                           {isDev 
                               ? "Your changes will be saved directly to public/seo-data.json. To enable cloud-wide syncing, configure MONGODB_URI." 
                               : "The cloud database connection (MONGODB_URI) is missing. You can still make edits, but you'll need to 'Export to JSON' and commit to the repo for changes to persist."
                           }
                        </p>
                    </div>
                    {!isDev && (
                        <div className="px-6 py-3 bg-amber-500/10 rounded-xl text-amber-400 text-[10px] font-black tracking-widest uppercase border border-amber-500/20 whitespace-nowrap">
                            Virtual Sync Mode
                        </div>
                    )}
                </div>
            )}

            <SeoForm key={currentPage} currentPage={currentPage} currentMetadata={currentMetadata} isLocalJson={!mongoAvailable} />
        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
      `}} />
    </div>
  );
}
