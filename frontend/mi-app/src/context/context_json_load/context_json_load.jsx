// src/context/ContextJsonLoadContext.jsx
import React, { createContext, useReducer, useState, useEffect } from 'react';

// Importación de JSONs
import dataImpactoReal from '../../json/data_impacto_real.json';
import listRouters from '../../json/listRouters.json';
import products from '../../json/products.json';
import projects from '../../json/projects.json';
import servicios from '../../json/servicios.json';
import testimonios from '../../json/testimonios.json';
import time_line_history from '../../json/time_line_history.json';

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
};

// Tipos de acciones
const types = {
  SET_JSON_LOAD: 'SET_JSON_LOAD',
  LOAD_JSONS: 'LOAD_JSONS',
};

// Reducer
const ContextJsonLoadReducer = (state, action) => {
  switch (action.type) {
    case types.SET_JSON_LOAD:
      return {
        ...state,
        json_load: action.payload,
      };
    case types.LOAD_JSONS:
      return {
        ...state,
        ...action.payload,
        json_load: true,
      };
    default:
      return state;
  }
};

// Provider
export const ContextJsonLoadProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ContextJsonLoadReducer, initialState);

  useEffect(() => {
    // Simulamos "cargar los JSON" al iniciar
    const loadJsons = () => {
      dispatch({
        type: types.LOAD_JSONS,
        payload: {
          listaRutas: listRouters,
          dataImpactoReal: dataImpactoReal,
          products: products,
          projects: projects,
          servicios: servicios,
          testimonios: testimonios,
          time_line_history: time_line_history,
        },
      });
    };

    loadJsons();
  }, []);

  const setJsonLoad = (value) => {
    dispatch({
      type: types.SET_JSON_LOAD,
      payload: value,
    });
  };

  const value = {
    ...state,
    setJsonLoad,
  };

  console.log(dataImpactoReal);

  return (
    <ContextJsonLoadContext.Provider value={value}>
      {children}
    </ContextJsonLoadContext.Provider>
  );
};
