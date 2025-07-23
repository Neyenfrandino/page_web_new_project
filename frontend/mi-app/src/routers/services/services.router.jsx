import { useEffect, useState } from "react";
import { Outlet, useParams, useLocation } from "react-router-dom";

import SEOHelmet from "../../componets/SEOHelmet/SEOHelmet";
import ServicesDetail from "./services_detail";

import "./services.router.scss";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { id } = useParams(); // Obtener el id desde la URL
  const location = useLocation();
  
  // Verificar si estamos en la ruta exacta /servicios o en una subruta
  const isExactServicesRoute = location.pathname === '/servicios' || location.pathname === '/servicios/';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

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
        <div className="services__content">
          <h1 className="services__title">Nuestros Servicios</h1>
        </div>
      )}

      {/* El Outlet renderizará ServicesDetail cuando haya un id en la ruta */}
      <Outlet />
    </div>
  );
};

export default Services;