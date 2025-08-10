import { useState, useRef, useCallback, useMemo, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ContextJsonLoadContext } from '../../context/context_json_load/context_json_load';
import { MethodStatePaymentContext } from '../../context/method_state_payment/method_state_payment.context';
import { useQueryParam } from '../../hooks/useQueryParams';


// ------------------------------
// 📂 SEO y Meta
// Importaciones de componentes relacionados con SEO y metadata
import SEOHelmet from '../../components/seo/SEOHelmet/SEOHelmet';


// ------------------------------
// 📂 Layout
// Componentes que forman la estructura y navegación principal (header, footer, nav, etc.)
import CardV2Img from '../../components/layout/card/cardV2_Img/cardV2_img';
import ModalCard from '../../components/layout/card/modal_card/modal_card';
import Header from '../../components/layout/header/header';


// ------------------------------
// 📂 Secciones
// Bloques grandes o secciones completas que conforman las páginas
import MissionCarousel from '../../components/seccion/carrusel_imagenes/carrusel_imagenes';
import Grid from '../../components/seccion/grid/grid';
import CtaImgCuentaRgresiva from '../../components/seccion/cta_img_cuenta_rgresiva/cta_img_cuenta_rgresiva';
import CardDataImpacto from '../../components/seccion/card_data_impacto/card_data_impacto';
import BeforeAndAfter from '../../components/seccion/before_and_after/before_and_after';
import Testimonios from '../../components/seccion/testimonios/testimonios';
import Bitacora from '../../components/seccion/bitacora/bitacora';
import CtaHablemos from '../../components/seccion/cta_hablemos/cta_hablemos';
import MessageFinal from '../../components/seccion/message_final/message_final';
import TestimonialCard from '../../components/seccion/testimonial_card/testimonial_card';
import FadeInOnView from '../../components/seccion/fadeInOnView/fadeInOnView';


// ------------------------------
// 📂 UI / Componentes visuales pequeños y reutilizables
import Button from '../../components/ui/button/button';
import LineLogoSeparacion from '../../components/ui/line_logo_separacion/line_logo_separacion';
import Modal from '../../components/ui/modal/modal';


// ------------------------------
// 📂 Integrations
// Servicios externos, pasarelas de pago, APIs de terceros
import PaymentForm from '../../components/integrations/payment-form/payment-form';
import MercadoPagoCard from '../../components/integrations/mercado_pago_card/mercado_pago_card';
import PaymentMethodSelector from '../../components/integrations/payment_method/payment_method_selector';


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
import './home.scss';

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const fadeInProps = {
  direction: "up",
  duration: prefersReducedMotion ? 0 : 800,
  delay: prefersReducedMotion ? 0 : 200,
  distance: prefersReducedMotion ? 0 : 30,
  easing: prefersReducedMotion ? 'linear' : "bounce",
  speed: prefersReducedMotion ? 'fast' : "slow"
};

const timerProps = {
  img: "/img/3.png",
  titles: {
    main: "",
    subtitle: "Festival Eco de la Tierra",
  },
  text: " lorem ipsum dolor sit amet, con sectetuer adipiscing elit, sed diam nonummy nibh euis mod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
  buttonText: "Inscríbete ahora",
  timer: {
    targetDate: "2025-09-23T18:59:59"
  },
  link : "/servicios/laboratorios-alimentacion-viva"
};

const missionCards = [
  {
    id: 1,
    title: '🌱 Rehabilitamos suelos, pero también vínculos.',
    description: 'Trabajamos regenerando la tierra y fortaleciendo la conexión entre las personas.',
    image: '/img/4.png',
  },
  {
    id: 2,
    title: '🔥 Encendemos fogones, pero también la memoria colectiva.',
    description: 'Creamos espacios de encuentro donde las historias, saberes y sentires se comparten.',
    image: '/img/5.png',
  },
  {
    id: 3,
    title: '🏡 Diseñamos espacios, pero sobre todo, formas nuevas de habitar.',
    description: 'Pensamos y construimos entornos sostenibles que nutren cuerpo, alma y comunidad.',
    image: '/img/7.png',
  },
  {
    id: 4,
    title: '🌾 Cultivamos alimentos, pero también autonomía.',
    description: 'Promovemos huertas comunitarias y saberes ancestrales para una vida autosuficiente.',
    image: '/img/personas_trabajando.jpg',
  },
  {
    id: 5,
    title: '🎶 Compartimos cantos, pero también memorias.',
    description: 'La música como medio para sanar, unir y reconectar con nuestras raíces.',
    image: '/img/brote_mano.jpg',
  },
  {
    id: 6,
    title: '🛠 Construimos herramientas, pero también caminos.',
    description: 'Creamos soluciones accesibles para que más personas puedan regenerar.',
    image: '/img/4.png',
  },
  {
    id: 7,
    title: '💧 Cuidamos el agua, pero también la vida.',
    description: 'La gestionamos con respeto y conciencia, como fuente de toda existencia.',
    image: '/img/3.png',
  }
];

