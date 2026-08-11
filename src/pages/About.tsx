import { Link } from "react-router-dom";
import Container from "../components/ui/Container";

export default function About() {
  return (
    <main>
      <section className="py-20 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-rms-muted">
              About
            </p>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-rms-charcoal sm:text-5xl">
              About RMS Jewelries
            </h1>
            <p className="mt-5 text-base leading-7 text-rms-muted">
              RMS Jewelries creates custom jewelry through direct
              collaboration with each client. Rather than producing pieces
              to sit on a shelf, every design is shaped around a specific
              person, moment, or story.
            </p>
            <p className="mt-5 text-base leading-7 text-rms-muted">
              This website is a portfolio of that work, organized by
              collection, alongside a way to reach us directly. There is no
              cart or online checkout here &mdash; browsing is meant to be a
              starting point for a conversation, not a transaction.
            </p>
            <p className="mt-5 text-base leading-7 text-rms-muted">
              If something you see resonates with an idea of your own,
              we&apos;d like to hear about it.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/inquire"
                className="bg-rms-charcoal px-7 py-3.5 text-sm font-medium text-rms-ivory transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
              >
                Start an Inquiry
              </Link>
              <Link
                to="/collections"
                className="border border-rms-charcoal/20 px-7 py-3.5 text-sm font-medium text-rms-charcoal transition-colors hover:border-rms-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
              >
                Explore the Collection
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
