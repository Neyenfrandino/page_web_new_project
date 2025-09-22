import { lazy, Suspense } from 'react';
import useOnScreen from '../../hooks/useOnScreen';

// ------------------------------
// 📂 SEO y Meta
import SEOHelmet from '../../components/seo/SEOHelmet/SEOHelmet';

// ------------------------------
// 📂 Layout
import Header from '../../components/layout/header/header';

// ------------------------------
// 📂 Secciones - Lazy Loading para mejor performance
const FadeInOnView = lazy(() => import('../../components/seccion/fadeInOnView/fadeInOnView'));
const CTAServicios = lazy(() => import('../../components/seccion/cta_servicios/cta_servicios'));
const Founders = lazy(() => import('../../components/seccion/founders/founders'));
const Valores = lazy(() => import('../../components/seccion/valores/valores'));
const CtaLogrosReconocimientos = lazy(() => import('../../components/seccion/cta_logros_reconocimientos/cta_logros_reconocimientos'));
const TimeLineHistory = lazy(() => import('../../components/seccion/history_about/time_line_history'));
 
// ------------------------------
// 📂 UI
import Button from '../../components/ui/button/button';

// ------------------------------
// 📂 Styles
import './aboutMe.router.scss';

let DOMAIN = import.meta.env.VITE_API_URL;


// Loading component para Suspense
const LoadingFallback = () => (
  <div className="loading-fallback" aria-label="Cargando contenido">
    <span className="sr-only">Cargando...</span>
  </div>
);

// Configuración de animaciones con preferencias de accesibilidad
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const fadeInProps = {
  direction: "up",
  duration: prefersReducedMotion ? 0 : 800,
  delay: prefersReducedMotion ? 0 : 200,
  distance: prefersReducedMotion ? 0 : 30,
  easing: prefersReducedMotion ? 'linear' : "bounce",
  speed: prefersReducedMotion ? 'fast' : "slow"
};

// Datos estructurados para la historia
const titles = {
  titulo: "Movimiento",
  subTitle: "Naluum",
  description: "Una historia de regeneración planetaria que comenzó con un descubrimiento y se convirtió en la esperanza de millones",
}

// Datos estructurados JSON-LD para SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "Sobre Naluum - Movimiento de Regeneración Planetaria",
  "description": "Conoce la historia del movimiento Naluum, nuestros fundadores, valores y compromiso con la regeneración planetaria a través de soluciones sostenibles innovadoras.",
  "url": window.location.href,
  "mainEntity": {
    "@type": "Organization",
    "name": "Naluum",
    "description": "Movimiento de regeneración planetaria con soluciones innovadoras para un futuro sostenible",
    "foundingDate": "2020",
    "mission": "Transformar el mundo en un futuro sostenible con soluciones innovadoras que regeneran nuestro planeta mientras impulsan la conciencia, la cooperación y la autonomía",
    "keywords": ["regeneración planetaria", "sostenibilidad", "innovación ambiental", "conciencia ecológica", "futuro sostenible"]
  }
};

const AboutMe = () => {
  const [logrosRef, logrosVisible] = useOnScreen({
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.3,
  });

  return (
    <>
      {/* SEO Mejorado con más metadatos */}
      <SEOHelmet 
        title="Sobre Naluum | Movimiento de Regeneración Planetaria"
        description="Descubre la historia del movimiento Naluum, conoce a nuestros fundadores y nuestra misión de transformar el mundo a través de soluciones sostenibles innovadoras que regeneran nuestro planeta."
        keywords="Naluum, regeneración planetaria, sostenibilidad, medio ambiente, innovación sostenible, fundadores Naluum, valores empresariales, conciencia ambiental"
        image="/img/hero_sobreMi.jpg"
        canonicalUrl={window.location.href}
        ogType="website"
      >
        {/* Datos estructurados JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </SEOHelmet>

      {/* Contenedor principal con semántica mejorada */}
      <main className='aboutMe__container' role="main" aria-label="Contenido principal sobre Naluum">
        
        {/* Header con mejor estructura semántica */}
        <Header>
          <section className='aboutMe__header-img-container' aria-label="Imagen hero">
            <img 
              src="/img/hero_sobreMi.jpg" 
              alt="Vista panorámica del movimiento Naluum - Regeneración planetaria en acción" 
              className="aboutMe__header-img"
              loading="eager"
              fetchpriority="high"
              width="1920"
              height="1080"
            />
          </section>
          
          <section className='aboutMe__header-content-container' aria-label="Introducción">
            <div className='aboutMe__header-content'>
              <header className='aboutMe__header-content-title'>
                <h1>Naluum: La Madre Tierra que Inspira un Movimiento Global</h1>
                <p>La historia de cómo un sueño ancestral de cuidado de la Madre Tierra se convirtió en un movimiento global de transformación regenerativa</p>
              </header>
              
              <nav className='aboutMe__header-content-button' aria-label="Navegación a sección de fundadores">
                <a 
                  href="#founders" 
                  className='button-CTA'
                  aria-label="Ir a la sección de fundadores de Naluum"
                >
                  <button className='button-CTA' type="button">
                    Los fundadores
                  </button>
                </a>
              </nav>
            </div>
          </section>
        </Header>

        {/* Contenido principal con secciones semánticas */}
        <div className='aboutMe__content'>
          
          {/* Historia con lazy loading */}
          <section className='aboutMe__content-history' aria-label="Historia de Naluum">
            <Suspense fallback={<LoadingFallback />}>
              <FadeInOnView {...fadeInProps}>
                <TimeLineHistory index={0} titles={titles} showHeroBg={true} heroBgImage={`${DOMAIN}/img/logo_naluum_trasparente.svg`}  />
              </FadeInOnView>
            </Suspense>
          </section>

          {/* CTA Servicios */}
          <section className='aboutMe__cta--servicios' aria-label="Nuestros servicios">
            <Suspense fallback={<LoadingFallback />}>
              <FadeInOnView {...fadeInProps}>
                <CTAServicios />
              </FadeInOnView>
            </Suspense>
          </section>
 
          {/* Fundadores con ID para ancla */}
          <section 
            className='aboutMe__founders' 
            id='founders'
            aria-label="Fundadores de Naluum"
            itemScope 
            itemType="https://schema.org/Person"
          >
            <Suspense fallback={<LoadingFallback />}>
              <FadeInOnView {...fadeInProps}>
                <Founders />
              </FadeInOnView>
            </Suspense>
          </section>

          {/* Valores */}
          <section className='aboutMe__valores' aria-label="Nuestros valores corporativos">
            <Suspense fallback={<LoadingFallback />}>
              <FadeInOnView {...fadeInProps}>
                <Valores />
              </FadeInOnView>
            </Suspense>
          </section>

          {/* Logros y Reconocimientos con carga condicional */}
          <section 
            className='aboutMe__cta--logros' 
            ref={logrosRef}
            aria-label="Logros y reconocimientos"
          >
            {logrosVisible && (
              <Suspense fallback={<LoadingFallback />}>
                <FadeInOnView {...fadeInProps}>
                  <CtaLogrosReconocimientos redirectRouter={'/proyectos/madre-selva'} />
                </FadeInOnView>
              </Suspense>
            )}
          </section>

        </div>
      </main>
    </>
  );
};

export default AboutMe;