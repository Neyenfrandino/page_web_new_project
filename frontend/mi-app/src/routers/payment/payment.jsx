import { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ------------------------------
// 📂 SEO y Meta
// Importaciones de componentes relacionados con SEO y metadata

// ------------------------------
// 📂 Layout
// Componentes que forman la estructura y navegación principal (header, footer, nav, etc.)

// ------------------------------
// 📂 Secciones
// Bloques grandes o secciones completas que conforman las páginas
import PaymentMethodSelector from '../../components/integrations/payment_method/payment_method_selector';

// ------------------------------
// 📂 UI / Componentes visuales pequeños y reutilizables
// import ButtonBack from '../../components/ui/button_back/button_back';

// ------------------------------
// 📂 Integrations
// Servicios externos, pasarelas de pago, APIs de terceros
import PaymentForm from '../../components/integrations/payment-form/payment-form';
import MercadoPagoCard from '../../components/integrations/mercado_pago_card/mercado_pago_card';

// ------------------------------
// 📂 Maps
// Componentes relacionados con mapas y geolocalización

// ------------------------------
// 📂 Tracking
// Funciones y componentes para seguimiento de usuario y analytics

// ------------------------------
// 📂 Context
// Archivos relacionados con Context API para manejo global de estados
import { MethodStatePaymentContext } from '../../context/method_state_payment/method_state_payment.context';
import { ConectContext } from '../../context/context_conect_be/context_conect_be';

// ------------------------------
// 📂 Hooks
// Hooks personalizados para reutilización de lógica

// ------------------------------
// 📂 Services
// Funciones para llamadas a APIs y lógica de negocio

// ------------------------------
// 📂 Utils
// Funciones auxiliares y helpers

// ------------------------------
// 📂 Styles
// Estilos globales, variables SCSS y temas
import './payment.scss';

const Payment = () => {
  const location = useLocation();
  const isRouterPayment = location.pathname == '/payment';

  const { handlePaymentMercadoPago , setSuccessPaymentMercadoPago} = useContext(ConectContext);
  const { methodStatePayment, setMethodStatePayment } = useContext(MethodStatePaymentContext);
  // Estados locales para manejo de errores y loading
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentData, setPaymentData] = useState(null);


  // Función para normalizar los datos del item independientemente de la estructura
  const normalizeItemData = (data) => {
    try {
      // Si tiene normalizedItem, usar esa estructura
      if (data?.normalizedItem) {
        return {
          item: {
            id: data.normalizedItem.id,
            title: data.normalizedItem.title,
            subtitle: data.normalizedItem.subtitle,
            price: data.normalizedItem.price,
            currency: data.normalizedItem.currency,
            image: data.normalizedItem.image,
            badge: data.normalizedItem.badge,
            category: data.normalizedItem.category,
            // Datos adicionales del originalData si existen
            ...data.normalizedItem.originalData
          },
          method: null // Se establecerá después
        };
      }

      // Si tiene item directamente, usar esa estructura
      if (data?.item) {
        return {
          item: data.item,
          method: data.method || null
        };
      }

      // Si es un objeto plano con los datos del item
      if (data?.id && data?.title) {
        return {
          item: data,
          method: null
        };
      }

      return null;
    } catch (err) {
      console.error('Error normalizando datos del item:', err);
      return null;
    }
  };

  // Función para validar los datos del item
  const validateItemData = (itemData) => {
    if (!itemData) return false;
    
    const requiredFields = ['id', 'title', 'price'];
    return requiredFields.every(field => 
      itemData.item && 
      itemData.item[field] !== undefined && 
      itemData.item[field] !== null
    );
  };

  // Efecto para procesar los datos del contexto
  useEffect(() => {
    if (methodStatePayment?.item || methodStatePayment?.normalizedItem) {
      const normalizedData = normalizeItemData(methodStatePayment);
      
      if (validateItemData(normalizedData)) {
        setPaymentData(normalizedData);
        setError(null);
      } else {
        setError('Datos del producto incompletos o inválidos');
        console.error('Datos inválidos:', methodStatePayment);
      }
    }
  }, [methodStatePayment]);

  // Efecto para procesar los datos del contexto
  useEffect(() => {
    if (methodStatePayment?.item || methodStatePayment?.normalizedItem) {
      const normalizedData = normalizeItemData(methodStatePayment);
      
      if (validateItemData(normalizedData)) {
        handlePaymentMercadoPago(normalizedData);
        setSuccessPaymentMercadoPago(true);
        setPaymentData(normalizedData);
        setError(null);
      } else {
        setError('Datos del producto incompletos o inválidos');
        console.error('Datos inválidos:', methodStatePayment);
      }
    }
  }, [methodStatePayment]);

  // Función para manejar la selección del método de pago
  const handleMethodSelection = (method) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Validar el método seleccionado
      if (!method || !method.methodId) {
        throw new Error('Método de pago inválido');
      }

      // Actualizar el estado con el método seleccionado
      setMethodStatePayment(prev => ({
        ...prev,
        method: method
      }));

      // Actualizar los datos locales
      if (paymentData) {
        setPaymentData(prevData => ({
          ...prevData,
          method: method
        }));
      }

    } catch (err) {
      setError(`Error al seleccionar método de pago: ${err.message}`);
      console.error('Error en handleMethodSelection:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para manejar errores de pago
  const handlePaymentError = (errorMessage) => {
    setError(errorMessage);
    setIsLoading(false);
  };

  // Función para manejar éxito de pago
  const handlePaymentSuccess = (paymentResult) => {
    setError(null);
    setIsLoading(false);
    // Aquí podrías redirigir o mostrar mensaje de éxito
    console.log('Pago exitoso:', paymentResult);
  };

  // Función para resetear el método de pago (volver al selector)
  const resetPaymentMethod = () => {
    setMethodStatePayment(prev => ({
      ...prev,
      method: null
    }));
    
    if (paymentData) {
      setPaymentData(prevData => ({
        ...prevData,
        method: null
      }));
    }
  };

  // Función principal para renderizar el componente de pago apropiado
  const renderPaymentComponent = () => {
    // Si hay un error, mostrar mensaje de error con opción de reintentar
    if (error) {
      return (
        <div className="payment-error">
          <div className="error-message">
            <h3>Error en el proceso de pago</h3>
            <p>{error}</p>
            <div className="error-actions">
              <button 
                className="btn-retry" 
                onClick={() => {
                  setError(null);
                  resetPaymentMethod();
                }}
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Si no hay datos del producto, mostrar mensaje
    if (!paymentData) {
      return (
        <div className="payment-no-data">
          <h3>No se encontraron datos del producto</h3>
          <p>Por favor, selecciona un producto válido.</p>
        </div>
      );
    }

    // Si no hay método de pago seleccionado, mostrar selector
    if (!paymentData?.method && !methodStatePayment?.method) {
      return (
        <div className="payment-selector-container">
          <div className="product-summary">
            <h3>Resumen de compra</h3>
            <div className="product-info">
              <img src={paymentData.item.image} alt={paymentData.item.title} />
              <div>
                <h4>{paymentData.item.title}</h4>
                <p>{paymentData.item.subtitle}</p>
                <span className="price">
                  {paymentData.item.currency} ${paymentData.item.price}
                </span>
              </div>
            </div>
          </div>
          <PaymentMethodSelector 
            onMethodSelect={handleMethodSelection}
            isLoading={isLoading}
          />
        </div>
      );
    }

    // Obtener el método actual (prioritizar el del contexto)
    const currentMethod = methodStatePayment?.method || paymentData?.method;
    
    if (!currentMethod) {
      return <PaymentMethodSelector onMethodSelect={handleMethodSelection} />;
    }

    // Renderizar el componente específico según el método de pago
    switch(currentMethod.methodId) {
      // case 'mercadopago':
      //   return (
      //     <div className="payment-form-container">
      //       {/* <ButtonBack onClick={resetPaymentMethod} /> */}

      //       <MercadoPagoCard 
      //         itemData={paymentData.item}
      //         onError={handlePaymentError}
      //         onSuccess={handlePaymentSuccess}
      //         isLoading={isLoading}
      //         setIsLoading={setIsLoading}
      //         product={paymentData.item || paymentData.normalizedItem}
      //       />

      //       <button 
      //         className="change-payment-method-btn"
      //         onClick={resetPaymentMethod}
      //         disabled={isLoading}
      //       >
      //         Cambiar método de pago
      //       </button>
      //     </div>
      //   );
        
      case 'cards':
      case 'credit_card':
      case 'debit_card':
        return (
          <div className="payment-form-container">
            {/* <ButtonBack onClick={resetPaymentMethod} /> */}
            
            <PaymentForm 
               product={paymentData.item || paymentData.normalizedItem}
            />

            <button 
              className="change-payment-method-btn"
              onClick={resetPaymentMethod}
              disabled={isLoading}
            >
              Cambiar método de pago
            </button>
          </div>
        );
        
      case 'paypal':
        // Aquí podrías agregar el componente de PayPal
        return (
          <div className="payment-form-container">
            {/* <ButtonBack onClick={resetPaymentMethod} /> */}
            
            <div>PayPal - Próximamente</div>

            <button 
              className="change-payment-method-btn"
              onClick={resetPaymentMethod}
              disabled={isLoading}
            >
              Cambiar método de pago
            </button>
          </div>
        );
        
      case 'stripe':
        // Aquí podrías agregar el componente de Stripe
        return (
          <div className="payment-form-container">
            {/* <ButtonBack onClick={resetPaymentMethod} /> */}
            
            <div>Stripe - Próximamente</div>

            <button 
              className="change-payment-method-btn"
              onClick={resetPaymentMethod}
              disabled={isLoading}
            >
              Cambiar método de pago
            </button>
          </div>
        );
        
      default:
        console.warn(`Método de pago no soportado: ${currentMethod.methodId}`);
        return (
          <div className="payment-unsupported">
            <h3>Método de pago no soportado</h3>
            <p>El método "{currentMethod.methodName}" no está disponible actualmente.</p>
            <button onClick={resetPaymentMethod}>
              Seleccionar otro método
            </button>
          </div>
        );
    }
  };

  // Debug logging (solo en desarrollo)
  if (process.env.NODE_ENV === 'development') {
    console.log('Payment Component Debug:', {
      methodStatePayment,
      paymentData,
      error,
      isLoading
    });
  }

  return (
    <div className="payment-container">

      {
        isRouterPayment && !paymentData?.method &&
        <div className='payment-method-header'>
          <h2>Formas de Pago</h2>
          <p>Selecciona tu método de pago preferido</p>
        </div>
      }
      
      <div className='payment-method-content'>
        {renderPaymentComponent()}
      </div>

    </div>
  );
};

export default Payment;