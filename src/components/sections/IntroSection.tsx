import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function IntroSection() {
  return (
    <section aria-labelledby="intro-heading" className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          id="intro-heading"
          eyebrow="About RMS"
          title="Custom jewelry, made around you."
          description="RMS creates jewelry through direct collaboration with each client, from a first idea through to a finished piece. This portfolio shows a selection of that work, organized by collection."
        />
      </Container>
    </section>
  );
}
