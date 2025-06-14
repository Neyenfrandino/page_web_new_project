// FadeInOnView.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import './fadeInOnView.scss';

const FadeInOnView = ({ 
  children, 
  className = '', 
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  delay = 0,
  duration = 600,
  direction = 'up', // 'up', 'down', 'left', 'right', 'fade'
  distance = 20,
  disabled = false
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(disabled);
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleIntersection = useCallback(([entry]) => {
    const shouldShow = entry.isIntersecting;
    
    if (shouldShow && !hasTriggered) {
      setTimeout(() => {
        setIsVisible(true);
        setHasTriggered(true);
      }, delay);
    } else if (!shouldShow && !triggerOnce && hasTriggered) {
      setIsVisible(false);
    }
  }, [delay, triggerOnce, hasTriggered]);

  useEffect(() => {
    if (disabled) return;
    
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, handleIntersection, disabled]);

  // Generar clases dinámicas basadas en las props
  const getAnimationClasses = () => {
    const baseClass = 'fade-in-view';
    const directionClass = `${baseClass}--${direction}`;
    const stateClass = isVisible ? `${baseClass}--visible` : `${baseClass}--hidden`;
    
    return `${baseClass} ${directionClass} ${stateClass}`;
  };

  // Estilos inline para duración y distancia personalizadas
  const customStyles = {
    '--fade-duration': `${duration}ms`,
    '--fade-distance': `${distance}px`
  };

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={customStyles}
    >
      {children}
    </div>
  );
};

export default FadeInOnView;