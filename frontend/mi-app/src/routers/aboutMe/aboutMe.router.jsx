
import Header from '../../componets/header/header';
import './aboutMe.router.scss';

const AboutMe = () => {
    return (
        <div className='aboutMe__container'>
        
            <Header> 
                <div className='aboutMe__header-content'>
                    <h1>Simplify Your Focus</h1>
                    <p>Clarity emerges when complexity fades. Embrace the essence of your potential.</p> 
                </div>
            </Header>
        
            <section className='aboutMe__content'>
                <div className='aboutMe__section'>
                    <h2>Mindful Design</h2>
                    <p>Less clutter, more meaning. Every element serves a purpose.</p>
                </div>
                <div className='aboutMe__section'>
                    <h2>Intentional Growth</h2>
                    <p>Small steps, significant progress. Continuous improvement.</p>
                </div>
            </section>  
        </div>
    );
};

export default AboutMe;