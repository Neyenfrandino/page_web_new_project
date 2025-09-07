import React, { useEffect } from 'react';
import './loading_component.scss';

const LoadingComponent = ({ size = 'medium', color = '#3b82f6' }) => {
  useEffect(() => {
    // Bloquear el scroll del body cuando el componente se monta
    document.body.style.overflow = 'hidden';
    
    // Restaurar el scroll cuando el componente se desmonta
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div 
          className={`loading-spinner loading-spinner--${size}`}
          style={{ borderTopColor: color }}
        >
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;