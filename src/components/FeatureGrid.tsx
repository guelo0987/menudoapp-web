import { siteContent } from '../content/site';

export function FeatureGrid() {
  return (
    <section className="shell shell--wide section-stack">
      <div className="section-heading fade-up">
        <span className="eyebrow">Base web</span>
        <h2>Una estructura pensada para marca, soporte y compliance</h2>
        <p>
          En vez de meter páginas sueltas dentro del backend, esta base separa
          claramente landing, políticas y ayuda pública.
        </p>
      </div>

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
