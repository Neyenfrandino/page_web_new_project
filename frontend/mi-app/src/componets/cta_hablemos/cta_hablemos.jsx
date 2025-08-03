import { useState, useCallback } from 'react';
import SEOHelmet from '../../componets/SEOHelmet/SEOHelmet';
import { FaLeaf } from 'react-icons/fa';

import './cta_hablemos.scss';

const CtaHablemos = ({ showSocialMedia = true }) => {
    const [formState, setFormState] = useState({
        nombre: '',
        correo: '',
        mensaje: ''
    }); 
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

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
        <div className="cta-hablemos">
            <SEOHelmet 
                title="Hablemos | Movimiento Naluum"
                description="Hablemos con Naluum, para conocer más sobre nuestro movimiento y sus misiones."
                keywords="movimiento naluum, naluum, movimiento, naluum movimiento"
                author="Neyen Frandino"
                url="https://miempresa.com"
                image="https://miempresa.com/img/logo_naluum_og.jpg"    
            />

            <div className="cta-hablemos__container">
                {/* Elementos decorativos */}
                <div className="cta-hablemos__decoration cta-hablemos__decoration--top-left"><FaLeaf style={{ color: '#4CAF50', fontSize: '104px' }} /></div>
                <div className="cta-hablemos__decoration cta-hablemos__decoration--bottom-left"><FaLeaf style={{ color: '#4CAF50', fontSize: '104px' }} /></div>
                <div className="cta-hablemos__decoration cta-hablemos__decoration--top-right"><FaLeaf style={{ color: '#4CAF50', fontSize: '104px' }} /></div>

                <div className="cta-hablemos__content">
                    {/* Sección izquierda con imagen */}
                    <div className="cta-hablemos__left">
                        <div className="image-wrapper">
                            <div className="image-container">
                                <img src="/img/tierra_martinez.jpg" alt="Foto de perfil" className="image" />
                            </div>
                        </div>
                    </div>

                    {/* Sección derecha con formulario */}
                    <div className="cta-hablemos__right">
                        <h1 className="cta-hablemos__title">Hablemos</h1>
                        <p className="cta-hablemos__subtitle">
                            Contanos en qué te podemos ayudar.
                        </p>

                        <div className="cta-hablemos__form">
                            <input
                                type="text"
                                placeholder="NAME"
                                value={nombre}
                                onChange={(e) => handleInputChange('nombre', e.target.value)}
                                className="cta-hablemos__input"
                            />

                            <input
                                type="email"
                                placeholder="EMAIL"
                                value={correo}
                                onChange={(e) => handleInputChange('correo', e.target.value)}
                                className="cta-hablemos__input"
                            />

                            <textarea
                                placeholder="MESSAGE"
                                value={mensaje}
                                onChange={(e) => handleInputChange('mensaje', e.target.value)}
                                className="cta-hablemos__textarea"
                                rows="4"
                            />

                            <button 
                                onClick={handleSubmit}
                                className="cta-hablemos__submit"
                                disabled={isFormSubmitted}
                            >
                                {isFormSubmitted ? 'Enviando...' : 'Sembrar mensaje'}
                            </button>
                        </div>
                    </div>
                </div>

                {showSocialMedia && (
                    <div className="cta-hablemos__alternative">
                        <h2 className="cta-hablemos__alternative-title">
                            También podés encontrarnos por otros medios:
                        </h2>

                        <div className="cta-hablemos__cards">
                            {/* Email Card */}
                            <div className="cta-hablemos__card">
                                <div className="cta-hablemos__card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <p className="cta-hablemos__card-title">Escribinos por email:</p>
                                <p className="cta-hablemos__card-info">[Naluum@ejemplo.com]</p>
                                <a href="mailto:Naluum@ejemplo.com" className="cta-hablemos__card-button">
                                    Enviar mensaje
                                </a>
                            </div>

                            {/* WhatsApp Card */}
                            <div className="cta-hablemos__card">
                                <div className="cta-hablemos__card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <p className="cta-hablemos__card-title">Habla por WhatsApp</p>
                                <p className="cta-hablemos__card-info">+57 3456082190</p>
                                <a href="https://wa.me/573456082190" className="cta-hablemos__card-button" target="_blank" rel="noopener noreferrer">
                                    Conversemos
                                </a>
                            </div>

                            {/* Instagram Card */}
                            <div className="cta-hablemos__card">
                                <div className="cta-hablemos__card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5932 15.1514 13.8416 15.5297C13.0901 15.9079 12.2385 16.0396 11.4078 15.9059C10.5771 15.7723 9.80977 15.3801 9.21485 14.7852C8.61993 14.1902 8.22774 13.4229 8.09408 12.5922C7.96042 11.7615 8.09208 10.9099 8.47034 10.1584C8.8486 9.40685 9.4542 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <p className="cta-hablemos__card-title">Seguinos en redes</p>
                                <p className="cta-hablemos__card-info">@naluum.permacultura</p>
                                <a href="https://www.instagram.com/naluum.permacultura" className="cta-hablemos__card-button" target="_blank" rel="noopener noreferrer">
                                    Haz parte de la red
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
