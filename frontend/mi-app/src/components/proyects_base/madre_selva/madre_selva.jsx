import { useContext, useState, useMemo, useCallback, useEffect } from 'react';
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
import MissionCarousel from '../../seccion/carrusel_imagenes/carrusel_imagenes';

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
import './madre_selva.scss';


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

const objectContentCard = {
    question: "¿Qué es Madre Selva?",
    title: "Centro de investigación en agricultura sintrópica y diseño regenerativo.",
    text: "22 hectareas de preservación, cultivo e interación saludable entre humanos y naturaleza.",
    buttonPrimary: ["Explorar el universo de Madre Selva", "/madreSelva"],
    image: "/img/message_final.jpg",
};

const titles = {
    titulo: "Filosofía / Propósito ",
    subTitle: "Madre Selva",
    description: "Nos inspira una filosofía arraigada en la conexión profunda con la naturaleza y el compromiso inquebrantable con la sostenibilidad. Nuestra misión va más allá de ser un espacio; es un llamado a la acción para mejorar la salud tanto de las personas como de la tierra que habitamos.",
}

const missionCards = [
 {
   id: 1,
   title: '🌱 Regeneramos la tierra, pero también el espíritu.',
   description: 'En Madre Selva trabajamos con agricultura sintrópica para sanar los suelos mientras reconectamos con nuestra esencia natural.',
   image: '/img/4.png',
 },
 {
   id: 2,
   title: '🌿 Investigamos la naturaleza, pero también nos dejamos enseñar por ella.',
   description: 'Como centro de investigación en diseño regenerativo, aprendemos de los patrones naturales para crear soluciones sostenibles.',
   image: '/img/5.png',
 },
 {
   id: 3,
   title: '🏡 Construimos con materiales naturales, pero edificamos comunidad.',
   description: 'Cada estructura en Madre Selva es un testimonio de nuestro compromiso con prácticas eco-amigables y vida armoniosa.',
   image: '/img/7.png',
 },
 {
   id: 4,
   title: '💧 Escuchamos el susurro del arroyo, pero también el llamado de la tierra.',
   description: 'En nuestros bosques vírgenes, cada visitante encuentra un espacio para reconectar con el ecosistema que nos sostiene.',
   image: '/img/personas_trabajando.jpg',
 },
 {
   id: 5,
   title: '🌾 Practicamos agricultura sintrópica, pero cultivamos esperanza.',
   description: 'Nuestros métodos regenerativos no solo producen alimentos, sino que restauran el equilibrio entre humanidad y naturaleza.',
   image: '/img/brote_mano.jpg',
 },
 {
   id: 6,
   title: '🔬 Somos un centro de investigación, pero también un santuario de sabiduría.',
   description: 'En Madre Selva, la ciencia y la filosofía ancestral se entrelazan para crear un futuro más sostenible.',
   image: '/img/4.png',
 },
 {
   id: 7,
   title: '🌟 Ofrecemos una experiencia, pero inspiramos una transformación.',
   description: 'Cada paso en Madre Selva es un eco de nuestro compromiso con la regeneración de la salud de las personas y la tierra.',
   image: '/img/3.png',
 }
];

