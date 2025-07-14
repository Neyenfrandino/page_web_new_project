import { useState, useCallback } from 'react';
import './cta_boletin.scss';

const initState = {
    nombre: '',
    correo: '',
    mensaje: ''
};

const CtaBoletin = () => {
    const [formState, setFormState] = useState(initState);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const { nombre, correo, mensaje } = formState;

    const handleFormChange = useCallback((e) => {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    const handleFormSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsFormSubmitted(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsFormOpen(false);

        if (isFormSubmitted) {
            alert('¡Gracias por tu interés! Procesamos tu solicitud.');
            setFormState(initState);
        }   
    }, []);
    
  
    return (
        <div className='cta-boletin__container'>
            <div className='cta-boletin__background'></div>
            <div className='cta-boletin__content'>
                <div className='cta-boletin__header'>
                    <h2>¡Únete a la comunidad!</h2>
                    <p>Forma parte del movimiento Naluum y disfruta de nuestra comunidad activa.</p>
                </div>
                
                <form className='cta-boletin__form' onSubmit={handleFormSubmit} onChange={handleFormChange}>
                    <div className='cta-boletin__form-groups'>
                        <div className='cta-boletin__form-group'>
                            <label htmlFor="nombre">Nombre</label>
                            <input 
                                type="text" 
                                id="nombre" 
                                name="nombre" 
                                value={nombre}
                                placeholder="Tu nombre completo" 
                                required 
                            />
                        </div>
                        
                        <div className='cta-boletin__form-group'>
                            <label htmlFor="correo">Correo electrónico</label>
                            <input 
                                type="email" 
                                id="correo" 
                                name="correo" 
                                value={correo}
                                placeholder="tu@email.com" 
                                required 
                            />
                        </div>
                        
                        <div className='cta-boletin__form-group'>
                            <label htmlFor="mensaje">Mensaje</label>
                            <textarea 
                                id="mensaje" 
                                name="mensaje" 
                                value={mensaje}
                                placeholder="Cuéntanos qué te interesa de nuestra comunidad..."
                                rows="4"
                            ></textarea>
                        </div>
                    </div>

                    <div className='cta-boletin__action-section'>
                        <button type="submit" className='cta-boletin__submit'>
                            <span>Únete ahora</span>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        
                        <div className='cta-boletin__benefits'>
                            <div className='cta-boletin__benefit'>
                                <div className='cta-boletin__benefit-icon'>🌿</div>
                                <span>Contenido exclusivo</span>
                            </div>
                            <div className='cta-boletin__benefit'>
                                <div className='cta-boletin__benefit-icon'>📧</div>
                                <span>Newsletter semanal</span>
                            </div>
                            <div className='cta-boletin__benefit'>
                                <div className='cta-boletin__benefit-icon'>🤝</div>
                                <span>Comunidad activa</span>
                            </div>
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CtaBoletin;