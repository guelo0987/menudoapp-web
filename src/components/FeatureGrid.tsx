import { siteContent, Language } from '../content/site';

type FeatureGridProps = {
  lang: Language;
};

export function FeatureGrid({ lang }: FeatureGridProps) {
  const content = siteContent[lang];

  return (
    <section className="shell shell--wide section-stack">
      <div className="benefit-grid">
        {content.benefits.map((benefit, index) => (
          <article
            key={benefit.title}
            className="benefit-card fade-up"
            style={{ animationDelay: `${140 + index * 70}ms` }}
          >
            <div className="benefit-card__art">
              <img src={benefit.image} alt="" />
            </div>
            <div className="benefit-card__copy">
              <h3>{benefit.title}</h3>
              <p>{benefit.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
