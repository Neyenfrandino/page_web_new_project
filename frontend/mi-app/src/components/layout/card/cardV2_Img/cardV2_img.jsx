import { Link } from "react-router-dom";

// ------------------------------
// 📂 SEO y Meta
// Importaciones de componentes relacionados con SEO y metadata

// ------------------------------
// 📂 Layout
// Componentes que forman la estructura y navegación principal (header, footer, nav, etc.)
import Button from "../../../ui/button/button";
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
import "./cardV2_img.scss"

const CardV2Img = ({ objectContentCard, buttonTrue = true }) => {
 
    return (

        <div className="cardV2__container">
            <div
            className="cardV2__image-content"
            style={{
                backgroundImage: `url(${objectContentCard.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            >
                <div className="cardV2__content--text">
                    <span className="cardV2__content-title">{objectContentCard.question}</span>
                    <h2 className="cardV2__content-subtitle">{objectContentCard.title}</h2>
                    <p className="cardV2__content-description">{objectContentCard.text}</p>
                    {buttonTrue && 
                        <div className="button-card">
                            <Button text={objectContentCard.buttonPrimary[0]} link={objectContentCard.buttonPrimary[1]} style="primary" />
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}

export default CardV2Img;
 