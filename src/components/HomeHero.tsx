import { siteContent, Language } from '../content/site';
import { LinkButton } from './LinkButton';

type HomeHeroProps = {
  onNavigate: (href: string) => void;
  lang: Language;
};

const ChevronRightIcon = () => (
  <span style={{
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.15)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    flexShrink: 0
  }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 10, height: 10 }}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </span>
);

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
            <span>{content.primaryCta}</span>
            <ChevronRightIcon />
          </LinkButton>
          <LinkButton href="/privacy-policy" variant="secondary" onNavigate={onNavigate}>
            {content.secondaryCta}
          </LinkButton>
        </div>
      </div>

      <div className="hero__visual fade-up">
        <div className="dashboard-mockup-frame">
          <div className="dashboard-mockup-frame__header">
            <div className="dashboard-mockup-frame__dot" />
            <div className="dashboard-mockup-frame__dot" />
            <div className="dashboard-mockup-frame__dot" />
          </div>
          <img
            src={siteContent.heroShared.spotlightImage}
            alt={siteContent.heroShared.spotlightLabel}
          />
        </div>
      </div>
    </section>
  );
}
