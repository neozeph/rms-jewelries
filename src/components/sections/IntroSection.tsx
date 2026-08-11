import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function IntroSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section aria-labelledby="intro-heading" className="py-20 lg:py-28">
      <Container>
        <div ref={ref} className={`reveal ${isVisible ? "is-visible" : ""}`}>
          <SectionHeading
            id="intro-heading"
            eyebrow="About RMS"
            title="Custom jewelry, made around you."
            description="RMS creates jewelry through direct collaboration with each client, from a first idea through to a finished piece. This portfolio shows a selection of that work, organized by collection."
          />
        </div>
      </Container>
    </section>
  );
}
