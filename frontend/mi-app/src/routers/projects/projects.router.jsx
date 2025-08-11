import { Routes, Route, useLocation } from 'react-router-dom'; 

import { Home, User, Clock, Mail, HelpCircle, MessageCircle, ShoppingBag   } from 'lucide-react';
// ------------------------------
// 📂 SEO y Meta
// Importaciones de componentes relacionados con SEO y metadata
import SEOHelmet from "../../components/seo/SEOHelmet/SEOHelmet";


// ------------------------------
// 📂 Layout
// Componentes que forman la estructura y navegación principal (header, footer, nav, etc.)
import TimelineNav from '../../components/layout/timeLineNav/timelineNav';
import Header from '../../components/layout/header/header';

// ------------------------------
// 📂 Secciones
// Bloques grandes o secciones completas que conforman las páginas

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
// 📂 projects_base
import MadreSelva from '../../components/proyects_base/madre_selva/madre_selva';
import Naluum from '../../components/proyects_base/naluum/naluum';
import Global from '../../components/proyects_base/global/global';

// ------------------------------
// 📂 Styles
// Estilos globales, variables SCSS y temas
import './projects.router.scss';

// const routesMadreSelva = [
//   { id: "inicioMadreSelva", name: "Inicio", path: "#inicio", icon: Home }, // nota: "" para que sea la raíz del proyecto
//   { id: "sobre-madreSelva", name: "Sobre Madre Selva", path: "#sobre-madreSelva", icon: User },
//   { id: "serviciosYProductos-madreSelva", name: "Servicios y Productos", path: "#serviciosYProductos-madreSelva", icon: ShoppingBag },
//   { id: "contacto-madreSelva", name: "Contacto", path: "#contacto-madreSelva", icon: Mail },
//   { id: "newsletter-madreSelva", name: "Newsletter", path: "#newsletter-madreSelva", icon: MessageCircle },
//   { id: "FAQ-madreSelva", name: "Preguntas Frecuentes", path: "#FAQ-madreSelva", icon: HelpCircle },
// ];

// En projects.router.jsx
const routes_subpage = [
  { id: "inicio", name: "Inicio", path: "#inicio", icon: Home },
  { id: "sobre-naluum", name: "Sobre mi", path: "#sobre-mi", icon: User },
  { id: "servicios", name: "Servicios", path: "#servicios", icon: ShoppingBag },
  { id: "contacto", name: "Contacto", path: "#contacto", icon: Mail },
  { id: "newsletter", name: "Newsletter", path: "#newsletter", icon: MessageCircle },
  { id: "FAQ", name: "Preguntas Frecuentes", path: "#FAQ", icon: HelpCircle },
];
// // En projects.router.jsx
// const routesGlobal = [
//   { id: "inicio", name: "Inicio", path: "#inicio", icon: Home },
//   { id: "sobre-naluum", name: "Sobre Naluum", path: "#sobre-naluum", icon: User },
//   { id: "servicios", name: "Servicios", path: "#servicios", icon: ShoppingBag },
//   { id: "contacto", name: "Contacto", path: "#contacto", icon: Mail },
//   { id: "newsletter", name: "Newsletter", path: "#newsletter", icon: MessageCircle },
//   { id: "FAQ", name: "Preguntas Frecuentes", path: "#FAQ", icon: HelpCircle },
// ];

const Projects = () => {
  const { pathname } = useLocation();
  const isMadreSelva = pathname.includes('/proyectos/madre-selva');

   
  return (
    <div className='projects__container'>
      <SEOHelmet 
        title='Projects' 
        description='Simplify Your Focus' 
        keywords='tecnología, software, negocios, soluciones digitales, emprendimientos' 
        author='Neyen Frandino' 
        url='https://miempresa.com' 
        image='https://miempresa.com/default-image.jpg' 
      />

      <TimelineNav sections={routes_subpage} />

      <Routes>
        {/* Madre Selva */}
        <Route path="madre-selva" element={<MadreSelva />}/>
  
        {/* Naluum */}
        <Route path="naluum" element={<Naluum />}/>

        <Route path='global' element={<Global />}/>
      </Routes>
    </div>
  );
};

export default Projects;
