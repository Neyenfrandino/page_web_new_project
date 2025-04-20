import { useState } from 'react';
import { Routes, Route } from "react-router-dom";

import listRouters from './json/listRouters.json';
import products from './json/products.json';

import Nav from './componets/nav/nav';
import Home from './routers/home/home'
import Services from './routers/services/services.router'
import AboutMe from './routers/aboutMe/aboutMe.router'
import Blog from './routers/blog/blog.router'
import Contact from './routers/contact/contact.router'
import Projects from './routers/projects/projects.router'
import LandingPage from './routers/landingPage/landingPage.router'
import Products from './routers/products/products.router'

import Footer from './componets/footer/footer';

import ScrollToTop from './componets/scrollToTop/ScrollToTop';

import './App.scss';

const App = () => {

  const [isScroll, setIsScroll] = useState(false);

  // useEffect(() => {
  //   setIsScroll(window.scrollY);
  //   window.addEventListener('scroll', () => {
  //     setIsScroll(window.scrollY);
  //   });
  //   return () => {
  //     window.removeEventListener('scroll', () => {
  //       setIsScroll(window.scrollY);
  //     });
  //   };
  // }, []);

  
  return (
    <div className="App">
      <div className='App__nav'>
        <Nav isScroll={isScroll} listRouters={listRouters} />
      </div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services products={products} />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/products" element={<Products />} />
      </Routes>

      <div className='App__footer'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
