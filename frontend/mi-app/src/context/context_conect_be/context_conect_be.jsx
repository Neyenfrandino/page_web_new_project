import React, { createContext, useReducer, useCallback } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import stripeConnectBE from '../../services/stripe/stripe_connect_BE';
import conect_mercado_pago_BE from '../../services/mercado_pago/conect_mercago_pago_BE';

import { initMercadoPago } from '@mercadopago/sdk-react';


export const ConectContext = createContext({
  handlePayment: () => {},
  handlePaymentMecadoPago: () => {},
  setConect: () => {},
});

const initialState = { 
    preferenceData: {},
    successPayment: null,
};
const TYPE_FORM = { 
    SET_PREFERENCE_DATA: 'SET_PREFERENCE_DATA', 
    SET_SUCCESS_PAYMENT_MERCADO_PAGO: 'SET_SUCCESS_PAYMENT_MERCADO_PAGO',
    SET_SUCCESS_PAYMENT: 'SET_SUCCESS_PAYMENT' 
};

const reducer = (state, action) => {
  switch (action.type) {
    case TYPE_FORM.SET_PREFERENCE_DATA:
      return { ...state, preferenceData: action.payload };
    case TYPE_FORM.SET_SUCCESS_PAYMENT:
      return { ...state, successPayment: action.payload };
    case TYPE_FORM.SET_SUCCESS_PAYMENT_MERCADO_PAGO:
      return { ...state, successPaymentMercadoPago: action.payload };
    default:
      return state;
  }
};

export const ConectContextProvider = ({ children }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [state, dispatch] = useReducer(reducer, initialState);

    const setConect = (payload) => dispatch({ type: TYPE_FORM.SET_PREFERENCE_DATA, payload });
    const setSuccessPayment = (payload) => dispatch({ type: TYPE_FORM.SET_SUCCESS_PAYMENT, payload });
    const setSuccessPaymentMercadoPago = (payload) => dispatch({ type: TYPE_FORM.SET_SUCCESS_PAYMENT_MERCADO_PAGO, payload });

    const handlePayment = useCallback(
        async (cardElement, paymentData) => {
        if (!stripe || !elements) return;

        try {
            console.log("🚀 Datos del pago:", paymentData);

            // 1️⃣ Pedimos al backend que cree el PaymentIntent
            const paymentResult = await stripeConnectBE({
                product: paymentData.product,
                billing_details: paymentData.paymentMethod.billing_details
            });



            if (!paymentResult.clientSecret) {
                throw new Error(paymentResult.error || "No se recibió clientSecret del backend");
            }

            console.log("🔑 ClientSecret recibido:", paymentResult.clientSecret);

            // 2️⃣ Confirmamos el pago con Stripe
            const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(
            paymentResult.clientSecret,
            {
                payment_method: {
                card: cardElement,
                billing_details: paymentData.paymentMethod.billing_details,
                },
            }
            );
 
            if (stripeError) {
                console.error("❌ Error en el pago:", stripeError.message);
                return { success: false, error: stripeError.message };
            }

            if (paymentIntent.status === "succeeded") {
                console.log("💰 Pago completado con éxito:", paymentIntent);
                setSuccessPayment(paymentIntent);   
                return { success: true, paymentIntent };
            }
        } catch (err) {
            console.error("❌ Error en handlePayment:", err.message || err);
            return { success: false, error: err.message || err };
        }
        },
        [stripe, elements]
    );

    const handlePaymentMercadoPago = useCallback(
      async (item) => {
        if (! state.successPaymentMercadoPago) return;

        try {
          const data = await conect_mercado_pago_BE.createPreference(item);

          // Validación de la respuesta
          if (!data.success || !data.data?.preference_id) {
            throw new Error("No se recibió un preferenceId válido desde el backend");
          }

          // Obtengo los datos necesarios
          const { preference_id, init_point } = data.data;

          console.log("✅ Preference ID:", preference_id);
          console.log("🔗 URL de checkout:", init_point);

          // Redirigir automáticamente al checkout de Mercado Pago
          window.location.href = init_point;

          return { success: true, preference_id, init_point };
        } catch (err) {
          console.error("❌ Error en handlePaymentMercadoPago:", err.message || err);
          return { success: false, error: err.message || err };
        }
      },
      [ state.successPaymentMercadoPago ]
    );


    return (
        <ConectContext.Provider value={{ handlePayment, setConect, handlePaymentMercadoPago, setSuccessPaymentMercadoPago }}>
        {children}
        </ConectContext.Provider>
    );
};
