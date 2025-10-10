import { useContext, useState, useMemo, useCallback, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryParam } from '../../../hooks/useQueryParams';
import { ContextJsonLoadContext } from '../../../context/context_json_load/context_json_load';
import { MethodStatePaymentContext } from '../../../context/method_state_payment/method_state_payment.context';


// ------------------------------
// 📂 SEO y Meta
// Importaciones de componentes relacionados con SEO y metadata
import SEOHelmet from '../../seo/SEOHelmet/SEOHelmet';


// ------------------------------
// 📂 Layout
// Componentes que forman la estructura y navegación principal (header, footer, nav, etc.)
import Header from '../../layout/header/header';
import CardV2Img from '../../layout/card/cardV2_Img/cardV2_img';
import ModalCard from '../../layout/card/modal_card/modal_card';


// ------------------------------
// 📂 Secciones
// Bloques grandes o secciones completas que conforman las páginas
import TimeLineHistory from '../../seccion/history_about/time_line_history';
import Grid from '../../seccion/grid/grid';
import CtaImgCuentaRgresiva from '../../seccion/cta_img_cuenta_rgresiva/cta_img_cuenta_rgresiva';
import CtaHablemos from '../../seccion/cta_hablemos/cta_hablemos';
import TestimonialCard from '../../seccion/testimonial_card/testimonial_card';
import Newsletter from '../../seccion/newsletter/newsletter';
import FAQ from '../../seccion/FAQ/FAQ';
import MessageFinal  from '../../seccion/message_final/message_final' 
import FadeInOnView from '../../seccion/fadeInOnView/fadeInOnView';


// ------------------------------
// 📂 UI / Componentes visuales pequeños y reutilizables
import Modal from '../../ui/modal/modal';
import Button from '../../ui/button/button';


// ------------------------------
// 📂 Integrations
// Servicios externos, pasarelas de pago, APIs de terceros
import PaymentMethodSelector from '../../integrations/payment_method/payment_method_selector';


// ------------------------------
// 📂 Maps
// Componentes relacionados con mapas y geolocalización

// ------------------------------
// 📂 Tracking
// Funciones y componentes para seguimiento de usuario y analytics

// ------------------------------
// 📂 Context
// Archivos relacionados con Context API para manejo global de estados

// ------------------------------
// 📂 Hooks
// Hooks personalizados para reutilización de lógica

// ------------------------------
// 📂 Services
// Funciones para llamadas a APIs y lógica de negocio

// ------------------------------
// 📂 Utils
// Funciones auxiliares y helpers

// ------------------------------
// 📂 Styles
// Estilos globales, variables SCSS y temas
import './global.scss';


const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const fadeInProps = {
  direction: "up",
  duration: prefersReducedMotion ? 0 : 800,
  delay: prefersReducedMotion ? 0 : 200,
  distance: prefersReducedMotion ? 0 : 30,
  easing: prefersReducedMotion ? 'linear' : "bounce",
  speed: prefersReducedMotion ? 'fast' : "slow"
};

const timerProps = {
  img: "/img/3.png",
  titles: {
    main: "",
    subtitle: "Festival Eco de la Tierra",
  },
  text: " lorem ipsum dolor sit amet, con sectetuer adipiscing elit, sed diam nonummy nibh euis mod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
  buttonText: "Inscríbete ahora",
  timer: {
    targetDate: "2025-09-23T18:59:59"
  },
  link : "/servicios/laboratorios-alimentacion-viva"
};

// const objectContentCard = {
//     question: "¿Qué es Madre Selva?",
//     title: "Centro de investigación y aprendizaje",
//     text: "Acá encuentras 22 hectareas de preservación, cultivo y interación saludable entre humanos y naturaleza.",
//     // text: "Madre Selva es un espacio dedicado a la investigación, experimentación y aprendizaje de los procesos naturales, aplicados a sistemas que buscan imitar la inteligencia de la naturaleza. Es un laboratorio vivo donde la ciencia, la observación y la práctica se unen para crear soluciones inspiradas en los ecosistemas, fomentando la regeneración, la sostenibilidad y el conocimiento compartido.",
//     buttonPrimary: ["Explorar el universo de global", "/global"],
//     image: "/img/message_final.jpg",
// };

