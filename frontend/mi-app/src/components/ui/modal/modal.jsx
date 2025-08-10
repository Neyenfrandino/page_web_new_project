import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const Modal = ({ isOpenModal, onClose, children }) => {
  const { isOpen } = isOpenModal;

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
      <div className="modal__backdrop">
        <button 
          className="modal__close" 
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ×
        </button>
      <div className="modal__content">

        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
