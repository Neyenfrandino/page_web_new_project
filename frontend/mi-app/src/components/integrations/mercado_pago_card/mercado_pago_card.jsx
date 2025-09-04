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

const FORM_CONFIG = {
  debounceDelay: 500,
  maxRetryAttempts: 3,
  requestTimeout: 30000,
  maxInputLengths: {
    nombre: 50,
    email: 100,
    telefono: 20
  }
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

const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
    <path d="M12 9v4"/>
    <path d="m12 17 .01 0"/>
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

// --- Hook para manejo de estado del componente ---
const useComponentState = (initialProduct) => {
  const [componentState, setComponentState] = useState('form'); // 'form', 'loading', 'success', 'error'
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
  const [initializationError, setInitializationError] = useState('');

  return {
    componentState, setComponentState,
    formData, setFormData,
    errors, setErrors,
    touched, setTouched,
    isLoading, setIsLoading,
    apiError, setApiError,
    successMessage, setSuccessMessage,
    retryCount, setRetryCount,
    initializationError, setInitializationError
  };
};

// --- Función para normalizar datos del producto ---
const normalizeProductData = (productData) => {
  try {
    // Si viene del Payment component con itemData
    if (productData?.itemData) {
      return productData.itemData;
    }

    // Si viene con normalizedItem
    if (productData?.normalizedItem) {
      return {
        ...productData.normalizedItem,
        ...productData.normalizedItem.originalData
      };
    }

    // Si viene con item directo
    if (productData?.item) {
      return productData.item;
    }

    // Si es el producto directo
    return productData;
  } catch (error) {
    console.error('Error normalizando datos del producto:', error);
    return productData;
  }
};

// --- Componente Principal Mejorado ---
const MercadoPagoCard = ({ 
  product: rawProduct, 
  itemData,
  onSuccess, 
  onError, 
  onPending,
  isLoading: externalLoading,
  setIsLoading: setExternalLoading,
  customStyles,
  showProductSummary = true,
  enableRetry = true
}) => {
  // Normalizar datos del producto
  const product = useMemo(() => {
    const normalized = normalizeProductData(itemData || rawProduct);
    
    // Validar campos requeridos
    if (!normalized?.id || !normalized?.title || (!normalized?.price && normalized?.price !== 0)) {
      console.error('Datos del producto incompletos:', normalized);
    }
    
    return normalized;
  }, [itemData, rawProduct]);

  // Estados del componente
  const {
    componentState, setComponentState,
    formData, setFormData,
    errors, setErrors,
    touched, setTouched,
    isLoading: internalLoading, setIsLoading: setInternalLoading,
    apiError, setApiError,
    successMessage, setSuccessMessage,
    retryCount, setRetryCount,
    initializationError, setInitializationError
  } = useComponentState(product);

  // Sincronizar loading states
  const isLoading = externalLoading || internalLoading;
  const setIsLoading = useCallback((loading) => {
    setInternalLoading(loading);
    setExternalLoading?.(loading);
  }, [setInternalLoading, setExternalLoading]);

  // Configuración de MercadoPago
  const MERCADOPAGO_PUBLIC_KEY = useMemo(() => {
     const key = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;

    
    if (!key || key === 'your_public_key_here') {
      console.error('Clave pública de MercadoPago no configurada correctamente');
    }
    
    return key;
  }, []);

  // Debounce para validación en tiempo real
  const debouncedFormData = useDebounce(formData, FORM_CONFIG.debounceDelay);

  // Validación inicial del producto
  useEffect(() => {
    if (!product?.title || (!product?.price && product?.price !== 0)) {
      setApiError('Los datos del producto son incompletos. Por favor, recarga la página.');
      setComponentState('error');
    }
  }, [product, setApiError, setComponentState]);

  // Inicialización de MercadoPago con mejor manejo de errores
  useEffect(() => {
    const initializeMP = async () => {
      try {
        if (!MERCADOPAGO_PUBLIC_KEY) {
          throw new Error('Clave pública de MercadoPago no configurada');
        }

        await initMercadoPago(MERCADOPAGO_PUBLIC_KEY, { 
          locale: 'es-AR',
          advancedFraudPrevention: true
        });
        
        setInitializationError('');
      } catch (error) {
        console.error('Error al inicializar MercadoPago:', error);
        const errorMsg = 'Error al cargar el sistema de pagos. Por favor, recarga la página.';
        setInitializationError(errorMsg);
        setApiError(errorMsg);
        onError?.(error);
      }
    };

    initializeMP();
  }, [MERCADOPAGO_PUBLIC_KEY, onError]);

  // Función de validación mejorada y centralizada
  const validateForm = useCallback((values, touchedFields = {}) => {
    const newErrors = {};
    
    Object.keys(touchedFields).forEach(field => {
      if (!touchedFields[field]) return;
      
      const value = values[field]?.trim() || '';
      
      switch (field) {
        case 'nombre':
          if (!value) {
            newErrors.nombre = 'El nombre es requerido';
          } else if (value.length < 2) {
            newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
          } else if (value.length > FORM_CONFIG.maxInputLengths.nombre) {
            newErrors.nombre = `El nombre no puede exceder ${FORM_CONFIG.maxInputLengths.nombre} caracteres`;
          } else if (!VALIDATION_PATTERNS.name.test(value)) {
            newErrors.nombre = 'El nombre contiene caracteres no válidos';
          }
          break;
          
        case 'email':
          if (!value) {
            newErrors.email = 'El email es requerido';
          } else if (value.length > FORM_CONFIG.maxInputLengths.email) {
            newErrors.email = `El email no puede exceder ${FORM_CONFIG.maxInputLengths.email} caracteres`;
          } else if (!VALIDATION_PATTERNS.email.test(value)) {
            newErrors.email = 'El formato del email no es válido';
          }
          break;
          
        case 'telefono':
          if (!value) {
            newErrors.telefono = 'El teléfono es requerido';
          } else if (value.length > FORM_CONFIG.maxInputLengths.telefono) {
            newErrors.telefono = `El teléfono no puede exceder ${FORM_CONFIG.maxInputLengths.telefono} caracteres`;
          } else if (!VALIDATION_PATTERNS.phone.test(value)) {
            newErrors.telefono = 'El formato del teléfono no es válido (ej: 11 2345-6789)';
          }
          break;
          
        default:
          break;
      }
    });
    
    return newErrors;
  }, []);

  // Validación en tiempo real con debounce mejorada
  useEffect(() => {
    if (Object.keys(touched).length > 0 && componentState === 'form') {
      const validationErrors = validateForm(debouncedFormData, touched);
      setErrors(validationErrors);
    }
  }, [debouncedFormData, touched, validateForm, componentState]);

  // Manejador de cambios con sanitización mejorada
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    const maxLength = FORM_CONFIG.maxInputLengths[name] || 100;
    
    let sanitizedValue = value.slice(0, maxLength);
    
    // Sanitización específica por campo
    switch (name) {
      case 'nombre':
        sanitizedValue = sanitizedValue.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').replace(/\s{2,}/g, ' ');
        break;
      case 'telefono':
        sanitizedValue = sanitizedValue.replace(/[^0-9\s\-+()]/g, '');
        break;
      case 'email':
        sanitizedValue = sanitizedValue.toLowerCase().replace(/\s/g, '');
        break;
      default:
        break;
    }
    
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    
    // Limpiar errores relacionados
    if (apiError) setApiError('');
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [apiError, errors]);

  // Manejador de blur mejorado
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  // Función de reintento con backoff exponencial mejorada
  const retryRequest = useCallback(async (requestFn, attemptNumber = 1) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FORM_CONFIG.requestTimeout);
    
    try {
      const result = await requestFn(controller.signal);
      clearTimeout(timeoutId);
      return result;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('La solicitud tardó demasiado tiempo. Intenta nuevamente.');
      }
      
      if (attemptNumber < FORM_CONFIG.maxRetryAttempts) {
        const delay = Math.min(Math.pow(2, attemptNumber) * 1000, 10000); // Max 10s
        await new Promise(resolve => setTimeout(resolve, delay));
        return retryRequest(requestFn, attemptNumber + 1);
      }
      
      throw error;
    }
  }, []);

  // Función para generar referencia externa única
  const generateExternalReference = useCallback(() => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const productId = product?.id?.toString().slice(-5) || '00000';
    return `${productId}-${timestamp}-${random}`;
  }, [product?.id]);

  // Crear datos de preferencia con validación robusta
  const createPreferenceData = useCallback(() => {
    const price = parseFloat(product?.price || 0);
    const quantity = parseInt(product?.quantity || 1);
    
    if (isNaN(price) || price < 0) {
      throw new Error('Precio del producto no válido');
    }
    
    if (isNaN(quantity) || quantity < 1) {
      throw new Error('Cantidad del producto no válida');
    }

    return {
      items: [{
        id: product?.id?.toString() || 'default-id',
        title: product?.title || 'Producto',
        quantity: quantity,
        unit_price: price,
        currency_id: product?.currency || 'ARS',
        description: product?.subtitle || product?.description || '',
        picture_url: product?.image || null,
        category_id: product?.category || 'general',
      }],
      payer: {
        name: formData.nombre.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: { 
          number: formData.telefono.trim().replace(/\D/g, '') 
        },
      },
      back_urls: {
        success: `${window.location.origin}/payment/success?product_id=${product?.id}`,
        failure: `${window.location.origin}/payment/failure?product_id=${product?.id}`,
        pending: `${window.location.origin}/payment/pending?product_id=${product?.id}`,
      },
      auto_return: 'approved',
      notification_url: process.env.REACT_APP_NOTIFICATION_URL,
      statement_descriptor: (product?.title || 'Compra').substring(0, 22),
      external_reference: generateExternalReference(),
      metadata: {
        product_id: product?.id,
        user_email: formData.email.trim().toLowerCase(),
        timestamp: new Date().toISOString(),
      },
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
    };
  }, [product, formData, generateExternalReference]);

  // Manejador del formulario completamente mejorado
  const handleBuy = useCallback(async (e) => {
    e.preventDefault();
    
    try {
      // Validación inicial
      if (initializationError) {
        setApiError('El sistema de pagos no está disponible. Por favor, recarga la página.');
        return;
      }

      // Marcar todos los campos como tocados
      const allTouched = { nombre: true, email: true, telefono: true };
      setTouched(allTouched);
      
      // Validar todos los campos
      const formErrors = validateForm(formData, allTouched);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        
        // Focus en el primer campo con error
        const firstErrorField = Object.keys(formErrors)[0];
        const element = document.getElementById(firstErrorField);
        element?.focus();
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      setIsLoading(true);
      setApiError('');
      setSuccessMessage('');
      setComponentState('loading');

      // Crear datos de preferencia
      const preferenceData = createPreferenceData();
const normalizedPreference = {
  items: preferenceData.items.map(item => ({
    title: item.title,                     // nombre del producto
    quantity: Number(item.quantity),       // cantidad
    unit_price: Number(item.unit_price),   // precio unitario
    currency_id: item.currency_id || 'ARS' // moneda
  })),
  back_urls: {
    success: preferenceData.back_urls?.success || 'https://www.google.com',
    failure: preferenceData.back_urls?.failure || 'https://www.google.com',
    pending: preferenceData.back_urls?.pending || 'https://www.google.com'
  },
  auto_return: 'approved', // obligatorio para redirección automática
  external_reference: preferenceData.external_reference || 'pedido_12345',
  notification_url: preferenceData.notification_url || 'https://www.google.com'
};


      // Realizar la petición con reintentos
      const response = await retryRequest(async (signal) => {
        console.log("Datos enviados a la API:", preferenceData);
        return await conect_mercado_pago_BE(normalizedPreference, { signal });
      });
      console.log("🚀 Respuesta del backend:", response);
      
      if (!response?.init_point) {
        throw new Error('Respuesta inválida del servidor de pagos');
      }

      // Éxito
      setSuccessMessage('¡Perfecto! Redirigiendo a Mercado Pago...');
      setComponentState('success');
      onSuccess?.(response, preferenceData);
      
      // Delay antes de redirección para mostrar mensaje
      setTimeout(() => {
        try {
          window.location.href = response.init_point;
        } catch (redirectError) {
          console.error('Error en redirección:', redirectError);
          setApiError('Error al redirigir. Por favor, intenta nuevamente.');
          setComponentState('error');
        }
      }, 1000);

    } catch (error) {
      console.error('Error al procesar el pago:', error);
      
      // Manejo específico de errores
      let errorMessage = 'No se pudo procesar el pago. ';
      
      if (!navigator.onLine) {
        errorMessage = 'Sin conexión a internet. Verifica tu conexión e intenta nuevamente.';
      } else if (error.response?.status === 400) {
        errorMessage = 'Algunos datos no son válidos. Verifica la información e intenta nuevamente.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Error de autorización. Por favor, recarga la página e intenta nuevamente.';
      } else if (error.response?.status === 429) {
        errorMessage = 'Demasiados intentos. Por favor, espera un momento e intenta nuevamente.';
      } else if (error.response?.status >= 500) {
        errorMessage = 'El servidor está experimentando problemas temporales. Intenta en unos minutos.';
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage += 'Por favor, intenta nuevamente o contacta con soporte.';
      }
      
      setApiError(errorMessage);
      setComponentState('error');
      onError?.(error, errorMessage);
      setRetryCount(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  }, [
    initializationError, formData, validateForm, createPreferenceData, 
    retryRequest, onSuccess, onError, setIsLoading
  ]);

  // Función para reintentar después de error
  const handleRetry = useCallback(() => {
    setApiError('');
    setComponentState('form');
    setRetryCount(0);
  }, []);

  // Formatear precio con manejo de errores robusto
  const formatPrice = useCallback((price, currency) => {
    try {
      const numPrice = parseFloat(price);
      if (isNaN(numPrice)) return 'Precio no disponible';
      
      return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: currency || 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(numPrice);
    } catch (error) {
      console.error('Error al formatear precio:', error);
      return `${currency || 'ARS'} ${price}`;
    }
  }, []);

  // Memoización de valores calculados
  const formattedPrice = useMemo(() => 
    formatPrice(product?.price, product?.currency), 
    [product?.price, product?.currency, formatPrice]
  );

  const discount = useMemo(() => {
    if (product?.originalPrice && product?.price) {
      const original = parseFloat(product.originalPrice);
      const current = parseFloat(product.price);
      if (!isNaN(original) && !isNaN(current) && original > current) {
        return Math.round(((original - current) / original) * 100);
      }
    }
    return null;
  }, [product?.originalPrice, product?.price]);

  const isFormValid = useMemo(() => {
    return Object.keys(errors).length === 0 && 
           formData.nombre.trim() && 
           formData.email.trim() && 
           formData.telefono.trim();
  }, [errors, formData]);

  // Render condicional basado en el estado del componente
  if (componentState === 'error' && apiError) {
    return (
      <div className={`mp-card mp-card--error ${customStyles?.card || ''}`}>
        <div className="mp-card__error-state">
          <ErrorIcon />
          <h3>Error en el proceso de pago</h3>
          <p>{apiError}</p>
          {enableRetry && retryCount < FORM_CONFIG.maxRetryAttempts && (
            <button 
              type="button" 
              className="mp-card__retry-button"
              onClick={handleRetry}
            >
              Intentar nuevamente
            </button>
          )}
          {retryCount >= FORM_CONFIG.maxRetryAttempts && (
            <p className="mp-card__contact-support">
              Si el problema persiste, por favor contacta con soporte.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`mp-card ${customStyles?.card || ''} ${componentState === 'loading' ? 'mp-card--loading' : ''}`}>
      {/* Columna de Producto */}
      {showProductSummary && (
        <div className="mp-card__product-column">
          <div className="mp-card__header">
            <SiMercadopago size={32} className="mp-card__logo" />
            <div className="mp-card__header-text">
              <span className="mp-card__brand-name">Mercado Pago</span>
              <span className="mp-card__tagline">La forma más segura de pagar</span>
            </div>
          </div>
          
          <div className="mp-card__product-info">
            {product?.image && (
              <div className="mp-card__image-wrapper">
                <img 
                  src={product.image} 
                  alt={product.title || 'Producto'}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x225.png?text=Imagen+no+disponible';
                    e.target.onerror = null;
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
              {product?.badge && (
                <div className="mp-card__badge">{product.badge}</div>
              )}
              
              <h3 className="mp-card__title">{product?.title || 'Producto'}</h3>
              
              {product?.subtitle && (
                <p className="mp-card__subtitle">{product.subtitle}</p>
              )}
              
              <div className="mp-card__price-container">
                {product?.originalPrice && (
                  <span className="mp-card__original-price">
                    {formatPrice(product.originalPrice, product.currency)}
                  </span>
                )}
                <div className="mp-card__price">{formattedPrice}</div>
                {product?.installments && (
                  <p className="mp-card__installments">
                    o hasta {product.installments}x sin interés
                  </p>
                )}
              </div>
              
              {product?.stock && product.stock < 10 && (
                <div className="mp-card__stock-warning">
                  <WarningIcon />
                  ¡Últimas {product.stock} unidades disponibles!
                </div>
              )}
            </div>
            
            {product?.originalData?.highlights && product.originalData.highlights.length > 0 && (
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
                  onError={(e) => e.target.style.display = 'none'}
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
      )}

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
              maxLength={FORM_CONFIG.maxInputLengths.nombre}
              disabled={isLoading}
            />
            {errors.nombre && touched.nombre && (
              <p id="nombre-error" className="mp-error-message" role="alert">
                <ErrorIcon />
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
              maxLength={FORM_CONFIG.maxInputLengths.email}
              disabled={isLoading}
            />
            {errors.email && touched.email && (
              <p id="email-error" className="mp-error-message" role="alert">
                <ErrorIcon />
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
              maxLength={FORM_CONFIG.maxInputLengths.telefono}
              disabled={isLoading}
            />
            {errors.telefono && touched.telefono && (
              <p id="telefono-error" className="mp-error-message" role="alert">
                <ErrorIcon />
                {errors.telefono}
              </p>
            )}
          </div>

          {/* Estados de éxito y error */}
          {successMessage && (
            <div className="mp-success-message" role="status" aria-live="polite">
              <CheckIcon />
              <span>{successMessage}</span>
            </div>
          )}

          {apiError && componentState !== 'error' && (
            <div className="mp-api-error" role="alert" aria-live="assertive">
              <ErrorIcon />
              <div>
                <span>{apiError}</span>
                {enableRetry && retryCount > 0 && retryCount < FORM_CONFIG.maxRetryAttempts && (
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

          {/* Warning si hay muchos intentos fallidos */}
          {retryCount >= 2 && retryCount < FORM_CONFIG.maxRetryAttempts && (
            <div className="mp-warning-message">
              <WarningIcon />
              <span>
                Si continúas teniendo problemas, verifica tu conexión a internet 
                o contacta con soporte.
              </span>
            </div>
          )}
          
          <button 
            type="submit" 
            className={`mp-card__button ${!isFormValid && Object.keys(touched).length > 0 ? 'mp-card__button--disabled' : ''}`}
            disabled={isLoading || !!successMessage || !!initializationError || (!isFormValid && Object.keys(touched).length > 0)}
            aria-busy={isLoading}
            aria-describedby={apiError ? 'form-error' : undefined}
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
          
          <p className="mp-card__terms">
            Al continuar, aceptas los{' '}
            <a 
              href="https://www.mercadopago.com.ar/ayuda/terminos-y-condiciones_299" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Términos y Condiciones de Mercado Pago (se abre en una nueva ventana)"
            >
              Términos y Condiciones
            </a>{' '}
            de Mercado Pago
          </p>

          {/* Información adicional de seguridad */}
          <div className="mp-card__security-info">
            <div className="mp-security-item">
              <SecurityIcon />
              <span>Conexión segura SSL</span>
            </div>
            <div className="mp-security-item">
              <CheckIcon />
              <span>Datos protegidos</span>
            </div>
            <div className="mp-security-item">
              <InfoIcon />
              <span>Compra garantizada</span>
            </div>
          </div>
        </form>
      </div>

      {/* Overlay de loading global */}
      {componentState === 'loading' && (
        <div className="mp-card__loading-overlay" aria-hidden="true">
          <div className="mp-loading-content">
            <div className="mp-spinner-large"></div>
            <p>Procesando tu pago...</p>
            <small>No cierres esta ventana</small>
          </div>
        </div>
      )}
    </div>
  );
};

// --- PropTypes completamente mejorados ---
MercadoPagoCard.propTypes = {
  // Producto (legacy prop)
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currency: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    badge: PropTypes.string,
    quantity: PropTypes.number,
    installments: PropTypes.number,
    stock: PropTypes.number,
    category: PropTypes.string,
    originalData: PropTypes.shape({
      highlights: PropTypes.arrayOf(PropTypes.string),
    })
  }),
  
  // Nuevo prop para datos del item (del Payment component)
  itemData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currency: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    badge: PropTypes.string,
    quantity: PropTypes.number,
    installments: PropTypes.number,
    stock: PropTypes.number,
    category: PropTypes.string,
    originalData: PropTypes.object,
  }),
  
  // Callbacks
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onPending: PropTypes.func,
  
  // Estados externos (del Payment component)
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
  
  // Configuración
  customStyles: PropTypes.shape({
    card: PropTypes.string,
  }),
  showProductSummary: PropTypes.bool,
  enableRetry: PropTypes.bool,
};

MercadoPagoCard.defaultProps = {
  product: null,
  itemData: null,
  onSuccess: () => {},
  onError: () => {},
  onPending: () => {},
  isLoading: false,
  setIsLoading: () => {},
  customStyles: {},
  showProductSummary: true,
  enableRetry: true,
};

export default MercadoPagoCard;