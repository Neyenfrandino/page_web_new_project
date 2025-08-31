import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { SiMercadopago } from 'react-icons/si';

// Contexto y servicios
import { ConectContext } from '../../../context/context_conect_be/context_conect_be';
import conect_mercado_pago_BE from '../../../services/mercado_pago/conect_mercago_pago_BE';

import './mercado_pago_card.scss';

// --- Constantes ---
const PAYMENT_METHODS_ICONS = [
  { name: 'visa', url: 'https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg' },
  { name: 'master', url: 'https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-m.svg' },
  { name: 'amex', url: 'https://http2.mlstatic.com/storage/logos-api-admin/df15a0d0-111f-11ed-83b6-8905a394035a-m.svg' },
  { name: 'naranja', url: 'https://http2.mlstatic.com/storage/logos-api-admin/6ba85fd0-14a2-11ec-ae33-9b2b53f6c73f-m.svg' },
  { name: 'cabal', url: 'https://http2.mlstatic.com/storage/logos-api-admin/b2c93a40-f3be-11eb-9984-b7076edb0bb7-m.svg' },
  { name: 'mercadopago', url: 'https://http2.mlstatic.com/storage/logos-api-admin/443c0310-6776-11ec-813b-8542a9aff8ea-m.svg' }
];

const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[0-9\s\-()]{7,}$/,
  name: /^[a-zA-ZÀ-ÿ\s]{2,50}$/
};

// --- Iconos SVG como componentes ---
const SecurityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// --- Hook personalizado para debounce ---
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};

