'use client';
import { useActionState } from 'react';
import { saveSeoData } from './actions';

export default function SeoForm({ currentPage, currentMetadata, isLocalJson }: { currentPage: string, currentMetadata: any, isLocalJson?: boolean }) {
    const [state, formAction, isPending] = useActionState(saveSeoData, null);

    const downloadJson = () => {
        if (!state?.fullData) return;
        const blob = new Blob([JSON.stringify(state.fullData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'seo-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/[0.05] rounded-[2.5rem] p-12 md:p-16 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            
            {/* Dynamic Interactive Border */}
            <div className={`absolute inset-0 border-2 rounded-[2.5rem] pointer-events-none transition-all duration-1000 ${isPending ? 'border-amber-500/50 scale-[1.01]' : 'border-transparent'}`}></div>

            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none"></div>

            {state?.message && (
                <div key={state.timestamp} className={`p-6 mb-12 rounded-3xl border flex items-center justify-between gap-6 font-bold text-sm animate-in fade-in slide-in-from-top-4 duration-500 relative z-10 ${state.status === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                    <div className="flex-1 flex items-center gap-4">
                        {state.status === 'success' ? (
                            <div className="relative flex h-4 w-4 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                            </div>
                        ) : (
                            <div className="w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)] shrink-0"></div>
                        )}
                        <span className="leading-tight">{state.message}</span>
                    </div>

                    {state.target === 'virtual' && state.status === 'success' && (
                        <button 
                            type="button"
                            onClick={downloadJson}
                            className="px-6 py-3 bg-emerald-500 text-[#030712] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all shadow-xl"
                        >
                            Export to JSON
                        </button>
                    )}
                </div>
            )}
            
            <form key={state?.timestamp || 'initial'} action={formAction} className="grid md:grid-cols-2 gap-x-12 gap-y-12 relative z-10">
                <input type="hidden" name="page_key" value={currentPage} />
                
                <div className="flex flex-col gap-4 md:col-span-2 group">
                    <div className="flex items-center justify-between px-1">
                        <label className="font-black text-sm text-slate-500 uppercase tracking-[0.2em] group-focus-within:text-amber-500 transition-colors">Route Signature (Title)</label>
                        <span className="text-[10px] text-slate-600 font-mono italic">SEO_CORE_VALUE</span>
                    </div>
                    <input type="text" name="title" defaultValue={currentMetadata?.title || ''} placeholder="Karmana | Luxury Excellence..." required
                           className="bg-black/20 border border-white/[0.05] p-6 rounded-2xl text-white text-lg focus:outline-none focus:border-amber-500/40 focus:bg-black/40 focus:ring-4 focus:ring-amber-500/5 transition-all font-medium placeholder:text-slate-800"/>
                    <div className="flex items-center gap-2 px-1">
                        <div className="w-1 h-1 rounded-full bg-amber-500/50"></div>
                        <span className="text-[11px] text-slate-600 font-medium">Optimal: 50-60 characters for maximum SERP dominance.</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4 md:col-span-2 group">
                    <label className="font-black text-sm text-slate-500 uppercase tracking-[0.2em] px-1 group-focus-within:text-amber-500 transition-colors">Matrix Description</label>
                    <textarea name="description" defaultValue={currentMetadata?.description || ''} placeholder="Describe the soul of this route..." required
                               className="bg-black/20 border border-white/[0.05] p-6 rounded-2xl text-white text-lg min-h-[200px] resize-none focus:outline-none focus:border-amber-500/40 focus:bg-black/40 focus:ring-4 focus:ring-amber-500/5 transition-all font-medium leading-relaxed placeholder:text-slate-800"></textarea>
                    <div className="flex items-center gap-2 px-1">
                        <div className="w-1 h-1 rounded-full bg-amber-500/50"></div>
                        <span className="text-[11px] text-slate-600 font-medium">Directly correlates with CTR and user perception. Target 155 chars.</span>
                    </div>
                </div>

                {/* Technical Inputs Grid */}
                <div className="flex flex-col gap-4 group">
                    <label className="font-black text-sm text-slate-500 uppercase tracking-[0.2em] px-1 group-focus-within:text-amber-500 transition-colors">Taxonomy Keywords</label>
                    <input type="text" name="keywords" defaultValue={currentMetadata?.keywords || ''} placeholder="luxury, bespoke, global..." 
                           className="bg-black/20 border border-white/[0.05] p-6 rounded-2xl text-white text-sm focus:outline-none focus:border-amber-500/40 focus:bg-black/40 transition-all font-medium placeholder:text-slate-800"/>
                </div>

                <div className="flex flex-col gap-4 group">
                    <label className="font-black text-sm text-slate-500 uppercase tracking-[0.2em] px-1 group-focus-within:text-amber-500 transition-colors">Crawler Directives</label>
                    <input type="text" name="robots" defaultValue={currentMetadata?.robots || 'index, follow'} placeholder="index, follow" 
                           className="bg-black/20 border border-white/[0.05] p-6 rounded-2xl text-white text-sm focus:outline-none focus:border-amber-500/40 focus:bg-black/40 transition-all font-medium placeholder:text-slate-800"/>
                </div>

                <div className="flex flex-col gap-4 group">
                    <label className="font-black text-sm text-slate-500 uppercase tracking-[0.2em] px-1 group-focus-within:text-amber-500 transition-colors">Authority Canonical</label>
                    <input type="url" name="canonical" defaultValue={currentMetadata?.canonical || ''} placeholder="https://karmana.com/..." 
                           className="bg-black/20 border border-white/[0.05] p-6 rounded-2xl text-white text-sm focus:outline-none focus:border-amber-500/40 focus:bg-black/40 transition-all font-medium placeholder:text-slate-800"/>
                </div>

                <div className="flex flex-col gap-4 group">
                    <label className="font-black text-sm text-slate-500 uppercase tracking-[0.2em] px-1 group-focus-within:text-amber-500 transition-colors">Graph Endpoints (OG Url)</label>
                    <input type="url" name="og_url" defaultValue={currentMetadata?.og_url || ''} placeholder="https://karmana.social/..." 
                           className="bg-black/20 border border-white/[0.05] p-6 rounded-2xl text-white text-sm focus:outline-none focus:border-amber-500/40 focus:bg-black/40 transition-all font-medium placeholder:text-slate-800"/>
                </div>

                <div className="flex flex-col gap-4 md:col-span-2 group">
                    <label className="font-black text-sm text-slate-500 uppercase tracking-[0.2em] px-1 group-focus-within:text-amber-500 transition-colors">Entity Publisher</label>
                    <input type="url" name="publisher" defaultValue={currentMetadata?.publisher || ''} placeholder="https://plus.google.com/..." 
                           className="bg-black/20 border border-white/[0.05] p-6 rounded-2xl text-white text-sm focus:outline-none focus:border-amber-500/40 focus:bg-black/40 transition-all font-medium placeholder:text-slate-800"/>
                </div>

                <div className="md:col-span-2 pt-6">
                    <button type="submit" disabled={isPending}
                            className={`w-full p-7 rounded-[1.5rem] font-black tracking-[0.3em] uppercase text-[12px] cursor-pointer transition-all duration-500 relative overflow-hidden group/btn ${isPending ? 'opacity-50 scale-95' : 'hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(245,158,11,0.4)] active:scale-[0.98]'}`}>
                        <div className={`absolute inset-0 transition-opacity duration-500 ${isLocalJson ? 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600' : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600'}`}></div>
                        <span className="relative z-10 text-[#030712] transition-transform group-hover/btn:scale-110 block">
                            {isPending ? 'Synchronizing Control State...' : 'Commit Metadata to Core Cluster'}
                        </span>
                        
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                    </button>
                </div>
            </form>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}} />
        </div>
    );
}
