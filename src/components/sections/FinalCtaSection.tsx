import { Link } from "react-router-dom";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function FinalCtaSection() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="border-t border-rms-charcoal/10 py-20 lg:py-28"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            id="final-cta-heading"
            eyebrow="Get in Touch"
            title="Have something in mind?"
            description="Tell us what you're looking for and start a conversation with RMS."
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
  );
}
