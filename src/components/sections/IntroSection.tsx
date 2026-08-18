import { Link } from "react-router-dom";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { TEMPORARY_UNSPLASH_IMAGES } from "../../lib/temporaryImageFallbacks";

export default function IntroSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section aria-labelledby="intro-heading" className="py-20 lg:py-28">
      <Container>
        <div
          ref={ref}
          className={`reveal grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16 ${isVisible ? "is-visible" : ""}`}
        >
          <div className="aspect-[4/5] overflow-hidden border border-rms-charcoal/10 bg-black/5">
            <img
              src={TEMPORARY_UNSPLASH_IMAGES.about}
              alt=""
              aria-hidden="true"
              loading="lazy"
              width="1200"
              height="1500"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <SectionHeading
              id="intro-heading"
              eyebrow="About RMS"
              title="Rooted in a place known for the craft."
              description="RMS Jewelries is owned by Reynaldo Soriente, whose roots trace back to Meycauayan, Bulacan &mdash; a place known for its jewelry-making industry. Now based in Pandi, Bulacan, RMS carries that connection to craftsmanship forward into every custom piece."
            />

            <Link
              to="/about"
              className="mt-6 inline-block text-sm font-medium text-rms-charcoal underline underline-offset-4 transition-colors hover:text-rms-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
            >
              Discover Our Story
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
