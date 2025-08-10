import { useContext } from 'react';


// ------------------------------
// 📂 SEO y Meta
// Importaciones de componentes relacionados con SEO y metadata

// ------------------------------
// 📂 Layout
// Componentes que forman la estructura y navegación principal (header, footer, nav, etc.)

// ------------------------------
// 📂 Secciones
// Bloques grandes o secciones completas que conforman las páginas

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
  const { methodStatePayment } = useContext(MethodStatePaymentContext);

  const selectedMethod = methodStatePayment?.method.methodId || 'mercadopago'; // fallback por si no hay nada 

  return (
    <div className='payment__container'>
      <div className="payment__content">
        {selectedMethod === 'mercadopago' ? <MercadoPagoCard /> : <PaymentForm />}
      </div>
      <ButtonBack />
    </div>
  );
};

export default Payment;
