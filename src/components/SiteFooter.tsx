import { siteContent } from '../content/site';

type SiteFooterProps = {
  onNavigate: (href: string) => void;
};

export function SiteFooter({ onNavigate }: SiteFooterProps) {
  return (
    <footer className="site-footer shell shell--wide">
      <div className="site-footer__main">
        <div>
          <p className="site-footer__title">{siteContent.brand.name}</p>
          <p className="site-footer__copy">
            Soporte claro, políticas públicas y una presencia limpia para la
            web de Menudo.
          </p>
        </div>

        <div className="site-footer__links">
          {siteContent.footer.legalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="site-footer__meta">
        <span>{siteContent.brand.supportEmail}</span>
        <span>{new Date().getFullYear()} {siteContent.brand.name}</span>
      </div>
    </footer>
  );
}
