import { useEffect, useState, useContext, useCallback } from "react";
import { Outlet, useParams, useLocation } from "react-router-dom";

import SEOHelmet from "../../componets/SEOHelmet/SEOHelmet";
import Header from "../../componets/header/header";
import Grid from "../../componets/grid/grid";
import TestimonialCard from "../../componets/testimonial_card/testimonial_card";
import CatalogFilter from "../../componets/catalog_filter/catalog_filter";
import FAQ from "../../componets/FAQ/FAQ";

import { ContextJsonLoadContext } from "../../context/context_json_load/context_json_load";

import "./services.router.scss";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]);
  const { id } = useParams();

  const location = useLocation();
  const { servicios, FAQ: faqData } = useContext(ContextJsonLoadContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [triggerElement, setTriggerElement] = useState(null);

  const handleOpenModal = useCallback((status, e, item) => {
    if (!item || !item.id) return;
    setTriggerElement(e.currentTarget);
    setIsModalOpen({ isOpen: status, item });
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTriggerElement(null);
  }, []);

  const isExactServicesRoute =
    location.pathname === "/servicios" || location.pathname === "/servicios/";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Inicializar filteredServices cuando servicios cambie
  useEffect(() => {
    if (servicios && servicios.length > 0) {
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

      {/* Mostrar contenido solo si estamos en la ruta exacta /servicios */}
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

              {/* Opcional: indicador de scroll */}
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

            <div className="services--content--faq">
<FAQ faqs={faqData} defaultCategory="servicios" />

            </div>
          </div>
        </>
      )}

      {/* El Outlet renderizará ServicesDetail cuando haya un id en la ruta */}
      <Outlet />
    </div>
  );
};

export default Services;