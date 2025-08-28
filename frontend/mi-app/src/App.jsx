import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation  } from "react-router-dom";

import listRouters from './json/listRouters.json';
import projects from './json/projects.json';

// 📂 Layout
import Nav from './components/layout/nav/nav';
import Footer from './components/layout/footer/footer';

// 📂 UI / utilitarios
import ScrollToTop from './components/ui/scrollToTop/ScrollToTop';
import ButtonBack from './components/ui/button_back/button_back';

// 📂 Tracking y métricas
import UserTracker from './components/tracking/userTracker/userTracker';

// 📂 Páginas principales (Routers)
import Home from './routers/home/home';
import Services from './routers/services/services.router';
import AboutMe from './routers/aboutMe/aboutMe.router';
import Blog from './routers/blog/blog.router';
import Contact from './routers/contact/contact.router';
import Projects from './routers/projects/projects.router';
import LandingPage from './routers/landingPage/landingPage';
import CalendarRouter from './routers/calendar.router/calendar.router';
import Products from './routers/products/products.router';
import ShoppingCart from './routers/shoppingCart/shoppingCart';
import Payment from './routers/payment/payment';



// 📂 Detalles (subpáginas de routers)
import ProductDetail from './routers/products/products_detail';
import ServiceDetail from './routers/services/services_detail';
import BlogDetail from './routers/blog/blog_detail';

import './App.scss';

const App = () => {
  const location = useLocation();
  
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const transitioningRef = useRef(false);

  useEffect(() => {
    const DOMAIN = import.meta.env.VITE_API_URL;
    document.documentElement.style.setProperty('--dominio', DOMAIN);
    console.log("Dominio desde variable de entorno:", DOMAIN);
  }, []);

  
  useEffect(() => {
    if (!document.startViewTransition || transitioningRef.current) {
      setCurrentPath(location.pathname);
      return;
    }

    transitioningRef.current = true;
    document.startViewTransition(() => {
      setCurrentPath(location.pathname);
    }).finished.finally(() => {
      transitioningRef.current = false;
    });
  }, [location.pathname]);



  return (
    <div className="App">
      {/* <UserTracker /> */}
      
      {
        currentPath === 'landingPage' || currentPath === '/landingPage' || currentPath.includes('/landingPage') ?
        null :       
          <>
          <div className='App__nav'>
          
            <Nav listRouters={listRouters} projects={projects} />

          </div>

          <div className='app__back-button'>
            <ButtonBack />
          </div>
          </>

      }
  
      <ScrollToTop />

      <main id="view-root">
        <Routes location={{ ...location, pathname: currentPath }} key={currentPath}>
          <Route index path="/" element={<Home />} />
          <Route path="/proyectos/*" element={<Projects/>} />

          <Route path="/sobre-nosotros" element={<AboutMe />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/carrito-de-compras" element={<ShoppingCart />} />

          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/calendario" element={<CalendarRouter />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="/productos/*" element={<Products />}>
            <Route path=":id" element={<ProductDetail />} />
          </Route>
         
          <Route path="/servicios/*" element={<Services />}>
            <Route path=":id" element={<ServiceDetail />} />
          </Route>

          <Route path="/blog" element={<Blog />}>
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Route>

        </Routes>
      </main>

      <footer className='App__footer'>
        <Footer />
      </footer>
    </div>
  );
};
 
export default App;