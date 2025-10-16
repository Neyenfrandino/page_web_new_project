import React, { useState } from 'react';
import './founders.scss';
let DOMAIN = import.meta.env.VITE_API_URL;

const Founders = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  
const founders = [
  {
    id: 1,
    name: "Tierra Martínez",
    role: "Co-fundador",
    bio: "Con más de 25 años de experiencia en Permacultura y Diseño Regenerativo, ha trabajado en más de 40 países acompañando a comunidades, instituciones y proyectos en la creación de modelos sostenibles y resilientes. Reconocido por integrar ciencia, tradición y espiritualidad en procesos educativos transformadores.",
    quote: "Transformamos la forma de habitar el mundo integrando ciencia, tradición y espiritualidad.",
    image: `${DOMAIN}/img/tierra_martinez.jpg`
  },
  {
    id: 2,
    name: "Beatriz Ramírez Cruz",
    role: "Co-fundadora",
    bio: "Pionera en Permacultura Social, especializada en procesos grupales, liderazgo consciente y metodologías participativas. Ha formado a miles de personas en el diseño de vínculos sanos, proyectos colectivos y modelos organizativos sustentables, conectando lo ancestral, lo humano y lo comunitario.",
    quote: "El cambio verdadero comienza en la forma en que nos relacionamos con nosotros y con la comunidad.",
    image: `${DOMAIN}/img/beatriz_ramirez.jpg`
  }
];

const familyFounder = {
  id: 3,
  name: "La Familia Na Lu'um",
  role: "Unidos por un propósito común",
  bio: "El Instituto de Permacultura Na Lu'um International tiene como propósito común la regeneración planetaria a través de procesos educativos en diseño de permacultura, bioconstrucción, permacultura social, reingeniería del ser, diseño hidrológico y agricultura sintrópica. Somos una familia unida por la regeneración de los sistemas. La Familia Na Lu'um sostiene un proceso educativo mediante una organización viva, donde cada integrante aporta desde su servicio al proyecto.",
  quote: "Somos una familia unida por la regeneración de la Tierra, sosteniendo una organización viva al servicio del cambio.",
  image: `${DOMAIN}/img/familia_na_luum.jpg`
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