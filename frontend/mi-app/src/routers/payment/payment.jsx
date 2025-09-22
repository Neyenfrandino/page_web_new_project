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

// utils
import { orderTemplate } from '../../utils/data/orderTemplate';

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
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

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

        // 🔹 Si ya hay método seleccionado, abrimos modal directamente
        if (normalizedData.method) {
          setIsModalOpen(true);
        }
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
  // Limpia localStorage y contexto al salir de /payment
  // ------------------------------
  useEffect(() => {
    if (location.pathname !== '/payment') {
      localStorage.removeItem('methodStatePayment');
      clearMethodStatePayment();
      setPaymentData(null);
      console.log('🧹 Limpieza de estado y localStorage al salir de /payment');
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

      // 🚨 Abrir modal con formulario de usuario
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
    setIsModalOpen(false);
  };

  // ------------------------------
  // Confirmación de datos del modal
  // ------------------------------
  const handleUserFormSubmit = (formData) => {
    console.log('🚀 Datos confirmados del usuario:', formData);
    setUserFormData(formData);
    setIsModalOpen(false);

    // Crear una copia limpia de la orden
    const nuevaOrden = JSON.parse(JSON.stringify(orderTemplate));

    // 🧾 Datos del cliente
    Object.assign(nuevaOrden, {
      nombre: formData.nombre,
      correo: formData.correo,
      telefono: formData.telefono,
      direccion: formData.direccion,
      ciudad: formData.ciudad,
      codigo_postal: formData.codigo_postal,
      pais: formData.pais,
    });

    // 🛒 Producto comprado
    if (paymentData?.item) {
      nuevaOrden.productos = [
        {
          id_producto: paymentData.item.id || "",
          nombre: paymentData.item.title || "",
          cantidad: 1,
          precio_unitario: paymentData.item.price || 0,
        },
      ];
    }

    // 💳 Datos del pago
    nuevaOrden.metodo_pago = paymentData?.method?.methodId || "";
    nuevaOrden.estado_pago = "pendiente";
    nuevaOrden.pedido_id = `ORD-${Date.now()}`;
    nuevaOrden.fecha_compra = new Date().toISOString();

    // Extras
    nuevaOrden.notas = formData.notas || "";
    nuevaOrden.origen_pedido = "web";
    nuevaOrden.tracking_id = "";

    console.log("✅ Orden estructurada lista para enviar al backend:", nuevaOrden);

    setPaymentData((prev) => ({
      ...prev,
      orden: nuevaOrden,
    }));

    // Procesar Mercado Pago si corresponde
    if (paymentData?.method?.methodId === "mercadopago") {
      processMercadoPago(nuevaOrden);
    }
  };

  // ------------------------------
  // 🚀 Proceso de pago (Mercado Pago u otros)
  // ------------------------------
  const processMercadoPago = async (nuevaOrden) => {
    if (paymentData?.method?.methodId !== 'mercadopago') return;

    if (!paymentData?.item?.id || !paymentData?.item?.price) {
      setError('No hay información válida del producto para procesar el pago.');
      return;
    }

    console.log('🚀 Datos del pago para Mercado Pago:', paymentData);

    try {
      setIsProcessingPayment(true);

      // ✅ Resetear el método para que vuelva a mostrar la lista de métodos
      setMethodStatePayment((prev) => ({ ...prev, method: null }));
      setPaymentData((prev) => (prev ? { ...prev, method: null } : prev));

      console.log('🚀 Iniciando proceso Mercado Pago con:', nuevaOrden);
      await handlePaymentMercadoPago(paymentData, nuevaOrden);

      setSuccessPaymentMercadoPago(paymentData);
    } catch (err) {
      console.error('Error durante el pago con Mercado Pago:', err);
      setError('Ocurrió un error al procesar el pago con Mercado Pago.');
    } finally {
      setIsProcessingPayment(false);
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
  // Render principal
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

    const currentMethod = paymentData.method;

    // ✅ Si no hay método seleccionado → Mostrar selector
    if (!currentMethod) {
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

    // ✅ Modal activo
    if (isModalOpen) {
      return renderModal();
    }

    // ✅ Procesando pago → Se muestra selector otra vez
    if (isProcessingPayment) {
      return (
        <div className="payment-selector-container">
          <LoadingComponent size="large" color="#3b82f6" />
          <p>Procesando pago, vuelve a elegir un método si es necesario...</p>
          <PaymentMethodSelector onMethodSelect={handleMethodSelection} />
        </div>
      );
    }

    return (
      <div className="payment-form-container">
        <PaymentForm product={paymentData.item} />
        <button className="change-payment-method-btn" onClick={resetPaymentMethod}>
          Cambiar método de pago
        </button>
      </div>
    );
  };

  return (
    <div className="payment-container">
      {isRouterPayment && (
        <div className="payment-method-header">
          <h2>Formas de Pago</h2>
          <p>Selecciona tu método de pago preferido</p>
        </div>
      )}

      <div className="payment-method-content">{renderPaymentComponent()}</div>

      {/* Modal */}
      {isModalOpen && renderModal()}
    </div>
  );
};

export default Payment;











