import { FormEvent, useEffect, useState } from 'react';
import type { EmailOtpType } from '@supabase/supabase-js';

import { LinkButton } from '../components/LinkButton';
import { Language } from '../content/site';
import { clearAuthUrl, readAuthParams } from '../lib/auth-url';
import { supabase } from '../lib/supabase';

type ResetPasswordPageProps = {
  lang: Language;
  onNavigate: (href: string) => void;
};

type ResetStage = 'verifying' | 'form' | 'success' | 'error';

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function waitForSession() {
  for (let attempt = 0; attempt < 8; attempt += 1) {
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

function presentRecoveryError(message: string, lang: Language) {
  const normalized = message.toLowerCase();

  if (normalized.includes('expired') || normalized.includes('otp')) {
    return lang === 'es'
      ? 'Este enlace ya venció. Pide uno nuevo desde Menudo.'
      : 'This link has expired. Request a new one from Menudo.';
  }

  if (
    normalized.includes('used') ||
    normalized.includes('invalid') ||
    normalized.includes('code verifier') ||
    normalized.includes('missing-auth-params')
  ) {
    return lang === 'es'
      ? 'No pudimos abrir este cambio de contraseña aquí. Pide un enlace nuevo desde Menudo.'
      : 'We could not open this password reset here. Request a new link from Menudo.';
  }

  return lang === 'es'
    ? 'No pudimos abrir tu cambio de contraseña ahora mismo.'
    : 'We could not open your password reset right now.';
}

function isRecoveryType(value: string | null): value is EmailOtpType {
  return value === 'recovery';
}

export function ResetPasswordPage({
  lang,
  onNavigate,
}: ResetPasswordPageProps) {
  const [stage, setStage] = useState<ResetStage>('verifying');
  const [message, setMessage] = useState(
    lang === 'es'
      ? 'Estamos preparando el cambio de contraseña.'
      : 'We are preparing your password reset.',
  );
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [fieldError, setFieldError] = useState('');

  useEffect(() => {
    let active = true;

    const run = async () => {
      const params = readAuthParams();
      const errorDescription = params.get('error_description');
      const type = params.get('type');
      const tokenHash = params.get('token_hash');
      const code = params.get('code');

      if (errorDescription) {
        if (!active) return;
        setStage('error');
        setMessage(presentRecoveryError(errorDescription, lang));
        return;
      }

      try {
        if (tokenHash && isRecoveryType(type)) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: 'recovery',
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
        if (!session) {
          throw new Error('missing-auth-params');
        }

        clearAuthUrl();
        if (!active) return;
        setStage('form');
        setMessage(
          lang === 'es'
            ? 'Escribe tu nueva contraseña para terminar.'
            : 'Enter your new password to finish.',
        );
      } catch (error) {
        if (!active) return;
        const fallback =
          error instanceof Error ? error.message : 'unknown-recovery-error';
        setStage('error');
        setMessage(presentRecoveryError(fallback, lang));
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
          eyebrow: 'Cambio de contraseña',
          title:
            stage === 'success'
              ? 'Contraseña actualizada'
              : stage === 'error'
                ? 'No pudimos abrir el enlace'
                : stage === 'form'
                  ? 'Elige una nueva contraseña'
                  : 'Verificando enlace',
          password: 'Nueva contraseña',
          confirm: 'Confirmar contraseña',
          helper: 'Usa al menos 6 caracteres.',
          submit: isSaving ? 'Guardando...' : 'Guardar nueva contraseña',
          back: 'Volver al inicio',
          support: 'Escribir a soporte',
        }
      : {
          eyebrow: 'Password reset',
          title:
            stage === 'success'
              ? 'Password updated'
              : stage === 'error'
                ? 'We could not open the link'
                : stage === 'form'
                  ? 'Choose a new password'
                  : 'Verifying link',
          password: 'New password',
          confirm: 'Confirm password',
          helper: 'Use at least 6 characters.',
          submit: isSaving ? 'Saving...' : 'Save new password',
          back: 'Back to home',
          support: 'Email support',
        };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving) return;

    if (password.length < 6) {
      setFieldError(copy.helper);
      return;
    }

    if (password !== confirmPassword) {
      setFieldError(
        lang === 'es'
          ? 'Las contraseñas no coinciden.'
          : 'Passwords do not match.',
      );
      return;
    }

    setFieldError('');
    setIsSaving(true);

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setIsSaving(false);
      setStage('error');
      setMessage(presentRecoveryError(error.message, lang));
      return;
    }

    await supabase.auth.signOut().catch(() => undefined);
    setPassword('');
    setConfirmPassword('');
    setIsSaving(false);
    setStage('success');
    setMessage(
      lang === 'es'
        ? 'Tu contraseña ya fue actualizada. Ya puedes volver a Menudo.'
        : 'Your password has been updated. You can go back to Menudo now.',
    );
  };

  return (
    <main className="auth-route">
      <section className="shell auth-shell">
        <article className="auth-card">
          <span className="auth-pill">{copy.eyebrow}</span>
          <h1 className="auth-title">{copy.title}</h1>
          <p className="auth-copy">{message}</p>

          {stage === 'verifying' ? <div className="auth-spinner" aria-hidden /> : null}

          {stage === 'form' ? (
            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="auth-field">
                <span>{copy.password}</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                  placeholder={copy.password}
                />
              </label>
              <label className="auth-field">
                <span>{copy.confirm}</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="new-password"
                  placeholder={copy.confirm}
                />
              </label>
              <p className="auth-field__hint">{fieldError || copy.helper}</p>
              <button
                className="button button--primary auth-submit"
                type="submit"
                disabled={isSaving}
              >
                {copy.submit}
              </button>
            </form>
          ) : null}

          {stage !== 'form' ? (
            <div className="auth-actions">
              <LinkButton href="/" variant="primary" onNavigate={onNavigate}>
                {copy.back}
              </LinkButton>
              {stage === 'error' ? (
                <LinkButton
                  href="mailto:info@garauyan.resend.app"
                  variant="ghost"
                >
                  {copy.support}
                </LinkButton>
              ) : null}
            </div>
          ) : null}
        </article>
      </section>
    </main>
  );
}
