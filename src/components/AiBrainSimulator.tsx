import { useState, useEffect } from 'react';
import { Language } from '../content/site';

type Preset = {
  text: string;
  merchantName: string;
  categoryName: string;
  emoji: string;
  amount: string;
  latency: string;
  color: string;
};

const presetsEs: Preset[] = [
  {
    text: "Compré café en Starbucks por 150 pesos",
    merchantName: "Starbucks",
    categoryName: "Comida y Bebida",
    emoji: "☕",
    amount: "-$150.00",
    latency: "11.4ms",
    color: "#e8f7ee" // Soft organic green
  },
  {
    text: "Uber al aeropuerto 650 pesos",
    merchantName: "Uber",
    categoryName: "Transporte",
    emoji: "🚗",
    amount: "-$650.00",
    latency: "12.8ms",
    color: "#e0f4f0" // Soft sage
  },
  {
    text: "PlayStation Store GTA V 1200",
    merchantName: "PlayStation Store",
    categoryName: "Ocio y Entretenimiento",
    emoji: "🎮",
    amount: "-$1,200.00",
    latency: "10.9ms",
    color: "#eaf3eb" // Soft mint
  },
  {
    text: "Suscripción de Netflix 500 pesos",
    merchantName: "Netflix",
    categoryName: "Vivienda y Servicios",
    emoji: "📺",
    amount: "-$500.00",
    latency: "13.2ms",
    color: "#f3f7f4" // Soft light avocado
  }
];

const presetsEn: Preset[] = [
  {
    text: "Bought coffee at Starbucks for $5",
    merchantName: "Starbucks",
    categoryName: "Food & Drink",
    emoji: "☕",
    amount: "-$5.00",
    latency: "12.1ms",
    color: "#e8f7ee"
  },
  {
    text: "Uber to the airport $45",
    merchantName: "Uber",
    categoryName: "Transportation",
    emoji: "🚗",
    amount: "-$45.00",
    latency: "11.9ms",
    color: "#e0f4f0"
  },
  {
    text: "PlayStation Store GTA V $60",
    merchantName: "PlayStation Store",
    categoryName: "Entertainment & Leisure",
    emoji: "🎮",
    amount: "-$60.00",
    latency: "11.2ms",
    color: "#eaf3eb"
  },
  {
    text: "Netflix subscription $15",
    merchantName: "Netflix",
    categoryName: "Housing & Bills",
    emoji: "📺",
    amount: "-$15.00",
    latency: "13.5ms",
    color: "#f3f7f4"
  }
];

type AiBrainSimulatorProps = {
  lang: Language;
};

export function AiBrainSimulator({ lang }: AiBrainSimulatorProps) {
  const presets = lang === 'es' ? presetsEs : presetsEn;
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    setShowResult(false);
    setTypedText('');

    const targetText = presets[activeIndex].text;
    let currentIdx = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIdx < targetText.length) {
        setTypedText(targetText.slice(0, currentIdx + 1));
        currentIdx++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTimeout(() => {
          setShowResult(true);
        }, 200);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [activeIndex, lang]);

  const activePreset = presets[activeIndex];

  useEffect(() => {
    if (showResult && !isTyping) {
      const holdTimer = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % presets.length);
      }, 4500); // Hold for 4.5s before moving to next preset
      return () => clearTimeout(holdTimer);
    }
  }, [showResult, isTyping, presets.length]);

  return (
    <div className="ai-sim-widget">
      {/* Input Message Bubble */}
      <div className="ai-sim-input-bubble">
        <span className="ai-sim-input-label">{lang === 'es' ? 'Tu dices:' : 'You say:'}</span>
        <p className="ai-sim-input-text">
          "{typedText}"
          {isTyping && <span className="ai-sim-cursor" />}
        </p>
      </div>

      {/* Connection / Processing Indicator */}
      <div className="ai-sim-indicator">
        {isTyping ? (
          <span className="ai-sim-status ai-sim-status--processing">
            {lang === 'es' ? 'Organizando tu gasto...' : 'Organizing your expense...'}
          </span>
        ) : (
          <span className="ai-sim-status ai-sim-status--done">
            ⚡ {lang === 'es' ? 'Categorizado al instante' : 'Categorized instantly'}
          </span>
        )}
      </div>

      {/* Output Transaction Card (iOS Native Style) */}
      <div className="ai-sim-output-container">
        {showResult ? (
          <div className="ai-sim-card fade-in">
            <div 
              className="ai-sim-card__icon" 
              style={{ backgroundColor: activePreset.color }}
            >
              {activePreset.emoji}
            </div>
            <div className="ai-sim-card__details">
              <span className="ai-sim-card__merchant">{activePreset.merchantName}</span>
              <span className="ai-sim-card__category">{activePreset.categoryName}</span>
            </div>
            <div className="ai-sim-card__amount">
              {activePreset.amount}
            </div>
          </div>
        ) : (
          <div className="ai-sim-card-skeleton">
            <div className="ai-sim-skeleton-icon" />
            <div className="ai-sim-skeleton-details">
              <div className="ai-sim-skeleton-line ai-sim-skeleton-line--long" />
              <div className="ai-sim-skeleton-line ai-sim-skeleton-line--short" />
            </div>
            <div className="ai-sim-skeleton-amount" />
          </div>
        )}
      </div>

      {/* Latency subtext */}
      {showResult && (
        <span className="ai-sim-latency-badge fade-in">
          {lang === 'es' ? 'Clasificado en ' : 'Classified in '}
          <strong>{activePreset.latency}</strong>
        </span>
      )}

      {/* Preset Buttons */}
      <div className="ai-sim-presets">
        {presets.map((preset, idx) => (
          <button
            key={idx}
            className={`ai-sim-preset-btn ${activeIndex === idx ? 'ai-sim-preset-btn--active' : ''}`}
            onClick={() => setActiveIndex(idx)}
            disabled={isTyping}
          >
            {preset.emoji} {preset.merchantName}
          </button>
        ))}
      </div>
    </div>
  );
}