const titles = {
  titulo: " Consultoría Regenerativa Internacional",
  subTitle: "GLOBAL",
  description: "No somos una empresa. Somos un tejido vivo de personas comprometidas con la regeneración de la vida. Nacidos desde la experiencia del Movimiento Na Lu'um y nutrida por décadas de trabajo en territorios diversos, co-creamos realidades donde la vida puede florecer. Global existe como puente entre mundos: entre la sabiduría ancestral y la innovación contemporánea, entre la urgencia del hacer y la paciencia del proceso, entre el sueño individual y la transformación colectiva. No vendemos esperanza, la cultivamos. No prometemos cambios, los acompañamos. No hablamos de sustentabilidad, vivimos la regeneración."
};

const globalCard = {
  titulo: "EL MOMENTO ES AHORA",
  subtitulo: "Vivimos tiempos de colapso y tiempos de renacimiento",
  descripcion: "Las viejas estructuras se desmoronan mientras las nuevas apenas comienzan a germinar. En este umbral, Global existe como puente entre mundos. Somos traductores entre la sabiduría ancestral y la innovación contemporánea. Entre la urgencia del hacer y la paciencia del proceso. Entre el sueño individual y la transformación colectiva. No vendemos esperanza. La cultivamos. No prometemos cambios. Los acompañamos. No hablamos de sustentabilidad. Vivimos la regeneración."
};

