import { siteContent } from '../content/site';

export function SupportStrip() {
  const { supportEmail, supportPhone, supportAddress } = siteContent.brand;

  return (
    <section className="shell shell--wide">
      <div className="support-strip fade-up">
        <div>
          <span className="eyebrow eyebrow--dark">Información pública</span>
          <h2>Lista para App Store Connect</h2>
          <p>
            Este sitio ya deja una Support URL y links legales públicos en un
            lugar coherente con la marca.
          </p>
        </div>

        <div className="support-strip__grid">
          <div className="support-pill">
            <span>Correo</span>
            <strong>{supportEmail}</strong>
          </div>
          <div className="support-pill">
            <span>Teléfono</span>
            <strong>{supportPhone || 'Pendiente por definir'}</strong>
          </div>
          <div className="support-pill">
            <span>Dirección legal</span>
            <strong>{supportAddress || 'Pendiente por definir'}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
