import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import listRouters from './listRouters.json';

import Nav from './componets/nav/nav';
import Home from './routers/home/home';
import LogoHeader from './componets/logo_header/logo_header';

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
        <Nav routers={listRouters} LogoComponent={LogoHeader} isScroll={isScroll}/>
      </div>

      <Routes>
        <Route path="/" element={<Home LogoComponent={LogoHeader} isScroll={isScroll}/>} />
      </Routes>
    </div>
  );
}

export default App;
