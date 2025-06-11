import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../componets/SEOHelmet/SEOHelmet';
import PaymentForm from '../../componets/payment-form/payment-form';
import MercadoPagoCard from '../../componets/mercado_pago_card/mercado_pago_card';
import Header from '../../componets/header/header';
import CardV2Img from '../../componets/card/cardV2_Img/cardV2_img';
import Cta from '../../componets/cta/cta';
import './home.scss';

const product = {
  title: 'Plantines albahaca',
  quantity: 1,
  currency_id: 'ARS',
  unit_price: 100,
  image: 'img/3.png'
};

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const openModal = () => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    setTimeout(() => {
      setIsOpen(true);
    }, 300); // Espera al scroll antes de abrir el modal
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
          <img src="/img/3.png" alt="Fondo Naluum" className="home__header-img" />
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
              <Link className='home__content-titile-buttons-link' to='/explorar'>
                Explorá lo que hacemos
              </Link>

              <Link className='home__content-titile-buttons-link' to='/contacto'>
                Sumate al Movimiento
              </Link>
            </div>
          </div>
        </div>
      </Header>

      <section className='home__content'>
        <div className='home__content-filosofia'>
          {/* <CardV2Img /> */}
        </div>
        


      </section>
      {/* <PaymentForm /> */}
      {/* <MercadoPagoCard product={product} /> */}
      
    </main>
  );
};

export default Home;
