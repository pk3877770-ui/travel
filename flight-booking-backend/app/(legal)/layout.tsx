import LegalSidebar from "@/components/LegalSidebar";
import Image from "next/image";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Banner */}
      <div className="relative h-[280px] w-full overflow-hidden bg-blue-900 mt-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
            alt="Airplane in sky"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] via-[#1e3a8a]/80 to-transparent"></div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Legal Pages
          </h1>
          <p className="text-blue-100 text-lg max-w-xl">
            Read our policies and legal information to understand your rights and our commitment.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <LegalSidebar />
          <div className="flex-1 w-full min-w-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
