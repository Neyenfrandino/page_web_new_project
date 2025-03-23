
import MercadoPagoCard from '../../componets/mercado_pago_card/mercado_pago_card';
import './home.scss';

const producto = {
  name: 'Product 1',
  price: 10,
  image: 'img/3.png',
};

const Home = ({ LogoComponent, isScroll }) => {
  
  return (
    <div className='home__container'>
      <div className='home__container-content'>
        <header className="home__header">
          <div className='home__header-img'>
            <div className='home__header-content'>
              <h1>Develop Your Mind</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget ultricies ultrices, nunc nisi aliquet nisi, eu tincidunt nisl nisl eu nisl. Nullam euismod, nisl eget ultricies ultrices, nunc nisi aliquet nisi, eu tincidunt nisl nisl eu nisl.</p>
            </div>
            
            <div className={`home__header-logo ${isScroll <= 80 ? 'logo_visable--home' : 'hidden--home'}`}>
              {LogoComponent && (
                <LogoComponent logo_img={'img/3.svg'} className={'nav__logo'} />
              )}
            </div>
          </div>
        </header>
        
        <section className='home__content'>
          <div className='home__section'> 
            <h2>Section Title</h2>
            <p>Your content here</p>
          </div>
          <div className='home__section'>
            <h2>Section Title</h2>
            <p>Your content here</p>
          </div>
          <div className='home__section'>
            <h2>Section Title</h2>
            <p>Your content here</p>
          </div>
          <div className='home__section'>
            <h2>Section Title</h2>
            <p>Your content here</p>
          </div>

          {/* Boton de pago con MercadoPago */}
        </section>

        <MercadoPagoCard product={producto}  />
      </div>
    </div>
  );
};

export default Home;