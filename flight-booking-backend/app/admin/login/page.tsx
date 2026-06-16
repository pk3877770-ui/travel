import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';
import PageWithBreadcrumb from '@/components/PageWithBreadcrumb';

export default async function AdminLoginPage() {
  return (
    <PageWithBreadcrumb routePath="/admin/login">
      <div className="relative flex justify-center items-center h-screen bg-[#020617] overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 bg-slate-900/50 backdrop-blur-xl border border-white/10 p-12 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-[450px] mx-4 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white tracking-widest uppercase">Kramana</h1>
            <p className="text-amber-500 font-bold mt-3 tracking-[0.2em] text-[10px] uppercase">Secure Operations Portal</p>
        </div>
        <LoginForm />
      </div>
      </div>
    </PageWithBreadcrumb>
  );
}
