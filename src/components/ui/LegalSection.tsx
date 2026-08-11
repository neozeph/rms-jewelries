interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="font-display text-2xl font-medium text-rms-charcoal">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-rms-muted">
        {children}
      </div>
    </section>
  );
}
