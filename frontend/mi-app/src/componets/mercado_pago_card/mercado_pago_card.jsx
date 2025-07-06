import React, { useState, useEffect, useContext } from 'react';

import { ConectContext } from '../../context/context_conect_be/context_conect_be';
import { initMercadoPago } from '@mercadopago/sdk-react';
import conect_mercado_pago_BE from '../../utils/mercado_pago/conect_mercago_pago_BE';

import { SiMercadopago } from 'react-icons/si';
import './mercado_pago_card.scss';

const MercadoPagoCard = ({ product }) => {
  const { setConect } = useContext(ConectContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Initialize MercadoPago on component mount
    initMercadoPago('APP_USR-f9bb7112-a269-43be-93b4-bf85e76314f7', {
      locale: 'es-AR',
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Validate field on change if form was already submitted once
    if (formSubmitted) {
      validateField(name, value);
    }
  };

  const validateField = (name, value) => {
    let error = null;
    
    switch (name) {
      case 'nombre':
        error = !value.trim() ? 'El nombre es requerido' : null;
        break;
      case 'email':
        if (!value.trim()) {
          error = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Email inválido';
        }
        break;
      case 'telefono':
        error = !value.trim() ? 'El teléfono es requerido' : null;
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    return !error;
  };

  const validateForm = () => {
    const nombreValid = validateField('nombre', formData.nombre);
    const emailValid = validateField('email', formData.email);
    const telefonoValid = validateField('telefono', formData.telefono);
    
    setFormSubmitted(true);
    return nombreValid && emailValid && telefonoValid;
  };

  const handleBuy = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Create preference data with product information
    const preferenceData = {
      items: [
        {
          title: product?.title || 'Producto',
          quantity: product?.quantity || 1,
          unit_price: parseFloat(product?.unit_price) || 100,
          currency_id: 'ARS',
        },
      ],
      back_urls: {
        success: 'https://www.youtube.com',
        failure: 'https://www.youtube.com',
        pending: 'https://www.youtube.com',
      },
      auto_return: 'approved',
    };

    if (preferenceData) {
      setConect(preferenceData);
    }
  };

  // Get formatted price with thousands separator
  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
 
  return (
    <div className="mp-card">
      <div className="mp-card__container mp-card__container--two-columns">
        <div className="mp-card__header">
          <div className="mp-card__brand">
            <SiMercadopago className="mp-card__logo-icon" size={24} color="#009ee3" />
            <span className="mp-card__brand-name">Mercado Pago</span>
          </div>
        </div>
        
        <div className="mp-card__content-wrapper">
          {/* Left Column - Product Info */}
          <div className="mp-card__product-column">
            <div className="mp-card__product">
              {product?.image && (
                <div className="mp-card__image-wrapper">
                  <img 
                    className="mp-card__image" 
                    src={product.image} 
                    alt={product?.name || 'Producto'} 
                    loading="lazy"
                  />
                </div>
              )}
              
              <div className="mp-card__product-details">
                <h3 className="mp-card__product-name">{product?.title || 'Producto'}</h3>
                <div className="mp-card__product-price">
                  ${product?.unit_price ? formatPrice(product.unit_price) : '0.00'}
                </div>
              </div>
              
              <div className="mp-card__security mp-card__security--product">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <span>Pago seguro vía Mercado Pago</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Form */}
          <div className="mp-card__form-column">
            <form className="mp-card__form" onSubmit={handleBuy} noValidate>
              <div className="mp-form-group">
                <label htmlFor="nombre" className="mp-form-label">Nombre completo</label>
                <input 
                  type="text" 
                  id="nombre"
                  name="nombre" 
                  placeholder="Ingrese su nombre" 
                  className={`mp-form-input ${errors.nombre ? 'mp-form-input--error' : ''}`}
                  value={formData.nombre}
                  onChange={handleInputChange}
                  autoComplete="name"
                  required
                />
                {errors.nombre && <div className="mp-error-message">{errors.nombre}</div>}
              </div>
              
              <div className="mp-form-group">
                <label htmlFor="email" className="mp-form-label">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  placeholder="ejemplo@correo.com" 
                  className={`mp-form-input ${errors.email ? 'mp-form-input--error' : ''}`}
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required
                />
                {errors.email && <div className="mp-error-message">{errors.email}</div>}
              </div>
              
              <div className="mp-form-group">
                <label htmlFor="telefono" className="mp-form-label">Teléfono de contacto</label>
                <input 
                  type="tel" 
                  id="telefono"
                  name="telefono" 
                  placeholder="Ingrese su número telefónico" 
                  className={`mp-form-input ${errors.telefono ? 'mp-form-input--error' : ''}`}
                  value={formData.telefono}
                  onChange={handleInputChange}
                  autoComplete="tel"
                  required
                />
                {errors.telefono && <div className="mp-error-message">{errors.telefono}</div>}
              </div>
              
              {errors.general && (
                <div className="mp-general-error">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{errors.general}</span>
                </div>
              )}
              
              <button 
                type="submit" 
                className="mp-card__button" 
                disabled={loading}
                aria-label={loading ? "Procesando pago" : "Pagar con Mercado Pago"}
              >
                {loading ? (
                  <>
                    <span className="mp-button-loader"></span>
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <SiMercadopago size={35} className="mp-button-icon" />
                    <span>Pagar con Mercado Pago</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MercadoPagoCard;