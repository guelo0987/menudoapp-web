import { siteContent } from '../content/site';

type InfoSectionProps = (typeof siteContent.es.infoSections)[number];

export function InfoSection({
  eyebrow,
  title,
  body,
  image,
  items,
  imagePosition,
}: InfoSectionProps) {
  return (
    <section className={`info-section shell shell--wide ${imagePosition === 'left' ? 'info-section--reverse' : ''}`}>
      <div className="info-section__copy fade-up">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{body}</p>
        <ul className="info-section__list">
          {items.map((item) => (
            <li key={item}>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="info-section__visual fade-up">
        <img src={image} alt="" />
      </div>
    </section>
  );
}
