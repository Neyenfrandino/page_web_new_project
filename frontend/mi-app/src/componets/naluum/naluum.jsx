import { useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueryParam } from '../../hocks/useQueryParams';
import { ContextJsonLoadContext } from '../../context/context_json_load/context_json_load';
import { MethodStatePaymentContext } from '../../context/method_state_payment/method_state_payment.context';

import Modal from '../../componets/modal/modal';
import ModalCard from '../../componets/card/modal_card/modal_card';
import PaymentMethodSelector from '../../componets/payment_method/payment_method_selector';
import SEOHelmet from '../../componets/SEOHelmet/SEOHelmet';
import Header from '../header/header';
import CardV2Img from '../../componets/card/cardV2_Img/cardV2_img';
import TimeLineHistory from '../../componets/history_about/time_line_history';  
import Grid from '../../componets/grid/grid';
import Button from '../button/button';
import CtaImgCuentaRgresiva from '../cta_img_cuenta_rgresiva/cta_img_cuenta_rgresiva';
import CtaHablemos from '../cta_hablemos/cta_hablemos';
import TestimonialCard from '../testimonial_card/testimonial_card';
import Newsletter from '../newsletter/newsletter';
import FAQ from '../FAQ/FAQ';
import MessageFinal  from '../../componets/message_final/message_final' 
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
  question: "¿Qué es Naluum?",
  title: "El corazón pedagógico del Movimiento Naluum",
  text: "Naluum es el núcleo educativo del Movimiento Naluum, encargado de llevar formación, acompañamiento y eventos pedagógicos a todo el mundo. Es el puente entre el conocimiento consciente y las personas, ofreciendo cursos, experiencias formativas y apoyo a proyectos que buscan transformar su realidad desde la colaboración, la regeneración y el aprendizaje continuo.",
  buttonPrimary: ["Explorar el universo pedagógico de Naluum", "/naluum"],
  image: "/img/naluum_crad_question.JPG"
};

const titles = {
  titulo: "Educación, conciencia y colaboración para transformar",
  subTitle: "Naluum",
  description: "Naluum es una propuesta para generar una comunidad educativa consciente y profesional que inspire a más personas. Está inspirado en los sistemas vivos que se autorregulan y se sostienen gracias a la colaboración efectiva y amorosa. Se basa en crear un sistema vivo, sustentable en el tiempo",
}

const Naluum = () => {
    const { servicios, FAQ: faqData } = useContext(ContextJsonLoadContext);

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

    if (!servicios) return null;

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

                <div className='naluum__content--question' id='sobre-naluum'>
                    <FadeInOnView {...fadeInProps}>
                        <CardV2Img objectContentCard={objectContentCard} />
                    </FadeInOnView>
                </div>

                <div className='naluum__content--history'>
                    <FadeInOnView {...fadeInProps}>
                        <TimeLineHistory index={1} titles={titles} />
                    </FadeInOnView>
                </div>


                <div className='naluum__services' id='servicios'>
                    <FadeInOnView {...fadeInProps}>
                        <div className='naluum__services-titile'>
                            <h2>Servicios</h2>
                            <p>Conoce los servicios que nos ayudan a cumplir con nuestras metas</p>
                        </div>
                        
                        <Grid items={servicios} gridType="services" slice={3} setIsOpen={handleOpenModal} variant="minimal" />
                        {modalContent}

                        <div className='naluum__services-button'>
                            <Button text={"Ver todos los servicios"} link="/servicios" style="secondary" />
                        </div>
                    </FadeInOnView>
                </div>

                <div className='naluum__content--CTA'>
                    <FadeInOnView {...fadeInProps}>
                        <CtaImgCuentaRgresiva {...timerProps} />
                    </FadeInOnView>
                </div>

                <div className='naluum__content--testimonial'>
                    <FadeInOnView {...fadeInProps}>
                        <TestimonialCard typeTestimonial='testimonios_naluum'  />
                    </FadeInOnView>
                </div>

                <div className='naluum__content--contact' id='contacto'>
                    <FadeInOnView {...fadeInProps}>
                        <CtaHablemos showSocialMedia={true} />
                    </FadeInOnView>
                </div>

                <div className='naluum__content--menssage_final' id='menssage_final'>   
                    <FadeInOnView {...fadeInProps}>
                        <MessageFinal indexMessage={2} />
                    </FadeInOnView>
                </div>


                <div className='naluum__content--newsletter' id='newsletter'>
                    <Newsletter />
                </div>

                <div className='naluum__content--FAQ' id='FAQ'>
                    <FadeInOnView {...fadeInProps}>
                        <FAQ faqs={faqData} defaultCategory="servicios" />
                    </FadeInOnView>
                </div>
            </div>
        </div>
    );
};

export default Naluum;