const MadreSelva = () => {
    const { servicios, FAQ: faqData, products } = useContext(ContextJsonLoadContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [triggerElement, setTriggerElement] = useState(null);
    const [servicioIdParam, setServicioIdParam, removeServicioIdParam] = useQueryParam('servicios');
    const { setMethodStatePayment } = useContext(MethodStatePaymentContext);
    
    const navigate = useNavigate();

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



    // Filtrar servicios de madreSelva
    const servicesMadreSelva = useMemo(() => {
        return servicios.filter(
            (item) => item.type === 'service' && item.project?.toLowerCase().trim() === 'madre selva'
        );
        
    }, [servicios]);

     const memoizedCards = useMemo(() => missionCards, []);
   


    return (
        <div className='madreSelva__container'>
            <SEOHelmet 
                title='Madre Selva' 
                description='Simplify Your Focus' 
                keywords='tecnología, software, negocios, soluciones digitales, emprendimientos' 
                author='Neyen Frandino' 
                url='https://miempresa.com' 
                image='https://miempresa.com/default-image.jpg' 
            />
            <div className='madreSelva__header' id="inicio">
                <Header>
                    <div className='madreSelva__header__content'>
                        <div className='madreSelva__header__content__logo'>
                            <img src="/img/madre_selva_logo_asd.svg" alt="Logo madreSelva" />
                        </div>

                        <div className='madreSelva__header__content__title'>
                            <p>Bienvenidos al Eco-Centro Madre Selva, un santuario de regeneración en el corazón de la naturaleza. En nuestro compromiso con la salud de las personas y la tierra.</p>
                        </div>
                    </div>
                </Header>
            </div>

            <div className='madreSelva__content'>

                <div className='madreSelva__content--question' id='sobre-mi'>
                    <FadeInOnView {...fadeInProps}>
                        <CardV2Img objectContentCard={objectContentCard} buttonTrue={false} />
                    </FadeInOnView>
                </div>

                <div className='madreSelva__content--history'>
                    <FadeInOnView {...fadeInProps}>
                        <TimeLineHistory index={2} titles={titles} showHeroBg={false} heroBgImage={null} />
                    </FadeInOnView>
                </div>


                <div className='madreSelva__grid' id='servicios'>
                    <FadeInOnView {...fadeInProps}>
                        <div className='madreSelva__services-titile'>
                            <h2 className='title'>Servicios y productos</h2>
                            <p className='subtitle'>Destacamos no solo por nuestras construcciones realizadas con materiales naturales, sino por la pasión que impulsa cada rincón de nuestro centro. Aquí, las prácticas eco-amigables son la base de nuestro diario vivir, guiándonos hacia un equilibrio armonioso con el entorno.</p>
                        </div>
                        
                        <div className='madreSelva__services'>
                            <Grid items={servicesMadreSelva} gridType="services" slice={3} setIsOpen={handleOpenModal} variant="minimal" />
                            {modalContent}

                            <div className='madreSelva__button'>
                                <Button text={"Ver todos los servicios"} link="/servicios" style="secondary" />
                            </div>
                        </div>

                        <div className='madreSelva__products'>
                            <Grid items={products} gridType="products" slice={3} setIsOpen={handleOpenModal} />
                            {modalContent}

                            <div className='madreSelva__button'>
                                <Button text={"Ver todos los productos"} link="/productos" style="secondary" />
                            </div>
                        </div>
                    </FadeInOnView>
                </div>

                <div className='madreSelva__content--CTA'>
                    <FadeInOnView {...fadeInProps}>
                        <CtaImgCuentaRgresiva {...timerProps} />
                    </FadeInOnView>
                </div>

  
                <div className='madreSelva__content--testimonial'>
                    <FadeInOnView {...fadeInProps}>
                        <TestimonialCard typeTestimonial='servicios_madreSelva'/>
                    </FadeInOnView>
                </div>

                <div className='madreSelva__content--contact' id='contacto'>
                    <FadeInOnView {...fadeInProps}>
                        <CtaHablemos showSocialMedia={true} />
                    </FadeInOnView>
                </div>

                <div className='madreSelva__content--menssage_final' id='menssage_final'>   
                    <FadeInOnView {...fadeInProps}>
                        <MessageFinal indexMessage={0} />
                    </FadeInOnView>
                </div>

                <div className='madreSelva__content--carrousel' id='carrousel'>
                    <FadeInOnView {...fadeInProps}>
                        <MissionCarousel cards={memoizedCards} autoPlayInterval={5000} />
                    </FadeInOnView>
                </div>

                <div className='madreSelva__content--newsletter' id='newsletter'>
                    <Newsletter />
                </div>

                <div className='madreSelva__content--FAQ' id='FAQ'>
                    <FadeInOnView {...fadeInProps}>
                        <FAQ faqs={faqData} defaultCategory="servicios" />
                    </FadeInOnView>
                </div>
            </div>
        </div>
    );
};

export default MadreSelva;