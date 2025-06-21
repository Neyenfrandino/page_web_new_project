// Modal.jsx
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const Modal = ({ 
  isOpenModal, 
  onClose, 
  children, 
  triggerElement,
  showPointer = true,
  offset = 10 
}) => {
  const modalRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [pointerPosition, setPointerPosition] = useState('top');

  const { isOpen, item } = isOpenModal;

 

  useEffect(() => {
    if (isOpen && triggerElement && modalRef.current) {
      const triggerRect = triggerElement.getBoundingClientRect();
      const modalRect = modalRef.current.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth - 50,
        height: window.innerHeight - 50
      };

      // Centrar el modal en la pantalla
      let top = (viewport.height - modalRect.height) / 2;
      let left = (viewport.width - modalRect.width) / 2;

      // Asegurar que el modal no se salga de la pantalla
      if (top < offset) {
        top = offset;
      } else if (top + modalRect.height > viewport.height - offset) {
        top = viewport.height - modalRect.height - offset;
      }

      if (left < offset) {
        left = offset;
      } else if (left + modalRect.width > viewport.width - offset) {
        left = viewport.width - modalRect.width - offset;
      }

      setPosition({ top, left });
      setPointerPosition('top'); // Pointer fijo ya que está centrado
    }
  }, [isOpen, triggerElement, offset]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="modal__backdrop">
      <div 
        ref={modalRef}
        className={`modal__content`} /* o ${showPointer ? `modal__content--pointer-${pointerPosition}` : ''} */
        style={{
          position: 'fixed',
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: 'none'
        }}
      >
        <button 
          className="modal__close" 
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;