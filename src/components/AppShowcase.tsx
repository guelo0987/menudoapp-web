import { useState, useEffect, useRef } from 'react';
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
    labelEs: 'Tu dinero de un vistazo',
    labelEn: 'Your money at a glance',
    descEs: 'Mira tu balance y gastos mensuales organizados de forma automática.',
    descEn: 'See your balance and monthly expenses organized automatically.',
    image: '/app-screenshots/59shots_so.png'
  },
  {
    id: 'budgets',
    labelEs: 'Control de presupuestos',
    labelEn: 'Budget tracking',
    descEs: 'Define límites mensuales para tus categorías y evita gastos excesivos.',
    descEn: 'Set monthly limits for your categories and prevent overspending.',
    image: '/app-screenshots/973shots_so.png'
  },
  {
    id: 'shortcuts',
    labelEs: 'Atajos inteligentes',
    labelEn: 'Smart shortcuts',
    descEs: 'Registra tus transacciones automáticamente sin abrir la app.',
    descEn: 'Log your transactions automatically without opening the app.',
    image: '/app-screenshots/823shots_so.png'
  },
  {
    id: 'sync',
    labelEs: 'Sincronización segura',
    labelEn: 'Secure synchronization',
    descEs: 'Funciona perfectamente sin conexión a internet y se actualiza al recuperar la red.',
    descEn: 'Works perfectly without internet and updates once connection returns.',
    image: '/app-screenshots/440shots_so.png'
  },
  {
    id: 'premium',
    labelEs: 'Suscripción premium',
    labelEn: 'Premium subscription',
    descEs: 'Desbloquea presupuestos compartidos ilimitados para tu familia o pareja.',
    descEn: 'Unlock unlimited shared budgets for your family or partner.',
    image: '/app-screenshots/861shots_so.png'
  }
];

type AppShowcaseProps = {
  lang: Language;
};

export function AppShowcase({ lang }: AppShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoPlayRef = useRef<boolean>(true);

  // Auto-rotation loop
  useEffect(() => {
    const intervalTime = 50; // Update progress bar every 50ms
    const totalTime = 5000; // Hold each tab for 5 seconds
    const steps = totalTime / intervalTime;
    let stepCount = 0;

    const timer = setInterval(() => {
      if (autoPlayRef.current) {
        stepCount++;
        setProgress((stepCount / steps) * 100);

        if (stepCount >= steps) {
          stepCount = 0;
          setActiveIndex((prev) => (prev + 1) % galleryItems.length);
          setProgress(0);
        }
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
    // Temporarily pause autoplay on user interaction
    autoPlayRef.current = false;
    setTimeout(() => {
      autoPlayRef.current = true;
    }, 8000);
  };

  return (
    <section className="showcase-section">
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

          {/* Right Side: Mockup Image Display */}
          <div className="showcase-gallery__visual">
            <div className="showcase-gallery__image-container">
              {galleryItems.map((item, idx) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={lang === 'es' ? item.labelEs : item.labelEn}
                  className={`showcase-gallery__img ${activeIndex === idx ? 'showcase-gallery__img--active' : ''}`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
