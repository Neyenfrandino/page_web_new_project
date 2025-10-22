import { useContext, useState, useMemo } from 'react';
import { MethodStatePaymentContext } from '../../../../src/context/method_state_payment/method_state_payment.context';
import SupportModalContent from '../support_modal/support_modal'; 
import Modal from '../../ui/modal/modal';

import './grid.scss';

const Grid = ({ items = [], slice, setIsOpen }) => {
  const { setMethodStatePayment } = useContext(MethodStatePaymentContext);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState({ statusOpenModal: false, item: null }); 
  // Límite de items a mostrar
  const limit = useMemo(() => (typeof slice === 'number' ? slice : items.length), [slice, items.length]);

  // Mapeo de iconos para servicios
  const getServiceIcon = (service) => {
    const name = (service.title || '').toLowerCase();
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
    icon: item.icon || ((item.type || '').toLowerCase().includes('service') ? getServiceIcon(item) : ''),
    category: item.category || '',
    price: item.price,
    currency: item.currency || 'USD',
    content: item.content || '',
    originalData: item,
    itemType: item.type, // 'product' | 'service' (o ya puede venir con acción)
    originalPrice: item.originalPrice || item.price,
    router: item.router,
  });

  // Formatear precio (robusto)
  const formatPrice = (item) => {
    if (item.price === null || item.price === undefined || item.price === '') return '';
    const n = Number(item.price);
    if (!Number.isFinite(n)) return `${item.currency} ${item.price}`;
    try {
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: item.currency || 'USD',
      }).format(n);
    } catch {
      return `${item.currency} ${n.toFixed(2)}`;
    }
  };

  // Manejadores de eventos
  const handleCardClick = (normalizedItem, e) => {
    if (setIsOpen) setIsOpen(true, e, normalizedItem.originalData);
  };

  

  const handlePrimaryAction = (normalizedItem, e) => {
    e.stopPropagation();

    // Derivar base 'product' | 'service' aunque el type ya viniera con acción
    const raw = String(normalizedItem.itemType || '').toLowerCase();
    const isProduct = raw.includes('product') || raw.includes('producto');
    const baseType = isProduct ? 'product' : 'service';
    const action = isProduct ? 'compra' : 'inscripción';

    // Construir el payload como lo esperan los otros componentes
    const enriched = {
      ...normalizedItem.originalData,
      type: `${baseType} ${action}`,      // ej: 'service inscripción' | 'product compra'
      itemType: `${baseType} ${action}`,  // duplico por compatibilidad con checks existentes
    };

    // (Opcional) guardar en contexto si luego usás pasarela de pago
    // setMethodStatePayment({ item: enriched });

    setIsSupportModalOpen({ statusOpenModal: true, item: enriched });
  };

  const handleKeyDown = (normalizedItem, e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(normalizedItem, e);
    }
  };

  console.log(isSupportModalOpen)
  return (
    <div className="grid">
      <div className="grid__container">
        {items.slice(0, limit).map((item) => {
          const normalizedItem = normalizeItem(item);

          return (
            <div
              key={normalizedItem.id}
              className={`grid__card grid__card--${(normalizedItem.itemType || '').toString().toLowerCase().includes('product') ? 'product' : 'service'}`}
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
                {/* Header con precio e ícono */}
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

                {/* Descripción (hover) */}
                {normalizedItem.subtitle && (
                  <p className="grid__card-subtitle">
                    {normalizedItem.subtitle}
                  </p>
                )}

                {/* Meta */}
                <div className="grid__card-meta">
                  <span className="grid__card-category">
                    {normalizedItem.category}
                  </span>
                </div>

                {/* Info extra (solo servicios, hover) */}
                {normalizedItem.content && (normalizedItem.itemType || '').toLowerCase().includes('service') && (
                  <div className="grid__card-extra-info">
                    {normalizedItem.content}
                  </div>
                )}

                {/* Botones (hover) */}
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
                    aria-label={`${(normalizedItem.itemType || '').toLowerCase().includes('product') ? 'Comprar' : 'Inscribirse'} ${normalizedItem.title}`}
                  >
                    {(normalizedItem.itemType || '').toLowerCase().includes('product') ? 'Comprar ahora' : 'Inscribirse ahora'}
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
