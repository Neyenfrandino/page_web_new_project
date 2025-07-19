import Header from '../../componets/header/header';
import Button from '../../componets/button/button';
import FadeInOnView from '../../componets/fadeInOnView/fadeInOnView';
import SEOHelmet from '../../componets/SEOHelmet/SEOHelmet';
import CTAServicios from '../../componets/cta_servicios/cta_servicios';
import Founders from '../../componets/founders/founders';
import Valores from '../../componets/valores/valores';
import CtaLogrosReconocimientos from '../../componets/cta_logros_reconocimientos/cta_logros_reconocimientos';

import TimeLineHistory from '../../componets/history_about/time_line_history';

import useOnScreen from '../../hocks/useOnScreen'; // ajustá la ruta si es necesario

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
    const [logrosRef, logrosVisible] = useOnScreen({
  rootMargin: '0px 0px -100px 0px', // ajustá según cuándo querés que aparezca
  threshold: 0.3, // 30% visible
});

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
                            <a href="#founders" className='button-CTA'>
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
                    <FadeInOnView {...fadeInProps}>
                        <CTAServicios />
                    </FadeInOnView>
                </div>

                <div className='aboutMe__founders' id='founders'>
                    <FadeInOnView {...fadeInProps}>
                        <Founders />
                    </FadeInOnView>
                </div>

                <div className='aboutMe__valores'>
                    <FadeInOnView {...fadeInProps}>
                        <Valores />
                    </FadeInOnView>
                </div>

                <div className='aboutMe__cta--logros' ref={logrosRef}>
                {logrosVisible && (
                    <FadeInOnView {...fadeInProps}>
                    <CtaLogrosReconocimientos />
                    </FadeInOnView>
                )}
                </div>

            </div>
        </div>
    );
};

export default AboutMe;