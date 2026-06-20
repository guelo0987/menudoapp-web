import { useState, useEffect } from 'react';
import { Language } from '../content/site';

const CoffeeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
);

const CarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const GamepadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <line x1="15" y1="13" x2="15.01" y2="13" />
    <line x1="18" y1="11" x2="18.01" y2="11" />
    <rect x="2" y="6" width="20" height="12" rx="3" />
  </svg>
);

const TvIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
    <polyline points="17 2 12 7 7 2" />
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14, display: 'inline-block', marginRight: 4, verticalAlign: 'middle' }}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

type Preset = {
  text: string;
  merchantName: string;
  categoryName: string;
  emoji: string;
  amount: string;
  color: string;
};

const presetsEs: Preset[] = [
  {
    text: "Compré café en Starbucks por 150 pesos",
    merchantName: "Starbucks",
    categoryName: "Comida y Bebida",
    emoji: "☕",
    amount: "-$150.00",
    color: "#e8f7ee" // Soft organic green
  },
  {
    text: "Uber al aeropuerto 650 pesos",
    merchantName: "Uber",
    categoryName: "Transporte",
    emoji: "🚗",
    amount: "-$650.00",
    color: "#e8f7ee"
  },
  {
    text: "PlayStation Store GTA V 1200",
    merchantName: "PlayStation Store",
    categoryName: "Ocio y Entretenimiento",
    emoji: "🎮",
    amount: "-$1,200.00",
    color: "#e8f7ee"
  },
  {
    text: "Suscripción de Netflix 500 pesos",
    merchantName: "Netflix",
    categoryName: "Vivienda y Servicios",
    emoji: "📺",
    amount: "-$500.00",
    color: "#e8f7ee"
  }
];

const presetsEn: Preset[] = [
  {
    text: "Bought coffee at Starbucks for $5",
    merchantName: "Starbucks",
    categoryName: "Food & Drink",
    emoji: "☕",
    amount: "-$5.00",
    color: "#e8f7ee"
  },
  {
    text: "Uber to the airport $45",
    merchantName: "Uber",
    categoryName: "Transportation",
    emoji: "🚗",
    amount: "-$45.00",
    color: "#e8f7ee"
  },
  {
    text: "PlayStation Store GTA V $60",
    merchantName: "PlayStation Store",
    categoryName: "Entertainment & Leisure",
    emoji: "🎮",
    amount: "-$60.00",
    color: "#e8f7ee"
  },
  {
    text: "Netflix subscription $15",
    merchantName: "Netflix",
    categoryName: "Housing & Bills",
    emoji: "📺",
    amount: "-$15.00",
    color: "#e8f7ee"
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
    }, 35);

    return () => clearInterval(typingInterval);
  }, [activeIndex, lang]);

  const activePreset = presets[activeIndex];

  useEffect(() => {
    if (showResult && !isTyping) {
      const holdTimer = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % presets.length);
      }, 4500);
      return () => clearTimeout(holdTimer);
    }
  }, [showResult, isTyping, presets.length]);

  return (
    <div className="ai-sim-widget">
      {/* Input Message Bubble */}
      <div className="ai-sim-input-bubble">
        <span className="ai-sim-input-label">{lang === 'es' ? 'Tú dices:' : 'You say:'}</span>
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
            <BoltIcon /> {lang === 'es' ? 'Categorizado al instante' : 'Categorized instantly'}
          </span>
        )}
      </div>

      {/* Output Transaction Card (iOS Native Style) */}
      <div className="ai-sim-output-container">
        {showResult ? (
          <div className="ai-sim-card fade-in">
            <div 
              className="ai-sim-card__icon" 
              style={{ backgroundColor: activePreset.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span style={{ fontSize: '1.25rem' }}>{activePreset.emoji}</span>
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

      {/* Preset Buttons */}
      <div className="ai-sim-presets">
        {presets.map((preset, idx) => (
          <button
            key={idx}
            className={`ai-sim-preset-btn ${activeIndex === idx ? 'ai-sim-preset-btn--active' : ''}`}
            onClick={() => setActiveIndex(idx)}
            disabled={isTyping}
          >
            <span className="ai-sim-preset-btn-icon" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '1.15rem' }}>
              {preset.emoji}
            </span>
            {preset.merchantName}
          </button>
        ))}
      </div>
    </div>
  );
}
