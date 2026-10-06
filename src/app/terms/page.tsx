import type { Metadata } from "next";
import { LegalDocument, legalMeta } from "@/components/LegalDocument";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta(await legalMeta("terms"));
}

export default function Page() {
  return <LegalDocument slug="terms" />;
}
