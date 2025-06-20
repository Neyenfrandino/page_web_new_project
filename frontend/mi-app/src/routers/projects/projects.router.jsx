import { Routes, Route, useLocation } from 'react-router-dom'; 
import SEOHelmet from '../../componets/SEOHelmet/SEOHelmet';
import MadreSelva from '../../componets/madre_selva/madre_selva';
import Naluum from '../../componets/naluum/naluum';
import TimelineNav from '../../componets/timeLineNav/timelineNav';
import Header from '../../componets/header/header';
import { Clock, Home, User } from 'lucide-react';
import './projects.router.scss';

const routesMadreSelva = [
  { id: 1, name: "Inicio", path: "", icon: Home }, // nota: "" para que sea la raíz del proyecto
  { id: 2, name: "Productos", path: "productos", icon: User },
  { id: 3, name: "Servicios", path: "servicios", icon: Clock },
];

const routesNaluum = [
  { id: 1, name: "Inicio", path: "", icon: Home },
  { id: 2, name: "Productos", path: "productos", icon: User },
  { id: 3, name: "Servicios", path: "servicios", icon: Clock },
];

const Projects = () => {
  const { pathname } = useLocation();
  const isMadreSelva = pathname.includes('/projects/madre-selva');

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

      <TimelineNav routes={isMadreSelva ? routesMadreSelva : routesNaluum} />

      <Routes>
        {/* Madre Selva */}
        <Route path="madre-selva" 
            element={
                <MadreSelva>
                    <Header>
                        <SEOHelmet/>
                    </Header>
                </MadreSelva>
            }
        >
          <Route index element={<h1>Inicio Madre Selva</h1>} /> {/* Página principal */}
          <Route path="productos" element={<h1>Productos Madre Selva</h1>} />
          <Route path="servicios" element={<h1>Servicios Madre Selva</h1>} />
        </Route>

        {/* Naluum */}
        <Route path="naluum" element={<Naluum />}>
          <Route index element={<h1>Inicio Naluum</h1>} /> {/* Página principal */}
          <Route path="productos" element={<h1>Productos Naluum</h1>} />
          <Route path="servicios" element={<h1>Servicios Naluum</h1>} />
        </Route>
      </Routes>
    </div>
  );
};

export default Projects;
