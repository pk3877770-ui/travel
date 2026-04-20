'use client';
import { useActionState } from 'react';
import { saveSeoData } from './actions';

export default function SeoForm({ currentPage, currentMetadata, readOnly }: { currentPage: string, currentMetadata: any, readOnly?: boolean }) {
    const [state, formAction, isPending] = useActionState(saveSeoData, null);

    return (
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden">
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>

            {state?.message && (
                <div key={state.timestamp} className={`p-5 mb-10 rounded-2xl border flex items-center gap-4 font-semibold text-sm ${state.status === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'} animate-in fade-in zoom-in-95 duration-300 relative z-10 box-shadow-xl`}>
                    {state.status === 'success' ? (
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </div>
                    ) : (
                        <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                    )}
                    {state.message}
                </div>
            )}
            
            <form action={formAction} className="grid md:grid-cols-2 gap-x-8 gap-y-10 relative z-10">
                <input type="hidden" name="page_key" value={currentPage} />
                
                <div className="flex flex-col gap-3 md:col-span-2 group">
                    <label className="font-bold text-[10px] text-slate-500 uppercase tracking-widest pl-1 group-focus-within:text-amber-500 transition-colors">Page Title</label>
                    <input type="text" name="title" defaultValue={currentMetadata?.title || ''} placeholder="Enter page title..." required disabled={readOnly}
                           className="bg-[#020617]/50 border border-white/5 p-5 rounded-2xl text-white text-base focus:outline-none focus:border-amber-500/50 focus:bg-[#020617]/80 focus:ring-1 focus:ring-amber-500/20 transition-all font-medium placeholder:text-slate-700 disabled:opacity-50"/>
                    <span className="text-[11px] text-slate-500 pl-1 font-medium tracking-wide">Optimal: 50-60 characters. Commands high-impact SERP real estate.</span>
                </div>

                <div className="flex flex-col gap-3 md:col-span-2 group">
                    <label className="font-bold text-[10px] text-slate-500 uppercase tracking-widest pl-1 group-focus-within:text-amber-500 transition-colors">Meta Description</label>
                    <textarea name="description" defaultValue={currentMetadata?.description || ''} placeholder="Enter structural meta description..." required disabled={readOnly}
                               className="bg-[#020617]/50 border border-white/5 p-5 rounded-2xl text-white text-base min-h-[160px] resize-y focus:outline-none focus:border-amber-500/50 focus:bg-[#020617]/80 focus:ring-1 focus:ring-amber-500/20 transition-all font-medium leading-relaxed placeholder:text-slate-700 disabled:opacity-50"></textarea>
                    <span className="text-[11px] text-slate-500 pl-1 font-medium tracking-wide">Optimal: 150-160 characters. Directly correlates with CTR and user perception.</span>
                </div>

                {/* Sub Inputs */}
                <div className="flex flex-col gap-3 group">
                    <label className="font-bold text-[10px] text-slate-500 uppercase tracking-widest pl-1 group-focus-within:text-amber-500 transition-colors">Taxonomy Keywords</label>
                    <input type="text" name="keywords" defaultValue={currentMetadata?.keywords || ''} placeholder="keyword1, keyword2, ..." disabled={readOnly}
                           className="bg-[#020617]/50 border border-white/5 p-5 rounded-2xl text-white text-sm focus:outline-none focus:border-amber-500/50 focus:bg-[#020617]/80 focus:ring-1 focus:ring-amber-500/20 transition-all font-medium placeholder:text-slate-700 disabled:opacity-50"/>
                </div>

                <div className="flex flex-col gap-3 group">
                    <label className="font-bold text-[10px] text-slate-500 uppercase tracking-widest pl-1 group-focus-within:text-amber-500 transition-colors">Index Guidelines (Robots)</label>
                    <input type="text" name="robots" defaultValue={currentMetadata?.robots || 'index, follow'} placeholder="index, follow" disabled={readOnly}
                           className="bg-[#020617]/50 border border-white/5 p-5 rounded-2xl text-white text-sm focus:outline-none focus:border-amber-500/50 focus:bg-[#020617]/80 focus:ring-1 focus:ring-amber-500/20 transition-all font-medium placeholder:text-slate-700 disabled:opacity-50"/>
                </div>

                <div className="flex flex-col gap-3 group">
                    <label className="font-bold text-[10px] text-slate-500 uppercase tracking-widest pl-1 group-focus-within:text-amber-500 transition-colors">Authority Canonical</label>
                    <input type="url" name="canonical" defaultValue={currentMetadata?.canonical || ''} placeholder="https://karmana.com/path" disabled={readOnly}
                           className="bg-[#020617]/50 border border-white/5 p-5 rounded-2xl text-white text-sm focus:outline-none focus:border-amber-500/50 focus:bg-[#020617]/80 focus:ring-1 focus:ring-amber-500/20 transition-all font-medium placeholder:text-slate-700 disabled:opacity-50"/>
                </div>

                <div className="flex flex-col gap-3 group">
                    <label className="font-bold text-[10px] text-slate-500 uppercase tracking-widest pl-1 group-focus-within:text-amber-500 transition-colors">Graph Endpoints (OG Url)</label>
                    <input type="url" name="og_url" defaultValue={currentMetadata?.og_url || ''} placeholder="https://karmana.com/path" disabled={readOnly}
                           className="bg-[#020617]/50 border border-white/5 p-5 rounded-2xl text-white text-sm focus:outline-none focus:border-amber-500/50 focus:bg-[#020617]/80 focus:ring-1 focus:ring-amber-500/20 transition-all font-medium placeholder:text-slate-700 disabled:opacity-50"/>
                </div>

                <div className="flex flex-col gap-3 md:col-span-2 mb-2 group">
                    <label className="font-bold text-[10px] text-slate-500 uppercase tracking-widest pl-1 group-focus-within:text-amber-500 transition-colors">Entity Publisher</label>
                    <input type="url" name="publisher" defaultValue={currentMetadata?.publisher || ''} placeholder="https://brand-profile.com" disabled={readOnly}
                           className="bg-[#020617]/50 border border-white/5 p-5 rounded-2xl text-white text-sm focus:outline-none focus:border-amber-500/50 focus:bg-[#020617]/80 focus:ring-1 focus:ring-amber-500/20 transition-all font-medium placeholder:text-slate-700 disabled:opacity-50"/>
                </div>

                <button type="submit" disabled={isPending || readOnly}
                        className="md:col-span-2 bg-amber-500 text-slate-950 border-none p-5 rounded-2xl font-black tracking-widest uppercase text-[13px] cursor-pointer transition-all duration-300 hover:bg-amber-400 hover:-translate-y-1 hover:shadow-[0_15px_30px_-5px_rgba(245,158,11,0.4)] disabled:opacity-50 disabled:pointer-events-none disabled:transform-none mt-2">
                    {isPending ? 'Synchronizing State...' : readOnly ? 'Read Only Mode' : 'Commit Metadata to Core'}
                </button>
            </form>
        </div>
    );
}
