import { siteContent } from '../content/site';

export function FeatureGrid() {
  return (
    <section className="shell shell--wide section-stack">
      <div className="feature-grid">
        {siteContent.featureCards.map((card, index) => (
          <article
            key={card.title}
            className={`feature-card feature-card--${card.accent} fade-up`}
            style={{ animationDelay: `${140 + index * 70}ms` }}
          >
            <div className="feature-card__copy">
              <span className="eyebrow eyebrow--dark">{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
            <div className="feature-card__art">
              <img src={card.image} alt="" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
