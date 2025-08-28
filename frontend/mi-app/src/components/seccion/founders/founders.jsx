import React, { useState } from 'react';
import './founders.scss';
let DOMAIN = import.meta.env.VITE_API_URL;

const Founders = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  
  const founders = [
    {
      id: 1,
      name: "Alexandra Chen",
      role: "Visionaria Principal",
      bio: "Pionera en la integración de tecnología y conciencia humana",
      quote: "El futuro pertenece a quienes entienden que la tecnología debe servir a la humanidad",
      image: `${DOMAIN}/img/tierra_martinez.jpg`
    },
    {
      id: 2,
      name: "Marcus Aurelius",
      role: "Arquitecto de Sistemas",
      bio: "Experto en diseño de ecosistemas digitales sostenibles",
      quote: "Construimos puentes entre el mundo digital y el mundo natural",
      image: `${DOMAIN}/img/marcus-aurelius.jpg`
    }
  ];

  const familyFounder = {
    id: 3,
    name: "La familia Naluum",
    role: "Unidos por un propósito común",
    bio: "Juntos diseñamos un futuro donde la tecnología, la naturaleza y el amor por lo que hacemos se entrelazan.",
    quote: "Más que un equipo, somos una familia que sueña, crea y crece unida.",
    image: `${DOMAIN}/img/familia_naluum.jpg`
  };

  const handleCardClick = (founderId) => {
    // Si la tarjeta ya está expandida, la contraemos, si no, la expandimos
    setExpandedCard(expandedCard === founderId ? null : founderId);
  };

  return (
    <section className="founders-section">
      <div className="founders-container">
        {/* Header elegante y minimalista */}
        <div className="founders-header">
          <div className="accent-line"></div>
          <h2 className="founders-title">Fundadores</h2>
          <p className="founders-subtitle">Las mentes visionarias detrás de Naluum</p>
        </div>

        {/* Layout de dos niveles */}
        <div className="founders-layout">
          {/* Primera fila - dos fundadores */}
          <div className="founders-row-top">
            {founders.map((founder) => (
              <div
                key={founder.id}
                className={`founder-card ${expandedCard === founder.id ? 'expanded' : ''}`}
                onClick={() => handleCardClick(founder.id)}
              >
                {/* Número decorativo */}
            

                {/* Imagen con overlay elegante */}
                <div className="founder-image-wrapper">
                  <div className="founder-image-container">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="founder-image"
                    />
                    <div className="image-overlay"></div>
                  </div>
                  
                  {/* Glow effect sutil */}
                  <div className="glow-effect"></div>
                </div>

                {/* Información del fundador */}
                <div className="founder-info">
                  <h3 className="founder-name">{founder.name}</h3>
                  <p className="founder-role">{founder.role}</p>
                  
                  {/* Línea decorativa */}
                  <div className="divider"></div>

                  {/* Bio expandible */}
                  <div className="bio-container">
                    <p className="founder-bio">{founder.bio}</p>
                    <blockquote className="founder-quote">"{founder.quote}"</blockquote>
                  </div>
                </div>

                {/* Indicador de hover */}
                <div className="hover-indicator"></div>
                
                {/* Botón de expansión */}
                <div className="expand-icon"></div>
              </div>
            ))}
          </div>

          {/* Segunda fila - familia centrada */}
          <div className="founders-row-bottom">
            <div
              className={`founder-card ${expandedCard === familyFounder.id ? 'expanded' : ''}`}
              onClick={() => handleCardClick(familyFounder.id)}
            >

              {/* Imagen con overlay elegante */}
              <div className="founder-image-wrapper">
                <div className="founder-image-container">
                  <img
                    src={familyFounder.image}
                    alt={familyFounder.name}
                    className="founder-image"
                  />
                  <div className="image-overlay"></div>
                </div>
                
                {/* Glow effect sutil */}
                <div className="glow-effect"></div>
              </div>

              {/* Información del fundador */}
              <div className="founder-info">
                <h3 className="founder-name">{familyFounder.name}</h3>
                <p className="founder-role">{familyFounder.role}</p>
                
                {/* Línea decorativa */}
                <div className="divider"></div>

                {/* Bio expandible */}
                <div className="bio-container">
                  <p className="founder-bio">{familyFounder.bio}</p>
                  <blockquote className="founder-quote">"{familyFounder.quote}"</blockquote>
                </div>
              </div>

              {/* Indicador de hover */}
              <div className="hover-indicator"></div>
              
              {/* Botón de expansión */}
              <div className="expand-icon"></div>
            </div>
          </div>
        </div>

        {/* Footer elegante */}
        <div className="founders-footer">
          <div className="footer-line"></div>
          <p className="footer-message">Unidos por una visión común de transformación</p>
        </div>
      </div>
    </section>
  );
};

export default Founders;