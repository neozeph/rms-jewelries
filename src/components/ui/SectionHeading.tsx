interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-rms-muted">
          {eyebrow}
        </p>
      )}

      <h2
        id={id}
        className="mt-3 font-display text-4xl font-medium tracking-tight text-rms-charcoal sm:text-5xl"
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 max-w-xl text-base leading-7 text-rms-muted ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
