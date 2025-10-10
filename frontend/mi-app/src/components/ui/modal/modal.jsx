import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const Modal = ({ isOpenModal, onClose, children }) => {
  const isOpen = isOpenModal;

  // Si no está abierto, no renderiza nada
  if (!isOpen) return null;

  useEffect(() => {
    // Permite cerrar el modal con la tecla Escape
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      // Agrega clase CSS al body para bloquear el scroll
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleEscape);
        // Elimina la clase del body al cerrar
        document.body.classList.remove('modal-open');
      };
    }
  }, [isOpen, onClose]);

  // Cerrar el modal con el botón "×"
  const handleCloseClick = () => {
    onClose();
    document.body.classList.remove('modal-open');
  };

  // 🟡 Esta función cerraba el modal al hacer clic fuera del contenido.
  // La dejamos comentada para que NO se cierre al hacer clic fuera.
  /*
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  */

  const modalContent = (
    // 🔸 Quitamos el onClick del backdrop para evitar cierre por clic fuera
    <div className="modal__backdrop">
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>

      {/* Botón "×" para cerrar el modal */}
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

  // Renderiza el modal en el body (fuera del flujo normal de la app)
  return createPortal(modalContent, document.body);
};

export default Modal;
