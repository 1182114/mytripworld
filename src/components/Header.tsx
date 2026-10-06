import { getContent } from "@/lib/content";
import { HeaderClient } from "./HeaderClient";

export async function Header() {
  const { contact, settings } = await getContent();
  return <HeaderClient contact={contact} logo={settings.logo} />;
}
