import { getContent } from "@/lib/content";
import { EnquiryFormClient } from "./EnquiryFormClient";

export async function EnquiryForm({ defaultTrip = "" }: { defaultTrip?: string }) {
  const { contact, packages } = await getContent();
  return <EnquiryFormClient contact={contact} trips={packages.map((p) => p.title)} defaultTrip={defaultTrip} />;
}
