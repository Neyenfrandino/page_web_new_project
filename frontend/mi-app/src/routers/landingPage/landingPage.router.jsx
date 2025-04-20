
import Header from '../../componets/header/header';
import './landingPage.router.scss';

const LandingPage = () => {
    return (
        <div className='landingPage__container'>
        
            <Header> 
                <div className='landingPage__header-content'>
                    <h1>Simplify Your Focus</h1>
                    <p>Clarity emerges when complexity fades. Embrace the essence of your potential.</p> 
                </div>
            </Header>
        

            <section className='landingPage__content'>
                <div className='landingPage__section'>
                    <h2>Mindful Design</h2>
                    <p>Less clutter, more meaning. Every element serves a purpose.</p>
                </div>
                <div className='landingPage__section'>
                    <h2>Intentional Growth</h2>
                    <p>Small steps, significant progress. Continuous improvement.</p>
                </div>
            </section>  


        </div>
    );
};

export default LandingPage;