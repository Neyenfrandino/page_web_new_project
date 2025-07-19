import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useSearchParams, useNavigate  } from "react-router-dom";

import listRouters from './json/listRouters.json';
import projects from './json/projects.json';
// import products from './json/products.json';

import Nav from './componets/nav/nav';
import Home from './routers/home/home'
import Services from './routers/services/services.router'
import AboutMe from './routers/aboutMe/aboutMe.router'
import Blog from './routers/blog/blog.router'
import Contact from './routers/contact/contact.router'
import Projects from './routers/projects/projects.router'
import LandingPageCalendar from './routers/landingPageCalendar/landingPageCalendar.router'
import Products from './routers/products/products.router'
import ShoppingCart from './routers/shoppingCart/shoppingCart'
import ProductDetail from './routers/products/products_detail';
import ServicesDetail from './routers/services/services_detail';

import Footer from './componets/footer/footer';
import ScrollToTop from './componets/scrollToTop/ScrollToTop';
import UserTracker from './componets/userTracker/userTracker';



import Payment from './routers/payment/payment';

import './App.scss';

const App = () => {
  const location = useLocation();
  
  const [isScroll, setIsScroll] = useState(false);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const transitioningRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setIsScroll(window.scrollY);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      <div className='App__nav'>
        <Nav isScroll={isScroll} listRouters={listRouters} location={location} projects={projects} />
      </div>
      <ScrollToTop />

      <main id="view-root">
        <Routes location={{ ...location, pathname: currentPath }} key={currentPath}>
          <Route index path="/" element={<Home />} />
          <Route path="/projects/*" element={<Projects currentRoute={location} />} />

          <Route path="/sobre-nosotros" element={<AboutMe />} />
          <Route path="//contacto" element={<Contact />} />
          <Route path="/carrito-de-compras" element={<ShoppingCart />} />
          <Route path="/calendario" element={<LandingPageCalendar />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="/productos/*" element={<Products />}>
            <Route path=":id" element={<ProductDetail />} />
          </Route>
         
          <Route path="/servicios/*" element={<Services />}>
            <Route path=":id" element={<ServicesDetail />} />
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