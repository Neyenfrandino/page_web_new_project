import { useContext, useState, useEffect } from 'react';

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
import ButtonBack from '../../components/ui/button_back/button_back';

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
  const { methodStatePayment, setMethodStatePayment } = useContext(MethodStatePaymentContext);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showSelector, setShowSelector] = useState(true);
  
  useEffect(() => {
    // Verificar si hay un método preseleccionado desde el contexto
    if (methodStatePayment?.method?.methodId) {
      setSelectedMethod(methodStatePayment.method.methodId);
      setShowSelector(false);
    }
  }, [methodStatePayment]);

  const handleMethodSelection = (methodId) => {
    // Actualizar el método seleccionado
    setSelectedMethod(methodId);
    
    // Actualizar el contexto si existe la función setMethodStatePayment
    if (setMethodStatePayment) {
      setMethodStatePayment({
        ...methodStatePayment,
        method: {
          ...methodStatePayment?.method,
          methodId: methodId
        }
      });
    }
     
    // Ocultar el selector y mostrar el componente de pago
    setShowSelector(false);

    // Tracking analytics si está disponible
    if (window.gtag) {
      window.gtag('event', 'select_payment_method', {
        payment_type: methodId,
        value: methodStatePayment?.amount || 0
      });
    }
  };

  const renderPaymentComponent = () => {
    const currentMethod = selectedMethod || methodStatePayment?.method?.methodId;
    
    switch(currentMethod.id) {
      case 'mercadopago':
        return <MercadoPagoCard />;
      case 'cards':
        return <PaymentForm />;
      default:
        return null;
    }
  };

  return (
    <div className='payment__container'>
      <div className="payment__content">
        {showSelector ? (
          <PaymentMethodSelector onSelectMethod={handleMethodSelection} />
        ) : (
          <>
            {renderPaymentComponent()}
            
            {/* Botón para cambiar método de pago */}
            <div className="payment__change-method">
              <button 
                className="change-method-btn"
                onClick={() => setShowSelector(true)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 16v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeWidth="2"/>
                  <circle cx="9" cy="7" r="4" strokeWidth="2"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87" strokeWidth="2"/>
                  <path d="M16 3.13a4 4 0 010 7.75" strokeWidth="2"/>
                </svg>
                <span>Cambiar método de pago</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;