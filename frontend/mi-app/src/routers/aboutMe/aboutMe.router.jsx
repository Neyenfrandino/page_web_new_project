

import useOnScreen from '../../hooks/useOnScreen'; // ajustá la ruta si es necesario
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
import FadeInOnView from '../../components/seccion/fadeInOnView/fadeInOnView';
import CTAServicios from '../../components/seccion/cta_servicios/cta_servicios';
import Founders from '../../components/seccion/founders/founders';
import Valores from '../../components/seccion/valores/valores';
import CtaLogrosReconocimientos from '../../components/seccion/cta_logros_reconocimientos/cta_logros_reconocimientos';
import TimeLineHistory from '../../components/seccion/history_about/time_line_history';

// ------------------------------
// 📂 UI / Componentes visuales pequeños y reutilizables
import Button from '../../components/ui/button/button';


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
import './aboutMe.router.scss';

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const fadeInProps = {
  direction: "up",
  duration: prefersReducedMotion ? 0 : 800,
  delay: prefersReducedMotion ? 0 : 200,
  distance: prefersReducedMotion ? 0 : 30,
  easing: prefersReducedMotion ? 'linear' : "bounce",
  speed: prefersReducedMotion ? 'fast' : "slow"
};

const titles = {
  titulo: "Movimiento",
  subTitle: "Naluum",
  description: "Una historia de regeneración planetaria que comenzó con un descubrimiento y se convirtió en la esperanza de millones",
}

const AboutMe = () => {
    const [logrosRef, logrosVisible] = useOnScreen({
  rootMargin: '0px 0px -100px 0px', // ajustá según cuándo querés que aparezca
  threshold: 0.3, // 30% visible
});
 
    return (
        <div className='aboutMe__container'>
            <SEOHelmet title="Sobre mí" description="Conoce más sobre mí y mi trayectoria." />
            <Header>
                <div className='aboutMe__header-img-container'>
                    <img src="/img/hero_sobreMi.jpg" alt="Fondo Naluum" className="aboutMe__header-img" />
                </div>
                
                <div className='aboutMe__header-content-container'>
                    <div className='aboutMe__header-content'>
                        <div className='aboutMe__header-content-title'>
                            <h1>El movimiento Naluum nace de una idea</h1>
                            <p>La idea de transformar el mundo en un futuro sostenible con soluciones innovadoras que regeneran nuestro planeta mientras impulsan la conciencia, la cooperación y la autonomía.</p>
                        </div>
                        
                        <div className='aboutMe__header-content-button'>
                            <a href="#founders" className='button-CTA'>
                                <button className='button-CTA'>Los fundadores</button>
                            </a>
                        </div>
                    </div>
                </div>
            </Header>

            <div className='aboutMe__content'>
                <div className='aboutMe__content-history'>
                    <FadeInOnView {...fadeInProps}>
                        <TimeLineHistory index={0} titles={titles} />
                    </FadeInOnView>
                </div>

                <div className='aboutMe__cta--servicios'>
                    <FadeInOnView {...fadeInProps}>
                        <CTAServicios />
                    </FadeInOnView>
                </div>

                <div className='aboutMe__founders' id='founders'>
                    <FadeInOnView {...fadeInProps}>
                        <Founders />
                    </FadeInOnView>
                </div>

                <div className='aboutMe__valores'>
                    <FadeInOnView {...fadeInProps}>
                        <Valores />
                    </FadeInOnView>
                </div>

                <div className='aboutMe__cta--logros' ref={logrosRef}>
                {logrosVisible && (
                    <FadeInOnView {...fadeInProps}>
                    <CtaLogrosReconocimientos />
                    </FadeInOnView>
                )}
                </div>

            </div>
        </div>
    );
};

export default AboutMe;