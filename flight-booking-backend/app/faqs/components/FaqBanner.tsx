import Image from "next/image";
import { Search } from "lucide-react";

export default function FaqBanner() {
  return (
    <div className="relative h-[320px] w-full overflow-hidden bg-blue-900 mt-20 flex flex-col items-center justify-center">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2070&auto=format&fit=crop"
          alt="Airplane wing over clouds"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/60 via-[#1e3a8a]/70 to-[#0f172a]/90"></div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
          FAQs
        </h1>
        <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto drop-shadow">
          Find answers to common questions about bookings, payments, cancellations and more.
        </p>
        
        <div className="relative max-w-2xl mx-auto group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 rounded-xl text-slate-900 bg-white shadow-xl focus:ring-4 focus:ring-blue-500/30 focus:outline-none transition-all placeholder:text-slate-400 font-medium"
            placeholder="Search for questions or topics..."
          />
        </div>
      </div>
    </div>
  );
}
