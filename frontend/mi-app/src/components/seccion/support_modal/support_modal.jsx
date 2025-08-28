import React, { useState } from 'react';
import './support_modal.scss';

const SupportModalContent = ({ onClose }) => {
  const [contactMethod, setContactMethod] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // WhatsApp configuration
  const WHATSAPP_NUMBER = '5491123456789'; // Reemplaza con tu número
  const WHATSAPP_MESSAGE = 'Hola, necesito ayuda con...';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWhatsAppRedirect = () => {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(whatsappUrl, '_blank');
    if (onClose) onClose();
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Aquí tu lógica de envío de email
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error al enviar el mensaje:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="support-content">
      <h2 className="support-content__title">Centro de Soporte</h2>
      
      {!contactMethod ? (
        <>
          <p className="support-content__subtitle">
            ¿Cómo prefieres contactarnos?
          </p>
          
          <div className="support-content__options">
            <button 
              className="contact-option contact-option--whatsapp"
              onClick={handleWhatsAppRedirect}
            >
              <div className="contact-option__icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div className="contact-option__content">
                <h3>WhatsApp</h3>
                <p>Respuesta rápida y directa</p>
              </div>
              <div className="contact-option__arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </button>

            <button 
              className="contact-option contact-option--email"
              onClick={() => setContactMethod('email')}
            >
              <div className="contact-option__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="contact-option__content">
                <h3>Correo Electrónico</h3>
                <p>Detalla tu consulta por escrito</p>
              </div>
              <div className="contact-option__arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </button>
          </div>

          <div className="support-content__info">
            <p>Horario de atención: Lunes a Viernes de 9:00 a 18:00</p>
          </div>
        </>
      ) : (
        <>
          <button 
            className="support-content__back"
            onClick={() => setContactMethod(null)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round"/>
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
                placeholder="¿En qué podemos ayudarte?"
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
                placeholder="Describe tu consulta con el mayor detalle posible..."
              />
            </div>

            {submitStatus === 'success' && (
              <div className="email-form__alert email-form__alert--success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M22 4L12 14.01l-3-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>¡Mensaje enviado con éxito!</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="email-form__alert email-form__alert--error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path d="M12 8v4M12 16h.01" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Error al enviar. Intenta nuevamente.</span>
              </div>
            )}

            <button 
              type="submit" 
              className="email-form__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <span>Enviar mensaje</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default SupportModalContent;