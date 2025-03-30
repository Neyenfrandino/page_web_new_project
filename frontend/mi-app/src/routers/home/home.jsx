import PaymentForm from '../../componets/payment-form/payment-form';
import './home.scss';

const Home = () => {
  return (
    <div className='home__container'>
      <div className='home__container-content'>
        <header className="home__header">
          <div className='home__header-img'>
            <div className='home__header-content'>
              <h1>Simplify Your Focus</h1>
              <p>Clarity emerges when complexity fades. Embrace the essence of your potential.</p>
            </div>
          </div>
        </header>

        <section className='home__content'>
          <div className='home__section'>
            <h2>Mindful Design</h2>
            <p>Less clutter, more meaning. Every element serves a purpose.</p>
          </div>
          <div className='home__section'>
            <h2>Intentional Growth</h2>
            <p>Small steps, significant progress. Continuous improvement.</p>
          </div>
        </section>
        <PaymentForm />
      </div>
    </div>
  );
};

export default Home;