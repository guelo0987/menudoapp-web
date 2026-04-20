import { siteContent } from '../content/site';
import { LinkButton } from './LinkButton';

type HomeHeroProps = {
  onNavigate: (href: string) => void;
};

export function HomeHero({ onNavigate }: HomeHeroProps) {
  return (
    <section className="hero shell shell--wide">
      <div className="hero__copy fade-up" style={{ animationDelay: '80ms' }}>
        <span className="eyebrow">{siteContent.hero.eyebrow}</span>
        <h1>{siteContent.hero.title}</h1>
        <p className="hero__lede">{siteContent.hero.body}</p>

        <div className="chip-row">
          {siteContent.hero.chips.map((chip) => (
            <span key={chip} className="chip-row__item">
              {chip}
            </span>
          ))}
        </div>

        <div className="hero__actions">
          <LinkButton
            href={siteContent.hero.primaryCta.href}
            onNavigate={onNavigate}
          >
            {siteContent.hero.primaryCta.label}
          </LinkButton>
          <LinkButton
            href={siteContent.hero.secondaryCta.href}
            variant="secondary"
            onNavigate={onNavigate}
          >
            {siteContent.hero.secondaryCta.label}
          </LinkButton>
        </div>
      </div>

      <div className="hero__visual fade-up" style={{ animationDelay: '160ms' }}>
        <div className="hero-card">
          <div className="hero-card__topline">
            <span>{siteContent.hero.spotlightLabel}</span>
            <span>assets reemplazables</span>
          </div>
          <img
            src={siteContent.hero.spotlightImage}
            alt="Placeholder del hero de Menudo"
          />
        </div>
      </div>
    </section>
  );
}
