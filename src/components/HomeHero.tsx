import { siteContent, Language } from '../content/site';
import { LinkButton } from './LinkButton';

type HomeHeroProps = {
  onNavigate: (href: string) => void;
  lang: Language;
};

export function HomeHero({ onNavigate, lang }: HomeHeroProps) {
  const content = siteContent[lang].hero;

  return (
    <section className="hero shell shell--wide">
      <div className="hero__copy fade-up">
        <span className="eyebrow">{content.eyebrow}</span>
        <h1>{content.title}</h1>
        <p className="hero__lede">{content.body}</p>

        <div className="chip-row">
          {content.chips.map((chip) => (
            <span key={chip} className="chip-row__item">{chip}</span>
          ))}
        </div>

        <div className="hero__actions">
          <LinkButton href="/support" onNavigate={onNavigate}>
            {content.primaryCta}
          </LinkButton>
          <LinkButton href="/privacy-policy" variant="secondary" onNavigate={onNavigate}>
            {content.secondaryCta}
          </LinkButton>
        </div>
      </div>

      <div className="hero__visual fade-up">
        <img
          src={siteContent.heroShared.spotlightImage}
          alt={siteContent.heroShared.spotlightLabel}
          className="hero__main-image"
        />
      </div>
    </section>
  );
}
