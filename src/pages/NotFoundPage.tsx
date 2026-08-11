import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function NotFoundPage() {
  useDocumentTitle("Page Not Found — RMS Jewelries");

  return (
    <main>
      <section className="py-20 lg:py-28">
        <Container>
          <div className="border border-rms-charcoal/10 px-8 py-16 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-rms-muted">
              404
            </p>
            <h1 className="mt-3 font-display text-3xl font-medium text-rms-charcoal">
              Page not found
            </h1>
            <p className="mt-3 text-sm text-rms-muted">
              The page you&apos;re looking for may have moved or no longer
              exists.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block border border-rms-charcoal/20 px-6 py-2.5 text-sm font-medium text-rms-charcoal transition-colors hover:border-rms-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
            >
              Back to Home
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
