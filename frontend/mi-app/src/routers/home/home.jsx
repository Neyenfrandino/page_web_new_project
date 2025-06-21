import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../componets/SEOHelmet/SEOHelmet';
import PaymentForm from '../../componets/payment-form/payment-form';
import MercadoPagoCard from '../../componets/mercado_pago_card/mercado_pago_card';
import Header from '../../componets/header/header';
import CardV2Img from '../../componets/card/cardV2_Img/cardV2_img';
import Button from '../../componets/button/button';
import Cta from '../../componets/cta/cta';
import FadeInOnView from '../../componets/fadeInOnView/fadeInOnView';
import MissionCarousel from '../../componets/carrusel_imagenes/carrusel_imagenes';
import Grid from '../../componets/grid/grid';
import CtaImgCuentaRgresiva from '../../componets/cta_img_cuenta_rgresiva/cta_img_cuenta_rgresiva';

import Modal from '../../componets/modal/modal';
import ModalCard from '../../componets/card/modal_card/modal_card';
import './home.scss';

const product = {
  title: 'Plantines albahaca',
  quantity: 1,
  currency_id: 'ARS',
  unit_price: 100,
  image: 'img/3.png'
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

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    item: null,
  });

  const [triggerElement, setTriggerElement] = useState(null);

  const handleOpenModal = (status, e, item) => {
    console.log(item)
    setTriggerElement(e.currentTarget);
    setIsModalOpen({ isOpen: status, item });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTriggerElement(null);
  };


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
          <img src="/img/brote_mano.jpg" alt="Fondo Naluum" className="home__header-img" />
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
              <Button text="Explorá lo que hacemos" link="/sobre_nosotros" style="primary" />
              <Button text="Sumate al Movimiento" link="/login" style="outline" />
            </div>
          </div>
        </div>
      </Header>

      <section className='home__content'>
        <div className='home__content--card-question'>
          <FadeInOnView 
            direction="up" 
            duration={800} 
            delay={200}
            distance={30}
            easing="bounce"
            speed="slow"
          >
            <CardV2Img />
          </FadeInOnView>
        </div>
        
      <div className='home__content--mision__container'>
        <FadeInOnView 
          direction="up" 
          duration={800} 
          delay={200}
          distance={30}
          easing="bounce"
          speed="slow"
        >
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
                  En Naluum, hacer es un acto sagrado.
                  No se trata solo de construir o producir, sino de regenerar lo que fue dañado, de tejer relaciones vivas entre el ser humano y su entorno.
                </p>
                <span>Cada acción —por pequeña que parezca— es una semilla de transformación.</span>
              </div>
            </div>

            <div className='content--mision--carousel-wrapper'>

              <MissionCarousel cards={missionCards} autoPlay={true} autoPlayInterval={5000} />
            </div>
          </div>
        
        </FadeInOnView>
      </div>


        <div className='home__content--servicios'>
          <FadeInOnView 
            direction="up" 
            duration={800} 
            delay={200}
            distance={30}
            easing="bounce"
            speed="slow"
          >
            <div className='content--servicios__container'>

              <div className='content--servicios__text'>
                <h2>
                  El hacer de Naluum es experiencia, vínculo y territorio.
                </h2>

                <p>
                  En Naluum, lo que hacemos no son simples servicios:
                  🌱 Son puertas abiertas hacia una forma distinta de vivir.
                  🔥 Cada propuesta nace del deseo de regenerar la Tierra, cultivar comunidad y activar el aprendizaje colectivo.
                </p>

                <span>
                  Nuestro hacer se manifiesta en encuentros, asesorías, espacios diseñados con propósito y celebraciones que nos recuerdan lo esencial.
                  Te invitamos a recorrer estos caminos que ya están germinando por toda la región:
                </span>
              </div>

              <div className='content--servicios__grid'>
                  <Grid slice={3} setIsOpen={handleOpenModal} className="demo-button demo-button--success"></Grid> 

                  {isModalOpen.isOpen && isModalOpen.item && (
                    <Modal
                      isOpenModal={isModalOpen}
                      onClose={handleCloseModal}
                      triggerElement={triggerElement}
                      showPointer={true}
                    >
                      <ModalCard/>
                    </Modal>
                  )}
              </div>
            </div>

            <CtaImgCuentaRgresiva 
              img="/img/brote_mano.jpg"
              titles={{
                  main: "",
                  subtitle: "TALLER DE SIEMBRA DE CACAO"
              }}
              text="Lorem ipsum dolor sit amet, con sectetuer adipiscing elit, sed diam nonummy nibh euis mod tincidunt ut laoreet dolore magna aliquam erat volutpat."
              buttonText="Inscríbete ahora"
              timer={{
                  "targetDate": "2025-06-23T23:59:59"

              }}
          />
          </FadeInOnView>
        </div>
      </section>
    </main>
  );
};

export default Home;
