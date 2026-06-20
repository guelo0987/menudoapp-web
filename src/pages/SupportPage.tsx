import { useState, FormEvent } from 'react';
import { siteContent, Language } from '../content/site';
import { SupportStrip } from '../components/SupportStrip';
import { LinkButton } from '../components/LinkButton';

type SupportPageProps = {
  lang: Language;
  onNavigate: (href: string) => void;
};

export function SupportPage({ lang, onNavigate }: SupportPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const copy = lang === 'es' ? {
    eyebrow: 'Soporte Técnico',
    title: '¿Cómo podemos ayudarte?',
    subtitle: 'Envíanos un mensaje o utiliza nuestros canales oficiales de contacto.',
    nameLabel: 'Nombre',
    emailLabel: 'Correo electrónico',
    messageLabel: 'Mensaje',
    namePlaceholder: 'Tu nombre',
    emailPlaceholder: 'correo@ejemplo.com',
    messagePlaceholder: '¿En qué te podemos ayudar?',
    submitBtn: 'Enviar mensaje',
    submitBtnSending: 'Enviando...',
    submitBtnSuccess: '¡Mensaje enviado!',
    successTitle: '¡Mensaje enviado con éxito!',
    successBody: 'Gracias por ponerte en contacto con nosotros. Te responderemos al correo proporcionado lo antes posible.',
    errorBody: 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.',
    backHome: 'Volver al inicio',
    downloadTitle: 'Lleva Menudo contigo',
    downloadSubtitle: 'Controla tus gastos diarios y compartidos de forma sencilla y sin conexión.',
    qrLabel: 'Escanea para descargar',
  } : {
    eyebrow: 'Technical Support',
    title: 'How can we help you?',
    subtitle: 'Send us a message or reach out through our official contact channels.',
    nameLabel: 'Name',
    emailLabel: 'Email address',
    messageLabel: 'Message',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'email@example.com',
    messagePlaceholder: 'How can we help you?',
    submitBtn: 'Send message',
    submitBtnSending: 'Sending...',
    submitBtnSuccess: 'Message sent!',
    successTitle: 'Message sent successfully!',
    successBody: 'Thank you for reaching out. We will get back to you at the email address provided as soon as possible.',
    errorBody: 'There was an error sending your message. Please try again.',
    backHome: 'Back to home',
    downloadTitle: 'Take Menudo with you',
    downloadSubtitle: 'Track your daily and shared expenses easily, even offline.',
    qrLabel: 'Scan to download',
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('sending');
    
    // Simulate API call to resend or backend support endpoint
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <main className="support-page-route" style={{ background: '#ffffff', minHeight: '100dvh', paddingTop: '100px' }}>
      <section className="shell fade-up">
        <div className="section-heading text-center" style={{ marginBottom: '50px' }}>
          <span className="eyebrow">{copy.eyebrow}</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', margin: '12px 0' }}>
            {copy.title}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '60ch', margin: '0 auto' }}>
            {copy.subtitle}
          </p>
        </div>

        <div className="support-layout" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', marginBottom: '80px' }}>
          {/* Form Column */}
          <div className="support-card-container">
            {status === 'success' ? (
              <div className="support-success-card" style={{
                background: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-2xl)',
                padding: '40px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-soft)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#e8f7ee',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text)' }}>
                  {copy.successTitle}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.5', marginBottom: '28px' }}>
                  {copy.successBody}
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="button button--secondary"
                  style={{ minHeight: '44px' }}
                >
                  {lang === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="auth-form" style={{
                background: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-2xl)',
                padding: '40px',
                boxShadow: 'var(--shadow-soft)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <div className="auth-field">
                  <span>{copy.nameLabel}</span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={copy.namePlaceholder}
                    disabled={status === 'sending'}
                  />
                </div>

                <div className="auth-field">
                  <span>{copy.emailLabel}</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={copy.emailPlaceholder}
                    disabled={status === 'sending'}
                  />
                </div>

                <div className="auth-field">
                  <span>{copy.messageLabel}</span>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={copy.messagePlaceholder}
                    disabled={status === 'sending'}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-xl)',
                      fontSize: '0.95rem',
                      background: '#ffffff',
                      color: 'var(--text)',
                      resize: 'vertical',
                      minHeight: '120px',
                      transition: 'all 180ms ease',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                {status === 'error' && (
                  <p style={{ color: '#d93838', fontSize: '0.88rem', margin: '0' }}>{copy.errorBody}</p>
                )}

                <button
                  type="submit"
                  className="button button--primary"
                  disabled={status === 'sending'}
                  style={{ width: '100%', minHeight: '44px', fontWeight: 700 }}
                >
                  {status === 'sending' ? copy.submitBtnSending : copy.submitBtn}
                </button>
              </form>
            )}
          </div>

          {/* Info/Download Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-2xl)',
              padding: '40px',
              boxShadow: 'var(--shadow-soft)'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text)' }}>
                {copy.downloadTitle}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.5', marginBottom: '30px' }}>
                {copy.downloadSubtitle}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                  background: '#f4f6f4',
                  border: '1px solid var(--border)',
                  padding: '10px',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img src={siteContent.brand.qrCode} alt="QR Code" style={{ width: '100px', height: '100px', borderRadius: '6px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {copy.qrLabel}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a href="#" className="store-badge" style={{
                      display: 'inline-flex',
                      padding: '8px 14px',
                      background: '#101510',
                      color: '#ffffff',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>App Store</a>
                    <a href="#" className="store-badge" style={{
                      display: 'inline-flex',
                      padding: '8px 14px',
                      background: '#101510',
                      color: '#ffffff',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>Play Store</a>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <LinkButton href="/" variant="secondary" onNavigate={onNavigate} style={{ flex: 1, minHeight: '44px' }}>
                {copy.backHome}
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Render the public information strip */}
      <SupportStrip />
    </main>
  );
}
