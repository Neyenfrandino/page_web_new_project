import React, { createContext, useReducer, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import stripeConnectBE from '../../utils/stripe/stripe_connect_BE';

export const ConectContext = createContext({
    // clientData: {},
    // setConect: () => {},
    // isProcessing: false,
    // paymentSuccess: false,
    handlePayment: () => {},
});

// const initialState = {
//     name: '',
//     email: '',
// };

// const TYPE_FORM = {
//     SET_CLIENT_DATA: 'SET_CLIENT_DATA',
// };

const reducer = (state, action) => {
    switch (action.type) {
        case TYPE_FORM.SET_CLIENT_DATA:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const ConectContextProvider = ({ children }) => {
    const stripe = useStripe();
    const elements = useElements();

    // const [state, dispatch] = useReducer(reducer, initialState);
    // const [isProcessing, setIsProcessing] = useState(false);
    // const [paymentSuccess, setPaymentSuccess] = useState(false);

    // const setConect = (payload) => {
    //     dispatch({ type: TYPE_FORM.SET_CLIENT_DATA, payload });
    // };

    const handlePayment = async (cardElement, state, product) => { 
     
        if (!stripe || !elements) return;
        // setIsProcessing(true);

        try {
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: state.name,
                    email: state.email,
                },
            });

            if (error) {
                throw new Error(error.message);
            }
            
            const requestData = { 
                paymentMethod,
                product
            };

            const paymentResult = await stripeConnectBE(requestData);
            console.log('paymentResult', paymentResult);


            // if (paymentResult.success) {
            //     setPaymentSuccess(true);
            // } else {
            //     throw new Error(paymentResult.message);
            // }
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            // setPaymentSuccess(false);
        } finally {
            // setIsProcessing(false);
        }
    };

    const values = {
        // clientData: state,
        // setConect,
        // isProcessing,
        // paymentSuccess,
        handlePayment,
    };

    return (
        <ConectContext.Provider value={values}>
            {children}
        </ConectContext.Provider>
    );
};

