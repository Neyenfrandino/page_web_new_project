
import { useContext } from 'react';
import { ContextJsonLoadContext } from '../../context/context_json_load/context_json_load';

// ------------------------------
// 📂 SEO y Meta
// Importaciones de componentes relacionados con SEO y metadata
import SEOHelmet from '../../components/seo/SEOHelmet/SEOHelmet';


// ------------------------------
// 📂 Layout
// Componentes que forman la estructura y navegación principal (header, footer, nav, etc.)
import Header from '../../components/layout/header/header';


// ------------------------------
// 📂 Secciones
// Bloques grandes o secciones completas que conforman las páginas

// ------------------------------
// 📂 UI / Componentes visuales pequeños y reutilizables
import Button from '../../components/ui/button/button';
import LineLogoSeparacion from '../../components/ui/line_logo_separacion/line_logo_separacion';

// ------------------------------
// 📂 Integrations
// Servicios externos, pasarelas de pago, APIs de terceros
import CtaHablemos from '../../components/seccion/cta_hablemos/cta_hablemos';
import MessageFinal from '../../components/seccion/message_final/message_final';


// ------------------------------
// 📂 Maps
// Componentes relacionados con mapas y geolocalización
import MapLocations from '../../components/maps/map_location/map_location';

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
import './contact.router.scss';

const Contact = () => {

    const { message } = useContext(ContextJsonLoadContext);

    if (!message) return null;

    return (
        <div className='contact__container'>
            <>
                 <SEOHelmet 
                    title="Movimiento Naluum | Soluciones Regenerativas"
                    description="Descubrí cómo el Movimiento Naluum impulsa soluciones regenerativas para transformar vidas, conectar comunidades y sanar la Tierra."
                    keywords="regeneración, comunidad, agricultura regenerativa, soluciones sostenibles, plantines, tecnología social"
                    author="Neyen Frandino"
                    url="https://miempresa.com"
                    image="https://miempresa.com/img/logo_naluum_og.jpg"
                />
            </>
         
            <Header>
                <div className='contact--header__container'>
                    <div className='contact--header__img'>
                        <img src="/img/contactos_img_inicial.jpg" alt="" />
                    </div>
                    
                    <div className='contact--header__content'>
                        <div className='contact--header__content--title'>
                            <h1>
                                <span>CONECTEMOS CON</span>
                                <span>PROPÓSITO</span>
                            </h1>
                        </div>
                        
                        <div className='contact--header__content--subtitle'>
                            <p>Escribinos, sembrá una pregunta y cultivemos una respuesta juntos</p>
                        </div>
                        
                        <div className='contact--header__content--button'>
                            <Button text="ENVIAR UN MENSAJE" link="/contacto" style="primary" />
                        </div>
                    </div>

                    {/* Opcional: indicador de scroll */}
                    <div className="scroll-indicator">
                        <div className="mouse"></div>
                    </div>
                </div>
            </Header>

           

            <div className='contact--content'>
                
                <LineLogoSeparacion />

                <div className='contact--content__socials-media'>
                    <CtaHablemos />
                </div>

                
                {/* <LineLogoSeparacion /> */}


                {/* <div className='contact--content__message'>
                    <MessageFinal indexMessage={2} />
                </div> */}
                
                <LineLogoSeparacion />

                <div className='contact--content__map-location'>
                    <MapLocations />
                </div>
                
                <LineLogoSeparacion />

                <div className='contact--content__message-final'>
                    <MessageFinal indexMessage={3} />
                </div>
                
                <LineLogoSeparacion />

            </div>
        
        </div>
    );
};

export default Contact;