// --- Componente Principal ---
const MercadoPagoCard = ({ product, onSuccess, onError, onPending, customStyles }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  const MERCADOPAGO_PUBLIC_KEY = process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY || 'APP_USR-f9bb7112-a269-43be-93b4-bf85e76314f7';
  const MAX_RETRY_ATTEMPTS = 3;

  // Debounce para validación en tiempo real
  const debouncedFormData = useDebounce(formData, 500);

  // Inicialización de MercadoPago
  useEffect(() => {
    try {
      initMercadoPago(MERCADOPAGO_PUBLIC_KEY, { locale: 'es-AR' });
    } catch (error) {
      console.error('Error al inicializar MercadoPago:', error);
      setApiError('Error al cargar el sistema de pagos. Por favor, recarga la página.');
    }
  }, [MERCADOPAGO_PUBLIC_KEY]);

  // Validación en tiempo real con debounce
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      const validationErrors = validateForm(debouncedFormData, touched);
      setErrors(validationErrors);
    }
  }, [debouncedFormData, touched]);

  // Función de validación mejorada
  const validateForm = useCallback((values, touchedFields = {}) => {
    const newErrors = {};
    
    // Validar nombre
    if (touchedFields.nombre) {
      if (!values.nombre.trim()) {
        newErrors.nombre = 'El nombre es requerido';
      } else if (values.nombre.trim().length < 2) {
        newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
      } else if (!VALIDATION_PATTERNS.name.test(values.nombre)) {
        newErrors.nombre = 'El nombre contiene caracteres no válidos';
      }
    }
    
    // Validar email
    if (touchedFields.email) {
      if (!values.email.trim()) {
        newErrors.email = 'El email es requerido';
      } else if (!VALIDATION_PATTERNS.email.test(values.email)) {
        newErrors.email = 'El formato del email no es válido';
      }
    }
    
    // Validar teléfono
    if (touchedFields.telefono) {
      if (!values.telefono.trim()) {
        newErrors.telefono = 'El teléfono es requerido';
      } else if (!VALIDATION_PATTERNS.phone.test(values.telefono)) {
        newErrors.telefono = 'El formato del teléfono no es válido';
      }
    }
    
    return newErrors;
  }, []);

  // Manejador de cambios con sanitización
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    
    // Sanitización básica según el campo
    if (name === 'nombre') {
      sanitizedValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    } else if (name === 'telefono') {
      sanitizedValue = value.replace(/[^0-9\s\-+()]/g, '');
    }
    
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    setApiError(''); // Limpiar errores de API al escribir
  }, []);

  // Manejador de blur para marcar campos como "tocados"
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  // Función de reintento con backoff exponencial
  const retryRequest = useCallback(async (requestFn, attemptNumber = 1) => {
    try {
      return await requestFn();
    } catch (error) {
      if (attemptNumber < MAX_RETRY_ATTEMPTS) {
        const delay = Math.pow(2, attemptNumber) * 1000; // Backoff exponencial
        await new Promise(resolve => setTimeout(resolve, delay));
        return retryRequest(requestFn, attemptNumber + 1);
      }
      throw error;
    }
  }, []);

  // Manejador del formulario mejorado
  const handleBuy = useCallback(async (e) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados
    const allTouched = { nombre: true, email: true, telefono: true };
    setTouched(allTouched);
    
    // Validar todos los campos
    const formErrors = validateForm(formData, allTouched);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Focus en el primer campo con error
      const firstErrorField = Object.keys(formErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setIsLoading(true);
    setApiError('');
    setSuccessMessage('');

    const preferenceData = {
      items: [{
        title: product.title || 'Producto',
        quantity: product.quantity || 1,
        unit_price: parseFloat(product.price) || 0,
        currency_id: product.currency || 'ARS',
        description: product.subtitle || '',
        picture_url: product.image || null,
      }],
      payer: {
        name: formData.nombre.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: { 
          number: formData.telefono.trim().replace(/\D/g, '') 
        },
      },
      back_urls: {
        success: `${window.location.origin}/success`,
        failure: `${window.location.origin}/failure`,
        pending: `${window.location.origin}/pending`,
      },
      auto_return: 'approved',
      notification_url: process.env.REACT_APP_NOTIFICATION_URL,
      statement_descriptor: product.title?.substring(0, 22), // Máx 22 caracteres
      external_reference: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    try {
      const response = await retryRequest(() => conect_mercado_pago_BE(preferenceData));
      
      if (response?.init_point) {
        setSuccessMessage('Redirigiendo a Mercado Pago...');
        onSuccess?.();
        
        // Pequeño delay para mostrar el mensaje
        setTimeout(() => {
          window.location.href = response.init_point;
        }, 500);
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      
      // Mensajes de error más específicos
      let errorMessage = 'No se pudo procesar el pago. ';
      
      if (!navigator.onLine) {
        errorMessage = 'Sin conexión a internet. Verifica tu conexión e intenta nuevamente.';
      } else if (error.response?.status === 429) {
        errorMessage = 'Demasiados intentos. Por favor, espera un momento e intenta nuevamente.';
      } else if (error.response?.status >= 500) {
        errorMessage = 'El servidor está experimentando problemas. Intenta más tarde.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage += 'Por favor, intenta nuevamente.';
      }
      
      setApiError(errorMessage);
      onError?.(error);
      setRetryCount(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  }, [formData, product, onSuccess, onError, retryRequest]);

  // Formatear precio con manejo de errores
  const formatPrice = useCallback((price, currency) => {
    try {
      const numPrice = parseFloat(price);
      if (isNaN(numPrice)) return 'Precio no disponible';
      
      return numPrice.toLocaleString('es-AR', {
        style: 'currency',
        currency: currency || 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    } catch (error) {
      console.error('Error al formatear precio:', error);
      return `${currency || 'ARS'} ${price}`;
    }
  }, []);

  const formattedPrice = useMemo(() => formatPrice(product.price, product.currency), [product.price, product.currency, formatPrice]);

  // Calcular descuento si existe precio original
  const discount = useMemo(() => {
    if (product.originalPrice && product.price) {
      const original = parseFloat(product.originalPrice);
      const current = parseFloat(product.price);
      if (!isNaN(original) && !isNaN(current) && original > current) {
        return Math.round(((original - current) / original) * 100);
      }
    }
    return null;
  }, [product.originalPrice, product.price]);

  return (
    <div className={`mp-card ${customStyles?.card || ''}`}>
      {/* Columna de Producto */}
      <div className="mp-card__product-column">
        <div className="mp-card__header">
          <SiMercadopago size={32} className="mp-card__logo" />
          <div className="mp-card__header-text">
            <span className="mp-card__brand-name">Mercado Pago</span>
            <span className="mp-card__tagline">La forma más segura de pagar</span>
          </div>
        </div>
        
        <div className="mp-card__product-info">
          {product.image && (
            <div className="mp-card__image-wrapper">
              <img 
                src={product.image} 
                alt={product.title}
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x225.png?text=Imagen+no+disponible';
                }}
              />
              {discount && (
                <div className="mp-card__discount-badge">
                  -{discount}%
                </div>
              )}
            </div>
          )}
          
          <div className="mp-card__product-details">
            {product.badge && (
              <div className="mp-card__badge">{product.badge}</div>
            )}
            
            <h3 className="mp-card__title">{product.title}</h3>
            
            {product.subtitle && (
              <p className="mp-card__subtitle">{product.subtitle}</p>
            )}
            
            <div className="mp-card__price-container">
              {product.originalPrice && (
                <span className="mp-card__original-price">
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              )}
              <div className="mp-card__price">{formattedPrice}</div>
              {product.installments && (
                <p className="mp-card__installments">
                  o hasta {product.installments}x sin interés
                </p>
              )}
            </div>
            
            {product.stock && product.stock < 10 && (
              <div className="mp-card__stock-warning">
                <InfoIcon />
                ¡Últimas {product.stock} unidades disponibles!
              </div>
            )}
          </div>
          
          {product.originalData?.highlights && product.originalData.highlights.length > 0 && (
            <div className="mp-card__highlights">
              <h4>Este producto incluye:</h4>
              <ul>
                {product.originalData.highlights.slice(0, 5).map((item, index) => (
                  <li key={index}>
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Métodos de pago */}
        <div className="mp-card__payment-methods">
          <p>Medios de pago</p>
          <div className="mp-card__payment-icons">
            {PAYMENT_METHODS_ICONS.map((method) => (
              <img 
                key={method.name}
                src={method.url}
                alt={method.name}
                title={method.name}
                loading="lazy"
              />
            ))}
          </div>
        </div>
        
        <div className="mp-card__security">
          <SecurityIcon />
          <div>
            <span className="mp-card__security-title">Compra Protegida</span>
            <span className="mp-card__security-text">Tus datos están seguros con nosotros</span>
          </div>
        </div>
      </div>

      {/* Columna de Formulario */}
      <div className="mp-card__form-column">
        <form onSubmit={handleBuy} noValidate>
          <h3 className="mp-card__form-title">Completa tus datos</h3>
          <p className="mp-card__form-subtitle">Necesitamos algunos datos para procesar tu pago</p>
          
          <div className="mp-form-group">
            <label htmlFor="nombre">
              Nombre completo
              <span className="mp-required">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ej: Juan Pérez"
              value={formData.nombre}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.nombre && touched.nombre ? 'has-error' : ''}
              autoComplete="name"
              aria-invalid={!!(errors.nombre && touched.nombre)}
              aria-describedby={errors.nombre && touched.nombre ? 'nombre-error' : undefined}
              required
              maxLength={50}
            />
            {errors.nombre && touched.nombre && (
              <p id="nombre-error" className="mp-error-message" role="alert">
                {errors.nombre}
              </p>
            )}
          </div>

          <div className="mp-form-group">
            <label htmlFor="email">
              Correo electrónico
              <span className="mp-required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.email && touched.email ? 'has-error' : ''}
              autoComplete="email"
              aria-invalid={!!(errors.email && touched.email)}
              aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
              required
            />
            {errors.email && touched.email && (
              <p id="email-error" className="mp-error-message" role="alert">
                {errors.email}
              </p>
            )}
            <small className="mp-form-hint">
              Te enviaremos el comprobante de pago a este correo
            </small>
          </div>

          <div className="mp-form-group">
            <label htmlFor="telefono">
              Teléfono
              <span className="mp-required">*</span>
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              placeholder="Ej: 11 2345-6789"
              value={formData.telefono}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.telefono && touched.telefono ? 'has-error' : ''}
              autoComplete="tel"
              aria-invalid={!!(errors.telefono && touched.telefono)}
              aria-describedby={errors.telefono && touched.telefono ? 'telefono-error' : undefined}
              required
            />
            {errors.telefono && touched.telefono && (
              <p id="telefono-error" className="mp-error-message" role="alert">
                {errors.telefono}
              </p>
            )}
          </div>

          {successMessage && (
            <div className="mp-success-message">
              <CheckIcon />
              <span>{successMessage}</span>
            </div>
          )}

          {apiError && (
            <div className="mp-api-error" role="alert">
              <ErrorIcon />
              <div>
                <span>{apiError}</span>
                {retryCount > 0 && retryCount < MAX_RETRY_ATTEMPTS && (
                  <button 
                    type="button" 
                    className="mp-retry-link"
                    onClick={() => setApiError('')}
                  >
                    Intentar nuevamente
                  </button>
                )}
              </div>
            </div>
          )}
          
          <button 
            type="submit" 
            className="mp-card__button" 
            disabled={isLoading || !!successMessage}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <div className="mp-spinner" aria-hidden="true"></div>
                <span>Procesando pago...</span>
              </>
            ) : successMessage ? (
              <>
                <CheckIcon />
                <span>Redirigiendo...</span>
              </>
            ) : (
              <>
                <span>Pagar {formattedPrice}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
          
          <p className="mp-card__terms">
            Al continuar, aceptas los{' '}
            <a href="https://www.mercadopago.com.ar/ayuda/terminos-y-condiciones_299" target="_blank" rel="noopener noreferrer">
              Términos y Condiciones
            </a>{' '}
            de Mercado Pago
          </p>
        </form>
      </div>
    </div>
  );
};

// --- PropTypes mejorados ---
MercadoPagoCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currency: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    image: PropTypes.string,
    badge: PropTypes.string,
    quantity: PropTypes.number,
    installments: PropTypes.number,
    stock: PropTypes.number,
    originalData: PropTypes.shape({
      highlights: PropTypes.arrayOf(PropTypes.string),
    })
  }).isRequired,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onPending: PropTypes.func,
  customStyles: PropTypes.shape({
    card: PropTypes.string,
  })
};

MercadoPagoCard.defaultProps = {
  product: {
    title: 'Producto',
    price: 0,
    currency: 'ARS',
    subtitle: '',
    image: null,
    badge: null,
    quantity: 1,
    originalData: { highlights: [] }
  },
  onSuccess: () => {},
  onError: () => {},
  onPending: () => {},
  customStyles: {}
};

export default MercadoPagoCard;