import React from 'react';
import './founders.scss';
 
const Founders = () => {
  const founders = [
    {
      id: 1,
      name: "Alexandra Chen",
      role: "Visionaria Principal",
      bio: "Pionera en la integración de tecnología y conciencia humana",
      quote: "El futuro pertenece a quienes entienden que la tecnología debe servir a la humanidad",
      image: "/img/tierra_martinez.jpg"
    },
    {
      id: 2,
      name: "Marcus Aurelius",
      role: "Arquitecto de Sistemas",
      bio: "Experto en diseño de ecosistemas digitales sostenibles",
      quote: "Construimos puentes entre el mundo digital y el mundo natural",
      image: "/img/founders/marcus-aurelius.jpg"
    },
    {
      id: 3,
      name: "La familia Naluum",
      title: "Y somos una familia",
      role: "Unidos por un propósito común",
      bio: "Juntos diseñamos un futuro donde la tecnología, la naturaleza y el amor por lo que hacemos se entrelazan. Cada miembro aporta su esencia para construir algo más grande que nosotros mismos.",
      quote: "Más que un equipo, somos una familia que sueña, crea y crece unida.",
      image: "/img/founders/familia-naluum.jpg"
    }

  ];
 
  return (
    <section className="founders-section">

      <div className="founders-container">
        <div className="founders-header">
          <h2 className="founders-title">Fundadores del Movimiento</h2>
          <p className="founders-subtitle">Las mentes visionarias detrás de Naluum</p>
        </div>

        <div className="founders-grid">
          {founders.map((founder) => (
            <div
              key={founder.id}
              className="founder-card"
            >
              <div className="founder-silhouette">
                <div className="founder-image-container">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="founder-image"
                  />
                  <div className="founder-outline-overlay"></div>
                </div>
                <div className="founder-glow"></div>
              </div>

              <div className="founder-info">
                <h3 className="founder-name">{founder.name}</h3>
                <p className="founder-role">{founder.role}</p>
                
                <div className="founder-details">
                  <p className="founder-bio">{founder.bio}</p>
                  <blockquote className="founder-quote">"{founder.quote}"</blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="founders-footer">
          <div className="decorative-line"></div>
          <p className="founders-message">Unidos por una visión común de transformación</p>
        </div>
      </div>
    </section>
  );
};

export default Founders;