import { useContext, useState } from 'react';
import { MethodStatePaymentContext } from '../../../../src/context/method_state_payment/method_state_payment.context';
import SupportModalContent from '../support_modal/support_modal'; 
import Modal from '../../ui/modal/modal';

import './grid.scss';

const Grid = ({ items = [], slice = items?.length, setIsOpen }) => {
  const { setMethodStatePayment } = useContext(MethodStatePaymentContext);

  // Mapeo de iconos para servicios
  const getServiceIcon = (service) => {
    const name = service.title.toLowerCase();
    const iconMap = {
      'diseño': '🌱', 'espacio': '🌱',
      'taller': '🤝', 'vivencial': '🤝',
      'asesor': '💡', 'consultor': '💡',
      'retiro': '🔥', 'encuentro': '🔥',
      'huerta': '🌿', 'escolar': '🌿',
      'bioconstrucción': '🏘️', 'construcción': '🏘️',
      'círculo': '👥', 'escucha': '👥',
      'alimentación': '🥬', 'cocina': '🥬'
    };
     
    for (const [key, icon] of Object.entries(iconMap)) {
      if (name.includes(key)) return icon;
    }
    return '🌿';
  };

  // Normalizar items para estructura consistente
  const normalizeItem = (item) => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle || item.description,
    image: item.image,
    badge: item.badge || '',
    icon: item.icon || (item.type === 'service' ? getServiceIcon(item) : ''),
    category: item.category || '',
    price: item.price,
    currency: item.currency || 'USD',
    content: item.content || '',
    originalData: item,
    itemType: item.type,
    originalPrice: item.originalPrice || item.price,
  });

  // Formatear precio
  const formatPrice = (item) => {
    if (!item.price) return '';
    return `${item.currency} ${item.price.toFixed(2)}`;
  };

  // Manejadores de eventos
  const handleCardClick = (normalizedItem, e) => {
    if (setIsOpen) {
      setIsOpen(true, e, normalizedItem.originalData);
    }
  };
  const [isSupportModalOpen, setIsSupportModalOpen] = useState({statusOpenModal: false, item: null});
  console.log(isSupportModalOpen.statusOpenModal);
  const handlePrimaryAction = (normalizedItem, e) => {
    e.stopPropagation();
    setIsSupportModalOpen({statusOpenModal: true, item: normalizedItem});

    // const action = normalizedItem.itemType === 'product' ? 'Comprar' : 'Inscribirse';
    
    // setMethodStatePayment({ normalizedItem });
    // Aquí va tu lógica específica
  };

  const handleKeyDown = (normalizedItem, e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(normalizedItem, e);
    }
  };

  return (
    <div className="grid">
      <div className="grid__container">
        {items.slice(0, slice).map((item) => {
          const normalizedItem = normalizeItem(item);

          return (
            <div
              key={normalizedItem.id}
              className={`grid__card grid__card--${normalizedItem.itemType}`}
              // onClick={(e) => handleCardClick(normalizedItem, e)}
              onKeyDown={(e) => handleKeyDown(normalizedItem, e)}
              role="button"
              tabIndex={0}
              aria-label={`Ver detalles de ${normalizedItem.title}`}
            >
              {/* Imagen */}
              <div className="grid__card-image">
                <img
                  src={normalizedItem.image}
                  alt={normalizedItem.title}
                  loading="lazy"
                />
                {normalizedItem.badge && (
                  <div className="grid__card-badge">
                    {normalizedItem.badge}
                  </div>
                )}
              </div>

              {/* Contenido superpuesto */}
              <div className="grid__card-overlay">
                {/* NUEVA ESTRUCTURA: Header con precio e ícono arriba */}
                <div className="grid__card-header">
                  {normalizedItem.price && (
                    <span className="grid__card-price">
                      {formatPrice(normalizedItem)}
                    </span>
                  )}
                  {normalizedItem.icon && (
                    <div className="grid__card-avatar">
                      {normalizedItem.icon}
                    </div>
                  )}
                </div>

                {/* Título */}
                <h3 className="grid__card-title">
                  {normalizedItem.title}
                </h3>

                {/* Descripción (solo visible en hover) */}
                {normalizedItem.subtitle && (
                  <p className="grid__card-subtitle">
                    {normalizedItem.subtitle}
                  </p>
                )}

                {/* Meta información (ahora solo categoría) */}
                <div className="grid__card-meta">
                  <span className="grid__card-category">
                    {normalizedItem.category}
                  </span>
                </div>

                {/* Información extra para servicios (solo visible en hover) */}
                {normalizedItem.content && normalizedItem.itemType === 'service' && (
                  <div className="grid__card-extra-info">
                    {normalizedItem.content}
                  </div>
                )}

                {/* Botones (solo visibles en hover) */}
                <div className="grid__card-buttons">
                  <button
                    className="grid__card-button-info"
                    onClick={(e) => handleCardClick(normalizedItem, e)}
                    aria-label={`Ver más información de ${normalizedItem.title}`}
                  >
                    Ver más info
                  </button>

                  <button
                    className="grid__card-button-main"
                    onClick={(e) => handlePrimaryAction(normalizedItem, e)}
                    aria-label={`${normalizedItem.itemType === 'product' ? 'Comprar' : 'Inscribirse'} ${normalizedItem.title}`}
                  >
                    {normalizedItem.itemType === 'product' ? 'Comprar ahora' : 'Inscribirse ahora'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <Modal
            isOpenModal={isSupportModalOpen.statusOpenModal}
            onClose={() => setIsSupportModalOpen({ statusOpenModal: false, item: null })}
          >
            <SupportModalContent 
              onClose={() => setIsSupportModalOpen({ statusOpenModal: false, item: null })} 
              item={isSupportModalOpen.item} 
            />
        </Modal>

      </div>
    </div>
  );
};

export default Grid;