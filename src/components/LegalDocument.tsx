import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { PageHero } from "./PageHero";
import { RichText } from "./RichText";

// Privacy Policy and Terms: the text is edited in the admin panel under Pages.
export async function LegalDocument({ slug }: { slug: string }) {
  const { legal, contact } = await getContent();
  const page = legal.find((l) => l.slug === slug);
  if (!page) notFound();
  return (
    <>
      <PageHero eyebrow="Legal" title={page.title} crumbs={[{ name: page.title, href: `/${page.slug}/` }]} />
      <section className="py-16 md:py-24">
        <div className="container-x max-w-3xl space-y-4 text-base leading-relaxed text-muted [&_h2:first-child]:mt-0 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-ink">
          <RichText value={page.body} headingClass="" />
          <p className="!mt-8 text-sm">
            Questions? Write to{" "}
            <a className="underline underline-offset-4" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

export async function legalMeta(slug: string) {
  const { legal, settings } = await getContent();
  const page = legal.find((l) => l.slug === slug);
  if (!page) throw new Error(`Content problem: the legal page "${slug}" is missing. Publish it in the admin panel under Pages.`);
  return { title: page.title, description: page.description, path: `/${page.slug}/`, siteName: settings.name };
}
