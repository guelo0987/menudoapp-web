import { useState, useEffect } from 'react';
import { siteContent, Language } from '../content/site';
import { AiBrainSimulator } from './AiBrainSimulator';

const DeviceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="offline-node-icon-svg">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const CloudIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="offline-node-icon-svg">
    <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42-1.89-1.63-3.5-3.5-4.5a6.5 6.5 0 0 0-8 8.5C3.56 15 5 19 8.5 19Z" />
  </svg>
);

function OfflineFlow({ lang }: { lang: Language }) {
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSyncing((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`offline-flow ${isSyncing ? 'offline-flow--syncing' : ''}`}>
      <div className={`offline-node ${!isSyncing ? 'offline-node--active' : ''}`}>
        <DeviceIcon />
        <div className="offline-node__label">{lang === 'es' ? 'Dispositivo' : 'Device'}</div>
        <div className="offline-node__status">
          {lang === 'es' ? 'Local' : 'Local'}
        </div>
      </div>
      <div className="offline-arrow">
        <div className="offline-arrow__dots">
          <span className="offline-arrow__dot" style={{ animationDelay: '0s' }} />
          <span className="offline-arrow__dot" style={{ animationDelay: '0.3s' }} />
          <span className="offline-arrow__dot" style={{ animationDelay: '0.6s' }} />
        </div>
        <span className="offline-status-badge">
          {isSyncing
            ? lang === 'es'
              ? 'Sincronizando...'
              : 'Syncing...'
            : lang === 'es'
            ? 'Guardado Offline'
            : 'Saved Offline'}
        </span>
      </div>
      <div className={`offline-node ${isSyncing ? 'offline-node--active' : ''}`}>
        <CloudIcon />
        <div className="offline-node__label">{lang === 'es' ? 'Nube' : 'Cloud'}</div>
        <div className="offline-node__status">
          {isSyncing ? (lang === 'es' ? 'Al día' : 'Synced') : (lang === 'es' ? 'Pausa' : 'Standby')}
        </div>
      </div>
    </div>
  );
}

export function FeatureGrid({ lang }: FeatureGridProps) {
  const content = siteContent[lang];

  return (
    <section className="shell shell--wide section-stack">
      <div className="section-heading">
        <span className="eyebrow">{lang === 'es' ? 'Características' : 'Features'}</span>
        <h2>{lang === 'es' ? 'Diseñado para la vida real.' : 'Built for the real world.'}</h2>
        <p>
          {lang === 'es'
            ? 'Tecnología avanzada para que el control de tus finanzas sea invisible y seguro.'
            : 'State-of-the-art tech that makes tracking your finances invisible and secure.'}
        </p>
      </div>

      <div className="bento-grid">
        {content.bento.map((item, index) => {
          return (
            <article
              key={item.id}
              className={`bento-item ${item.gridClass} fade-up`}
              style={{ animationDelay: `${100 + index * 50}ms` }}
            >
              <div className="bento-item__inner">
                <div className="bento-item__content">
                  <span className="eyebrow">{item.badge}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>

                <div className="bento-item__visual">
                  {item.visualType === 'ai-sim' && <AiBrainSimulator lang={lang} />}
                  
                  {item.visualType === 'shortcuts' && (
                    <img src="/app-screenshots/823shots_so.png" alt="iOS Shortcuts" />
                  )}

                  {item.visualType === 'offline-first' && <OfflineFlow lang={lang} />}

                  {item.visualType === 'shared-lists' && (
                    <img src="/app-screenshots/526shots_so.png" alt="Shared lists" />
                  )}

                  {item.visualType === 'paywall' && (
                    <img src="/app-screenshots/861shots_so.png" alt="RevenueCat Paywall" />
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

type FeatureGridProps = {
  lang: Language;
};
