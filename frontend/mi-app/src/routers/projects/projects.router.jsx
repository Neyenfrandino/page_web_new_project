import { Routes, Route, useLocation } from 'react-router-dom'; 
import SEOHelmet from '../../componets/SEOHelmet/SEOHelmet';
import HomeMadreSelva from '../../componets/madre_selva/madre_selva';
import Naluum from '../../componets/naluum/naluum';
import TimelineNav from '../../componets/timeLineNav/timelineNav';
import Header from '../../componets/header/header';
import { Home, User, Clock, Mail, HelpCircle, MessageCircle, ShoppingBag   } from 'lucide-react';

import './projects.router.scss';

const routesMadreSelva = [
  { id: "inicioMadreSelva", name: "Inicio", path: "#inicio", icon: Home }, // nota: "" para que sea la raíz del proyecto
  { id: "sobre-madreSelva", name: "Sobre Madre Selva", path: "#sobre-madreSelva", icon: User },
  { id: "serviciosYProductos-madreSelva", name: "Servicios y Productos", path: "#serviciosYProductos-madreSelva", icon: ShoppingBag },
  { id: "contacto-madreSelva", name: "Contacto", path: "#contacto-madreSelva", icon: Mail },
  { id: "newsletter-madreSelva", name: "Newsletter", path: "#newsletter-madreSelva", icon: MessageCircle },
  { id: "FAQ-madreSelva", name: "Preguntas Frecuentes", path: "#FAQ-madreSelva", icon: HelpCircle },
];

// En projects.router.jsx
const routesNaluum = [
  { id: "inicio", name: "Inicio", path: "#inicio", icon: Home },
  { id: "sobre-naluum", name: "Sobre Naluum", path: "#sobre-naluum", icon: User },
  { id: "servicios", name: "Servicios", path: "#servicios", icon: ShoppingBag },
  { id: "contacto", name: "Contacto", path: "#contacto", icon: Mail },
  { id: "newsletter", name: "Newsletter", path: "#newsletter", icon: MessageCircle },
  { id: "FAQ", name: "Preguntas Frecuentes", path: "#FAQ", icon: HelpCircle },
];

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

      <TimelineNav sections={isMadreSelva ? routesMadreSelva : routesNaluum} />

      <Routes>
        {/* Madre Selva */}
        <Route path="madre-selva" element={<HomeMadreSelva />}/>
  
        {/* Naluum */}
        <Route path="naluum" element={<Naluum />}/>

        <Route path='global' element={<div>Global</div>} />
      </Routes>
    </div>
  );
};

export default Projects;
