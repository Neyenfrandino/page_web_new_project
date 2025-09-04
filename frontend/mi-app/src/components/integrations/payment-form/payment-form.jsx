import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ConectContext } from "../../../context/context_conect_be/context_conect_be";
import PaymentStatus from "../../seccion/payment_status/payment_status";
import './payment-form.scss';

// Iconos SVG
const SecurityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const CreditCardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

const PaymentForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { handlePayment } = useContext(ConectContext);
  
  // Estados para manejar el flujo de pago
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // null, 'success', 'failed'
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || isProcessing) return;

    setIsProcessing(true);
    const card = elements.getElement(CardElement);

    // Datos para el backend
    const paymentData = {
      product: {
        name: product.title,
        amount: product.price * 100, // en centavos
      },
      paymentMethod: {
        billing_details: {
          name: customerName || "Cliente",
          email: customerEmail || "cliente@ejemplo.com",
        },
      },
    };

    console.log("🚀 Datos del pago listos:", paymentData);

    // Llamamos al handlePayment del contexto
    const result = await handlePayment(card, paymentData);
    console.log(result.success)
    
    // Configurar los detalles del pago para mostrar
    const orderDetails = {
      orderId: `#ORD-${Date.now().toString().slice(-8)}`,
      date: new Date().toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      email: customerEmail || "cliente@ejemplo.com",
      items: [
        { 
          name: product.title, 
          quantity: 1, 
          price: product.price 
        }
      ],
      subtotal: product.price,
      tax: product.price * 0.10, // 10% de impuesto
      total: product.price * 1.10
    };

    setPaymentDetails(orderDetails);
    setIsProcessing(false);

    if (result?.success) {
      setPaymentStatus('success');
    } else {
      setPaymentStatus('failed');
    }
  };

  const handleRetry = () => {
    setPaymentStatus(null);
    setPaymentDetails(null);
  };

  const handleNewPayment = () => {
    setPaymentStatus(null);
    setPaymentDetails(null);
    setCustomerEmail("");
    setCustomerName("");
  };

  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Si hay un estado de pago, mostramos el componente de estado
  // if (paymentStatus) {
  //   return (
  //     <div className="stripe-payment-card">
  //       <div className={`payment-result ${paymentStatus === 'success' ? 'success' : 'failed'}`}>
  //         {/* Header con ícono animado */}
  //         <div className={`payment-result__header ${paymentStatus}`}>
  //           <div className="icon-wrapper">
  //             {paymentStatus === 'success' ? (
  //               <svg className="icon success-icon" viewBox="0 0 24 24" fill="none">
  //                 <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
  //                 <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  //               </svg>
  //             ) : (
  //               <svg className="icon failed-icon" viewBox="0 0 24 24" fill="none">
  //                 <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
  //                 <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  //               </svg>
  //             )}
  //           </div>
            
  //           <h1 className="payment-result__title">
  //             {paymentStatus === 'success' ? '¡Pago Exitoso!' : 'Pago Fallido'}
  //           </h1>
            
  //           <p className="payment-result__subtitle">
  //             {paymentStatus === 'success' 
  //               ? 'Tu transacción ha sido procesada correctamente'
  //               : 'No pudimos procesar tu pago'}
  //           </p>
  //         </div>

  //         {/* Información del pedido */}
  //         <div className="order-info">
  //           <div className="order-header">
  //             <span className="order-id">{paymentDetails.orderId}</span>
  //             <span className="order-date">{paymentDetails.date}</span>
  //           </div>

  //           {/* Detalles de productos */}
  //           <div className="items-list">
  //             <h3>Detalles de la compra</h3>
  //             {paymentDetails.items.map((item, index) => (
  //               <div key={index} className="item-row">
  //                 <div className="item-info">
  //                   <span className="item-name">{item.name}</span>
  //                   <span className="item-quantity">x{item.quantity}</span>
  //                 </div>
  //                 <span className="item-price">{formatPrice(item.price)}</span>
  //               </div>
  //             ))}
  //           </div>

  //           {/* Resumen de pago */}
  //           <div className="payment-summary">
  //             <div className="summary-row">
  //               <span>Subtotal</span>
  //               <span>{formatPrice(paymentDetails.subtotal)}</span>
  //             </div>
  //             <div className="summary-row">
  //               <span>Impuestos (10%)</span>
  //               <span>{formatPrice(paymentDetails.tax)}</span>
  //             </div>
  //             <div className="summary-row total">
  //               <span>Total</span>
  //               <span>{formatPrice(paymentDetails.total)}</span>
  //             </div>
  //           </div>

  //           {/* Mensaje de correo */}
  //           <div className="email-notification">
  //             <svg className="email-icon" viewBox="0 0 24 24" fill="none">
  //               <path d="M3 8L12 13L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" 
  //                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  //             </svg>
  //             <div className="email-text">
  //               <p className="email-title">Confirmación enviada</p>
  //               <p className="email-address">
  //                 Recibirás más detalles en <strong>{paymentDetails.email}</strong>
  //               </p>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Acciones */}
  //         <div className="payment-actions">
  //           {paymentStatus === 'success' ? (
  //             <>
  //               <button className="btn btn-primary" onClick={handleNewPayment}>
  //                 Nueva compra
  //               </button>
  //               <button className="btn btn-secondary" onClick={() => window.location.href = '/orders'}>
  //                 Ver mis pedidos
  //               </button>
  //             </>
  //           ) : (
  //             <>
  //               <button className="btn btn-primary" onClick={handleRetry}>
  //                 Reintentar pago
  //               </button>
  //               <button className="btn btn-secondary" onClick={() => window.location.href = '/support'}>
  //                 Contactar soporte
  //               </button>
  //             </>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if ( paymentStatus ) {
    console.log("🚀 Estado de pago actual:", paymentStatus);
    return (
      <PaymentStatus currentStatus={paymentStatus} product={product} />
    );
  }

  // Formulario de pago con diseño similar a MercadoPago
  return (
    <div className="stripe-payment-card">
      {/* Columna de Producto */}
      <div className="stripe-payment-card__product-column">
        <div className="stripe-payment-card__header">
          <CreditCardIcon />
          <div className="stripe-payment-card__header-text">
            <span className="stripe-payment-card__brand-name">Stripe Checkout</span>
            <span className="stripe-payment-card__tagline">Pago seguro y confiable</span>
          </div>
        </div>
        
        <div className="stripe-payment-card__product-info">
          <div className="stripe-payment-card__product-details">
            <h3 className="stripe-payment-card__title">{product.title}</h3>
            
            <div className="stripe-payment-card__price-container">
              <div className="stripe-payment-card__price">{formatPrice(product.price)}</div>
            </div>
            
            {/* Resumen de pago en la columna del producto */}
            <div className="stripe-payment-card__summary">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>{formatPrice(product.price)}</span>
              </div>
              <div className="summary-line">
                <span>Impuestos (10%)</span>
                <span>{formatPrice(product.price * 0.10)}</span>
              </div>
              <div className="summary-line total">
                <span>Total a pagar</span>
                <span>{formatPrice(product.price * 1.10)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="stripe-payment-card__security">
          <SecurityIcon />
          <div>
            <span className="stripe-payment-card__security-title">Compra Protegida</span>
            <span className="stripe-payment-card__security-text">Pago seguro procesado por Stripe</span>
          </div>
        </div>
      </div>

      {/* Columna de Formulario */}
      <div className="stripe-payment-card__form-column">
        <form onSubmit={handleSubmit} noValidate>
          <h3 className="stripe-payment-card__form-title">Completa tu pago</h3>
          <p className="stripe-payment-card__form-subtitle">Ingresa tus datos para procesar el pago</p>
          
          <div className="stripe-form-group">
            <label htmlFor="name">
              Nombre completo
              <span className="stripe-required">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Juan Pérez"
              required
              className="stripe-form-input"
              disabled={isProcessing}
            />
          </div>

          <div className="stripe-form-group">
            <label htmlFor="email">
              Correo electrónico
              <span className="stripe-required">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
              className="stripe-form-input"
              disabled={isProcessing}
            />
            <small className="stripe-form-hint">
              Te enviaremos el comprobante a este correo
            </small>
          </div>

          <div className="stripe-form-group">
            <label>
              Información de tarjeta
              <span className="stripe-required">*</span>
            </label>
            <div className="stripe-card-element-wrapper">
              <CardElement 
                className="stripe-card-element"
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#333333',
                      '::placeholder': {
                        color: '#999999',
                      },
                    },
                    invalid: {
                      color: '#ff4444',
                    },
                  },
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className={`stripe-payment-card__button ${isProcessing ? 'processing' : ''}`}
          >
            {isProcessing ? (
              <>
                <div className="stripe-spinner" aria-hidden="true"></div>
                <span>Procesando pago...</span>
              </>
            ) : (
              <>
                <span>Pagar {formatPrice(product.price * 1.10)}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>

          <p className="stripe-payment-card__terms">
            Al continuar, aceptas nuestros términos y condiciones
          </p>

          <div className="stripe-payment-card__security-info">
            <div className="stripe-security-item">
              <SecurityIcon />
              <span>Conexión segura SSL</span>
            </div>
            <div className="stripe-security-item">
              <CheckIcon />
              <span>Datos protegidos</span>
            </div>
          </div>
        </form>
      </div>

      {/* Overlay de loading */}
      {isProcessing && (
        <div className="stripe-payment-card__loading-overlay" aria-hidden="true">
          <div className="stripe-loading-content">
            <div className="stripe-spinner-large"></div>
            <p>Procesando tu pago...</p>
            <small>No cierres esta ventana</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;