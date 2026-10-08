import { getContent } from "@/lib/content";
import { EnquiryFormClient } from "./EnquiryFormClient";

export async function EnquiryForm({ defaultTrip = "", defaultMessage = "" }: { defaultTrip?: string; defaultMessage?: string }) {
  const { contact, packages } = await getContent();
  return <EnquiryFormClient contact={contact} trips={packages.map((p) => p.title)} defaultTrip={defaultTrip} defaultMessage={defaultMessage} />;
}
