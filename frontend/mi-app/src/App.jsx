import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import listRouters from './json/listRouters.json';
import products from './json/products.json';

import Nav from './componets/nav/nav';
import Home from './routers/home/home'
import Services from './routers/services/services'


import './App.scss';

const App = () => {

  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    setIsScroll(window.scrollY);
    window.addEventListener('scroll', () => {
      setIsScroll(window.scrollY);
    });
    return () => {
      window.removeEventListener('scroll', () => {
        setIsScroll(window.scrollY);
      });
    };
  }, []);

  // Debería mostrar "hola"


  return (
    <div className="App">
      <div className='App__nav'>
        <Nav isScroll={isScroll} listRouters={listRouters} />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Services products={products} />} />
      </Routes>
    </div>
  );
}

export default App;
