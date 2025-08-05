import SEOHelmet from '../../componets/SEOHelmet/SEOHelmet';
import Header from '../header/header';
import CardV2Img from '../../componets/card/cardV2_Img/cardV2_img';
import TimeLineHistory from '../../componets/history_about/time_line_history';   
import FadeInOnView from '../../componets/fadeInOnView/fadeInOnView';
import './naluum.scss';


const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const fadeInProps = {
  direction: "up",
  duration: prefersReducedMotion ? 0 : 800,
  delay: prefersReducedMotion ? 0 : 200,
  distance: prefersReducedMotion ? 0 : 30,
  easing: prefersReducedMotion ? 'linear' : "bounce",
  speed: prefersReducedMotion ? 'fast' : "slow"
};

const objectContentCard = {
  question: "¿Qué es Naluum?",
  title: "El corazón pedagógico del Movimiento Naluum",
  text: "Naluum es el núcleo educativo del Movimiento Naluum, encargado de llevar formación, acompañamiento y eventos pedagógicos a todo el mundo. Es el puente entre el conocimiento consciente y las personas, ofreciendo cursos, experiencias formativas y apoyo a proyectos que buscan transformar su realidad desde la colaboración, la regeneración y el aprendizaje continuo.",
  buttonPrimary: ["Explorar el universo pedagógico de Naluum", "/naluum"],
  image: "/img/naluum_crad_question.JPG"
};

const Naluum = () => {
    return (
        <div className='naluum__container'>
            <SEOHelmet 
                title='Naluum' 
                description='Simplify Your Focus' 
                keywords='tecnología, software, negocios, soluciones digitales, emprendimientos' 
                author='Neyen Frandino' 
                url='https://miempresa.com' 
                image='https://miempresa.com/default-image.jpg' 
            />
            <div className='naluum__header' id="inicio">
                <Header>
                    <div className='naluum__header__content'>
                        <div className='naluum__header__content__logo'>
                            <img src="/img/logo_naluum_trasparente.svg" alt="Logo Naluum" />
                        </div>
                    </div>
                </Header>
            </div>

            <div className='naluum__content'>
                <div className='naluum__content--question'>
                    <FadeInOnView {...fadeInProps}>
                        <CardV2Img objectContentCard={objectContentCard} />
                    </FadeInOnView>
                </div>

                <div>
                    <FadeInOnView {...fadeInProps}>
                        <TimeLineHistory index={1} />
                    </FadeInOnView>
                </div>
            </div>

        </div>
    );
};

export default Naluum;