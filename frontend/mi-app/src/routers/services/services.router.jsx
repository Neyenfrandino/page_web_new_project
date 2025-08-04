import { useEffect, useState, useContext, useCallback } from "react";
import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom";

import SEOHelmet from "../../componets/SEOHelmet/SEOHelmet";
import Header from "../../componets/header/header";
import Grid from "../../componets/grid/grid";
import TestimonialCard from "../../componets/testimonial_card/testimonial_card";
import CatalogFilter from "../../componets/catalog_filter/catalog_filter";
import FAQ from "../../componets/FAQ/FAQ";
import CtaImgCuentaRgresiva from "../../componets/cta_img_cuenta_rgresiva/cta_img_cuenta_rgresiva";
import MessageFinal from "../../componets/message_final/message_final";
import FadeInOnView from '../../componets/fadeInOnView/fadeInOnView';
import { ContextJsonLoadContext } from "../../context/context_json_load/context_json_load";

import "./services.router.scss";


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
    targetDate: "2025-09-23T18:59:59",
  },
  link: "/servicios/laboratorios-alimentacion-viva",
};

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]);


  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { servicios, FAQ: faqData } = useContext(ContextJsonLoadContext);
 
  const handleOpenModal = useCallback(
    (status, e, item) => {
      if (!item || !item.id) return;
      navigate(`/servicios/${item.id}`);
    },
    [navigate]
  );

  const isExactServicesRoute =
    location.pathname === "/servicios" ||
    location.pathname === "/servicios/";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (servicios?.length > 0) {
      setFilteredServices(servicios);
    }
  }, [servicios]);

  return (
    <div className={`services__container ${isVisible ? "visible" : ""}`}>
      <SEOHelmet
        title={id ? "Detalle del Servicio" : "Servicios"}
        description="Simplify Your Focus"
        keywords="tecnología, software, negocios, soluciones digitales, emprendimientos"
        author="Neyen Frandino"
        url="https://miempresa.com"
        image="/img/7.png"
      />

      {isExactServicesRoute && !id && (
        <>
          <Header>
            <div className="services--header__container">
              <div className="services--header__img">
                <img src="/img/fotosubscribirse.jpg" alt="" />
              </div>

              <div className="services--header__content">
                <div className="services--header__content--title">
                  <h1>
                    <span>NUESTROS SERVICIOS</span>
                  </h1>
                </div>

                <div className="services--header__content--subtitle">
                  <p>
                    Soluciones digitales diseñadas para hacer crecer tu negocio
                    y simplificar tu día a día.
                  </p>
                </div>
              </div>

              <div className="scroll-indicator">
                <div className="mouse"></div>
              </div>
            </div>
          </Header>

          <div className="services--content">

              <div className="services--content--filters">
                <CatalogFilter
                  items={servicios}
                  onFilteredItems={setFilteredServices}
                />
              </div>
            
              <div className="services--content--grid">
                <Grid
                  items={filteredServices}
                  gridType="services"
                  slice={10}
                  setIsOpen={handleOpenModal}
                  variant="minimal"
                />
              </div>

              <div className="services--content--testimonials">
                <TestimonialCard typeTestimonial="servicio" />
              </div>
        
            <FadeInOnView {...fadeInProps}>
              <div className="services--content--CTA-cuenta-rgresiva">
                <CtaImgCuentaRgresiva {...timerProps} />
              </div>
            </FadeInOnView>
     
            <FadeInOnView {...fadeInProps}>
              <div className="services--content--faq">
                <FAQ faqs={faqData} defaultCategory="servicios" />
              </div>
            </FadeInOnView>
            
            <FadeInOnView {...fadeInProps}>
              <div className="services--content--message_final">
                <MessageFinal indexMessage={3} />
              </div>
            </FadeInOnView>
          </div>
        </>
      )}
      <Outlet />
    </div>
  );
};

export default Services;
