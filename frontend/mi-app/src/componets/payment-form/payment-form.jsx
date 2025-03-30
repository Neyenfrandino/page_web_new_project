import React, { useReducer, useState, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ConectContext } from '../../context/context_conect_be/context_conect_be';
import './payment-form.scss';

const initialState = {
    name: '',
    email: '',
    errors: {}
};

const FORM_ACTIONS = {
    SET_FIELD: 'SET_FIELD',
    SET_ERRORS: 'SET_ERRORS'
};

const formReducer = (state, action) => {
    switch (action.type) {
        case FORM_ACTIONS.SET_FIELD:
            return { ...state, [action.field]: action.value };
        case FORM_ACTIONS.SET_ERRORS:
            return { ...state, errors: action.errors };
        default:
            return state;
    }
};

const PaymentForm = () => {

    const elements = useElements();
    const { handlePayment } = useContext(ConectContext);

    const [state, dispatch] = useReducer(formReducer, initialState);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        dispatch({ type: FORM_ACTIONS.SET_FIELD, field: e.target.name, value: e.target.value });
    };

    const product = {
        name: "Producto",
        amount: 1000,  // Precio en centavos (1000 = $10.00)
        currency: "usd",
        interval: "month",
        interval_count: 1,
        billing_cycle_anchor: 1672531200, // Fecha en formato UNIX
        metadata: {
            order_id: "12345",
            description: "Producto de prueba",
        }
    }

    const handleSubmit =  (event) => {
        event.preventDefault();

        const cardElement = elements.getElement(CardElement);
        if (!cardElement){
            alert('Error al procesar el pago');
            return;
        }
        
        handlePayment(cardElement, state, product);
    };

    return (
        <div className="payment-form__container">
            <form className="form__container" onSubmit={handleSubmit}>
                <h2>Información de Pago</h2>
                <div className='form__products_content'>
                    <h3>Products</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget ultrices ultricies, nunc nisi aliquet nisi, euismod aliquam nisl nunc euismod.</p>
                    <img src="img/3.png" alt="logo" className="img-product" />

                    <div className="form__products_content--price">
                        <p>Price per unit :</p>
                        <p>$10.00</p>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Nombre completo</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                        placeholder="Ingresa tu nombre completo"
                        className={state.errors.name ? 'input-error' : ''}
                    />
                    {state.errors.name && <div className="error-message">{state.errors.name}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                        placeholder="ejemplo@correo.com"
                        className={state.errors.email ? 'input-error' : ''}
                    />
                    {state.errors.email && <div className="error-message">{state.errors.email}</div>}
                </div>

                <div className="form-group">
                    <label>Detalles de la tarjeta</label>
                    <div className="card-element-container">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#32325d',
                                        '::placeholder': { color: '#aab7c4' },
                                    },
                                    invalid: { color: '#fa755a', iconColor: '#fa755a' },
                                },
                                disableLink: true,
                            }}
                        />
                    </div>
                </div>

                <button className="payment-form__button" type="submit">
                    {isLoading ? 'Procesando...' : 'Completar Pago'}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
