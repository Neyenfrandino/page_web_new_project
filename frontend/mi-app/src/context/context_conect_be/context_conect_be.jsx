// import React, { createContext, useReducer, useState } from 'react';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// import conect_mercado_pago_BE from '../../utils/mercado_pago/conect_mercago_pago_BE';
// import stripeConnectBE from '../../utils/stripe/stripe_connect_BE';

// export const ConectContext = createContext({
//     handlePayment: () => {},
//     handlePaymentMercadoPago: () => {},
//     preferenceData: {},
// });

// const initialState = {
//     preferenceData: {},
// };

// const TYPE_FORM = {
//     SET_PREFERENCE_DATA: 'SET_PREFERENCE_DATA',
// };

// const reducer = (state, action) => {

//     switch (action.type) {
//         case TYPE_FORM.SET_PREFERENCE_DATA:
//             return { ...state, preferenceData: action.payload };
//     }
// };

// export const ConectContextProvider = ({ children }) => {
//     const stripe = useStripe();
//     const elements = useElements();

//     const [state, dispatch] = useReducer(reducer, initialState);
//     const { preferenceData } = state

//     const setConect = (payload) => {
//         dispatch({ type: TYPE_FORM.SET_PREFERENCE_DATA, payload });
//     };

//     const handlePayment = async (cardElement, state, product) => { 
     
//         if (!stripe || !elements) return;
//         // setIsProcessing(true);

//         try {
//             const { paymentMethod, error } = await stripe.createPaymentMethod({
//                 type: 'card',
//                 card: cardElement,
//                 billing_details: {
//                     name: state.name,
//                     email: state.email,
//                 },
//             });

//             if (error) {
//                 throw new Error(error.message);
//             }
            
//             const requestData = { 
//                 paymentMethod,
//                 product
//             };

//             const paymentResult = await stripeConnectBE(requestData);
//             console.log('paymentResult', paymentResult);


//             // if (paymentResult.success) {
//             //     setPaymentSuccess(true);
//             // } else {
//             //     throw new Error(paymentResult.message);
//             // }
//         } catch (error) {
//             console.error('Error al procesar el pago:', error);
//             // setPaymentSuccess(false);
//         } finally {
//             // setIsProcessing(false);
//         }
//     };


//     console.log(preferenceData)

//     const handlePaymentMercadoPago = async () => {

//         try {
//                 const id = await conect_mercado_pago_BE(preferenceData);
                
//                 if (id && id.trim() !== "") {
//                 setPreferenceId(id);
                
//                 // Redirect to MercadoPago payment flow
//                 window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${id}`;
//                 } else {
//                 throw new Error('Backend did not return a valid preference ID');
//                 }
//             } catch (error) {
//                 console.error('Error processing payment:', error);
//                 setErrors({
//                 ...errors,
//                 general: 'Hubo un problema al procesar la compra. Por favor, intente nuevamente más tarde.'
//                 });
//             } finally {
//                 setLoading(false);
//             }
//     }

//     const values = {
//         handlePayment,
//         setConect
//     };

//     return (
//         <ConectContext.Provider value={values}>
//             {children}
//         </ConectContext.Provider>
//     );
// };




import React, { createContext, useReducer, useCallback } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';

import conect_mercado_pago_BE from '../../utils/mercado_pago/conect_mercago_pago_BE';
import stripeConnectBE from '../../utils/stripe/stripe_connect_BE';

export const ConectContext = createContext({
    handlePayment: () => {},
    handlePaymentMercadoPago: () => {},
    preferenceData: {},
});

const initialState = {
    preferenceData: {},
};

const TYPE_FORM = {
    SET_PREFERENCE_DATA: 'SET_PREFERENCE_DATA',
};

const reducer = (state, action) => {
    switch (action.type) {
        case TYPE_FORM.SET_PREFERENCE_DATA:
            return { ...state, preferenceData: action.payload };
        default:
            return state;
    }
};

export const ConectContextProvider = ({ children }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { preferenceData } = state;

    const setConect = (payload) => {
        dispatch({ type: TYPE_FORM.SET_PREFERENCE_DATA, payload });
    };

    // Usamos useCallback para evitar recrear esta función en cada render.
    const handlePayment = useCallback(
        async (cardElement, state, product) => {
            if (!stripe || !elements) return;

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
                    product,
                };

                const paymentResult = await stripeConnectBE(requestData);

                // Verificar si el pago fue exitoso
                if (paymentResult.success) {
                    // Acción después de pago exitoso
                    console.log('Pago realizado con éxito');
                } else {
                    throw new Error(paymentResult.message);
                }
            } catch (error) {
                console.error('Error al procesar el pago:', error);
            }
        },
        [stripe, elements] // Dependencias de useCallback
    );

    console.log(preferenceData)

    const handlePaymentMercadoPago = useCallback(async () => {
        try {
            const id = await conect_mercado_pago_BE(preferenceData);

            if (id && id.trim() !== "") {
                window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${id}`;
            } else {
                throw new Error('Backend no devolvió un ID de preferencia válido');
            }
        } catch (error) {
            console.error('Error al procesar el pago con Mercado Pago:', error);
            // Mejorar el manejo de errores con feedback para el usuario.
        }
    }, [preferenceData]); // Dependencia de useCallback

    const values = {
        handlePayment,
        handlePaymentMercadoPago,
        setConect,
    };

    return <ConectContext.Provider value={values}>{children}</ConectContext.Provider>;
};
