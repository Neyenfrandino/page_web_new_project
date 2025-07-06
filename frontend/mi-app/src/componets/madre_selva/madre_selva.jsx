import React from 'react';
import './madre_selva.scss';

const HomeMadreSelva = ({children}) => {
  return (
    <div /* style={{ viewTransitionName: 'projects-root' }} */>
      {children}
        <section className="home-madre-selva">
          <div className="home-madre-selva__content">
            <h2>Bienvenidos a Madre Selva</h2>
            <p>
              Somos un proyecto dedicado a la conexión entre la naturaleza y las personas.
              Creamos productos con alma verde, cultivados con amor y conciencia ecológica.
            </p>

            <div className="home-madre-selva__highlights">
              <div className="highlight">
                <h3>🌱 Plantines Orgánicos</h3>
                <p>Ofrecemos una variedad de plantines cultivados sin agroquímicos.</p>
              </div>
              <div className="highlight">
                <h3>💧 Cuidado Natural</h3>
                <p>Promovemos métodos de cultivo sustentables y regenerativos.</p>
              </div>
              <div className="highlight">
                <h3>📦 Entregas Locales</h3>
                <p>Llegamos con nuestras plantas a toda la ciudad sin intermediarios.</p>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};

export default HomeMadreSelva;
