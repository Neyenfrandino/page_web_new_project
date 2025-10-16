import React, { useState, useEffect } from 'react';
import './support_modal.scss';

const messageTitle = {
  informacionProductos:
    'Para una mejor atención, hemos abierto un canal de contacto donde te proporcionaremos toda la información que necesitas sobre nuestros productos y servicios.',
  soporteTecnico: 'Soporte Técnico',
  consultasGenerales: 'Consultas Generales',
};

const SupportModalContent = ({ onClose, item }) => {
  console.log('SupportModalContent - Item recibido:', item.type);
  const [contactMethod, setContactMethod] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // 🟢 WhatsApp number
  const WHATSAPP_NUMBER = '5493534240350';

  /** 🔹 Define acción principal (Comprar, Inscribirse o Consultar) **/
  const action =
    item?.itemType === 'product'|| item.type === 'product'
      ? 'comprar'
      : item?.itemType === 'service' || item.type === 'service'
      ? 'inscribirme'
      : 'hacer una consulta';

  /** 🔹 Genera mensaje dinámico **/
  const WHATSAPP_MESSAGE = `Hola, quiero ${action} al ${item?.title || 'uno de sus servicios'}.`;

  /** 🔹 Pre-cargar asunto y mensaje según tipo **/
  useEffect(() => {
    if (item) {
      const productName = item?.title || 'Producto o servicio';
      const productId = item?.id ? `#${item.id}` : '';

      let subject = '';
      let message = '';

      if (item.itemType === 'product' || item.type === 'product') {
        subject = `Consulta para comprar ${productName} ${productId}`;
        message = `Hola, quiero comprar "${productName}". ¿Podrían brindarme más detalles sobre el proceso de compra?`;
      } else if (item.itemType === 'service' || item.type === 'service') {
        subject = `Inscripción al servicio ${productName} ${productId}`;
        message = `Hola, quiero inscribirme en "${productName}". ¿Podrían indicarme los pasos a seguir?`;
      } else {
        subject = `Consulta general sobre ${productName}`;
        message = `Hola, quiero hacer una consulta sobre "${productName}". ¿Podrían ayudarme?`;
      }

      setFormData((prev) => ({
        ...prev,
        subject,
        message,
      }));
    }
  }, [item]);

  /** 🔹 Manejo de inputs **/
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /** 🔹 Redirección a WhatsApp **/
/** 🔹 Redirección a WhatsApp — siempre en navegador (WhatsApp Web) **/
const handleWhatsAppRedirect = () => {
  try {
    const phone = WHATSAPP_NUMBER;
    const message = encodeURIComponent(WHATSAPP_MESSAGE);

    // 🔸 Fuerza apertura en WhatsApp Web directamente
    const webUrl = `https://web.whatsapp.com/send?phone=${phone}&text=${message}`;

    window.open(webUrl, '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.error('Error al abrir WhatsApp Web:', error);
    window.open(
      `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
      '_blank'
    );
  }
};


  /** 🔹 Envío del formulario **/
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula envío real
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setSubmitStatus(null);
        if (onClose) onClose();
      }, 2000);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const messageText =
    item?.originalData?.type === 'product' || item?.originalData?.type === 'service' || item?.type === 'product' || item?.type === 'service'
      ? messageTitle.informacionProductos
      : messageTitle.soporteTecnico;

  return (
    <div className="support-content">
      <h2 className="support-content__title">¿Cómo prefieres contactarnos?</h2>

      {!contactMethod ? (
        <>
          <p className="support-content__subtitle">{messageText}</p>

          <div className="support-content__options">
            <button className="contact-option contact-option--whatsapp" onClick={handleWhatsAppRedirect}>
              <div className="contact-option__icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div className="contact-option__content">
                <h3>WhatsApp</h3>
                <p>Se abrirá en la app o en el navegador</p>
              </div>
            </button>

            <button className="contact-option contact-option--email" onClick={() => setContactMethod('email')}>
              <div className="contact-option__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="contact-option__content">
                <h3>Correo Electrónico</h3>
                <p>Detalla tu consulta por escrito</p>
              </div>
            </button>
          </div>

          <div className="support-content__info">
            <p>Horario de atención: Lunes a Viernes de 9:00 a 18:00</p>
          </div>
        </>
      ) : (
        <>
          <button className="support-content__back" onClick={() => setContactMethod(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>Volver</span>
          </button>

          <form className="email-form" onSubmit={handleEmailSubmit}>
            <h3 className="email-form__title">Envíanos tu mensaje</h3>

            <div className="email-form__group">
              <label htmlFor="name">Nombre completo *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Juan Pérez"
              />
            </div>

            <div className="email-form__group">
              <label htmlFor="email">Correo electrónico *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="tu@email.com"
              />
            </div>

            <div className="email-form__group">
              <label htmlFor="subject">Asunto *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="email-form__group">
              <label htmlFor="message">Mensaje *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="6"
              />
            </div>

            {submitStatus === 'success' && (
              <div className="email-form__alert email-form__alert--success">
                <span>¡Mensaje enviado con éxito!</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="email-form__alert email-form__alert--error">
                <span>Error al enviar. Intenta nuevamente.</span>
              </div>
            )}

            <button type="submit" className="email-form__submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default SupportModalContent;
