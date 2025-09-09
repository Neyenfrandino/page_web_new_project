import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const Modal = ({ isOpenModal, onClose, children }) => {
  const isOpen = isOpenModal;
  
  if (!isOpen) return null;
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      // En lugar de modificar el body, agregar clase CSS
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        // Remover la clase en lugar de modificar directamente el style
        document.body.classList.remove('modal-open');
      };
    }
  }, [isOpen, onClose]);

  const handleCloseClick = () => {
    onClose();
    document.body.classList.remove('modal-open');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div className="modal__backdrop" onClick={handleBackdropClick}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>

        <button 
          className="modal__close" 
          onClick={handleCloseClick}
          aria-label="Cerrar modal"
          type="button"
        >
          ×
        </button>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;