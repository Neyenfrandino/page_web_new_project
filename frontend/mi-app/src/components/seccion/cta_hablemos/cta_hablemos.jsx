import { useState, useCallback } from 'react';
import { Mail, MessageCircle, Instagram, Leaf, Send, User, AtSign } from 'lucide-react';
import './cta_hablemos.scss';

const CtaHablemos = ({ showSocialMedia = true }) => {
    const [formState, setFormState] = useState({
        nombre: '',
        correo: '',
        mensaje: ''
    }); 
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState('');
 
    const { nombre, correo, mensaje } = formState;

    const handleInputChange = useCallback((field, value) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleSubmit = useCallback(async () => {
        if (!nombre || !correo || !mensaje) {
            alert('Por favor completa todos los campos');
            return;
        }
         
        setIsFormSubmitted(true);
        
        // Simular envío
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        setFormState({
            nombre: '',
            correo: '',
            mensaje: ''
        });
        setIsFormSubmitted(false);
    }, [nombre, correo, mensaje]);
 
    return (
        <div className="modern-contact">
            {/* Elementos decorativos de fondo */}
            <div className="modern-contact__bg-decoration modern-contact__bg-decoration--1"></div>
            <div className="modern-contact__bg-decoration modern-contact__bg-decoration--2"></div>
            <div className="modern-contact__bg-decoration modern-contact__bg-decoration--3"></div>

            {/* Iconos flotantes */}
            <div className="modern-contact__floating-icon modern-contact__floating-icon--1">
                <Leaf size={48} />
            </div>
            <div className="modern-contact__floating-icon modern-contact__floating-icon--2">
                <Leaf size={36} />
            </div>
            <div className="modern-contact__floating-icon modern-contact__floating-icon--3">
                <Leaf size={24} />
            </div>

            <div className="modern-contact__container">
                {/* Header */}
                <div className="modern-contact__header">
                    <div className="modern-contact__header-icon">
                        <Leaf size={32} />
                    </div>
                    <h1 className="modern-contact__title">Hablemos</h1>
                    <p className="modern-contact__subtitle">
                        Conectemos ideas, creemos soluciones sostenibles y construyamos juntos un futuro más verde
                    </p>
                </div>

                {/* Formulario principal */}
                <div className="modern-contact__form-section">
                    <div className="modern-contact__form-card">
                        <div className="modern-contact__form-grid">
                            {/* Sección izquierda - Imagen */}
                            <div className="modern-contact__image-section">
                                <div className="modern-contact__image-bg"></div>
                                <div className="modern-contact__image-decoration modern-contact__image-decoration--top">
                                    <Leaf size={120} />
                                </div>
                                <div className="modern-contact__image-decoration modern-contact__image-decoration--bottom">
                                    <Leaf size={80} />
                                </div>
                                
                                <div className="modern-contact__image-content">
                                    <div className="modern-contact__profile-image">
                                        <img 
                                            src="/img/tierra_martinez.jpg" 
                                            alt="Foto de perfil"
                                        />
                                    </div>
                                    <div className="modern-contact__profile-info">
                                        <h3>Naluum</h3>
                                        <p>Movimiento de Permacultura</p>
                                        <div className="modern-contact__profile-tagline">
                                            <Leaf size={16} />
                                            <span>Construyendo un futuro sostenible</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sección derecha - Formulario */}
                            <div className="modern-contact__form-content">
                                <h2>Contanos en qué te podemos ayudar</h2>
                                <p>Tu mensaje es importante para nosotros</p>

                                <div className="modern-contact__form">
                                    {/* Campo Nombre */}
                                    <div className="modern-contact__field">
                                        <div className={`modern-contact__field-icon ${focusedField === 'nombre' ? 'modern-contact__field-icon--focused' : ''}`}>
                                            <User size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Tu nombre"
                                            value={nombre}
                                            onChange={(e) => handleInputChange('nombre', e.target.value)}
                                            onFocus={() => setFocusedField('nombre')}
                                            onBlur={() => setFocusedField('')}
                                            className={`modern-contact__input ${focusedField === 'nombre' ? 'modern-contact__input--focused' : ''}`}
                                        />
                                    </div>

                                    {/* Campo Email */}
                                    <div className="modern-contact__field">
                                        <div className={`modern-contact__field-icon ${focusedField === 'correo' ? 'modern-contact__field-icon--focused' : ''}`}>
                                            <AtSign size={20} />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="tu@email.com"
                                            value={correo}
                                            onChange={(e) => handleInputChange('correo', e.target.value)}
                                            onFocus={() => setFocusedField('correo')}
                                            onBlur={() => setFocusedField('')}
                                            className={`modern-contact__input ${focusedField === 'correo' ? 'modern-contact__input--focused' : ''}`}
                                        />
                                    </div>

                                    {/* Campo Mensaje */}
                                    <div className="modern-contact__field">
                                        <textarea
                                            placeholder="Escribe tu mensaje aquí..."
                                            value={mensaje}
                                            onChange={(e) => handleInputChange('mensaje', e.target.value)}
                                            onFocus={() => setFocusedField('mensaje')}
                                            onBlur={() => setFocusedField('')}
                                            rows="5"
                                            className={`modern-contact__textarea ${focusedField === 'mensaje' ? 'modern-contact__textarea--focused' : ''}`}
                                        />
                                    </div>

                                    {/* Botón Submit */}
                                    <button 
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isFormSubmitted}
                                        className="modern-contact__submit"
                                    >
                                        {isFormSubmitted ? (
                                            <>
                                                <div className="modern-contact__spinner"></div>
                                                <span>Enviando...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                <span>Sembrar mensaje</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de redes sociales */}
                {showSocialMedia && (
                    <div className="modern-contact__social-section">
                        <div className="modern-contact__social-header">
                            <h2>También podés encontrarnos por otros medios</h2>
                            <p>Elige la forma que más te guste para conectar con nosotros</p>
                        </div>

                        <div className="modern-contact__social-grid">
                            {/* Email Card */}
                            <div className="modern-contact__social-card modern-contact__social-card--email">
                                <div className="modern-contact__social-icon modern-contact__social-icon--email">
                                    <Mail size={28} />
                                </div>
                                <h3>Escribinos por email</h3>
                                <p>Naluum@ejemplo.com</p>
                                <a href="mailto:Naluum@ejemplo.com" className="modern-contact__social-button modern-contact__social-button--email">
                                    <Mail size={18} />
                                    <span>Enviar mensaje</span>
                                </a>
                            </div>

                            {/* WhatsApp Card */}
                            <div className="modern-contact__social-card modern-contact__social-card--whatsapp">
                                <div className="modern-contact__social-icon modern-contact__social-icon--whatsapp">
                                    <MessageCircle size={28} />
                                </div>
                                <h3>Habla por WhatsApp</h3>
                                <p>+57 3456082190</p>
                                <a 
                                    href="https://wa.me/573456082190" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="modern-contact__social-button modern-contact__social-button--whatsapp"
                                >
                                    <MessageCircle size={18} />
                                    <span>Conversemos</span>
                                </a>
                            </div>

                            {/* Instagram Card */}
                            <div className="modern-contact__social-card modern-contact__social-card--instagram">
                                <div className="modern-contact__social-icon modern-contact__social-icon--instagram">
                                    <Instagram size={28} />
                                </div>
                                <h3>Seguinos en redes</h3>
                                <p>@naluum.permacultura</p>
                                <a 
                                    href="https://www.instagram.com/naluum.permacultura" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="modern-contact__social-button modern-contact__social-button--instagram"
                                >
                                    <Instagram size={18} />
                                    <span>Haz parte de la red</span>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CtaHablemos;