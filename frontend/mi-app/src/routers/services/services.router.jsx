import { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";

import SEOHelmet from "../../componets/SEOHelmet/SEOHelmet";
import Card from "../../componets/card/cardV1/card";
import CardV2Img from "../../componets/card/cardV2_Img/cardV2_img";
import CardV3_testimonios from "../../componets/card/cardV3_testimonios/cardV3_testimonios";
import ServicesDetail from "./services_detail"; // importa el detalle

import "./services.router.scss";

const Services = ({ products }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const servicioId = searchParams.get("servicios");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`services__container ${isVisible ? "visible" : ""}`}>
      <SEOHelmet
        title="Services"
        description="Simplify Your Focus"
        keywords="tecnología, software, negocios, soluciones digitales, emprendimientos"
        author="Neyen Frandino"
        url="https://miempresa.com"
        image="/img/7.png"
      />

      <div className="services__background"></div>



      {/* 🔽 Si hay query param, mostrar directamente el detalle */}
      {servicioId ? (
        <ServicesDetail id={servicioId} />
      ) : (
              <div className="services__content">
        <h1 className="services__title">Nuestros Servicios</h1>
        <p className="services__description">
          Descubre cómo podemos ayudarte con soluciones innovadoras y efectivas
          para transformar tu negocio y alcanzar nuevos horizontes.
        </p>
      </div>
      )}

      {/* Esto se usará si accedés con /servicios/:id directamente */}
      <Outlet />
    </div>
  );
};

export default Services;
