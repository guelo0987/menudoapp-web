import { useEffect, useMemo, useState } from 'react';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { LegalPage } from './components/LegalPage';
import { siteContent, pageMetadata, RouteKey, Language } from './content/site';
import { AuthConfirmPage } from './pages/AuthConfirmPage';
import { HomePage } from './pages/HomePage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

function normalizePath(pathname: string): RouteKey {
  const path = pathname.endsWith('/') && pathname !== '/'
    ? pathname.slice(0, -1)
    : pathname;
  if (
    path === '/privacy-policy' ||
    path === '/terms' ||
    path === '/support' ||
    path === '/privacy-choices' ||
    path === '/auth/confirm' ||
    path === '/auth/reset-password'
  ) {
    return path;
  }
  return '/';
}

export default function App() {
  const [path, setPath] = useState<RouteKey>(() => normalizePath(window.location.pathname));
  const [lang, setLang] = useState<Language>('es');

  const content = siteContent[lang];

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const metadata = (pageMetadata as any)[lang][path];
    document.title = `${metadata.title} — ${siteContent.brand.name}`;
  }, [path, lang]);

  const handleNavigate = (href: string) => {
    const nextPath = normalizePath(href);
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const page = useMemo(() => {
    switch (path) {
      case '/privacy-policy':
        return <LegalPage title={(content as any).privacyPolicy?.title || 'Privacy'} intro={(content as any).privacyPolicy?.intro || ''} sections={(content as any).privacyPolicy?.sections || []} onNavigate={handleNavigate} />;
      case '/auth/confirm':
        return <AuthConfirmPage lang={lang} onNavigate={handleNavigate} />;
      case '/auth/reset-password':
        return <ResetPasswordPage lang={lang} onNavigate={handleNavigate} />;
      case '/':
      default:
        return <HomePage onNavigate={handleNavigate} lang={lang} />;
    }
  }, [path, lang]);

  return (
    <div className="site-root">
      <div className="ambient ambient--left" />
      <div className="ambient ambient--right" />
      <SiteHeader currentPath={path} onNavigate={handleNavigate} lang={lang} setLang={setLang} />
      {page}
      <SiteFooter onNavigate={handleNavigate} lang={lang} />
    </div>
  );
}
