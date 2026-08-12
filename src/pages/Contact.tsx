import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Contact() {
  useDocumentTitle("Contact — RMS Jewelries");

  return (
    <main>
      <section className="py-20 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-rms-muted">
              Contact
            </p>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-rms-charcoal sm:text-5xl">
              Contact RMS Jewelries
            </h1>
            <p className="mt-5 text-base leading-7 text-rms-muted">
              The quickest way to reach us is to start an inquiry &mdash; tell
              us a little about what you have in mind, and a member of RMS will
              personally follow up.
            </p>

            <div className="mt-9">
              <Link
                to="/inquire"
                className="inline-block bg-rms-charcoal px-7 py-3.5 text-sm font-medium text-rms-ivory transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
              >
                Start an Inquiry
              </Link>
            </div>

            <div className="mt-14 border-t border-rms-charcoal/10 pt-10">
              <h2 className="font-display text-2xl font-medium text-rms-charcoal">
                Other ways to reach us
              </h2>
              <dl className="mt-5 space-y-4 text-sm text-rms-muted">
                <div>
                  <dt className="font-medium text-rms-charcoal">Email</dt>
                  <dd className="mt-1">
                    <a
                      href="mailto:jewelriesrms@gmail.com"
                      className="text-rms-charcoal underline underline-offset-2 hover:text-rms-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-2 focus-visible:ring-offset-rms-ivory"
                    >
                      jewelriesrms@gmail.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-rms-charcoal">Location</dt>
                  <dd className="mt-1">Pandi, Bulacan, Philippines</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
