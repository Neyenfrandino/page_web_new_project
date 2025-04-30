import { Routes, Route, Link } from 'react-router-dom'; 
import SEOHelmet from '../../componets/SEOHelmet/SEOHelmet';
import Header from '../../componets/header/header';

import MadreSelva from '../../componets/madre_selva/madre_selva';
import Naluum from '../../componets/naluum/naluum';

import TimelineNav from '../../componets/timeLineNav/timelineNav';
import './projects.router.scss';

const Projects = () => {
    return (
        <div className='projects__container'>
            <>
                <SEOHelmet 
                    title='Projects' 
                    description='Simplify Your Focus' 
                    keywords='tecnología, software, negocios, soluciones digitales, emprendimientos' 
                    author='Neyen Frandino' 
                    url='https://miempresa.com' 
                    image='https://miempresa.com/default-image.jpg' 
                />
            </>
        
            {/* <Header> 
                <div className='projects__header-content'>
                    <h1>Simplify Your Focus</h1>
                    <p>Clarity emerges when complexity fades. Embrace the essence of your potential.</p> 
                </div>
            </Header>
        

            <section className='projects__content'>
                <div className='projects__section'>
                    <h2>Mindful Design</h2>
                    <p>Less clutter, more meaning. Every element serves a purpose.</p>
                </div>
                <div className='projects__section'>
                    <h2>Intentional Growth</h2>
                    <p>Small steps, significant progress. Continuous improvement.</p>
                </div>
            </section>   */}

            <TimelineNav />


            <Routes>
                <Route path="madre-selva" element={<MadreSelva />} />
                <Route path="naluum" element={<Naluum />} />
                {/* Agrega más rutas internas correctamente */}
                {/* Ejemplo para Naluum (deberías tener un componente, no un console.log) */}
                {/* <Route path="naluum" element={<Naluum />} /> */}
            </Routes>

        </div>
        
        



    );
};

export default Projects;