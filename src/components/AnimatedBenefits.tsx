import { useState, useEffect } from 'react';
import { Language } from '../content/site';

type AnimatedBenefitsProps = {
  lang: Language;
};

// Widget 1: Frictionless Logging (Typing -> Card transition)
function FrictionlessLoggingWidget({ lang }: { lang: Language }) {
  const [step, setStep] = useState(0); // 0: typing, 1: show card
  const [text, setText] = useState('');
  const target = lang === 'es' ? 'Gasolina $350' : 'Gasoline $45';

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
          timer = setTimeout(() => setStep(1), 800);
        }
      }, 80);
      return () => clearInterval(interval);
    } else {
      // Hold card, then loop back
      timer = setTimeout(() => {
        setStep(0);
      }, 4000);
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
            <div className="logging-card-icon">🚗</div>
            <div className="logging-card-info">
              <span className="logging-card-title">
                {lang === 'es' ? 'Transporte' : 'Transport'}
              </span>
              <span className="logging-card-sub">
                {lang === 'es' ? 'Gasolina' : 'Gasoline'}
              </span>
            </div>
            <div className="logging-card-amount">
              {lang === 'es' ? '-$350.00' : '-$45.00'}
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
    }, 400); // Check a day every 400ms
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

// Widget 3: Full Picture (Bar chart animations)
function FullPictureWidget({ lang }: { lang: Language }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Loop animation: grow for 4s, reset, repeat
    setAnimate(true);
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 100);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const bars = [
    { emoji: '🥑', label: '79.95', height: '90%', color: '#ecfdf5' },
    { emoji: '🚗', label: '67.00', height: '75%', color: '#f0f9ff' },
    { emoji: '🍔', label: '32.00', height: '48%', color: '#fffbeb' },
    { emoji: '💎', label: '15.00', height: '28%', color: '#eef2ff' }
  ];

  return (
    <div className="benefit-widget benefit-widget--chart">
      <div className="chart-container">
        {bars.map((bar, idx) => (
          <div key={idx} className="chart-col">
            <div 
              className="chart-bar" 
              style={{ 
                height: animate ? bar.height : '0%',
                transitionDelay: `${idx * 100}ms`
              }}
            >
              <span className="chart-emoji">{bar.emoji}</span>
              <span className="chart-label">${bar.label}</span>
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
