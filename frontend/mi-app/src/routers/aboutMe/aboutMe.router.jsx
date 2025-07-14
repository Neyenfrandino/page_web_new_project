import Header from '../../componets/header/header';
import Button from '../../componets/button/button';
import FadeInOnView from '../../componets/fadeInOnView/fadeInOnView';
import SEOHelmet from '../../componets/SEOHelmet/SEOHelmet';
import CTAServicios from '../../componets/cta_servicios/cta_servicios';


import TimeLineHistory from '../../componets/history_about/time_line_history';
import './aboutMe.router.scss';

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const fadeInProps = {
  direction: "up",
  duration: prefersReducedMotion ? 0 : 800,
  delay: prefersReducedMotion ? 0 : 200,
  distance: prefersReducedMotion ? 0 : 30,
  easing: prefersReducedMotion ? 'linear' : "bounce",
  speed: prefersReducedMotion ? 'fast' : "slow"
};

const AboutMe = () => {
    return (
        <div className='aboutMe__container'>
            <SEOHelmet title="Sobre mí" description="Conoce más sobre mí y mi trayectoria." />
            <Header>
                <div className='aboutMe__header-img-container'>
                    <img src="/img/hero_sobreMi.jpg" alt="Fondo Naluum" className="aboutMe__header-img" />
                </div>
                
                <div className='aboutMe__header-content-container'>
                    <div className='aboutMe__header-content'>
                        <div className='aboutMe__header-content-title'>
                            <h1>El movimiento Naluum nace de una idea</h1>
                            <p>La idea de transformar el mundo en un futuro sostenible con soluciones innovadoras que regeneran nuestro planeta mientras impulsan la conciencia, la cooperación y la autonomía.</p>
                        </div>
                        
                        <div className='aboutMe__header-content-button'>
                            <a href="#">
                                <button className='button-CTA'>Los fundadores</button>
                            </a>
                        </div>
                    </div>
                </div>
            </Header>

            <div className='aboutMe__content'>
                <div className='aboutMe__content-history'>
                    <FadeInOnView {...fadeInProps}>
                        <TimeLineHistory />
                    </FadeInOnView>
                </div>

                <div className='aboutMe__cta--servicios'>
                    <CTAServicios />

                </div>
            </div>


        </div>
    );
};

export default AboutMe;