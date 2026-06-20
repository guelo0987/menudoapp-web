import { FeatureGrid } from '../components/FeatureGrid';
import { HomeHero } from '../components/HomeHero';
import { AppShowcase } from '../components/AppShowcase';
import { AnimatedBenefits } from '../components/AnimatedBenefits';
import { siteContent, Language } from '../content/site';

type HomePageProps = {
  onNavigate: (href: string) => void;
  lang: Language;
};

export function HomePage({ onNavigate, lang }: HomePageProps) {
  const content = siteContent[lang];

  return (
    <main>
      <HomeHero onNavigate={onNavigate} lang={lang} />
      
      {/* Animated Benefits (Logging, Habit, Chart) */}
      <AnimatedBenefits lang={lang} />
      
      {/* Bento Grid Features */}
      <FeatureGrid lang={lang} />

      {/* App Screenshots Carousel */}
      <AppShowcase lang={lang} />

      {/* Final Checklist Section */}
      <section className="checklist-section shell fade-up">
        <div className="section-heading text-center">
          <span className="eyebrow">{lang === 'es' ? 'Características' : 'Features'}</span>
          <h2>{content.checklist.title}</h2>
          <p>{content.checklist.body}</p>
        </div>
        <div className="checklist-grid">
          {content.checklist.items.map((item) => (
            <div key={item} className="checklist-item">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
      
      {/* Floating Action Button */}
      <a href="/support" className="fab-button bounce" onClick={(e) => { e.preventDefault(); onNavigate('/support'); }}>
        {lang === 'es' ? 'Probar Gratis' : 'Try for Free'}
      </a>
    </main>
  );
}
