import { useReducer, useEffect, createContext, useContext } from 'react';

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
    const [state, dispatch] = useReducer(reducer, initialState);
    const { methodStatePayment } = state;

    const setMethodStatePayment = (payload) => {
        dispatch({ type: TYPE_FORM.SET_METHOD_STATE_PAYMENT, payload });
    };
    console.log(methodStatePayment)

    return (
        <MethodStatePaymentContext.Provider value={{ methodStatePayment, setMethodStatePayment }}>
            {children}
        </MethodStatePaymentContext.Provider>
    );
};