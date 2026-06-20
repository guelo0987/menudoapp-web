import { useState, useEffect } from 'react';
import { Language } from '../content/site';

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
      // Hold card, then loop back
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
            <span className="logging-prompt">🎙️</span>
            <span className="logging-typed-text">{text}</span>
            <span className="logging-caret" />
          </div>
        ) : (
          <div className="logging-card-box fade-in">
            <div className="logging-card-icon">☕</div>
            <div className="logging-card-info">
              <span className="logging-card-title">
                {lang === 'es' ? 'Comida y Bebida' : 'Food & Drink'}
              </span>
              <span className="logging-card-sub">
                {lang === 'es' ? 'Starbucks' : 'Starbucks'}
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
        if (prev >= 12) return 0; // Reset streak
        return prev + 1;
      });
    }, 4500 / 12); // Loop complete cycle in 4.5s
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
                {isChecked && <span className="habit-checkmark">✓</span>}
              </div>
            );
          })}
        </div>
        <div className="habit-badge fade-in">
          🔥 {streak} {lang === 'es' ? 'días seguidos' : 'day streak'}
        </div>
      </div>
    </div>
  );
}

// Widget 3: Full Picture (Bar chart animations with brand avocado colors & categories)
function FullPictureWidget({ lang }: { lang: Language }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 150);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const bars = [
    { 
      emoji: '🍔', 
      name: lang === 'es' ? 'Comida' : 'Food', 
      amount: lang === 'es' ? '$4,200' : '$420', 
      height: '92%', 
      color: 'var(--accent)' 
    },
    { 
      emoji: '🚗', 
      name: lang === 'es' ? 'Transp.' : 'Transp.', 
      amount: lang === 'es' ? '$2,800' : '$280', 
      height: '72%', 
      color: '#4fa972' 
    },
    { 
      emoji: '🏠', 
      name: lang === 'es' ? 'Vivienda' : 'Bills', 
      amount: lang === 'es' ? '$1,800' : '$180', 
      height: '52%', 
      color: 'var(--accent-light)' 
    },
    { 
      emoji: '🎮', 
      name: lang === 'es' ? 'Ocio' : 'Leisure', 
      amount: lang === 'es' ? '$900' : '$90', 
      height: '32%', 
      color: '#a8e6cf' 
    }
  ];

  return (
    <div className="benefit-widget benefit-widget--chart">
      <div className="chart-container">
        {bars.map((bar, idx) => (
          <div key={idx} className="chart-col">
            <div className="chart-bar-track">
              <div 
                className="chart-bar-fill" 
                style={{ 
                  height: animate ? bar.height : '0%',
                  backgroundColor: bar.color,
                  transitionDelay: `${idx * 100}ms`
                }}
              />
            </div>
            <div className="chart-meta">
              <span className="chart-emoji">{bar.emoji}</span>
              <span className="chart-label">{bar.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnimatedBenefits({ lang }: AnimatedBenefitsProps) {
  return (
    <section className="shell shell--wide animated-benefits-section">
      <div className="animated-benefits-grid">
        {/* Card 1 */}
        <div className="benefit-row-card">
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
        <div className="benefit-row-card">
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
        <div className="benefit-row-card">
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
