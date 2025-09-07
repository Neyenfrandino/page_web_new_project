import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './payment_status.scss';

const PaymentStatus = ({ currentStatus = 'success', product = null }) => {
  console.log("🚀 Producto recibido:", product);
  console.log("🚀 Estado inicial:", currentStatus);

  const [status, setStatus] = useState(currentStatus);
  const [isAnimating, setIsAnimating] = useState(true);
  const [summaryExpanded, setSummaryExpanded] = useState(false);

  // Producto por defecto si no se pasa uno
  const defaultProduct = {
    title: "Auriculares Inalámbricos Premium",
    price: 199.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
  };

  const productData = product || defaultProduct;

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Datos de orden dinámicos
  const orderDetails = {
    orderId: `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 99999).toString().padStart(5, '0')}`,
    date: new Date().toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    email: 'cliente@ejemplo.com',
    items: [
      {
        name: productData.title,
        quantity: 1,
        price: productData.price,
        image: productData.image
      }
    ]
  };

  // Calcular totales
  const subtotal = orderDetails.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0; // Envío gratis
  const tax = subtotal * 0.1; // 10% de impuestos
  const total = subtotal + shipping + tax;

  const handleToggleStatus = () => {
    setIsAnimating(true);
    setStatus(status === 'success' ? 'failed' : 'success');
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const toggleSummary = () => {
    setSummaryExpanded(!summaryExpanded);
  };

  const formatPrice = (price) => {
    return productData.currency === 'USD' ? `$${price.toFixed(2)}` : `ARS ${price.toFixed(2)}`;
  };

  return (
    <div className="payment-container-status">
      {/* Elementos decorativos de fondo */}
      <div className="decorative-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className={`payment-card ${status} ${isAnimating ? 'animating' : ''}`}>
        
        {/* Barra superior animada */}
        <div className={`shimmer-bar ${status}`}></div>

        {/* Header con estado */}
        <div className={`payment-header ${status}`}>
          {/* Partículas flotantes */}
          <div className="particles">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="particle"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 15}%`,
                  animationDelay: `${i * 0.3}s`
                }}
              ></div>
            ))}
          </div>

          <div className="icon-wrapper">
            <div className={`main-icon ${status} ${isAnimating ? 'animating' : ''}`}>
              {status === 'success' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22,4 12,14.01 9,11.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></polyline>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              )}
            </div>
          </div>
          
          <h1 className="payment-title">
            {status === 'success' ? '¡Pago Exitoso!' : 'Pago Fallido'}
          </h1>
          
          <p className="payment-subtitle">
            {status === 'success' 
              ? 'Tu transacción ha sido procesada correctamente'
              : 'No pudimos procesar tu pago. Intenta nuevamente.'}
          </p>
        </div>

        {/* Información del pedido */}
        <div className="order-info">
          
          {/* Header de la orden */}
          <div className="order-header">
            <div className="order-section">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
              <span className="order-id">{orderDetails.orderId}</span>
            </div>
            <div className="date-section">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{orderDetails.date}</span>
            </div>
          </div>

          {/* Sección de productos */}
          <div className="items-section">
            <div className="section-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="m1 1 4 4 8 8v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8l-8-8-4-4z"></path>
              </svg>
              <h3>Productos</h3>
            </div>
            
            {orderDetails.items.map((item, index) => (
              <div key={index} className="product-item">
                <div className="product-image">
                  <img src={item.image} alt={item.name} />
                  <div className="quantity-badge">{item.quantity}</div>
                </div>
                <div className="product-details">
                  <div className="product-name">{item.name}</div>
                  <div className="product-quantity">Cantidad: {item.quantity}</div>
                </div>
                <div className="product-price">
                  {formatPrice(item.price)}
                </div>
              </div>
            ))}
          </div>

          {/* Resumen expandible */}
          <div className="payment-summary">
            <button className="summary-toggle" onClick={toggleSummary}>
              <span className="summary-title">Resumen del pedido</span>
              <svg 
                className={`toggle-arrow ${summaryExpanded ? 'expanded' : ''}`}
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
            
            <div className={`summary-details ${summaryExpanded ? 'expanded' : 'collapsed'}`}>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="summary-row free-shipping">
                <span>Envío</span>
                <span className="value">¡Gratis!</span>
              </div>
              <div className="summary-row">
                <span>Impuestos</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Notificación por correo */}
          <div className="email-notification">
            <svg className="email-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <div className="email-content">
              <div className="email-title">Confirmación enviada</div>
              <div className="email-address">
                Recibirás los detalles en <span className="highlight">{orderDetails.email}</span>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="action-buttons">
            {status === 'success' ? (
              <>
                <Link className={`action-btn primary ${status}`} to="/servicios">
                  Seguir Explorando
                </Link>
              </>
            ) : (
              <>
                <button className={`action-btn primary ${status}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}>
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M20.49 9a9 9 0 0 0-2.12-5.12 9 9 0 0 0-6.74-2.88A9 9 0 0 0 1.89 14.98 8.94 8.94 0 0 0 8.06 19a8.86 8.86 0 0 0 4.5-1.22"></path>
                  </svg>
                  Reintentar pago
                </button>
                <button className={`action-btn secondary ${status}`}>
                  Contactar soporte
                </button>
              </>
            )}
          </div>
        </div>

        {/* Botón demo para alternar estado */}
        <button 
          className="demo-toggle"
          onClick={handleToggleStatus}
          title="Cambiar estado de demostración"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M20.49 9a9 9 0 0 0-2.12-5.12 9 9 0 0 0-6.74-2.88A9 9 0 0 0 1.89 14.98 8.94 8.94 0 0 0 8.06 19a8.86 8.86 0 0 0 4.5-1.22"></path>
          </svg>
          {status === 'success' ? 'Ver estado fallido' : 'Ver estado exitoso'}
        </button>
      </div>
    </div>
  );
};

export default PaymentStatus;