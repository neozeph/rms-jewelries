interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-rms-muted">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-rms-charcoal sm:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-7 text-rms-muted">{description}</p>
      )}
    </div>
  );
}
