import { siteContent } from '../content/site';
import { LinkButton } from './LinkButton';

type SiteHeaderProps = {
  currentPath: string;
  onNavigate: (href: string) => void;
};

export function SiteHeader({ currentPath, onNavigate }: SiteHeaderProps) {
  return (
    <header className="site-header shell shell--wide">
      <a
        className="brand-lockup"
        href="/"
        onClick={(event) => {
          event.preventDefault();
          onNavigate('/');
        }}
      >
        <img
          src={siteContent.brand.logoMark}
          alt={`${siteContent.brand.name} logo`}
          className="brand-lockup__mark"
        />
        <div>
          <p className="brand-lockup__name">{siteContent.brand.name}</p>
          <p className="brand-lockup__tag">{siteContent.brand.tag}</p>
        </div>
      </a>

      <nav className="site-nav" aria-label="Principal">
        {siteContent.nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`site-nav__link ${
              currentPath === item.href ? 'site-nav__link--active' : ''
            }`}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(item.href);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="site-header__actions">
        <LinkButton
          href="/support"
          variant="secondary"
          onNavigate={onNavigate}
        >
          Soporte
        </LinkButton>
      </div>
    </header>
  );
}
