import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const APPROACH_ITEMS = [
  {
    title: "Custom",
    description: "Every piece begins with your idea, not a catalog.",
  },
  {
    title: "Personal",
    description:
      "Design decisions are shaped around you and the moment behind the piece.",
  },
  {
    title: "Crafted",
    description:
      "The finished piece is made specifically for the person who will wear it.",
  },
];

export default function ApproachSection() {
  return (
    <section aria-labelledby="approach-heading" className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          id="approach-heading"
          eyebrow="The RMS Approach"
          title="How each piece comes together"
        />

        <div className="mt-14 grid grid-cols-1 gap-12 border-t border-rms-charcoal/10 pt-14 sm:grid-cols-3 sm:gap-8 sm:divide-x sm:divide-rms-charcoal/10">
          {APPROACH_ITEMS.map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-2xl font-medium text-rms-charcoal">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-rms-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
