import { useEffect, useState } from 'react';
import { Language } from '../content/site';
import { LinkButton } from '../components/LinkButton';

type InvitationJoinPageProps = {
  lang: Language;
  onNavigate: (href: string) => void;
};

export function InvitationJoinPage({ lang, onNavigate }: InvitationJoinPageProps) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('token');
    setToken(t);

    if (t) {
      // Attempt automatic deep link redirect
      window.location.href = `menudo://invitations/join?token=${t}`;
    }
  }, []);

  const handleOpenApp = () => {
    if (token) {
      window.location.href = `menudo://invitations/join?token=${token}`;
    } else {
      window.location.href = 'menudo://invitations/join';
    }
  };

  const appStoreUrl = import.meta.env.VITE_APP_STORE_URL || 'https://apps.apple.com';

  const copy = lang === 'es' ? {
    eyebrow: 'Lista compartida',
    title: 'Te han invitado a una lista',
    copy: 'Únete a una lista de gastos compartida en Menudo. Registra gastos en común y mantén tu presupuesto familiar o de pareja bajo control.',
    cta: 'Abrir en Menudo',
    noApp: '¿No tienes la app instalada?',
    appStore: 'Descargar en App Store',
    back: 'Volver al inicio',
  } : {
    eyebrow: 'Shared List',
    title: "You've been invited",
    copy: 'Join a shared expense list in Menudo. Track shared expenses and keep your family or couple budget under control.',
    cta: 'Open in Menudo',
    noApp: "Don't have the app installed?",
    appStore: 'Download on App Store',
    back: 'Back to home',
  };

  return (
    <main className="auth-route">
      <section className="shell auth-shell">
        <article className="auth-card" style={{ maxWidth: '460px' }}>
          <span className="auth-pill">{copy.eyebrow}</span>
          <h1 className="auth-title" style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>{copy.title}</h1>
          <p className="auth-copy" style={{ marginBottom: '2.2rem', fontSize: '1.05rem', lineHeight: '1.5' }}>{copy.copy}</p>
          
          <div className="auth-actions" style={{ flexDirection: 'column', gap: '1rem', width: '100%' }}>
            <button
              onClick={handleOpenApp}
              className="button button--primary"
              style={{
                width: '100%',
                textAlign: 'center',
                padding: '13px 24px',
                fontSize: '16px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '9999px',
              }}
            >
              {copy.cta}
            </button>
            
            <div style={{ margin: '1.5rem 0 0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.5rem', width: '100%' }}>
              <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem', marginBottom: '1.2rem', textAlign: 'center' }}>
                {copy.noApp}
              </p>
              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <LinkButton
                  href={appStoreUrl}
                  variant="secondary"
                >
                  {copy.appStore}
                </LinkButton>
                <LinkButton
                  href="/"
                  variant="ghost"
                  onNavigate={onNavigate}
                >
                  {copy.back}
                </LinkButton>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
