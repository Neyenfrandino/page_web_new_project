import { useReducer, useEffect, createContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const MethodStatePaymentContext = createContext({
  methodStatePayment: null,
  setMethodStatePayment: () => {},
  clearMethodStatePayment: () => {},
});

const initialState = {
  methodStatePayment: null,
};

const TYPE_FORM = {
  SET_METHOD_STATE_PAYMENT: 'SET_METHOD_STATE_PAYMENT',
  CLEAR_METHOD_STATE_PAYMENT: 'CLEAR_METHOD_STATE_PAYMENT',
};

const reducer = (state, action) => {
  switch (action.type) {
    case TYPE_FORM.SET_METHOD_STATE_PAYMENT:
      return { ...state, methodStatePayment: action.payload };
    case TYPE_FORM.CLEAR_METHOD_STATE_PAYMENT:
      return { ...state, methodStatePayment: null };
    default:
      return state;
  }
};

export const MethodStatePaymentContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { methodStatePayment } = state;

  // --- Guarda el método de pago en el contexto y en localStorage ---
  const setMethodStatePayment = (payload) => {
    dispatch({ type: TYPE_FORM.SET_METHOD_STATE_PAYMENT, payload });
    localStorage.setItem('methodStatePayment', JSON.stringify(payload));
  };

  // --- Limpia método de pago del contexto y localStorage ---
  const clearMethodStatePayment = () => {
    dispatch({ type: TYPE_FORM.CLEAR_METHOD_STATE_PAYMENT });
    localStorage.removeItem('methodStatePayment');
  };

  // --- 🔹 Este es el useEffect que te pasé, para cargar localStorage al iniciar ---
  useEffect(() => {
    const storedMethod = localStorage.getItem('methodStatePayment');
    if (storedMethod) {
      try {
        setMethodStatePayment(JSON.parse(storedMethod));
      } catch (error) {
        console.error('Error al parsear localStorage', error);
        localStorage.removeItem('methodStatePayment');
      }
    }
  }, []);

  // --- Redirige a /payment si hay un método seleccionado ---
  useEffect(() => {
    if (methodStatePayment && location.pathname !== '/payment') {
      navigate('/payment');
    }
  }, [methodStatePayment, location.pathname, navigate]);

  // --- Limpia el estado cuando el usuario sale de /payment ---
  useEffect(() => {
    if (location.pathname !== '/payment') {
      clearMethodStatePayment();
    }
  }, [location.pathname]);

  return (
    <MethodStatePaymentContext.Provider
      value={{
        methodStatePayment,
        setMethodStatePayment,
        clearMethodStatePayment,
      }}
    >
      {children}
    </MethodStatePaymentContext.Provider>
  );
};
