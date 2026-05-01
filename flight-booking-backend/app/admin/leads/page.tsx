import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';
import Contact from '@/models/Contact';
import Link from 'next/link';
import { logoutAction } from '../login/actions';
import { Search, MapPin, Calendar, Users, Trash2, ShieldCheck, Zap, Globe, Clock } from 'lucide-react';

export default async function LeadsAdminPage({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  const { filter } = await searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  if (token?.value !== 'authenticated') {
    redirect('/admin/login');
  }

  let leads = [];
  let dbError = false;
  try {
    await dbConnect();
    
    let query = {};
    if (filter === 'flights') query = { type: { $regex: /Flight|Aviation|Booking/i } };
    if (filter === 'holidays') query = { type: { $regex: /Holiday|Bundle|Package|Journey/i } };
    if (filter === 'hotels') query = { type: { $regex: /Hotel|Residency|Elite/i } };
    if (filter === 'ticket') query = { type: { $regex: /Ticket|Confirmed/i } };

    if (filter === 'contacts') {
        let rawContacts = await Contact.find({}).sort({ createdAt: -1 });
        const uniqueContacts = new Map();
        rawContacts.forEach(contact => {
            const key = `${contact.email}-${contact.subject}-${contact.message}`.toLowerCase().trim();
            if (!uniqueContacts.has(key)) {
                uniqueContacts.set(key, contact);
            }
        });
        leads = Array.from(uniqueContacts.values());
    } else {
        leads = await Lead.find(query).sort({ createdAt: -1 });
    }
  } catch (error) {
    console.error("Database connection failed in LeadsAdminPage:", error);
    dbError = true;
  }

  return (
    <div className="flex bg-[#020617] text-slate-100 font-sans min-h-screen selection:bg-accent/30 overflow-hidden">
      
      {/* Cinematic Sidebar */}
      <aside className="w-[320px] h-screen sticky top-0 bg-[#020617]/50 backdrop-blur-[50px] border-r border-white/[0.03] flex flex-col items-center z-50">
        <div className="w-full p-12 relative overflow-hidden group">
            <h2 className="font-black text-3xl text-white tracking-tighter text-center flex flex-col items-center">
                KARMANA
                <span className="text-[10px] text-accent tracking-[0.5em] uppercase font-light mt-2">Sovereign Admin</span>
            </h2>
        </div>

        <nav className="flex-1 w-full px-6 py-6 flex flex-col gap-2">
            <Link 
                href="/admin/seo"
                className="group px-6 py-4 rounded-2xl font-bold transition-all flex items-center gap-4 text-slate-500 hover:bg-white/[0.03] hover:text-white"
            >
                <ShieldCheck className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="text-sm tracking-tight">SEO Portal</span>
            </Link>
            <Link 
                href="/admin/leads"
                className="group px-6 py-4 rounded-2xl font-bold transition-all flex items-center gap-4 bg-accent text-primary-dark shadow-[0_20px_40px_-10px_rgba(245,158,11,0.3)]"
            >
                <Zap className="w-5 h-5" />
                <span className="text-sm tracking-tight">Lead Matrix</span>
            </Link>
        </nav>

        <div className="w-full p-8 mt-auto">
            <form action={logoutAction}>
                <button className="w-full px-4 py-5 bg-white/5 text-slate-400 border border-white/5 rounded-2xl font-black tracking-widest text-[10px] uppercase hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-500">
                    Exit Control
                </button>
            </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-12 lg:p-20 relative scrollbar-hide">
        {/* Dynamic Background Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-6xl mx-auto">
            <header className="mb-20">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-1px bg-accent/50"></div>
                    <span className="text-accent font-black text-[10px] tracking-[0.4em] uppercase">Intelligence Dashboard</span>
                </div>
                <h1 className="text-7xl font-black text-white tracking-tighter leading-[0.9] mb-6">
                    Operational <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-400 to-rose-500">Analytics Panel</span>
                </h1>
                <p className="text-slate-400 text-xl max-w-2xl font-medium opacity-60 leading-relaxed">
                    Real-time oversight of global search intent and sovereign booking inquiries across the Karmana network.
                </p>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {[
                    { label: "Total Inquiries", value: leads.length, icon: Search, color: "text-accent", bg: "bg-accent/10" },
                    { label: "System Status", value: "Operational", icon: Globe, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { label: "Active Sessions", value: "24", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/[0.05] p-10 rounded-[2.5rem] backdrop-blur-2xl group hover:bg-white/[0.04] transition-all">
                        <div className="flex items-center justify-between mb-6">
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className="w-1 h-10 bg-white/5 rounded-full"></div>
                        </div>
                        <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</div>
                        <div className={`text-4xl font-black ${i === 0 ? 'text-white' : stat.color}`}>{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Matrix Filters */}
            <div className="flex flex-wrap gap-3 mb-10 bg-white/[0.02] p-2 rounded-3xl border border-white/[0.03] w-fit">
                {[
                    { id: null, label: "All Data" },
                    { id: "flights", label: "Aviation" },
                    { id: "holidays", label: "Bundles" },
                    { id: "hotels", label: "Elite Stays" },
                    { id: "contacts", label: "Direct Comms" },
                    { id: "ticket", label: "Bookings" }
                ].map((t) => (
                    <Link 
                        key={t.id}
                        href={t.id ? `/admin/leads?filter=${t.id}` : "/admin/leads"} 
                        className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                            (filter === t.id || (!filter && t.id === null)) 
                            ? 'bg-accent text-primary-dark shadow-[0_10px_20px_rgba(245,158,11,0.2)]' 
                            : 'text-slate-500 hover:text-white'
                        }`}
                    >
                        {t.label}
                    </Link>
                ))}
            </div>

            {/* Premium Data Table */}
            <div className="bg-white/[0.01] border border-white/[0.04] rounded-[3rem] overflow-hidden backdrop-blur-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
                <div className="p-8 border-b border-white/[0.04] bg-white/[0.01] flex items-center justify-between">
                    <h3 className="font-black text-sm uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                        Live Stream: {filter || "Global Matrix"}
                    </h3>
                </div>
                
                <div className="overflow-x-auto">
                    {filter === 'contacts' ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/[0.02]">
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Temporal Origin</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Identified Entity</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Communication Channel</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Directive</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Payload</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.02]">
                                {leads.map((lead: any) => (
                                    <tr key={lead._id} className="group hover:bg-white/[0.03] transition-all">
                                        <td className="px-10 py-8 text-xs font-mono text-slate-500">
                                            {new Date(lead.createdAt).toLocaleString()}
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="text-white font-black tracking-tight">{lead.name}</div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="text-accent font-bold text-sm">{lead.email}</div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="px-3 py-1.5 rounded-lg bg-white/5 text-[9px] font-black uppercase tracking-widest border border-white/5">{lead.subject}</span>
                                        </td>
                                        <td className="px-10 py-8 max-w-xs">
                                            <div className="text-slate-400 text-xs leading-relaxed line-clamp-1 group-hover:line-clamp-none transition-all cursor-help">{lead.message}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/[0.02]">
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Origin & Destination</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Date</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Unit Count</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.02]">
                                {leads.map((lead: any) => (
                                    <tr key={lead._id} className="group hover:bg-white/[0.03] transition-all">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-6">
                                                <div className="text-white font-black tracking-tighter text-lg uppercase">{lead.from}</div>
                                                <div className="w-10 h-px bg-white/10 group-hover:w-16 transition-all group-hover:bg-accent/50"></div>
                                                <div className="text-white font-black tracking-tighter text-lg uppercase">{lead.to}</div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="px-4 py-1.5 rounded-full bg-accent/10 text-accent text-[9px] font-black uppercase tracking-widest border border-accent/20">{lead.type || 'Standard'}</span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-2 text-slate-400 font-mono text-xs italic">
                                                <Calendar className="w-3 h-3" />
                                                {lead.date || 'UNSPECIFIED'}
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-2 text-slate-300 font-black text-xs">
                                                <Users className="w-4 h-4 text-blue-500" />
                                                {lead.travelers}
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <button className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-rose-500/20 hover:text-rose-500 transition-all border border-white/5">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {leads.length === 0 && (
                    <div className="p-32 text-center">
                        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/5">
                            <Search className="w-10 h-10 text-slate-700" />
                        </div>
                        <h4 className="text-2xl font-black text-white mb-2 tracking-tighter">Null Data Response</h4>
                        <p className="text-slate-600 font-medium">The matrix has not captured any data points for this specific query.</p>
                    </div>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}
