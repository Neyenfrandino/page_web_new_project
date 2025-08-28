import { useReducer, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const MethodStatePaymentContext = createContext({
    methodStatePayment: null,
    setMethodStatePayment: () => {},
});

const initialState = {
    methodStatePayment: null,
};

const TYPE_FORM = {
    SET_METHOD_STATE_PAYMENT: 'SET_METHOD_STATE_PAYMENT',
};

const reducer = (state, action) => {
    switch (action.type) {
        case TYPE_FORM.SET_METHOD_STATE_PAYMENT:
            return { ...state, methodStatePayment: action.payload };
        default:
            return state;
    }
};

export const MethodStatePaymentContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { methodStatePayment } = state;
   

    const setMethodStatePayment = (payload) => {
        dispatch({ type: TYPE_FORM.SET_METHOD_STATE_PAYMENT, payload });
    };

    useEffect(() => {
        if (methodStatePayment) {
            navigate('/payment');
        }
    }, [methodStatePayment]);

    console.log(methodStatePayment)

    return (
        <MethodStatePaymentContext.Provider value={{ methodStatePayment, setMethodStatePayment }}>
            {children}
        </MethodStatePaymentContext.Provider>
    );
};