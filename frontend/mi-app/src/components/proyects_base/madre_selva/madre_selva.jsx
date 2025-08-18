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

const actividadesMadreSelva = [
  {
    id: 1,
    title: '🌳 Caminatas guiadas por la selva',
    description: 'Explora senderos vivos, conoce especies nativas y descubre cómo cada rincón del bosque participa en la regeneración.',
    image: '/img/caminata.jpg',
  },
  {
    id: 2,
    title: '🪵 Talleres de construcción natural',
    description: 'Aprende a levantar estructuras con materiales locales y técnicas sostenibles que respetan el equilibrio del entorno.',
    image: '/img/construccion.jpg',
  },
  {
    id: 3,
    title: '🌾 Agricultura sintrópica en acción',
    description: 'Participa en nuestras huertas regenerativas, desde la siembra hasta la cosecha, cultivando alimentos y esperanza.',
    image: '/img/agricultura.jpg',
  },
  {
    id: 4,
    title: '💧 Rutas del agua',
    description: 'Descubre cómo cuidamos y gestionamos el agua, desde manantiales y arroyos hasta sistemas de captación y filtrado.',
    image: '/img/agua.jpg',
  },
  {
    id: 5,
    title: '🔥 Encuentros alrededor del fuego',
    description: 'Comparte historias, cantos y saberes en veladas que fortalecen los lazos entre personas y culturas.',
    image: '/img/fuego.jpg',
  },
  {
    id: 6,
    title: '🔬 Experiencias de investigación',
    description: 'Participa en proyectos de observación y estudio sobre biodiversidad, suelos y diseño regenerativo.',
    image: '/img/investigacion.jpg',
  },
  {
    id: 7,
    title: '🛖 Vivencias inmersivas',
    description: 'Convive en el Eco-Centro, aprende de la vida diaria y sumérgete en la filosofía de sostenibilidad de Madre Selva.',
    image: '/img/immersiva.jpg',
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

     const memoizedCards = useMemo(() => actividadesMadreSelva, []);
   


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
                        <div className='content__carrousel--titiles'>
                            <h2>Madre Selva no es solo un lugar, es una experiencia.</h2>
                            <p>Invitamos a cada visitante a sumergirse en la naturaleza virgen, a explorar nuestros bosques, a escuchar el susurro del arroyo y a ser parte de un ecosistema que fomenta la regeneración.</p>
                        </div>
                        <div className='content__carrousel--cards'>
                            <MissionCarousel cards={memoizedCards} autoPlayInterval={5000} />
                        </div>
                    </FadeInOnView>
                </div>

                <div className='madreSelva__content--newsletter' id='newsletter'>
                    <Newsletter />
                </div>

                <div className='madreSelva__content--FAQ' id='FAQ'>
                    <FadeInOnView {...fadeInProps}>
                        <FAQ faqs={faqData} defaultCategory="madre-selva" />
                    </FadeInOnView>
                </div>
            </div>
        </div>
    );
};

export default MadreSelva;