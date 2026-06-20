import { useState, useEffect } from 'react';
import { Language } from '../content/site';

const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
);

const CoffeeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
);

const FlameIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 10, height: 10 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const FoodIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v8c0 1.1.9 2 2 2h3Z" />
    <path d="M18 22V15" />
  </svg>
);

const TransportIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const BillsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const LeisureIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <line x1="15" y1="13" x2="15.01" y2="13" />
    <line x1="18" y1="11" x2="18.01" y2="11" />
    <rect x="2" y="6" width="20" height="12" rx="3" />
  </svg>
);

type AnimatedBenefitsProps = {
  lang: Language;
};

// Widget 1: Frictionless Logging (Typing -> Card transition)
function FrictionlessLoggingWidget({ lang }: { lang: Language }) {
  const [step, setStep] = useState(0); // 0: typing, 1: show card
  const [text, setText] = useState('');
  const target = lang === 'es' ? 'Café con leche 120 pesos' : 'Coffee at Starbucks $5';

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 0) {
      let idx = 0;
      setText('');
      const interval = setInterval(() => {
        if (idx < target.length) {
          setText((prev) => prev + target.charAt(idx));
          idx++;
        } else {
          clearInterval(interval);
          timer = setTimeout(() => setStep(1), 1000);
        }
      }, 70);
      return () => clearInterval(interval);
    } else {
      timer = setTimeout(() => {
        setStep(0);
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [step, lang]);

  return (
    <div className="benefit-widget benefit-widget--logging">
      <div className="logging-container">
        {step === 0 ? (
          <div className="logging-input-box fade-in">
            <span className="logging-prompt-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
              🎙️
            </span>
            <span className="logging-typed-text">{text}</span>
            <span className="logging-caret" />
          </div>
        ) : (
          <div className="logging-card-box fade-in">
            <div className="logging-card-icon-wrapper" style={{ background: '#f4f6f4' }}>
              <span style={{ fontSize: '1.1rem' }}>☕</span>
            </div>
            <div className="logging-card-info">
              <span className="logging-card-title">
                {lang === 'es' ? 'Comida y Bebida' : 'Food & Drink'}
              </span>
              <span className="logging-card-sub">
                Starbucks
              </span>
            </div>
            <div className="logging-card-amount">
              {lang === 'es' ? '-$120.00' : '-$5.00'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Widget 2: Habit Builder (14-day checkmark streak)
function HabitBuilderWidget({ lang }: { lang: Language }) {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStreak((prev) => {
        if (prev >= 12) return 0;
        return prev + 1;
      });
    }, 4500 / 12);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="benefit-widget benefit-widget--habit">
      <div className="habit-container">
        <div className="habit-grid">
          {Array.from({ length: 14 }).map((_, idx) => {
            const isChecked = idx < streak;
            return (
              <div 
                key={idx} 
                className={`habit-cell ${isChecked ? 'habit-cell--checked' : ''}`}
              >
                {isChecked && <CheckIcon />}
              </div>
            );
          })}
        </div>
        <div className="habit-badge fade-in">
          <span style={{ fontSize: '0.85rem', lineHeight: 1 }}>🔥</span>
          <span>
            {streak} {lang === 'es' ? 'días seguidos' : 'day streak'}
          </span>
        </div>
      </div>
    </div>
  );
}

// Widget 3: Full Picture (Stunning Area Chart with Avocado gradients & legend)
function FullPictureWidget({ lang }: { lang: Language }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const legendItems = [
    { emoji: '🍔', name: lang === 'es' ? 'Comida' : 'Food', amount: lang === 'es' ? '$4,200' : '$420', percent: '45%' },
    { emoji: '🚗', name: lang === 'es' ? 'Transporte' : 'Transp.', amount: lang === 'es' ? '$2,800' : '$280', percent: '30%' },
    { emoji: '🏠', name: lang === 'es' ? 'Vivienda' : 'Bills', amount: lang === 'es' ? '$1,800' : '$180', percent: '18%' },
    { emoji: '🎮', name: lang === 'es' ? 'Ocio' : 'Leisure', amount: lang === 'es' ? '$900' : '$90', percent: '7%' }
  ];

  return (
    <div className="benefit-widget benefit-widget--chart">
      <div className="modern-chart-card">
        {/* SVG Area Chart */}
        <div className="chart-svg-wrapper">
          <svg viewBox="0 0 300 120" className="spending-chart-svg">
            <defs>
              <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.00" />
              </linearGradient>
            </defs>
            {/* Grid Lines */}
            <line x1="0" y1="20" x2="300" y2="20" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="0" y1="60" x2="300" y2="60" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="0" y1="100" x2="300" y2="100" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
            
            {/* Area Path */}
            <path
              d="M 0 120 L 0 90 Q 40 50 80 70 T 160 30 T 240 50 T 300 20 L 300 120 Z"
              fill="url(#chart-grad)"
              className={`chart-area ${animate ? 'chart-area--animate' : ''}`}
            />
            {/* Line Path */}
            <path
              d="M 0 90 Q 40 50 80 70 T 160 30 T 240 50 T 300 20"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              className={`chart-line ${animate ? 'chart-line--animate' : ''}`}
            />
            {/* Pulsing Highlight Dot */}
            <circle cx="160" cy="30" r="5" fill="var(--accent)" />
            <circle cx="160" cy="30" r="10" fill="none" stroke="var(--accent)" strokeWidth="1.5" className="chart-pulse-dot" />
          </svg>
          {/* Floating Tooltip */}
          <div className="chart-tooltip fade-in">
            <span className="chart-tooltip-emoji">🍔</span>
            <span className="chart-tooltip-text">{lang === 'es' ? 'Mayor gasto' : 'Peak spend'}</span>
          </div>
        </div>

        {/* Legend Grid */}
        <div className="chart-legend-grid">
          {legendItems.map((item, idx) => (
            <div key={idx} className="chart-legend-item">
              <span className="legend-emoji">{item.emoji}</span>
              <div className="legend-info">
                <span className="legend-name">{item.name}</span>
                <span className="legend-amount">{item.amount}</span>
              </div>
              <span className="legend-badge">{item.percent}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AnimatedBenefits({ lang }: AnimatedBenefitsProps) {
  return (
    <section className="shell shell--wide animated-benefits-section reveal-on-scroll">
      <div className="animated-benefits-grid">
        {/* Card 1 */}
        <div className="benefit-row-card fade-up" style={{ animationDelay: '100ms' }}>
          <div className="benefit-row-card__visual">
            <FrictionlessLoggingWidget lang={lang} />
          </div>
          <div className="benefit-row-card__copy">
            <h3>{lang === 'es' ? 'Registra sin fricción' : 'Enter effortlessly'}</h3>
            <p>
              {lang === 'es' 
                ? 'Escribe una nota, habla naturalmente o deja que las automatizaciones lo hagan por ti.' 
                : 'Type a note, speak naturally, or let automations do it for you. No friction.'}
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="benefit-row-card fade-up" style={{ animationDelay: '200ms' }}>
          <div className="benefit-row-card__visual">
            <HabitBuilderWidget lang={lang} />
          </div>
          <div className="benefit-row-card__copy">
            <h3>{lang === 'es' ? 'Crea el hábito' : 'Build the habit'}</h3>
            <p>
              {lang === 'es' 
                ? 'Cuando registrar toma segundos, realmente lo haces. La consistencia se vuelve natural.' 
                : 'When tracking takes seconds, you actually do it. Consistency becomes natural.'}
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="benefit-row-card fade-up" style={{ animationDelay: '300ms' }}>
          <div className="benefit-row-card__visual">
            <FullPictureWidget lang={lang} />
          </div>
          <div className="benefit-row-card__copy">
            <h3>{lang === 'es' ? 'Visión completa' : 'See the full picture'}</h3>
            <p>
              {lang === 'es' 
                ? 'Entiende tus patrones de gasto. Haz preguntas y obtén información instantánea.' 
                : 'Understand your spending patterns. Ask questions and get insights instantly.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
