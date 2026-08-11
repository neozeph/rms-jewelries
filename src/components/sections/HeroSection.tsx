import { Link } from "react-router-dom";
import Container from "../ui/Container";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      <Container>
        <div className="grid min-h-[75vh] items-center gap-12 py-20 lg:grid-cols-2 lg:py-24">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-rms-muted">
              RMS Jewelries
            </p>

            <h1
              id="hero-heading"
              className="mt-6 font-display text-5xl font-medium leading-[0.95] tracking-tight text-rms-charcoal sm:text-6xl lg:text-7xl"
            >
              Jewelry crafted around your story.
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-rms-muted sm:text-lg">
              Thoughtfully crafted custom jewelry for the moments you want to
              remember.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/collections"
                className="bg-rms-charcoal px-7 py-3.5 text-sm font-medium text-rms-ivory transition-opacity hover:opacity-80"
              >
                Explore the collection
              </Link>

              <Link
                to="/contact"
                className="border border-rms-charcoal/20 px-7 py-3.5 text-sm font-medium text-rms-charcoal transition-colors hover:border-rms-charcoal"
              >
                Start a conversation
              </Link>
            </div>
          </div>

          <div
            className="aspect-[4/5] bg-black/5"
            aria-label="Featured RMS jewelry"
          >
            {/* Placeholder image */}
          </div>
        </div>
      </Container>
    </section>
  );
}
