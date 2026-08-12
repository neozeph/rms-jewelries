import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Jewelry Repair",
    description:
      "Jewelry can carry memories for years. Our repair service focuses on restoring pieces with care, helping worn, damaged, or broken jewelry return to a condition where it can be enjoyed again.",
  },
  {
    number: "02",
    title: "Custom Jewelry Design & Creation",
    description:
      "Some pieces begin with an idea. RMS works closely with each client to shape that idea into a finished piece, from the first conversation through to the jewelry itself.",
  },
  {
    number: "03",
    title: "Jewelry Maintenance",
    description:
      "Regular care helps preserve the beauty and condition of your jewelry over time. Our maintenance service is intended to keep your pieces looking their best and ready to be worn again.",
  },
  {
    number: "04",
    title: "Appraisals",
    description:
      "Sometimes you simply want a clearer understanding of what a piece is worth. Our appraisal service provides documented information about the jewelry you bring to us.",
  },
];

function ServiceImagePlaceholder() {
  return (
    <div className="aspect-[4/5] w-full overflow-hidden border border-rms-charcoal/10 bg-black/5">
      {/* Placeholder for RMS photography */}
      <div
        className="flex h-full items-center justify-center"
        aria-hidden="true"
      >
        <span className="font-display text-2xl text-rms-muted/50">RMS</span>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  useDocumentTitle("Services — RMS Jewelries");

  return (
    <main>
      <section aria-labelledby="services-heading" className="py-20 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-rms-muted">
              Our Services
            </p>
            <h1
              id="services-heading"
              className="mt-3 font-display text-4xl font-medium tracking-tight text-rms-charcoal sm:text-5xl"
            >
              From thoughtful design to careful restoration.
            </h1>
            <p className="mt-5 text-base leading-7 text-rms-muted">
              At RMS, our work goes beyond creating new pieces. We offer a
              few considered services &mdash; meant to help you create,
              restore, maintain, and care for jewelry that already holds
              meaning in your life.
            </p>
          </div>
        </Container>
      </section>

      {SERVICES.map((service, index) => {
        const headingId = `service-${service.number}-heading`;
        const isTextFirst = index % 2 === 0;

        const textBlock = (
          <SectionHeading
            key="text"
            id={headingId}
            eyebrow={service.number}
            title={service.title}
            description={service.description}
          />
        );

        const imageBlock = <ServiceImagePlaceholder key="image" />;

        return (
          <section
            key={service.number}
            aria-labelledby={headingId}
            className="border-t border-rms-charcoal/10 py-20 lg:py-28"
          >
            <Container>
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                {isTextFirst ? (
                  <>
                    {textBlock}
                    {imageBlock}
                  </>
                ) : (
                  <>
                    {imageBlock}
                    {textBlock}
                  </>
                )}
              </div>
            </Container>
          </section>
        );
      })}

      <section
        aria-labelledby="services-cta-heading"
        className="border-t border-rms-charcoal/10 py-20 lg:py-28"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading
              id="services-cta-heading"
              eyebrow="Have Something in Mind?"
              title="Let's talk about your piece."
              description="Whether you're looking to create something new or care for a piece you already own, we'd be glad to hear what you have in mind."
              centered
            />

            <div className="mt-8">
              <Link
                to="/inquire"
                className="inline-block bg-rms-charcoal px-9 py-4 text-sm font-medium text-rms-ivory transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
              >
                Start an Inquiry
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
