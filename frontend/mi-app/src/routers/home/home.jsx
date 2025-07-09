import {
  useState,
  useRef,
  useCallback,
  useMemo,
  useContext,
  useEffect
} from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

import SEOHelmet from '../../componets/SEOHelmet/SEOHelmet';
import PaymentForm from '../../componets/payment-form/payment-form';
import MercadoPagoCard from '../../componets/mercado_pago_card/mercado_pago_card';
import Header from '../../componets/header/header';
import CardV2Img from '../../componets/card/cardV2_Img/cardV2_img';
import Button from '../../componets/button/button';
import FadeInOnView from '../../componets/fadeInOnView/fadeInOnView';
import MissionCarousel from '../../componets/carrusel_imagenes/carrusel_imagenes';
import Grid from '../../componets/grid/grid';
import CtaImgCuentaRgresiva from '../../componets/cta_img_cuenta_rgresiva/cta_img_cuenta_rgresiva';
import CardDataImpacto from '../../componets/card_data_impacto/card_data_impacto';
import LineLogoSeparacion from '../../componets/line_logo_separacion/line_logo_separacion';
import BeforeAndAfter from '../../componets/before_and_after/before_and_after';
import Testimonios from '../../componets/testimonios/testimonios';
import Modal from '../../componets/modal/modal';
import ModalCard from '../../componets/card/modal_card/modal_card';
import Bitacora from '../../componets/bitacora/bitacora';
import CtaBoletin from '../../componets/cta_boletin/cta_boletin';
import MessageFinal from '../../componets/message_final/message_final';
import PaymentMethodSelector from '../../componets/payment_method/payment_method_selector';

import { ContextJsonLoadContext } from '../../context/context_json_load/context_json_load';
import { MethodStatePaymentContext } from '../../context/method_state_payment/method_state_payment.context';
import { useQueryParam } from '../../hocks/useQueryParams';

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
    subtitle: "TALLER DE SIEMBRA DE ALBAHACA"
  },
  text: "Lorem ipsum dolor sit amet, con sectetuer adipiscing elit, sed diam nonummy nibh euis mod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
  buttonText: "Inscríbete ahora",
  timer: {
    targetDate: "2025-07-23T23:59:59"
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
              <h1>Hoy sembramos futuro con el Movimiento Naluum</h1>
            </div>
            <div className='home__content-titile-subtitle'>
              <h2>Soluciones regenerativas que transforman tu vida, te conectan con tu comunidad y sanan la Tierra.</h2>
            </div>
            <div className='home__content-titile-buttons'>
              <Button text="Sobre el movimiento naluum" link="/sobre-nosotros" style="primary" />
              <Button text="Explorar" link="/proyectos" style="outline" />
            </div>
          </div>
        </div>
      </Header>

      <section className='home__content'>
        <LineLogoSeparacion />

        <div className='home__content--card-question'>
          <FadeInOnView {...fadeInProps}>
            <CardV2Img />
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
                  <h2>Cultivar vínculos con la Tierra y entre nosotros</h2>
                </div>
                <div className='mision--parrafo'>
                  <p>
                    En Naluum, hacer es un acto sagrado. No se trata solo de construir o producir, sino de regenerar lo que fue dañado, de tejer relaciones vivas entre el ser humano y su entorno.
                  </p>
                  <span>Cada acción —por pequeña que parezca— es una semilla de transformación.</span>
                </div>
              </div>
              <div className='content--mision--carousel-wrapper'>
                <MissionCarousel cards={memoizedCards} autoPlay autoPlayInterval={5000} />
              </div>
            </div>
          </FadeInOnView>
        </div>

        <LineLogoSeparacion />

        <div className='home__content--servicios'>
          <FadeInOnView {...fadeInProps}>
            <div className='content--servicios__container'>
              <div className='content--servicios__text'>
                <h2>El hacer de Naluum es experiencia, vínculo y territorio.</h2>
                <p>
                  En Naluum, lo que hacemos no son simples servicios:
                  🌱 Son puertas abiertas hacia una forma distinta de vivir.
                  🔥 Cada propuesta nace del deseo de regenerar la Tierra, cultivar comunidad y activar el aprendizaje colectivo.
                </p>
                <span>
                  Nuestro hacer se manifiesta en encuentros, asesorías, espacios diseñados con propósito y celebraciones que nos recuerdan lo esencial.
                </span>
              </div>
              <div className='content--servicios__grid'>
                <Grid items={servicios} slice={3} setIsOpen={handleOpenModal} className="demo-button demo-button--success" />
                {modalContent}
              </div>
            </div>
            <CtaImgCuentaRgresiva {...timerProps} />
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
            <Testimonios testimonios={testimonios} />
          </FadeInOnView>
        </div>

        <LineLogoSeparacion />

        <div className='home__content--products'>
          <FadeInOnView {...fadeInProps}>
            <Grid items={products} slice={5} setIsOpen={handleOpenModal} />
            {modalContent}
            <div className='home__content--products-button'>
              <Button text="Ver todos los productos" link="/productos" style="primary" />
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

        <div className='home__content--boletin'>
          <FadeInOnView {...fadeInProps}>
            <CtaBoletin />
          </FadeInOnView>
        </div>

        <LineLogoSeparacion />

        <div className='home__content--message_final'>
          <FadeInOnView {...fadeInProps}>
            <MessageFinal />
          </FadeInOnView>
        </div>

        <LineLogoSeparacion />
      </section>
    </main>
  );
};

export default Home;
