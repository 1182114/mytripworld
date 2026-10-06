import { getContent, whatsappLink } from "@/lib/content";
import { WhatsAppIcon } from "./icons";
import { Pic } from "./Pic";
import { Reveal } from "./Reveal";

export async function CtaBand() {
  const { home, contact } = await getContent();
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-white md:py-32">
      {home.ctaImage && <Pic img={home.ctaImage} alt="" sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover" />}
      <div className="absolute inset-0 -z-10 bg-ink/75" />
      <Reveal className="container-x text-center">
        <p className="eyebrow !text-gold">Ready when you are</p>
        <h2 className="mx-auto mt-3 max-w-3xl font-display text-[2.5rem] leading-[1.05] md:text-6xl">{home.ctaHeading}</h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={whatsappLink(contact)} target="_blank" rel="noopener" className="btn btn-gold">
            <WhatsAppIcon className="h-4 w-4" />
            Chat with our experts
          </a>
          <a href={contact.phoneHref} className="btn btn-ghost">
            Call {contact.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
