import { useEffect, useState } from 'react';
import type { EmailOtpType } from '@supabase/supabase-js';

import { Language } from '../content/site';
import { LinkButton } from '../components/LinkButton';
import { clearAuthUrl, readAuthParams } from '../lib/auth-url';
import { supabase } from '../lib/supabase';

type AuthConfirmPageProps = {
  lang: Language;
  onNavigate: (href: string) => void;
};

type AuthConfirmState = 'loading' | 'success' | 'error';

const EMAIL_TYPES = new Set<EmailOtpType>([
  'email',
  'signup',
  'magiclink',
  'invite',
  'email_change',
]);

function normalizeEmailType(value: string | null): EmailOtpType | null {
  if (!value) return null;
  return EMAIL_TYPES.has(value as EmailOtpType)
    ? (value as EmailOtpType)
    : null;
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function waitForSession() {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      return session;
    }
    await wait(250);
  }

  return null;
}

function presentConfirmError(message: string, lang: Language) {
  const normalized = message.toLowerCase();

  if (normalized.includes('expired') || normalized.includes('otp')) {
    return lang === 'es'
      ? 'Este enlace ya venció. Pide uno nuevo desde Menudo.'
      : 'This link has expired. Request a new one from Menudo.';
  }

  if (
    normalized.includes('used') ||
    normalized.includes('invalid') ||
    normalized.includes('code verifier')
  ) {
    return lang === 'es'
      ? 'No pudimos validar este enlace aquí. Pide uno nuevo desde Menudo.'
      : 'We could not validate this link here. Request a new one from Menudo.';
  }

  return lang === 'es'
    ? 'No pudimos confirmar tu correo ahora mismo. Inténtalo de nuevo con un enlace nuevo.'
    : 'We could not confirm your email right now. Try again with a new link.';
}

export function AuthConfirmPage({ lang, onNavigate }: AuthConfirmPageProps) {
  const [state, setState] = useState<AuthConfirmState>('loading');
  const [message, setMessage] = useState(
    lang === 'es'
      ? 'Estamos validando tu correo.'
      : 'We are validating your email.',
  );

  useEffect(() => {
    let active = true;

    const run = async () => {
      const params = readAuthParams();
      const errorDescription = params.get('error_description');
      const type = normalizeEmailType(params.get('type'));
      const tokenHash = params.get('token_hash');
      const code = params.get('code');

      if (errorDescription) {
        if (!active) return;
        setState('error');
        setMessage(presentConfirmError(errorDescription, lang));
        return;
      }

      try {
        if (tokenHash && type) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type,
          });

          if (error) {
            throw error;
          }
        } else if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            throw error;
          }
        }

        const session = await waitForSession();
        if (!session && !tokenHash && !code && !params.hasHashToken) {
          throw new Error('missing-auth-params');
        }

        clearAuthUrl();
        await supabase.auth.signOut().catch(() => undefined);

        if (!active) return;
        setState('success');
        setMessage(
          lang === 'es'
            ? 'Tu cuenta ya quedó verificada. Ya puedes entrar a Menudo.'
            : 'Your account is now verified. You can sign in to Menudo.',
        );
      } catch (error) {
        if (!active) return;
        const fallback =
          error instanceof Error ? error.message : 'unknown-confirm-error';
        setState('error');
        setMessage(presentConfirmError(fallback, lang));
      }
    };

    void run();

    return () => {
      active = false;
    };
  }, [lang]);

  const copy =
    lang === 'es'
      ? {
          eyebrow: 'Confirmación de correo',
          title:
            state === 'success'
              ? 'Cuenta verificada'
              : state === 'error'
                ? 'No pudimos completar la confirmación'
                : 'Confirmando tu cuenta',
          back: 'Volver al inicio',
          support: 'Escribir a soporte',
        }
      : {
          eyebrow: 'Email confirmation',
          title:
            state === 'success'
              ? 'Account verified'
              : state === 'error'
                ? 'We could not complete the confirmation'
                : 'Confirming your account',
          back: 'Back to home',
          support: 'Email support',
        };

  return (
    <main className="auth-route">
      <section className="shell auth-shell">
        <article className="auth-card">
          <span className="auth-pill">{copy.eyebrow}</span>
          <h1 className="auth-title">{copy.title}</h1>
          <p className="auth-copy">{message}</p>
          {state === 'loading' ? <div className="auth-spinner" aria-hidden /> : null}
          <div className="auth-actions">
            <LinkButton href="/" variant="primary" onNavigate={onNavigate}>
              {copy.back}
            </LinkButton>
            {state === 'error' ? (
              <LinkButton
                href="mailto:info@garauyan.resend.app"
                variant="ghost"
              >
                {copy.support}
              </LinkButton>
            ) : null}
          </div>
        </article>
      </section>
    </main>
  );
}
