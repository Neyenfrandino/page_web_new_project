import { useReducer, useEffect, createContext, use } from 'react';
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

  // --- Guarda el método en el contexto y en localStorage ---
  const setMethodStatePayment = (payload) => {
    dispatch({ type: TYPE_FORM.SET_METHOD_STATE_PAYMENT, payload });
    localStorage.setItem('methodStatePayment', JSON.stringify(payload));
  };

  // --- Limpia método de pago ---
  const clearMethodStatePayment = () => {
    dispatch({ type: TYPE_FORM.CLEAR_METHOD_STATE_PAYMENT });
    localStorage.removeItem('methodStatePayment');
  };

  // useEffect(() => {
  //   clearMethodStatePayment();
  // },[]);

  // --- Cargar desde localStorage solo una vez al iniciar ---
  useEffect(() => {
    const storedMethod = localStorage.getItem('methodStatePayment');
    if (storedMethod) {
      try {
        dispatch({
          type: TYPE_FORM.SET_METHOD_STATE_PAYMENT,
          payload: JSON.parse(storedMethod),
        });
      } catch (error) {
        console.error('Error al parsear localStorage', error);
        localStorage.removeItem('methodStatePayment');
      }
    }
  }, []);

    // --- Redirige a /payment si hay método seleccionado ---
  useEffect(() => {
    if (methodStatePayment && location.pathname !== '/payment') {
      console.log(methodStatePayment, 'method')
      console.log(location.pathname, 'location.pathname')
      console.log('Redirigiendo a /payment por método seleccionado');
      navigate('/payment');
    }
  }, [methodStatePayment]);

  // --- Opcional: Limpia solo cuando sales DEFINITIVAMENTE del flujo de pago ---
  useEffect(() => {
    const isLeavingPaymentFlow =
      !location.pathname.startsWith('/payment') &&
      !location.pathname.startsWith('/checkout');

    if (isLeavingPaymentFlow) {

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
