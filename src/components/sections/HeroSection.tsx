import { Link } from "react-router-dom";
import Container from "../ui/Container";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function HeroSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      <Container>
        <div
          ref={ref}
          className={`reveal grid min-h-[75vh] items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28 ${isVisible ? "is-visible" : ""}`}
        >
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-rms-muted">
              RMS Jewelries
            </p>

            <h1
              id="hero-heading"
              className="mt-6 font-display text-5xl font-medium leading-[0.95] tracking-tight text-rms-charcoal sm:text-6xl lg:text-7xl"
            >
              Jewelry crafted for your story.
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-rms-muted sm:text-lg">
              Custom pieces thoughtfully created around the people, moments,
              and stories they are meant to celebrate.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/collections"
                className="bg-rms-charcoal px-7 py-3.5 text-sm font-medium text-rms-ivory transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
              >
                Explore the Collection
              </Link>

              <Link
                to="/inquire"
                className="border border-rms-charcoal/20 px-7 py-3.5 text-sm font-medium text-rms-charcoal transition-colors hover:border-rms-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
              >
                Start an Inquiry
              </Link>
            </div>
          </div>

          <div
            className="flex aspect-[4/5] items-center justify-center border border-rms-charcoal/10 bg-black/5"
            aria-hidden="true"
          >
            {/* Placeholder for RMS photography */}
            <span className="font-display text-3xl text-rms-muted/50">
              RMS
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
