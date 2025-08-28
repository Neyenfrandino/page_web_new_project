import { useContext } from 'react';

import { Link } from 'react-router-dom';
// ------------------------------
// 📂 SEO y Meta
// Importaciones de componentes relacionados con SEO y metadata

// ------------------------------
// 📂 Layout
// Componentes que forman la estructura y navegación principal (header, footer, nav, etc.)
import Button from '../../ui/button/button';

// ------------------------------
// 📂 Secciones
// Bloques grandes o secciones completas que conforman las páginas

// ------------------------------
// 📂 UI / Componentes visuales pequeños y reutilizables

// ------------------------------
// 📂 Integrations
// Servicios externos, pasarelas de pago, APIs de terceros

// ------------------------------
// 📂 Maps
// Componentes relacionados con mapas y geolocalización

// ------------------------------
// 📂 Tracking
// Funciones y componentes para seguimiento de usuario y analytics

// ------------------------------
// 📂 Context
// Archivos relacionados con Context API para manejo global de estados
import { ContextJsonLoadContext } from '../../../context/context_json_load/context_json_load';


// ------------------------------
// 📂 Hooks
// Hooks personalizados para reutilización de lógica

// ------------------------------
// 📂 Services
// Funciones para llamadas a APIs y lógica de negocio

// ------------------------------
// 📂 Utils
// Funciones auxiliares y helpers

// ------------------------------
// 📂 Styles
// Estilos globales, variables SCSS y temas
import './cta_servicios.scss';
// En tu archivo JS/React
let DOMAIN = import.meta.env.VITE_API_URL;
// document.documentElement.style.setProperty('--dominio', DOMAIN);
// console.log("Dominio desde variable de entorno:", DOMAIN);
 
const CTAServicios = () => {
    const { dataImpactoReal } = useContext(ContextJsonLoadContext);

    if (!dataImpactoReal || dataImpactoReal.length === 0) {
        return <div className="cta-servicios__loading">Cargando...</div>;
    }
    return(
        <div className="cta-servicios__container">
            <div className="cta-section" style={{ backgroundImage: `url(${DOMAIN}/img/cta_sobre_nosotros.jpg)` }}
>
                <div className="cta-content">
                    <h2 className="cta-title">Quieres ser parte del cambio?</h2>
                    <p className="cta-text">
                        Cada acción cuenta. Cada persona importa. 
                        Juntos estamos escribiendo el futuro de nuestro planeta.
                    </p>
                    <div className="cta-stats">
                        <div className="stat">
                            <div className="stat-number">{ dataImpactoReal[0].value }</div>
                            <div className="stat-label">{ dataImpactoReal[0].title }</div>
                        </div>

                        <div className="stat">
                            <div className="stat-number">{ dataImpactoReal[7].value }</div>
                            <div className="stat-label">{ dataImpactoReal[7].title }</div>
                        </div>
                        
                        <div className="stat">
                            <div className="stat-number">{ dataImpactoReal[1].value }</div>
                            <div className="stat-label">{ dataImpactoReal[1].title }</div>
                        </div>
                    </div>
                    
                    <div className='cta-button-container'>
                        <Button link={'/servicios'} style='primary' text='Se parte de la misión' />
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default CTAServicios;