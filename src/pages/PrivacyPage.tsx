import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import LegalSection from "../components/ui/LegalSection";

export default function PrivacyPage() {
  return (
    <main>
      <section className="py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-rms-muted">
              Legal
            </p>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-rms-charcoal sm:text-5xl">
              Privacy Notice
            </h1>
            <p className="mt-4 text-sm text-rms-muted">
              Effective date: [DATE TO BE CONFIRMED]
            </p>

            <div className="mt-10 space-y-16">
              <LegalSection title="1. Introduction">
                <p>
                  RMS Jewelries (&ldquo;RMS,&rdquo; &ldquo;we,&rdquo;
                  &ldquo;us&rdquo;) operates this website as a portfolio of
                  custom jewelry work and a way for visitors to reach us with
                  inquiries. This notice explains what information we
                  collect through this website, how we use it, and the
                  choices available to you.
                </p>
                <p>
                  This website does not currently include a shopping cart,
                  online checkout, or payment processing. It is used for
                  browsing our jewelry portfolio and submitting inquiries.
                </p>
              </LegalSection>

              <LegalSection title="2. Information We Collect">
                <p>
                  When you submit our inquiry form, we collect the
                  information you choose to provide:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Full name (required)</li>
                  <li>Email address (required)</li>
                  <li>Phone number (optional)</li>
                  <li>Preferred contact method (optional)</li>
                  <li>Your inquiry message</li>
                  <li>
                    The specific jewelry piece your inquiry relates to, if
                    you reached the form from a jewelry detail page
                  </li>
                </ul>
                <p>
                  Our web hosting and database infrastructure may also
                  process basic technical information (such as IP address)
                  automatically, as is standard for operating any website.
                  We do not currently combine this with dedicated tracking
                  or analytics tools.
                </p>
              </LegalSection>

              <LegalSection title="3. How We Use Information">
                <p>We use the information submitted through this website to:</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Respond to your inquiry;</li>
                  <li>
                    Discuss custom jewelry requests, consultations, or the
                    piece you asked about; and
                  </li>
                  <li>
                    Maintain a record of inquiries for our own business
                    purposes.
                  </li>
                </ul>
                <p>
                  We do not use the information you submit for marketing
                  communications unless you separately and explicitly
                  request this from us.
                </p>
              </LegalSection>

              <LegalSection title="4. Information Sharing">
                <p>
                  We do not sell your personal information. We use Supabase,
                  a third-party cloud database and application platform, to
                  securely store and manage the information described in
                  this notice on our behalf. We do not otherwise share your
                  information with third parties except where required by
                  law.
                </p>
              </LegalSection>

              <LegalSection title="5. Data Storage and Security">
                <p>
                  Information submitted through this website is stored in a
                  managed database with access controls restricting who can
                  read submitted inquiries. We take reasonable technical and
                  organizational measures to protect your information, but
                  no method of storage or transmission over the internet is
                  completely secure.
                </p>
              </LegalSection>

              <LegalSection title="6. Data Retention">
                <p>
                  We retain inquiry and contact information for as long as
                  reasonably necessary to respond to your inquiry and for
                  our legitimate business record-keeping purposes. [RETENTION
                  PERIOD TO BE CONFIRMED]
                </p>
              </LegalSection>

              <LegalSection title="7. Data Subject Rights">
                <p>
                  Depending on your location, you may have rights to access,
                  correct, or request deletion of the personal information
                  we hold about you. [APPLICABLE PRIVACY LAW / JURISDICTION
                  TO BE CONFIRMED]
                </p>
                <p>
                  To exercise any of these rights, contact us at [RMS
                  BUSINESS EMAIL].
                </p>
              </LegalSection>

              <LegalSection title="8. Cookies / Analytics">
                <p>
                  This website does not currently use analytics or
                  advertising cookies, and we do not use tools such as
                  Google Analytics or Meta Pixel. Your browser may use
                  minimal technical mechanisms inherent to loading any
                  modern website; we do not use these for tracking. This
                  section will be updated if analytics or advertising tools
                  are introduced in the future.
                </p>
              </LegalSection>

              <LegalSection title="9. Third-Party Services">
                <p>
                  We currently rely on Supabase for website data storage.
                  This website does not integrate third-party analytics,
                  advertising, or payment processing services.
                </p>
              </LegalSection>

              <LegalSection title="10. Changes to This Privacy Notice">
                <p>
                  We may update this notice from time to time. Any changes
                  will be posted on this page with an updated effective
                  date. We encourage you to review this page periodically.
                </p>
              </LegalSection>

              <LegalSection title="11. Contact / Privacy Inquiries">
                <p>
                  If you have questions about this notice or wish to
                  exercise your rights, please contact us at:
                </p>
                <p>
                  [RMS BUSINESS EMAIL]
                  <br />
                  [RMS BUSINESS ADDRESS]
                  <br />
                  [RMS BUSINESS PHONE NUMBER]
                </p>
              </LegalSection>
            </div>

            <p className="mt-16 text-sm text-rms-muted">
              See also our{" "}
              <Link
                to="/terms"
                className="text-rms-charcoal underline underline-offset-2 hover:text-rms-gold"
              >
                Terms &amp; Conditions
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
