import { useEffect, useState, useContext, useCallback } from "react";
import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom";

// ------------------------------
// 📂 SEO y Meta
// Importaciones de componentes relacionados con SEO y metadata
import SEOHelmet from "../../components/seo/SEOHelmet/SEOHelmet";


// ------------------------------
// 📂 Layout
// Componentes que forman la estructura y navegación principal (header, footer, nav, etc.)
import Header from "../../components/layout/header/header";


// ------------------------------
// 📂 Secciones
// Bloques grandes o secciones completas que conforman las páginas
import TestimonialCard from "../../components/seccion/testimonial_card/testimonial_card";
import CatalogFilter from "../../components/seccion/catalog_filter/catalog_filter";
import FAQ from "../../components/seccion/FAQ/FAQ";
import CtaImgCuentaRgresiva from "../../components/seccion/cta_img_cuenta_rgresiva/cta_img_cuenta_rgresiva";
import MessageFinal from "../../components/seccion/message_final/message_final";
import FadeInOnView from '../../components/seccion/fadeInOnView/fadeInOnView';
import Grid from "../../components/seccion/grid/grid";


// ------------------------------
// 📂 UI / Componentes visuales pequeños y reutilizables

// ------------------------------
// 📂 Integrations
// Servicios externos, pasarelas de pago, APIs de terceros

// ------------------------------
// 📂 Maps
// Componentes relacionados con mapas y geolocalización

// ------------------------------
// 📂 Tracking
// Funciones y componentes para seguimiento de usuario y analytics

// ------------------------------
// 📂 Context
// Archivos relacionados con Context API para manejo global de estados
import { ContextJsonLoadContext } from "../../context/context_json_load/context_json_load";


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
import "./products.router.scss";

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
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy nibh euismod tincidunt ut laoreet.",
  buttonText: "Inscríbete ahora",
  timer: {
    targetDate: "2025-09-23T18:59:59",
  },
  link: "/productos/semillas-de-la-tierra",
};

const Products = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { products, FAQ: faqData } = useContext(ContextJsonLoadContext);

  const handleOpenModal = useCallback((status, e, item) => {
    if (!item || !item.id) return;
    navigate(`/productos/${item.id}`);
  }, [navigate]);

  const isExactProductsRoute =
    location.pathname === "/productos" || location.pathname === "/productos/";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (products?.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  return (
    <div className={`products__container ${isVisible ? "visible" : ""}`}>
      <SEOHelmet
        title={id ? "Detalle del Producto" : "Productos"}
        description="Productos pensados para tu bienestar y el del planeta"
        keywords="productos, bienestar, ecológico, natural, salud"
        author="Neyen Frandino"
        url="https://miempresa.com"
        image="/img/7.png"
      />

      {isExactProductsRoute && !id && (
        <>
          <Header>
            <div className="products--header__container">
              <div className="products--header__img">
                <img src="/img/initial_products.jpg" alt="productos" />
              </div>

              <div className="products--header__content">
                <div className="products--header__content--title">
                  <h1>
                    <span>NUESTROS PRODUCTOS</span>
                  </h1>
                </div>

                <div className="products--header__content--subtitle">
                  <p>Alimentos y productos que nacen de la tierra, pensados para cuidar tu bienestar y el del planeta.</p>
                </div>
              </div>

              <div className="scroll-indicator">
                <div className="mouse"></div>
              </div>
            </div>
          </Header>

          <div className="products--content">
            <div className="products--content--filters">
              <CatalogFilter
                items={products}
                onFilteredItems={setFilteredProducts}
              />
            </div>

            <div className="products--content--grid">
              <Grid
                items={filteredProducts}
                gridType="products"
                slice={10}
                setIsOpen={handleOpenModal}
                variant="minimal"
              />
            </div>

            <div className="products--content--testimonials">
              <TestimonialCard typeTestimonial="producto" />
            </div>

            <FadeInOnView {...fadeInProps}>
              <div className="products--content--CTA-cuenta-rgresiva">
                <CtaImgCuentaRgresiva {...timerProps} />
              </div>
            </FadeInOnView>

            <FadeInOnView {...fadeInProps}>
              <div className="products--content--faq">
                <FAQ faqs={faqData} defaultCategory="productos" />
              </div>
            </FadeInOnView>

            <FadeInOnView {...fadeInProps}>
              <div className="products--content--message_final">
                <MessageFinal indexMessage={4} />
              </div>
            </FadeInOnView>
          </div>
        </>
      )}
      <Outlet />
    </div>
  );
};

export default Products;
