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
