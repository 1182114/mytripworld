import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-white md:py-32">
      <Photo name="wingSunset" alt="" sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-ink/75" />
      <Reveal className="container-x text-center">
        <p className="eyebrow !text-gold">Ready when you are</p>
        <h2 className="mx-auto mt-3 max-w-3xl font-display text-[2.5rem] leading-[1.05] md:text-6xl">
          You didn&rsquo;t come this far to stop. Let&rsquo;s plan your next dream trip.
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-gold">
            <WhatsAppIcon className="h-4 w-4" />
            Chat with our experts
          </a>
          <a href={site.phoneHref} className="btn btn-ghost">
            Call {site.phoneDisplay}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
