import { siteContent } from '../content/site';
import { LinkButton } from './LinkButton';

type LegalPageProps = {
  title: string;
  intro: string;
  sections: ReadonlyArray<{ title: string; body: string }>;
  onNavigate: (href: string) => void;
};

export function LegalPage({
  title,
  intro,
  sections,
  onNavigate,
}: LegalPageProps) {
  return (
    <main className="page-shell shell">
      <section className="legal-hero fade-up">
        <span className="eyebrow">{siteContent.brand.name}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>

      <section className="legal-stack">
        {sections.map((section, index) => (
          <article
            key={section.title}
            className="legal-card fade-up"
            style={{ animationDelay: `${120 + index * 60}ms` }}
          >
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section className="legal-cta fade-up" style={{ animationDelay: '260ms' }}>
        <div>
          <h2>¿Necesitas un dato más específico?</h2>
          <p>
            Esta base está preparada para crecer sin ensuciar componentes.
            Puedes completar datos legales, compañías, terceros y retención sin
            rehacer la interfaz.
          </p>
        </div>

        <div className="legal-cta__actions">
          <LinkButton href="/support" onNavigate={onNavigate}>
            Ir a soporte
          </LinkButton>
          <LinkButton
            href={`mailto:${siteContent.brand.supportEmail}`}
            variant="secondary"
          >
            Escribir correo
          </LinkButton>
        </div>
      </section>
    </main>
  );
}
