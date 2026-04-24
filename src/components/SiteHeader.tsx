import { siteContent, Language } from '../content/site';
import { LinkButton } from './LinkButton';

type SiteHeaderProps = {
  currentPath: string;
  onNavigate: (href: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
};

export function SiteHeader({ currentPath, onNavigate, lang, setLang }: SiteHeaderProps) {
  const content = siteContent[lang];

  return (
    <header className="site-header shell shell--wide">
      <div className="header-left">
        <a className="brand-lockup" href="/" onClick={(e) => { e.preventDefault(); onNavigate('/'); }}>
          <img src={siteContent.brand.logoMark} alt="logo" className="brand-lockup__mark" />
          <p className="brand-lockup__name">{siteContent.brand.name}</p>
        </a>
      </div>

      <nav className="site-nav">
        {content.nav.map((item) => (
          <a key={item.href} href={item.href} className={`site-nav__link ${currentPath === item.href ? 'site-nav__link--active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavigate(item.href); }}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-right">
        <button className="lang-switcher" onClick={() => setLang(lang === 'es' ? 'en' : 'es')}>
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
        <LinkButton href="/support" variant="secondary" onNavigate={onNavigate}>
          {lang === 'es' ? 'Soporte' : 'Support'}
        </LinkButton>
      </div>
    </header>
  );
}
