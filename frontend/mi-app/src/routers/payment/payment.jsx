import { useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// ------------------------------
// 📂 Secciones
import PaymentMethodSelector from '../../components/integrations/payment_method/payment_method_selector';
import LoadingComponent from '../../components/seccion/loading_component/loading_component';
import FormularioUsuario from '../../components/seccion/form/formulario_usuario';

// 📂 Integrations
import PaymentForm from '../../components/integrations/payment-form/payment-form';

// 📂 Context
import { MethodStatePaymentContext } from '../../context/method_state_payment/method_state_payment.context';
import { ConectContext } from '../../context/context_conect_be/context_conect_be';

// Ui
import Modal from '../../components/ui/modal/modal';

// 📂 Styles
import './payment.scss';

const Payment = () => {
  const location = useLocation();
  const isRouterPayment = location.pathname === '/payment';

  const { handlePaymentMercadoPago, setSuccessPaymentMercadoPago } = useContext(ConectContext);
  const { methodStatePayment, setMethodStatePayment, clearMethodStatePayment } = useContext(MethodStatePaymentContext);

  const [paymentData, setPaymentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessingMercadoPago, setIsProcessingMercadoPago] = useState(false);

  // 🔹 Estado para modal y datos del formulario
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userFormData, setUserFormData] = useState(null);

  console.log('🚀 userFormData:', userFormData);

  // ------------------------------
  // Normalizador de datos del producto
  // ------------------------------
  const normalizeItemData = useCallback((data) => {
    if (!data || Object.keys(data).length === 0) return null;

    if (data.normalizedItem) {
      return {
        item: {
          id: data.normalizedItem.id,
          title: data.normalizedItem.title,
          subtitle: data.normalizedItem.subtitle || '',
          price: data.normalizedItem.price || 0,
          currency: data.normalizedItem.currency || '$',
          image: data.normalizedItem.image || '',
          badge: data.normalizedItem.badge || '',
          category: data.normalizedItem.category || '',
          icon: data.normalizedItem.icon || null,
          itemType: data.normalizedItem.itemType || 'unknown',
          ...data.normalizedItem.originalData,
        },
        method: data.method || null,
      };
    }

    if (data.item) {
      return {
        item: data.item,
        method: data.method || null,
      };
    }

    if (data.id && data.title) {
      return {
        item: data,
        method: data.method || null,
      };
    }

    console.warn('Formato de datos no reconocido:', data);
    return null;
  }, []);

  // ------------------------------
  // Efecto para cargar datos iniciales
  // ------------------------------
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    try {
      if (!methodStatePayment || Object.keys(methodStatePayment).length === 0) {
        console.log('🚀 Context vacío, se mantiene paymentData:', paymentData);
        setIsLoading(false);
        return;
      }

      const normalizedData = normalizeItemData(methodStatePayment);

      if (normalizedData) {
        setPaymentData((prev) => ({
          ...normalizedData,
          method: prev?.method || normalizedData.method || null,
        }));
      } else {
        setPaymentData(null);
        setError('No se pudo obtener la información del producto.');
      }
    } catch (err) {
      console.error('Error cargando paymentData:', err);
      setPaymentData(null);
      setError('Ocurrió un error inesperado cargando el producto.');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methodStatePayment]);

  // ------------------------------
  // Limpia localStorage al salir de la ruta /payment
  // ------------------------------
  useEffect(() => {
    if (location.pathname !== '/payment') {
      localStorage.removeItem('methodStatePayment');
      clearMethodStatePayment(); // Limpia también el contexto
      console.log('🧹 Se limpió localStorage y contexto porque saliste de /payment');
    }
  }, [location.pathname, clearMethodStatePayment]);

  // ------------------------------
  // Selección de método de pago
  // ------------------------------
  const handleMethodSelection = (method) => {
    try {
      if (!method || !method.methodId) throw new Error('Método de pago inválido');

      console.log('🚀 handleMethodSelection:', method);

      // Actualiza local
      setPaymentData((prev) => (prev ? { ...prev, method } : prev));

      // Actualiza contexto global
      setMethodStatePayment((prev) => ({
        ...prev,
        method,
      }));

      setError(null);

      // 🚨 Antes de procesar, abrir modal con formulario de usuario
      setIsModalOpen(true);
    } catch (err) {
      console.error('Error en handleMethodSelection:', err);
      setError(`Error al seleccionar método de pago: ${err.message}`);
    }
  };

  // ------------------------------
  // Reset de método de pago
  // ------------------------------
  const resetPaymentMethod = () => {
    console.log('🚀 resetPaymentMethod');
    setMethodStatePayment((prev) => ({ ...prev, method: null }));
    setPaymentData((prev) => (prev ? { ...prev, method: null } : prev));
  };

  // ------------------------------
  // Validación y confirmación de datos del modal
  // ------------------------------
  // ------------------------------
  // Validación y confirmación de datos del modal
  // ------------------------------
  const handleUserFormSubmit = (formData) => {
    console.log('🚀 Datos confirmados del usuario:', formData);
    setUserFormData(formData);
    setIsModalOpen(false);

    // Solo procesamos Mercado Pago si el método seleccionado es 'mercadopago'
    if (paymentData?.method?.methodId === 'mercadopago') {
      processMercadoPago();
    }
  };

  // 🚀 Proceso de Mercado Pago
  // ------------------------------
  const processMercadoPago = async () => {
    if (paymentData?.method?.methodId !== 'mercadopago') return;

    if (!paymentData?.item?.id || !paymentData?.item?.price) {
      setError('No hay información válida del producto para procesar el pago.');
      return;
    }

    console.log('🚀 Datos del pago para Mercado Pago:', paymentData);

    try {
      setIsProcessingMercadoPago(true);
      console.log('🚀 Iniciando proceso Mercado Pago con:', paymentData);
      
      await handlePaymentMercadoPago(paymentData);

      setSuccessPaymentMercadoPago(paymentData);
    } catch (err) {
      console.error('Error durante el pago con Mercado Pago:', err);
      setError('Ocurrió un error al procesar el pago con Mercado Pago.');
    } finally {
      setIsProcessingMercadoPago(false);
    }
  };

  // ------------------------------
  // Renderizado del modal
  // ------------------------------
  const renderModal = () => (
    <Modal
      isOpenModal={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Completa tus datos"
    >
      <FormularioUsuario onSubmit={handleUserFormSubmit} />
    </Modal>
  );

  // ------------------------------
  // Renderizado principal
  // ------------------------------
  const renderPaymentComponent = () => {
    if (isLoading) {
      return <LoadingComponent size="large" color="#3b82f6" />;
    }

    if (error) {
      return (
        <div className="payment-error">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={() => setError(null)}>Reintentar</button>
        </div>
      );
    }

    if (!paymentData || !paymentData.item) {
      return (
        <div className="payment-no-data">
          <h3>No se encontraron datos del producto</h3>
          <p>Por favor, selecciona un producto válido.</p>
        </div>
      );
    }

    // Si no hay método seleccionado, mostramos selector
    if (!paymentData.method) {
      return (
        <div className="payment-selector-container">
          <div className="product-summary">
            <h3>Resumen de compra</h3>
            <div className="product-info">
              {paymentData.item.image && (
                <img src={paymentData.item.image} alt={paymentData.item.title} />
              )}
              <div>
                <h4>{paymentData.item.title}</h4>
                <p>{paymentData.item.subtitle}</p>
                <span className="price">
                  {paymentData.item.currency} ${paymentData.item.price}
                </span>
              </div>
            </div>
          </div>
          <PaymentMethodSelector onMethodSelect={handleMethodSelection} />
        </div>
      );
    }

    const currentMethod = paymentData.method;

    // Si el formulario no está completo, pedimos completar
    if (!userFormData) {
      return (
        <div className="payment-waiting-form">
          <h3>Completa tus datos para continuar</h3>
          <p>Por favor, completa el formulario antes de continuar con el pago.</p>
        </div>
      );
    }

    switch (currentMethod.methodId) {
      case 'mercadopago':
        // Si está procesando, mostramos loading
        if (isProcessingMercadoPago) {
          return (
            <div className="payment-form-container">
              <LoadingComponent size="large" color="#3b82f6" />
            </div>
          );
        }
        // Si terminó, volvemos a mostrar selector y resumen
        return (
          <div className="payment-selector-container">
            <div className="product-summary">
              <h3>Resumen de compra</h3>
              <div className="product-info">
                {paymentData.item.image && (
                  <img src={paymentData.item.image} alt={paymentData.item.title} />
                )}
                <div>
                  <h4>{paymentData.item.title}</h4>
                  <p>{paymentData.item.subtitle}</p>
                  <span className="price">
                    {paymentData.item.currency} ${paymentData.item.price}
                  </span>
                </div>
              </div>
            </div>
            <PaymentMethodSelector onMethodSelect={handleMethodSelection} />
          </div>
        );

      case 'cards':
      case 'credit_card':
      case 'debit_card':
        return (
          <div className="payment-form-container">
            <PaymentForm product={paymentData.item} />
            <button className="change-payment-method-btn" onClick={resetPaymentMethod}>
              Cambiar método de pago
            </button>
          </div>
        );

      default:
        return (
          <div className="payment-unsupported">
            <h3>Método de pago no soportado</h3>
            <p>El método "{currentMethod?.methodName}" no está disponible actualmente.</p>
            <button onClick={resetPaymentMethod}>Seleccionar otro método</button>
          </div>
        );
    }
  };

  return (
    <div className="payment-container">
      {isRouterPayment  && (
        <div className="payment-method-header">
          <h2>Formas de Pago</h2>
          <p>Selecciona tu método de pago preferido</p>
        </div>
      )}

      <div className="payment-method-content">{renderPaymentComponent()}</div>

      {/* Modal con formulario */}
      {renderModal()}
    </div>
  );
};

export default Payment;
