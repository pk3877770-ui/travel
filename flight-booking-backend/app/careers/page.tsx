import { getSEOMetadata, mapSEOToMetadata } from "@/lib/seo";


export async function generateMetadata() {
  const seo = await getSEOMetadata("/careers");
  return mapSEOToMetadata(seo);
}

export default function CareersPage() {
  return (
    <div className="pt-32 pb-20 min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-slate-800 mb-4">Careers</h1>
      <p className="text-slate-500">Join our team. This page is under construction.</p>
    </div>
  );
}
