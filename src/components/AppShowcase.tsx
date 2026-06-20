import { useState, useEffect } from 'react';
import { Language } from '../content/site';

type GalleryItem = {
  id: string;
  labelEs: string;
  labelEn: string;
  descEs: string;
  descEn: string;
  image: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: 'dashboard',
    labelEs: 'Balance General',
    labelEn: 'General Balance',
    descEs: 'Visualiza tus ingresos y egresos mensuales organizados en tiempo real con una interfaz limpia.',
    descEn: 'Visualize your monthly income and expenses organized in real time with a clean interface.',
    image: '/app-screenshots/PRIMERA.png'
  },
  {
    id: 'budgets',
    labelEs: 'Control de Categorías',
    labelEn: 'Category Control',
    descEs: 'Define límites claros para tus presupuestos y haz un seguimiento inteligente de cada gasto.',
    descEn: 'Set clear limits for your budgets and intelligently track every single expense.',
    image: '/app-screenshots/SEGUNDA.png'
  },
  {
    id: 'shortcuts',
    labelEs: 'Atajos de Registro',
    labelEn: 'Quick Entry Shortcuts',
    descEs: 'Configura disparadores rápidos en tu dispositivo para ingresar gastos al instante sin fricción.',
    descEn: 'Configure quick triggers on your device to enter expenses instantly without friction.',
    image: '/app-screenshots/TERCERA.png'
  },
  {
    id: 'sync',
    labelEs: 'Listas Compartidas',
    labelEn: 'Shared Lists',
    descEs: 'Colabora en presupuestos comunes con tu pareja o familia manteniendo sincronía completa.',
    descEn: 'Collaborate on common budgets with your partner or family maintaining complete sync.',
    image: '/app-screenshots/CUARTA.png'
  },
  {
    id: 'premium',
    labelEs: 'Registro por Voz',
    labelEn: 'Voice Logging',
    descEs: 'Habla de forma natural y deja que el sistema organice la información de manera automática.',
    descEn: 'Speak naturally and let the system organize the information automatically.',
    image: '/app-screenshots/AUINTA.png'
  }
];

type AppShowcaseProps = {
  lang: Language;
};

export function AppShowcase({ lang }: AppShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto play rotation
  useEffect(() => {
    if (paused) return;
    const intervalTime = 50;
    const duration = 5000;
    const steps = duration / intervalTime;
    let stepCount = (progress / 100) * steps;

    const timer = setInterval(() => {
      stepCount++;
      const nextProgress = (stepCount / steps) * 100;
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        setProgress(0);
        stepCount = 0;
        setActiveIndex((prev) => (prev + 1) % galleryItems.length);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeIndex, progress, paused]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
    setPaused(true);
    // Resume autoplay after 10 seconds of user inactivity
    const resumeTimer = setTimeout(() => {
      setPaused(false);
    }, 10000);
    return () => clearTimeout(resumeTimer);
  };

  return (
    <section className="showcase-section reveal-on-scroll">
      <div className="shell shell--wide">
        <div className="section-heading">
          <span className="eyebrow">{lang === 'es' ? 'Descubre la App' : 'Discover the App'}</span>
          <h2>{lang === 'es' ? 'Una interfaz diseñada con precisión.' : 'An interface built with precision.'}</h2>
          <p>
            {lang === 'es'
              ? 'Explora las vistas principales de Menudo y ve cómo se adapta de forma fluida a tus necesidades diarias.'
              : 'Explore Menudo\'s core views and see how it adapts seamlessly to your daily needs.'}
          </p>
        </div>

        <div className="showcase-gallery">
          {/* Left Side: Tabs Navigation */}
          <div className="showcase-gallery__nav">
            {galleryItems.map((item, idx) => {
              const isActive = activeIndex === idx;
              const label = lang === 'es' ? item.labelEs : item.labelEn;
              const desc = lang === 'es' ? item.descEs : item.descEn;

              return (
                <button
                  key={item.id}
                  className={`showcase-gallery__tab ${isActive ? 'showcase-gallery__tab--active' : ''}`}
                  onClick={() => handleTabClick(idx)}
                >
                  <div className="showcase-gallery__tab-content">
                    <h4>{label}</h4>
                    {isActive && <p className="fade-in">{desc}</p>}
                  </div>
                  <div className="showcase-gallery__tab-progress-bg">
                    <div 
                      className="showcase-gallery__tab-progress-bar"
                      style={{ width: isActive ? `${progress}%` : '0%' }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Side: Z-Axis Cascade Mockup Display */}
          <div className="showcase-gallery__visual">
            <div className="showcase-gallery__image-container">
              {galleryItems.map((item, idx) => {
                // Calculate position relative to active index
                let offset = idx - activeIndex;
                if (offset < 0) {
                  // Put completed items in the back
                  offset = galleryItems.length + offset;
                }

                // Active slide: offset 0
                // Next slides: offset 1, 2, etc.
                const isActive = offset === 0;
                
                // Style properties based on depth
                const scale = isActive ? 1 : Math.max(0.7, 1 - offset * 0.08);
                const opacity = isActive ? 1 : Math.max(0, 0.45 - offset * 0.15);
                const translateX = isActive ? 0 : offset * 24; // Stagger to the right
                const rotate = isActive ? 0 : offset * 3; // Fan out slightly
                const zIndex = galleryItems.length - offset;

                return (
                  <img
                    key={item.id}
                    src={item.image}
                    alt={lang === 'es' ? item.labelEs : item.labelEn}
                    className="showcase-gallery__img"
                    style={{
                      transform: `scale(${scale}) translateX(${translateX}px) rotate(${rotate}deg)`,
                      opacity: opacity,
                      zIndex: zIndex,
                      pointerEvents: isActive ? 'auto' : 'none'
                    }}
                    loading="lazy"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
