import React, { useState } from 'react';
import './Newsletter.scss';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Por favor ingresa tu email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    setIsLoading(true);

    // Simular llamada a API
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
      
      // Reset después de 5 segundos
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="newsletter-container">
      <div className="newsletter-wrapper">
        <div className="newsletter-content">
          <div className="newsletter-header">
            <h2 className="newsletter-title">
              Suscríbete a nuestro Newsletter
            </h2>
            <p className="newsletter-subtitle">
              Mantente al día con las últimas noticias, artículos y recursos enviados directamente a tu bandeja de entrada.
            </p>
          </div>

          {!isSubscribed ? (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Ingresa tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`email-input ${error ? 'error' : ''}`}
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    'Suscribirme'
                  )}
                </button>
              </div>
              {error && <p className="error-message">{error}</p>}
            </form>
          ) : (
            <div className="success-message">
              <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p>¡Gracias por suscribirte! Te hemos enviado un email de confirmación.</p>
            </div>
          )}

          <div className="newsletter-footer">
            <p className="privacy-note">
              <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Respetamos tu privacidad. Puedes cancelar tu suscripción en cualquier momento.
            </p>
          </div>

          <div className="decoration-elements">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;