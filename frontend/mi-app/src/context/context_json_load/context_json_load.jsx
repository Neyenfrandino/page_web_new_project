// // src/context/ContextJsonLoadContext.jsx
// import React, { createContext, useReducer, useState, useEffect } from 'react';

// // Importación de JSONs
// import dataImpactoReal from '../../json/data_impacto_real.json';
// import listRouters from '../../json/listRouters.json';
// import products from '../../json/products.json';
// import projects from '../../json/projects.json';
// import servicios from '../../json/servicios.json';
// import testimonios from '../../json/testimonios.json';
// import time_line_history from '../../json/time_line_history.json';
// import message from '../../json/messge.json';
// import FAQ from '../../json/FAQ.json';
// import blogs from '../../json/blogs.json';
// import timerProps from '../../json/timerProps.json';
// import eventos from '../../json/eventos.json';


// let DOMAIN = import.meta.env.VITE_API_URL;

// // Crear el contexto
// export const ContextJsonLoadContext = createContext();

// // Estado inicial
// const initialState = {
//   json_load: false,
//   listaRutas: [],
//   dataImpactoReal: [],
//   products: [],
//   projects: [],
//   servicios: [],
//   testimonios: [],
//   time_line_history: [],
//   FAQ: [],
//   blogs: [],
//   timerProps: timerProps,
//   DOMAIN: DOMAIN,
//   eventos: []
// };

// // Tipos de acciones
// const types = {
//   SET_JSON_LOAD: 'SET_JSON_LOAD',
//   LOAD_JSONS: 'LOAD_JSONS',
// };

// // Reducer
// const ContextJsonLoadReducer = (state, action) => {
//   switch (action.type) {
//     case types.SET_JSON_LOAD:
//       return {
//         ...state,
//         json_load: action.payload,
//       };
//     case types.LOAD_JSONS:
//       return {
//         ...state,
//         ...action.payload,
//         json_load: true,
//       };
//     default:
//       return state;
//   }
// };

// // Provider
// export const ContextJsonLoadProvider = ({ children }) => {
//   console.log(DOMAIN)
//   const [state, dispatch] = useReducer(ContextJsonLoadReducer, initialState);

//   const toFetchJson = async () => {
//     const url = `${DOMAIN}/json/data_impacto_real.json`; // Ruta completa al JSON
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json(); // Convertimos la respuesta a JSON
//       console.log(data); // Mostramos los datos
//       return data; // Retornamos los datos
//     } catch (error) {
//       console.error("Error fetching JSON:", error.message);
//       return null; // Retornamos null en caso de error
//     }
//   };

//   toFetchJson()


//   useEffect(() => {
//     // Simulamos "cargar los JSON" al iniciar
//     const loadJsons = () => {
//       dispatch({
//         type: types.LOAD_JSONS,
//         payload: {
//           listaRutas: listRouters,
//           dataImpactoReal: dataImpactoReal,
//           products: products,
//           projects: projects,
//           servicios: servicios,
//           testimonios: testimonios,
//           time_line_history: time_line_history,
//           message: message,
//           FAQ: FAQ,
//           blogs: blogs,
//           timerProps: timerProps,
//           DOMAIN: DOMAIN,
//           eventos: eventos
          
//         },
//       });
//     };

//     loadJsons();
//   }, []);

//   const setJsonLoad = (value) => {
//     dispatch({
//       type: types.SET_JSON_LOAD,
//       payload: value,
//     });
//   };

//   const dataTimerProps = {
//     ...timerProps,
//     img: timerProps.img.replace("{DOMAIN}", DOMAIN)
//   };
//   console.log(testimonios)

//   const value = {
//     ...state,
//     setJsonLoad,
//     dataTimerProps
//   };


//   return (
//     <ContextJsonLoadContext.Provider value={value}>
//       {children}
//     </ContextJsonLoadContext.Provider>
//   );
// };


// src/context/ContextJsonLoadContext.jsx
import { Contact } from "lucide-react";
import React, { createContext, useReducer, useEffect } from "react";

let DOMAIN = import.meta.env.VITE_API_URL;

// Crear el contexto
export const ContextJsonLoadContext = createContext();

// Estado inicial
const initialState = {
  json_load: false,
  listaRutas: [],
  dataImpactoReal: [],
  products: [],
  projects: [],
  servicios: [],
  testimonios: [],
  time_line_history: [],
  message: [],
  FAQ: [],
  blogs: [],
  timerProps: [],
  eventos: [],
  DOMAIN: DOMAIN,
  info_contacto: []
};

// Tipos de acciones
const types = {
  SET_JSON_LOAD: "SET_JSON_LOAD",
  LOAD_JSONS: "LOAD_JSONS",
};

// Reducer
const ContextJsonLoadReducer = (state, action) => {
  switch (action.type) {
    case types.SET_JSON_LOAD:
      return { ...state, json_load: action.payload };
    case types.LOAD_JSONS:
      return { ...state, ...action.payload, json_load: true };
    default:
      return state;
  }
};

// Lista de archivos JSON a cargar desde el servidor
const jsonFiles = [
  "data_impacto_real",
  "listRouters",
  "products",
  "projects",
  "servicios",
  "testimonios",
  "time_line_history",
  "messge",
  "FAQ",
  "blogs",
  "timerProps",
  "eventos",
  "info_contacto"
];

// Provider
export const ContextJsonLoadProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ContextJsonLoadReducer, initialState);

  useEffect(() => {
    const loadAllJsons = async () => {
      const payload = {};

      for (const file of jsonFiles) {
        const cacheKey = `json_${file}`;
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          // Si hay datos guardados, usalos
          payload[file] = JSON.parse(cached);
          console.log(`💾 Cargado desde cache: ${file}.json`);
        } else {
          // Si no hay cache, hacé fetch al servidor
          try {
            const res = await fetch(`${DOMAIN}/json/${file}.json`);
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const data = await res.json();
            payload[file] = data;
            localStorage.setItem(cacheKey, JSON.stringify(data));
            console.log(`✅ Cargado desde servidor: ${file}.json`);
          } catch (err) {
            console.error(`⚠️ Error cargando ${file}.json:`, err.message);
            payload[file] = [];
          }
        }
      }

      // Cargar los datos al estado global
      dispatch({
        type: types.LOAD_JSONS,
        payload: {
          listaRutas: payload["listRouters"] || [],
          dataImpactoReal: payload["data_impacto_real"] || [],
          products: payload["products"] || [],
          projects: payload["projects"] || [],
          servicios: payload["servicios"] || [],
          testimonios: payload["testimonios"] || [],
          time_line_history: payload["time_line_history"] || [],
          message: payload["messge"] || [],
          FAQ: payload["FAQ"] || [],
          blogs: payload["blogs"] || [],
          timerProps: payload["timerProps"] || [],
          eventos: payload["eventos"] || [],
          DOMAIN: DOMAIN,
          info_contacto: payload["info_contacto"] || []
        },
      });
    };

    loadAllJsons();
  }, []);

  const setJsonLoad = (value) => {
    dispatch({ type: types.SET_JSON_LOAD, payload: value });
  };

  console.log(state.info_contacto);

  const value = { ...state, setJsonLoad };

  return (
    <ContextJsonLoadContext.Provider value={value}>
      {children}
    </ContextJsonLoadContext.Provider>
  );
};
