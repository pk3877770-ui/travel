'use client';
import { useActionState } from 'react';
import { loginAction } from './actions';

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, { error: '' });

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="bg-red-500/10 border border-red-500/30 text-rose-400 px-4 py-3 rounded-xl text-sm font-semibold text-center animate-in fade-in slide-in-from-top-2">
          {state.error}
        </div>
      )}
      
      <div className="space-y-5">
          <div>
            <label className="block text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2 ml-1" htmlFor="username">Administrative ID</label>
            <input 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-amber-500/50 focus:bg-white/10 focus:ring-1 focus:ring-amber-500/50 text-white transition-all placeholder:text-slate-600 font-medium" 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Enter your system identifier"
              required 
            />
          </div>
          <div>
            <label className="block text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2 ml-1" htmlFor="password">Security Passport</label>
            <input 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-amber-500/50 focus:bg-white/10 focus:ring-1 focus:ring-amber-500/50 text-white transition-all placeholder:text-slate-600 font-medium tracking-widest" 
              type="password" 
              id="password" 
              name="password" 
              placeholder="••••••••••"
              required 
            />
          </div>
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 disabled:text-slate-900/50 text-slate-900 font-black py-4 px-4 rounded-xl transition-all mt-6 transform hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(245,158,11,0.4)] tracking-wide text-sm"
      >
        {isPending ? 'Verifying Credentials...' : 'INITIALIZE SESSION'}
      </button>
    </form>
  );
}
