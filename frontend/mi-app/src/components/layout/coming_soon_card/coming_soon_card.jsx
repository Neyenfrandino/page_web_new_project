import React, { useState, useEffect } from 'react';
import './coming_soon_card.scss';

const ComingSoonCard = ({ 
  sectionName = "Nueva Sección",
  estimatedDate = "Primer trimestre 2025",
  alternativeAction = {
    text: "Mientras tanto, explora nuestro catálogo",
    link: "/productos",
    buttonText: "Ver productos disponibles"
  }
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [particleCount] = useState(15);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Aquí iría tu lógica de suscripción
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const handleAlternativeAction = () => {
    if (alternativeAction.link) {
      window.location.href = alternativeAction.link;
    }
  };

  return (
    <div className={`coming-soon-card ${isVisible ? 'visible' : ''}`}>
      {/* Partículas decorativas animadas */}
      <div className="coming-soon-card__particles">
        {[...Array(particleCount)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              '--delay': `${Math.random() * 5}s`,
              '--duration': `${5 + Math.random() * 10}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="coming-soon-card__container">
        {/* Header con ícono */}
        <div className="coming-soon-card__header">
          <div className="icon-wrapper">
            <svg className="icon-main" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="icon-glow"></div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="coming-soon-card__content">
          <span className="badge">Próximamente</span>
          
          <h2 className="title">
            {sectionName}
            <span className="title-accent">está en camino</span>
          </h2>
          
          <p className="description">
            Estamos trabajando con mucho amor y dedicación para traerte algo extraordinario. 
            Cada detalle está siendo cuidadosamente diseñado para ofrecerte la mejor experiencia.
          </p>

          <div className="estimated-date">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
              <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
              <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
            </svg>
            <span>Lanzamiento estimado: <strong>{estimatedDate}</strong></span>
          </div>

          {/* Progress indicator */}
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <span className="progress-text">75% completado</span>
          </div>
        </div>

        {/* Suscripción */}
        <div className="coming-soon-card__subscribe">
          <h3>¿Quieres ser el primero en saberlo?</h3>
          <form onSubmit={handleSubscribe} className="subscribe-form">
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-input"
            />
            <button type="submit" className="subscribe-btn">
              {isSubscribed ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeWidth="2"/>
                    <path d="M22 4L12 14.01l-3-3" strokeWidth="2"/>
                  </svg>
                  <span>¡Listo!</span>
                </>
              ) : (
                <>
                  <span>Notifícame</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2"/>
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Acción alternativa */}
        <div className="coming-soon-card__alternative">
          <div className="divider">
            <span>Mientras tanto</span>
          </div>
          
          <p className="alternative-text">{alternativeAction.text}</p>
          
          <button 
            className="alternative-btn"
            onClick={handleAlternativeAction}
          >
            <span>{alternativeAction.buttonText}</span>
            <div className="btn-shine"></div>
          </button>
        </div>

        {/* Features preview */}
        <div className="coming-soon-card__features">
          <h4>Lo que viene incluye:</h4>
          <div className="features-grid">
            <div className="feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeWidth="2"/>
              </svg>
              <span>Experiencia innovadora</span>
            </div>
            <div className="feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeWidth="2"/>
              </svg>
              <span>Contenido premium</span>
            </div>
            <div className="feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <path d="M12 6v6l4 2" strokeWidth="2"/>
              </svg>
              <span>Acceso anticipado</span>
            </div>
          </div>
        </div>

        {/* Footer message */}
        <div className="coming-soon-card__footer">
          <p className="footer-message">
            💚 Gracias por tu paciencia. Prometemos que la espera valdrá la pena.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonCard;