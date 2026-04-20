import { useEffect, useMemo, useState } from 'react';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { LegalPage } from './components/LegalPage';
import { siteContent, pageMetadata, RouteKey } from './content/site';
import { HomePage } from './pages/HomePage';

function normalizePath(pathname: string): RouteKey {
  const path = pathname.endsWith('/') && pathname !== '/'
    ? pathname.slice(0, -1)
    : pathname;

  if (path === '/legal/privacy') {
    return '/privacy-policy';
  }

  if (path === '/legal/terms') {
    return '/terms';
  }

  if (
    path === '/' ||
    path === '/privacy-policy' ||
    path === '/terms' ||
    path === '/support' ||
    path === '/privacy-choices'
  ) {
    return path;
  }

  return '/';
}

export default function App() {
  const [path, setPath] = useState<RouteKey>(() =>
    normalizePath(window.location.pathname),
  );

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const metadata = pageMetadata[path];
    document.title = `${metadata.title} — ${siteContent.brand.name}`;

    const descriptionTag = document.querySelector(
      'meta[name="description"]',
    );
    if (descriptionTag) {
      descriptionTag.setAttribute('content', metadata.description);
    }
  }, [path]);

  const handleNavigate = (href: string) => {
    const nextPath = normalizePath(href);
    if (nextPath === path) return;
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const page = useMemo(() => {
    switch (path) {
      case '/privacy-policy':
        return (
          <LegalPage
            title={siteContent.privacyPolicy.title}
            intro={siteContent.privacyPolicy.intro}
            sections={siteContent.privacyPolicy.sections}
            onNavigate={handleNavigate}
          />
        );
      case '/terms':
        return (
          <LegalPage
            title={siteContent.terms.title}
            intro={siteContent.terms.intro}
            sections={siteContent.terms.sections}
            onNavigate={handleNavigate}
          />
        );
      case '/support':
        return (
          <LegalPage
            title={siteContent.support.title}
            intro={siteContent.support.intro}
            sections={siteContent.support.sections}
            onNavigate={handleNavigate}
          />
        );
      case '/privacy-choices':
        return (
          <LegalPage
            title={siteContent.privacyChoices.title}
            intro={siteContent.privacyChoices.intro}
            sections={siteContent.privacyChoices.sections}
            onNavigate={handleNavigate}
          />
        );
      case '/':
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  }, [path]);

  return (
    <div className="site-root">
      <div className="ambient ambient--left" />
      <div className="ambient ambient--right" />
      <SiteHeader currentPath={path} onNavigate={handleNavigate} />
      {page}
      <SiteFooter onNavigate={handleNavigate} />
    </div>
  );
}
