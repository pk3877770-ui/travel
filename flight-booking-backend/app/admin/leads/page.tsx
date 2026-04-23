import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Flight from '@/models/Flight';
import Link from 'next/link';
import { logoutAction } from '../login/actions';
import { Search, MapPin, Calendar, Users, Trash2 } from 'lucide-react';

export default async function LeadsAdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  if (token?.value !== 'authenticated') {
    redirect('/admin/login');
  }

  await dbConnect();
  // Fetch directly from your 'flights' collection as requested
  const leads = await Flight.find({}).sort({ _id: -1 });

  return (
    <div className="flex bg-[#030712] text-slate-100 font-sans min-h-screen selection:bg-amber-500/30">
      
      {/* Cinematic Sidebar */}
      <aside className="w-[340px] h-screen sticky top-0 bg-[#030712]/80 backdrop-blur-[40px] border-r border-white/[0.03] flex flex-col items-center shadow-[20px_0_50px_-20px_rgba(0,0,0,0.8)] z-30">
        
        <div className="w-full p-12 border-b border-white/[0.03] bg-gradient-to-b from-white/[0.02] to-transparent relative overflow-hidden group">
            <h2 className="font-extrabold text-4xl text-white tracking-[-0.03em] text-center flex flex-col items-center gap-1">
                K<span className="text-amber-500 font-light italic text-5xl mt-[-5px]">A</span>RMANA
            </h2>
            <div className="flex items-center justify-center gap-3 mt-5">
                <p className="text-slate-500 text-[10px] text-center font-black tracking-[0.3em] uppercase">Control Center</p>
            </div>
        </div>

        <nav className="flex-1 w-full overflow-y-auto px-6 py-10 flex flex-col gap-2.5">
            <Link 
                href="/admin/seo"
                className="px-6 py-4.5 rounded-2xl font-semibold transition-all duration-500 flex items-center bg-white/[0.02] text-slate-400 hover:bg-white/[0.05] hover:text-white"
            >
                <div className="w-2 h-2 rounded-full mr-5 bg-slate-800"></div>
                <span className="relative text-[13px] tracking-tight">SEO Management</span>
            </Link>
            <Link 
                href="/admin/leads"
                className="px-6 py-4.5 rounded-2xl font-semibold transition-all duration-500 flex items-center bg-amber-500 text-[#030712] shadow-[0_10px_30px_-5px_rgba(245,158,11,0.3)] scale-[1.02]"
            >
                <div className="w-2 h-2 rounded-full mr-5 bg-[#030712] animate-ping opacity-20"></div>
                <span className="relative text-[13px] tracking-tight">Search Leads</span>
            </Link>
        </nav>

        <div className="w-full p-8 bg-[#030712]/60 border-t border-white/[0.03] mt-auto">
            <form action={logoutAction}>
                <button className="w-full px-4 py-5 bg-rose-500/5 text-rose-500 border border-rose-500/10 rounded-2xl font-black tracking-widest text-[11px] uppercase hover:bg-rose-500 hover:text-white transition-all duration-500">
                    Terminate Session
                </button>
            </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-14 lg:p-24 relative overflow-hidden">
        <div className="absolute top-[0%] left-[50%] -translate-x-1/2 w-[1200px] h-[800px] bg-amber-500/[0.03] rounded-full blur-[160px] pointer-events-none -z-10"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
            <header className="mb-16">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-amber-500/50 font-mono text-[10px] tracking-[0.5em] uppercase">Search Matrix</span>
                </div>
                <h1 className="text-7xl font-black text-white tracking-tighter mb-4">
                    Inquiry <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600 font-light italic">Captured Leads</span>
                </h1>
                <p className="text-slate-500 text-lg max-w-2xl">
                    Track every search query from your portal. These are potential customers interested in specific destinations.
                </p>
            </header>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-[2rem] backdrop-blur-xl">
                    <div className="flex items-center gap-4 text-slate-400 mb-2">
                        <Search className="w-5 h-5 text-amber-500" />
                        <span className="text-xs font-black uppercase tracking-widest">Total Inquiries</span>
                    </div>
                    <div className="text-4xl font-black text-white">{leads.length}</div>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-[2rem] backdrop-blur-xl">
                    <div className="flex items-center gap-4 text-slate-400 mb-2">
                        <Calendar className="w-5 h-5 text-emerald-500" />
                        <span className="text-xs font-black uppercase tracking-widest">Tracking Status</span>
                    </div>
                    <div className="text-4xl font-black text-emerald-500">Live</div>
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] overflow-x-auto backdrop-blur-3xl shadow-2xl">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="border-b border-white/[0.05] bg-white/[0.01]">
                            <th className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Departure</th>
                            <th className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Destination</th>
                            <th className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Travel Date</th>
                            <th className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Travelers</th>
                            <th className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02]">
                        {leads.map((lead: any) => (
                            <tr key={lead._id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-8 py-7">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-4 h-4 text-amber-500" />
                                        <span className="text-lg font-medium text-white group-hover:text-amber-500 transition-colors">{lead.from}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-7 font-bold text-white uppercase tracking-tight">
                                    {lead.to}
                                </td>
                                <td className="px-8 py-7 text-slate-400 font-medium font-mono text-sm">
                                    {lead.date || 'Flexible'}
                                </td>
                                <td className="px-8 py-7">
                                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-black uppercase tracking-widest">{lead.travelers}</span>
                                </td>
                                <td className="px-8 py-7 text-right">
                                    <button className="p-3 bg-white/5 rounded-xl text-slate-500 hover:bg-rose-500/10 hover:text-rose-500 transition-all">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {leads.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-8 py-20 text-center text-slate-600 font-medium italic">
                                    No search inquiries captured in the matrix yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </main>
    </div>
  );
}
