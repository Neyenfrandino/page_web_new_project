import SEOHelmet from '../../componets/SEOHelmet/SEOHelmet';
import PaymentForm from '../../componets/payment-form/payment-form';
import MercadoPagoCard from '../../componets/mercado_pago_card/mercado_pago_card';
import Header from '../../componets/header/header';
import './madre_selva.scss';

const product = {
  title: 'Plantines albahaca',
  quantity: 1,
  currency_id: 'ARS',
  unit_price: 100,
  image: 'img/3.png'
}

const MadreSelva = () => {
    return (
        <main className='home__container' aria-label="Página principal">
          <>
            <SEOHelmet 
              title='Home' 
              description='Simplify Your Focus' 
              keywords='tecnología, software, negocios, soluciones digitales, emprendimientos' 
              author='Neyen Frandino' 
              url='https://miempresa.com' 
              image='https://miempresa.com/default-image.jpg' 
            />
          </>
          
          <Header>
            <div className='home__header-content'>
              <h1>Simplify Your Focus</h1>
              <p>Clarity emerges when complexity fades. Embrace the essence of your potential.</p> 
            </div>
          </Header>
    
          <section className='home__content'>
            <article className='home__section'>
              <h2>Mindful Design</h2>
              <p>Less clutter, more meaning. Every element serves a purpose.</p>
            </article>
    
            <article className='home__section'>
              <h2>Intentional Growth</h2>
              <p>Small steps, significant progress. Continuous improvement.</p>
            </article>
          </section>
    
          {/* En caso de que quieras añadir el formulario de pago en el futuro */}
          {/* <PaymentForm /> */}
          <MercadoPagoCard product={product} />
        </main>
      );
};

export default MadreSelva;