const objectContentCard = {
    question: "¿Qué es Movimiento Naluum?",
    title: "Educación, conciencia y colaboración para transforma",
    text: "El Movimiento Naluum es una propuesta para generar una comunidad educativa consciente y profesional que inspire a más personas. Está inspirado en los sistemas vivos que se autorregulan y se sostienen gracias a la colaboración efectiva y amorosa. Se basa en crear un sistema vivo, sustentable en el tiempo",
    buttonPrimary: ["Conocer más sobre el movimiento", '/sobre_nosotros'],
    image: "/img/personas_trabajando.jpg"
}


const Home = () => {
  const { products, servicios, testimonios } = useContext(ContextJsonLoadContext);
  const { setMethodStatePayment } = useContext(MethodStatePaymentContext);

  const [servicioIdParam, setServicioIdParam, removeServicioIdParam] = useQueryParam('servicios');
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [triggerElement, setTriggerElement] = useState(null);

  useEffect(() => {
    if (servicioIdParam && servicios?.length > 0) {
      const item = servicios.find(s => s.id.toString() === servicioIdParam.toString());
      if (item) setIsModalOpen({ isOpen: true, item });
    }
  }, [servicioIdParam, servicios]);

  const handleOpenModal = useCallback((status, e, item) => {
    if (!item || !item.id) return;

    setTriggerElement(e.currentTarget);
    setIsModalOpen({ isOpen: status, item });
    setServicioIdParam(item.id);

  }, [setServicioIdParam, navigate]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTriggerElement(null);
    removeServicioIdParam();
  }, [removeServicioIdParam]);

  const handlePayment = useCallback((item, method) => {
    if (method && item) {
      setMethodStatePayment({ item, method });
    }
  }, [setMethodStatePayment]);

  const memoizedCards = useMemo(() => missionCards, []);

  const modalContent = useMemo(() => {
    if (!isModalOpen.isOpen || !isModalOpen.item) return null;
    return (
      <Modal
        isOpenModal={isModalOpen}
        onClose={handleCloseModal}
        triggerElement={triggerElement}
        showPointer={true}
      >
        <ModalCard course={isModalOpen.item}>
          <PaymentMethodSelector
            item={isModalOpen.item}
            onMethodSelect={(method) => handlePayment(isModalOpen.item, method)}
          />
        </ModalCard>
      </Modal>
    );
  }, [isModalOpen, handleCloseModal, triggerElement, handlePayment]);

  return (
    <main className='home__container' aria-label="Página principal">
      <SEOHelmet 
        title="Movimiento Naluum | Soluciones Regenerativas"
        description="Descubrí cómo el Movimiento Naluum impulsa soluciones regenerativas para transformar vidas, conectar comunidades y sanar la Tierra."
        keywords="regeneración, comunidad, agricultura regenerativa, soluciones sostenibles, plantines, tecnología social"
        author="Neyen Frandino"
        url="https://miempresa.com"
        image="https://miempresa.com/img/logo_naluum_og.jpg"
      />

      <Header>
        <div className='home__header-img-container'>
          <img src="/img/Fotodeinicio.jpg" alt="Fondo Naluum" className="home__header-img" />
        </div>
        <div className='home__header-container'>
          <div className='home__header-logo'>
            <div className='home__header-logo-img'>
              <img src="/img/logo_naluum_trasparente.svg" alt="Logo Movimiento Naluum" />
            </div>
            <div className='home__header-logo-text'>
              <h1>Movimiento Naluum</h1>
            </div>
          </div>
          <div className="home__content-titile">
            <div className='home__content-titile-text'>
              <h1>Diseñamos futuros regenerativos que florecen desde el corazón</h1>
            </div>
            <div className='home__content-titile-subtitle'>
              <h2>
               Un movimiento vivo que aprende, crea y conecta para transformar el mundo desde el diseño consciente hacia una vida sustentable y colaborativa
              </h2>
            </div>
            <div className='home__content-titile-buttons'>
              <Button text="Sobre el movimiento naluum" link="/sobre-nosotros" style="primary" />
            </div>


          </div>
        </div>
      </Header>

      <section className='home__content'>
        <LineLogoSeparacion />

        <div className='home__content--card-question'>
          <FadeInOnView {...fadeInProps}>
            <CardV2Img objectContentCard={objectContentCard} />
          </FadeInOnView>
        </div>

        <LineLogoSeparacion />

        <div className='home__content--mision__container'>
          <FadeInOnView {...fadeInProps}>
            <div className='home__content--mision'>
              <div className='content--mision--titiles'>
                <div className='mision--titile'>
                  <h1>! Lo que hacemos !</h1>
                </div>
                <div className='mision--subTitle'>
                  <h2>Acompañamos proyectos con impacto regenerativo</h2>
                </div>
                <div className='mision--parrafo'>
                  <p>
                    Apoyamos proyectos y personas mediante capacitaciones efectivas para impulsar iniciativas regenerativas, guiados por el compromiso de regenerar el planeta y alcanzar un equilibrio social, económico y ecológico, sustentado en valores como el respeto, la integridad, la diversidad, la colaboración, el compromiso y el amor
                  </p>
                </div>
              </div>
              <div className='content--mision--carousel-wrapper'>
                <MissionCarousel cards={memoizedCards} autoPlayInterval={5000} />
              </div>
            </div>
          </FadeInOnView>
        </div>

        <LineLogoSeparacion />

        <div className='home__content--servicios'>
          <FadeInOnView {...fadeInProps}>
            <div className='content--servicios__container'>
              <div className='content--servicios__text'>
                <h2>Juntos en el proceso de diseñar un mundo renovado</h2>
                <p>
                   Nuestro objetivo es crear una red de apoyo comunitaria global que impulse la colaboración y el aprendizaje compartido. A través de propuestas teórico-prácticas y procesos de diseño colaborativo, acompañamos a quienes buscan transformar su entorno y modo de vida de manera profunda y consciente.
                </p>
                <span>
                Dirigimos nuestras actividades a personas comprometidas con un cambio auténtico, con la esperanza de generar una transformación social y económica significativa en familias, proyectos y territorios, construyendo juntos un futuro más sostenible y equitativo.
                </span>
              </div>
              <div className='content--servicios__grid'>
                <div className="grid-wrapper">
                  <Grid items={servicios} gridType="services" slice={3} setIsOpen={handleOpenModal} variant="minimal" />
                </div>
                {modalContent}
              </div>
            </div>
            <CtaImgCuentaRgresiva {...timerProps} />

            <div className='home__content--servicios-buttons'>
              <Button text="Explora todos los servicios" link="/servicios" style="outline" />
            </div>
          </FadeInOnView>
        </div>

        <LineLogoSeparacion />

        <div className='home__content--impacto'>
          <FadeInOnView {...fadeInProps}>
            <CardDataImpacto />
          </FadeInOnView>
        </div>

        <LineLogoSeparacion />

        <div className='home__content--beforeAfter'>
          <FadeInOnView {...fadeInProps}>
            <BeforeAndAfter />
          </FadeInOnView>
        </div>

        <div className='home__content--testimonios'>
          <FadeInOnView {...fadeInProps}>
              <TestimonialCard typeTestimonial="testimonios_movimiento" />
          </FadeInOnView>
        </div>

        <LineLogoSeparacion />

        <div className='home__content--products'>
          <FadeInOnView {...fadeInProps}>
            <div className='home__content--products-title'>
              <h2>Productos</h2>
              <p>Conoce los productos que nos ayudan a cumplir con nuestras metas</p>

            </div>
            <Grid items={products} slice={5} setIsOpen={handleOpenModal} />
            {modalContent}
            <div className='home__content--products-button'>
              <Button text="Ver todos los productos" link="/productos" style="outline" />
            </div>
          </FadeInOnView>
        </div>

        <LineLogoSeparacion />

        <div className='home__content--bitacora'>
          <FadeInOnView {...fadeInProps}>
            <Bitacora />
          </FadeInOnView>
        </div>

        <LineLogoSeparacion />

        <div className='home__content--boletin' id='boletin'>
          <FadeInOnView {...fadeInProps}>
            <CtaHablemos showSocialMedia={false} />
          </FadeInOnView>
        </div>

        <LineLogoSeparacion />

        <div className='home__content--message_final'>
          <FadeInOnView {...fadeInProps}>
            <MessageFinal indexMessage={0} />
          </FadeInOnView>
        </div>

        <LineLogoSeparacion />
      </section>
    </main>
  );
};

export default Home;
