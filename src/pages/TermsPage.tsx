import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import LegalSection from "../components/ui/LegalSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function TermsPage() {
  useDocumentTitle("Terms & Conditions — RMS Jewelries");

  return (
    <main>
      <section className="py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-rms-muted">
              Legal
            </p>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-rms-charcoal sm:text-5xl">
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-sm text-rms-muted">
              Effective date: August 11, 2026
            </p>

            <div className="mt-10 space-y-16">
              <LegalSection title="1. About the Website">
                <p>
                  This website is operated by RMS Jewelries
                  (&ldquo;RMS,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) as
                  a portfolio of custom jewelry work and a way for visitors
                  to submit inquiries. By using this website, you agree to
                  these terms.
                </p>
              </LegalSection>

              <LegalSection title="2. Jewelry Information">
                <p>
                  Jewelry descriptions, materials, and imagery on this
                  website are provided for illustrative and portfolio
                  purposes. Because each piece is handcrafted, the finished
                  piece you receive may vary from what is shown, including
                  natural variation in gemstones and metals.
                </p>
              </LegalSection>

              <LegalSection title="3. Pricing">
                <p>
                  Where a starting price (&ldquo;price from&rdquo;) is shown
                  for a piece, it is an indicative starting point only and
                  not a final quote. Final pricing for any piece, including
                  custom work, is determined through direct consultation
                  with RMS. We reserve the right to change displayed pricing
                  information at any time without notice.
                </p>
              </LegalSection>

              <LegalSection title="4. Custom Jewelry">
                <p>
                  Custom jewelry is created based on a personal consultation
                  between you and RMS. Specifications, timelines, and
                  pricing for custom work are agreed upon directly with RMS,
                  separately from this website, typically following an
                  inquiry submitted here.
                </p>
              </LegalSection>

              <LegalSection title="5. Inquiries and Orders">
                <p>
                  This website does not currently include a shopping cart,
                  online checkout, or payment processing. Submitting the
                  inquiry form is a request for information and an
                  expression of interest &mdash; it is not an order, a
                  binding purchase agreement, or a reservation of any piece.
                </p>
                <p>
                  No payment obligation and no order arises simply from
                  submitting an inquiry. Any purchase or custom order
                  arrangement is confirmed separately and directly between
                  you and RMS, outside of this website.
                </p>
              </LegalSection>

              <LegalSection title="6. Intellectual Property">
                <p>
                  Unless otherwise stated, all designs, photography, text,
                  and other content on this website are owned by or licensed
                  to RMS Jewelries and may not be copied, reproduced, or
                  reused without our prior written permission.
                </p>
              </LegalSection>

              <LegalSection title="7. Website Content">
                <p>
                  Content on this website is provided for general
                  informational and portfolio purposes and is provided
                  &ldquo;as is.&rdquo; We may update, correct, or remove
                  content at any time without notice, and we do not
                  guarantee that all information on this website is
                  complete or current at all times.
                </p>
              </LegalSection>

              <LegalSection title="8. External Links">
                <p>
                  This website may link to third-party websites or
                  services. We are not responsible for the content, privacy
                  practices, or availability of any third-party site we do
                  not operate.
                </p>
              </LegalSection>

              <LegalSection title="9. Limitation of Liability">
                <p>
                  To the fullest extent permitted by law, RMS is not liable
                  for any indirect, incidental, or consequential damages
                  arising from your use of this website. Nothing in these
                  terms limits any liability that cannot be excluded under
                  applicable law. These terms are governed by the laws of
                  the Philippines.
                </p>
              </LegalSection>

              <LegalSection title="10. Changes to These Terms">
                <p>
                  We may revise these terms from time to time. Changes take
                  effect once posted on this page. Continued use of this
                  website after changes are posted constitutes acceptance
                  of the updated terms.
                </p>
              </LegalSection>

              <LegalSection title="11. Contact">
                <p>
                  Questions about these terms can be directed to{" "}
                  <a
                    href="mailto:rmsjewelries@gmail.com"
                    className="text-rms-charcoal underline underline-offset-2 hover:text-rms-gold"
                  >
                    rmsjewelries@gmail.com
                  </a>
                  .
                </p>
              </LegalSection>
            </div>

            <p className="mt-16 text-sm text-rms-muted">
              See also our{" "}
              <Link
                to="/privacy"
                className="text-rms-charcoal underline underline-offset-2 hover:text-rms-gold"
              >
                Privacy Notice
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
