import React, { useState, useEffect } from 'react';
import './cta_img_cuenta_rgresiva.scss';
import { Link } from 'react-router-dom';

let DOMAIN = import.meta.env.VITE_API_URL;
console.log(DOMAIN)



//   const handlePrimaryAction = (normalizedItem, e) => {
//     e.stopPropagation();
//     const action = normalizedItem.itemType === 'product' ? 'Comprar' : 'Inscribirse';
  
//     setMethodStatePayment({ normalizedItem });
//     // Aquí va tu lógica específica
//   };

const CtaImgCuentaRgresiva = ({ 
    img, 
    titles = { main:'', subtitle: "¿Ya tienes una cuenta?" }, 
    text = "Accede a tu cuenta para ver tus productos y servicios.", 
    buttonText = "Inscrivete", 
    timer = { targetDate: null }, 
    link = "/servicios/laboratorios-alimentacion-viva"
}) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });


    useEffect(() => {
        if (!timer.targetDate) return;

        const calculateTimeLeft = () => {
            const difference = new Date(timer.targetDate) - new Date();
            
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(interval);
    }, [timer.targetDate]);

    const formatTime = (time) => time.toString().padStart(2, '0');

    return (
        <div className="cta-cuenta-regresiva__container">
            <div className="cta-cuenta-regresiva__content">
                {
                    titles.main &&
                    <div className="cta-cuenta-regresiva__titles">
                        <h2>{titles.main}</h2>
                    </div>
                }
                
                <div className="cta-cuenta-regresiva__image">
                    {img && (
                        <img 
                            src={`${DOMAIN}${img}`} 
                            alt="Cuenta Regresiva" 
                            className="cta-cuenta-regresiva__img"
                        />
                    )}
                    
                    <div className="cta-cuenta-regresiva__content-text">

                        <div className="cta-cuenta-regresiva__timer">
                            <div className='timer-content'>

                                <div className="timer-unit">
                                    <span className="timer-number">{formatTime(timeLeft.days)}</span>
                                    <span className="timer-label">Días</span>
                                </div>
                                <span className="timer-separator">:</span>
                                <div className="timer-unit">
                                    <span className="timer-number">{formatTime(timeLeft.hours)}</span>
                                    <span className="timer-label">Horas</span>
                                </div>
                                <span className="timer-separator">:</span>
                                <div className="timer-unit">
                                    <span className="timer-number">{formatTime(timeLeft.minutes)}</span>
                                    <span className="timer-label">Min</span>
                                </div>
                                <span className="timer-separator">:</span>
                                <div className="timer-unit">
                                    <span className="timer-number">{formatTime(timeLeft.seconds)}</span>
                                    <span className="timer-label">Seg</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="cta-cuenta-regresiva__text-section">
                            <h2>{titles.subtitle}</h2>
                            <p>{text}</p>
                            <Link to={link} className="cta-cuenta-regresiva__link">
                                <span>{buttonText}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CtaImgCuentaRgresiva;