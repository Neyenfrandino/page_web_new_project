import React, { useState, useEffect, useRef } from 'react';
import './card_data_impacto.scss';
import card_data_impacto from '../../json/data_impacto_real.json';

// Hook personalizado para animar números
const useCountUp = (end, duration = 2000, start = 0) => {
    const [count, setCount] = useState(start);
    const countRef = useRef(start);
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const originalText = end.toString();
        
        // Extraer solo el número del texto
        const numberMatch = originalText.match(/\d+/);
        const endValue = numberMatch ? parseInt(numberMatch[0]) : 0;
        
        if (endValue === 0) {
            setCount(originalText);
            return;
        }

        const startTime = Date.now();
        const startValue = countRef.current;
        
        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Función de easing para una animación más suave
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            const currentValue = startValue + (endValue - startValue) * easeOutQuart;
            countRef.current = currentValue;
            
            // Formatear manteniendo el texto original pero reemplazando el número
            const animatedNumber = Math.round(currentValue).toLocaleString();
            const formattedValue = originalText.replace(/\d+/, animatedNumber);
            
            setCount(formattedValue);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return [count, elementRef];
};

const CardDataImpacto = ({ data }) => {
    return (
        <div className='card-data-impacto__container'>
            <div className='card-data-impacto__content'>
                {card_data_impacto.slice(0, 4).map((item, index) => {
                    const [animatedValue, ref] = useCountUp(item.value, 2500 + index * 200);
                    
                    return (
                        <div 
                            className='card-data-impacto__item' 
                            key={index}
                            ref={ref}
                            style={{
                                animationDelay: `${index * 0.2}s`
                            }}
                        >
                            <div className='card-data-impacto__icon'>
                                <i className={item.icon}></i>
                            </div>
                            <div className='card-data-impacto__title'>
                                {item.title}
                            </div>
                            <div className='card-data-impacto__value'>
                                {animatedValue}
                            </div>
                            <div className='card-data-impacto__description'>
                                {item.description}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CardDataImpacto;