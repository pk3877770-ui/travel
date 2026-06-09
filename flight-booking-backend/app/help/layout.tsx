import { getSEOMetadata, mapSEOToMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSEOMetadata("/help");
  return mapSEOToMetadata(seo);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
