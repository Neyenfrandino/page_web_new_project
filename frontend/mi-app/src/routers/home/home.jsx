import PaymentForm from '../../componets/payment-form/payment-form';
import Header from '../../componets/header/header';
import './home.scss';

const Home = () => {
  return (
    <main className='home__container' aria-label="Página principal">
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
    </main>
  );
};

export default Home;
