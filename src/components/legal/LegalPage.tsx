type LegalSection = { heading: string; body: string };

type LegalPageProps = {
  title: string;
  intro?: string;
  sections: LegalSection[];
};

export const LegalPage = ({ title, intro, sections }: LegalPageProps) => (
  <div className="pt-28 pb-20">
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold text-foreground">{title}</h1>
      {intro && <p className="mt-4 text-muted-foreground">{intro}</p>}
      <div className="mt-12 space-y-10">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-xl font-semibold text-foreground">
              {s.heading}
            </h2>
            <p className="mt-3 whitespace-pre-line text-muted-foreground leading-relaxed">
              {s.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  </div>
);