const Global = () => {
    const { servicios, FAQ: faqData, products } = useContext(ContextJsonLoadContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [triggerElement, setTriggerElement] = useState(null);
    const [isLoadPeges, setIsLoadPeges] = useState(false);
    const [servicioIdParam, setServicioIdParam, removeServicioIdParam] = useQueryParam('servicios');
    const { setMethodStatePayment } = useContext(MethodStatePaymentContext);
    
    // 🎯 Estados para la animación del header
    const [headerAnimationState, setHeaderAnimationState] = useState('initial'); // initial, peek, hidden, hover-ready
    const [isHovered, setIsHovered] = useState(false);
    
    const navigate = useNavigate();

    // 🎯 useEffect para la secuencia de animación inicial del header
    useEffect(() => {
        if (prefersReducedMotion) {
            // Si el usuario prefiere movimiento reducido, ir directo a hover-ready
            setHeaderAnimationState('hover-ready');
            return;
        }

        const timer1 = setTimeout(() => {
            setHeaderAnimationState('peek');
        }, 2500); // Después de 2.5s muestra el peek

        const timer2 = setTimeout(() => {
            setHeaderAnimationState('hidden');
        }, 4500); // Después de 4.5s oculta el peek

        const timer3 = setTimeout(() => {
            setHeaderAnimationState('hover-ready');
        }, 5500); // Después de 5.5s habilita solo hover

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    useEffect(() => {
    if (servicioIdParam && servicios?.length > 0) {
        const item = servicios.find(s => s.id.toString() === servicioIdParam.toString());
        if (item) setIsModalOpen({ isOpen: true, item });
    }
    }, [servicioIdParam, servicios]);

    if (!servicios || !products) return null;

    const handleOpenModal = useCallback((status, e, item) => {
        if (!item || !item.id) return;

        setTriggerElement(e.currentTarget);
        setIsModalOpen({ isOpen: status, item });
        setServicioIdParam(item.id);

    }, [setServicioIdParam, navigate]);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setTriggerElement(null);
        removeServicioIdParam();
    }, [removeServicioIdParam]);

    const handlePayment = useCallback((item, method) => {
        if (method && item) {
        setMethodStatePayment({ item, method });
        }
    }, [setMethodStatePayment]);

     const modalContent = useMemo(() => {
        if (!isModalOpen.isOpen || !isModalOpen.item) return null;
        return (
        <Modal
            isOpenModal={isModalOpen}
            onClose={handleCloseModal}
            triggerElement={triggerElement}
            showPointer={true}
        >
            <ModalCard course={isModalOpen.item}>
            <PaymentMethodSelector
                item={isModalOpen.item}
                onMethodSelect={(method) => handlePayment(isModalOpen.item, method)}
            />
            </ModalCard>
        </Modal>
        );
    }, [isModalOpen, handleCloseModal, triggerElement, handlePayment]);

    // 🎯 Función para manejar el teclado (accesibilidad)
    const handleKeyPress = (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && headerAnimationState === 'hover-ready') {
            setIsHovered(!isHovered);
        }
    };

    // 🎯 Funciones para obtener las clases y estilos dinámicos
    const getContentClasses = () => {
        let baseClass = 'global__header__content';
        
        if (headerAnimationState === 'hover-ready' && isHovered) {
            baseClass += ' hovered';
        }
        
        return baseClass;
    };

    const getLogoStyles = () => {
        const baseStyles = {
            transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform, opacity, filter'
        };

        switch (headerAnimationState) {
            case 'initial':
                return {
                    ...baseStyles,
                    opacity: 1,
                    transform: 'translate(-50%, -50%)',
                    filter: 'none',
                    pointerEvents: 'auto'
                };
            
            case 'peek':
                return {
                    ...baseStyles,
                    opacity: 0,
                    transform: 'translate(-50%, -50%) translateY(-20px) scale(0.98)',
                    filter: 'blur(2px)',
                    pointerEvents: 'none'
                };
            
            case 'hidden':
            case 'hover-ready':
                return {
                    ...baseStyles,
                    opacity: headerAnimationState === 'hover-ready' && isHovered ? 0 : 1,
                    transform: headerAnimationState === 'hover-ready' && isHovered 
                        ? 'translate(-50%, -50%) translateY(-30px) scale(0.95)' 
                        : 'translate(-50%, -50%)',
                    filter: headerAnimationState === 'hover-ready' && isHovered ? 'blur(3px)' : 'none',
                    pointerEvents: headerAnimationState === 'hover-ready' && isHovered ? 'none' : 'auto'
                };
            
            default:
                return baseStyles;
        }
    };

    const getTitlesStyles = () => {
        const baseStyles = {
            transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform, opacity'
        };

        switch (headerAnimationState) {
            case 'initial':
                return {
                    ...baseStyles,
                    opacity: 0,
                    transform: 'translate(-50%, -50%) translateY(40px)',
                    pointerEvents: 'none'
                };
            
            case 'peek':
                return {
                    ...baseStyles,
                    opacity: 0.9,
                    transform: 'translate(-50%, -50%) translateY(0)',
                    pointerEvents: 'auto'
                };
            
            case 'hidden':
                return {
                    ...baseStyles,
                    opacity: 0,
                    transform: 'translate(-50%, -50%) translateY(40px)',
                    pointerEvents: 'none'
                };
            
            case 'hover-ready':
                return {
                    ...baseStyles,
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered 
                        ? 'translate(-50%, -50%) translateY(0)' 
                        : 'translate(-50%, -50%) translateY(40px)',
                    pointerEvents: isHovered ? 'auto' : 'none'
                };
            
            default:
                return baseStyles;
        }
    };

    const getChildStyles = (delay = 0) => {
        const baseStyles = {
            transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`
        };

        switch (headerAnimationState) {
            case 'initial':
                return {
                    ...baseStyles,
                    opacity: 0,
                    transform: 'translateY(0px) scale(0.98)'
                };
            
            case 'peek':
                return {
                    ...baseStyles,
                    opacity: 1,
                    transform: 'translateY(0) scale(1)'
                };
            
            case 'hidden':
                return {
                    ...baseStyles,
                    opacity: 0,
                    transform: 'translateY(20px) scale(0.98)'
                };
            
            case 'hover-ready':
                return {
                    ...baseStyles,
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered 
                        ? 'translateY(0) scale(1)' 
                        : 'translateY(30px) scale(0.98)'
                };
            
            default:
                return baseStyles;
        }
    };

    // Filtrar servicios de global
    const servicesMadreSelva = useMemo(() => {
        return servicios.filter(
            (item) => item.type === 'service' && item.project?.toLowerCase().trim() === 'madre selva'
        );
        
    }, [servicios]);

    useEffect(() => {
        if (isLoadPeges) return;
        const timer = setTimeout(() => {
            setIsLoadPeges(true);
        }, 1000); // Espera 1 segundo antes de cargar las páginas
        
        return () => clearTimeout(timer);
        
    }, []);

   
    return (
        <div className='global__container'>
            <SEOHelmet 
                title='global' 
                description='Simplify Your Focus' 
                keywords='tecnología, software, negocios, soluciones digitales, emprendimientos' 
                author='Neyen Frandino' 
                url='https://miempresa.com' 
                image='https://miempresa.com/default-image.jpg' 
            />
            <div className='global__header' id="inicio">
                <Header className="global__header">
                
                    <div 
                        className={getContentClasses()}
                        onMouseEnter={() => headerAnimationState === 'hover-ready' && setIsHovered(true)}
                        onMouseLeave={() => headerAnimationState === 'hover-ready' && setIsHovered(false)}
                        onKeyDown={handleKeyPress}
                        tabIndex="0"
                        role="banner"
                        aria-label="Global header con contenido interactivo"
                    >
                        <div 
                            className="global__header__content__logo"
                            style={getLogoStyles()}
                        >
                            {/* Opción 1: Con imagen del logo */}
                            <img 
                                src="/img/fondo_transparente_global.svg" 
                                alt="Logo Global"
                                style={{
                                    animationPlayState: (headerAnimationState === 'hover-ready' && isHovered) ? 'paused' : 'running'
                                }}
                            />
                            
                            {/* Opción 2: Logo placeholder mientras no tengas la imagen */}
                            {/* <div className="logo-placeholder">
                                <span>GLOBAL</span>
                            </div> */}
                        </div>
                        
                        <div 
                            className="global__header__content__titles"
                            style={getTitlesStyles()}
                        >
                            <h1 style={getChildStyles(0.15)}>
                                CONSULTORÍA REGENERATIVA INTERNACIONAL
                            </h1>
                            <p className="subtitle" style={getChildStyles(0.3)}>
                                Red viva de transformación ecosocial
                            </p>
                            <p style={getChildStyles(0.45)}>
                                No somos una empresa. Somos un <span className="highlight">tejido vivo</span> de personas 
                                comprometidas con la regeneración de la vida. Nacidos desde la experiencia del {' '}
                                <span className="highlight">Movimiento Na Lu'um</span> y nutrida por décadas de trabajo 
                                en territorios diversos, co-creamos realidades donde la vida puede florecer.
                            </p>
                        </div>
                    </div>
                </Header>
            </div>

            <div className='global__content'>

                <div className='global__content--question' id='sobre-mi'>
                    <FadeInOnView {...fadeInProps}>
                        <div className='global__content--question__card'>
                            <div className='global__content--question__card__img'>
                                <img src="/img/elequipo.jpg" alt="Global" />
                            </div>
                            
                            <div className='global__content--question__card__text'>
                                <h2>{globalCard.titulo}</h2>
                                <p>{globalCard.subtitulo}</p>
                                <p>{globalCard.descripcion}</p>
                            </div>
                        </div>
                    </FadeInOnView>
                </div>

                <div className='global__content--history'>
                    <FadeInOnView {...fadeInProps}>
                        <TimeLineHistory index={3} theme={'global'} titles={titles} showHeroBg={true} heroBgImage={'/img/fondo_transparente_global.svg'} />
                    </FadeInOnView>
                </div>


                <div className='global__grid' id='servicios'>
                    <FadeInOnView {...fadeInProps}>
                        <div className='global__services-titile'>
                            <h2>Servicios Y Productos</h2>
                            <p>Conoce los servicios y productos que nos ayudan a cumplir con nuestras metas</p>
                        </div>
                        
                        <div className='global__services'>
                            <Grid items={servicesMadreSelva} gridType="services" slice={3} setIsOpen={handleOpenModal} variant="minimal" />
                            {modalContent}

                            <div className='global__button'>
                                <Button text={"Ver todos los servicios"} link="/servicios" style="secondary" />
                            </div>
                        </div>

                        <div className='global__products'>
                            <Grid items={products} gridType="products" slice={3} setIsOpen={handleOpenModal} />
                            {modalContent}

                            <div className='global__button'>
                                <Button text={"Ver todos los productos"} link="/productos" style="secondary" />
                            </div>
                        </div>
                    </FadeInOnView>
                </div>

                <div className='global__content--CTA'>
                    <FadeInOnView {...fadeInProps}>
                        <CtaImgCuentaRgresiva {...timerProps} />
                    </FadeInOnView>
                </div>

  
                <div className='global__content--testimonial'>
                    <FadeInOnView {...fadeInProps}>
                        <TestimonialCard typeTestimonial='servicios_madreSelva'/>
                    </FadeInOnView>
                </div>

                <div className='global__content--contact' id='contacto'>
                    <FadeInOnView {...fadeInProps}>
                        <CtaHablemos showSocialMedia={true} />
                    </FadeInOnView>
                </div>

                <div className='global__content--menssage_final' id='menssage_final'>   
                    <FadeInOnView {...fadeInProps}>
                        <MessageFinal indexMessage={0} />
                    </FadeInOnView>
                </div>


                <div className='global__content--newsletter' id='newsletter'>
                    <Newsletter />
                </div>

                <div className='global__content--FAQ' id='FAQ'>
                    <FadeInOnView {...fadeInProps}>
                        <FAQ faqs={faqData} defaultCategory="servicios" />
                    </FadeInOnView>
                </div>
            </div>
        </div>
    );
};

export default Global;