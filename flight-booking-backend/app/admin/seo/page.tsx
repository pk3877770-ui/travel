import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logoutAction } from '../login/actions';
import { promises as fs } from 'fs';
import path from 'path';
import SeoForm from './SeoForm';
import Link from 'next/link';

export default async function SeoAdminPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  if (token?.value !== 'authenticated') {
    redirect('/admin/login');
  }

  const { edit } = await searchParams;
  const currentPage = edit || '/';

  const dataFile = path.join(process.cwd(), 'public', 'seo-data.json');
  let seoData: Record<string, any> = {};
  try {
      const fileData = await fs.readFile(dataFile, 'utf8');
      seoData = JSON.parse(fileData);
  } catch(e) {
      seoData = {};
  }
  
  const currentMetadata = seoData[currentPage] || {
      title: '',
      description: '',
      keywords: '',
      canonical: '',
      og_url: '',
      publisher: '',
      robots: 'index, follow'
  };

  return (
    <div className="flex bg-[#020617] text-slate-50 font-sans min-h-screen">
      
      {/* 
        Fixed Sidebar for absolute bottom control
        1. h-screen & sticky: Fills the viewport perfectly and never scrolls away
        2. flex-col & overflow: The middle section scrolls if there are too many pages
      */}
      <aside className="w-[320px] h-screen sticky top-0 bg-slate-900/40 backdrop-blur-3xl border-r border-white/10 flex flex-col items-center shadow-[10px_0_30px_-15px_rgba(0,0,0,0.5)] z-20">
        
        {/* Header Block */}
        <div className="w-full p-10 border-b border-white/5 bg-slate-900/20">
            <h2 className="font-black text-3xl text-amber-500 tracking-[0.15em] text-center uppercase">Karmana</h2>
            <p className="text-slate-400 text-[9px] text-center mt-3 font-bold tracking-widest uppercase">Global SEO Command</p>
        </div>

        {/* Scrollable Nav Area */}
        <nav className="flex-1 w-full overflow-y-auto px-6 py-8 flex flex-col gap-2 custom-scrollbar">
            {Object.keys(seoData).map((pagePath) => {
                const isActive = currentPage === pagePath;
                const linkName = pagePath === '/' ? 'Home Page' : pagePath.replace(/[-/]/g, ' ').trim().replace(/\b\w/g, c => c.toUpperCase());
                return (
                    <Link 
                        key={pagePath} 
                        href={`?edit=${encodeURIComponent(pagePath)}`}
                        className={`px-5 py-4 rounded-xl font-medium transition-all duration-300 flex items-center group relative overflow-hidden ${
                            isActive 
                            ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20' 
                            : 'bg-transparent text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                        {/* Interactive Dot */}
                        <div className={`w-1.5 h-1.5 rounded-full mr-4 transition-all duration-500 ${
                            isActive ? 'bg-slate-900 scale-125' : 'bg-transparent group-hover:bg-amber-500/50'
                        }`}></div>
                        <span className="relative text-sm tracking-wide">{linkName}</span>
                    </Link>
                )
            })}
        </nav>

        {/* 
          Absolute Bottom Logout Block
          mt-auto forces this container to adhere flush to the bottom
        */}
        <div className="w-full p-6 bg-slate-900/30 border-t border-white/5 mt-auto shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.5)]">
            <form action={logoutAction}>
                <button className="w-full text-center px-4 py-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-bold tracking-widest text-[10px] uppercase hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300">
                    Terminate Session
                </button>
            </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center p-12 lg:p-20 relative overflow-hidden">
        
        {/* Cinematic Background Lighting */}
        <div className="absolute top-[5%] right-[10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-[5%] left-[20%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

        <div className="w-full max-w-5xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <header className="mb-14">
                <h1 className="text-5xl font-black m-0 leading-tight text-white tracking-tight">Metadata <span className="text-amber-500 font-light italic">Orchestration</span></h1>
                <p className="text-slate-400 mt-5 text-lg font-light tracking-wide">
                    Currently tuning matrix parameters for core route: 
                    <strong className="text-amber-400 font-mono bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg ml-3 tracking-widest text-sm shadow-inner shadow-amber-500/10">
                        {currentPage}
                    </strong>
                </p>
            </header>

            <SeoForm key={currentPage} currentPage={currentPage} currentMetadata={currentMetadata} />
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
