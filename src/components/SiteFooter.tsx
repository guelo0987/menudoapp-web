import { siteContent, Language, RouteKey } from '../content/site';

type SiteFooterProps = {
  onNavigate: (href: string) => void;
  lang: Language;
};

export function SiteFooter({ onNavigate, lang }: SiteFooterProps) {
  const content = siteContent[lang];

  return (
    <footer className="site-footer shell shell--wide">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="brand-lockup">
            <img src={siteContent.brand.logoMark} alt="logo" className="brand-lockup__mark" />
            <p className="brand-lockup__name">{siteContent.brand.name}</p>
          </div>
          <div className="qr-container">
            <img src={siteContent.brand.qrCode} alt="QR Code" className="qr-image" />
            <p>{lang === 'es' ? 'Escanea para descargar' : 'Scan to download'}</p>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>{content.footer.legalTitle}</h4>
            <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); onNavigate('/privacy-policy'); }}>
              {lang === 'es' ? 'Privacidad' : 'Privacy'}
            </a>
            <a href="/terms" onClick={(e) => { e.preventDefault(); onNavigate('/terms'); }}>
              {lang === 'es' ? 'Términos' : 'Terms'}
            </a>
          </div>

          <div className="footer-column">
            <h4>{content.footer.contactTitle}</h4>
            <a href={`mailto:${siteContent.brand.supportEmail}`}>Email</a>
            <a href="https://instagram.com/menudoapp" target="_blank" rel="noreferrer">Instagram</a>
          </div>

          <div className="footer-column">
            <h4>{content.footer.downloadTitle}</h4>
            <a href="#" className="store-badge">App Store</a>
            <a href="#" className="store-badge">Play Store</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{content.footer.rights}</p>
      </div>
    </footer>
  );
}
