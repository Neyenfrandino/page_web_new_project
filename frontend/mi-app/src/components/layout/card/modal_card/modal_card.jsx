import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Star, Clock, Users, Monitor, DollarSign, Sparkles,
  ArrowRight, ShoppingCart, BookOpen, Calendar
} from 'lucide-react';
import { FaExpandArrowsAlt, FaLink} from 'react-icons/fa';
import { Share2 } from 'lucide-react';

import DiscountBadge from '../../../ui/discount_badge/discount_badge';

import './modal_card.scss';

const ModalCard = ({ course, children }) => {


  if (!course) return null;

  const [isVisible, setIsVisible] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [course.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHighlight(prev => (prev + 1) % (course.highlights?.length || 1));
    }, 2500);
    return () => clearInterval(interval);
  }, [course.id, course.highlights?.length]);

  const handleEnrollClick = () => setIsFormVisible(true);
  const handleBackClick = () => setIsFormVisible(false);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return [...Array(5)].map((_, i) => {
      const isFilled = i < fullStars;
      const isHalf = i === fullStars && hasHalfStar;
      return (
        <Star
          key={i}
          size={16}
          fill={isFilled || isHalf ? '#f59e0b' : 'none'}
          stroke={isFilled || isHalf ? '#f59e0b' : '#d1d5db'}
          style={{
            opacity: isFilled ? 1 : isHalf ? 0.7 : 0.3,
            transition: 'all 0.2s ease',
          }}
        />
      );
    });
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: course.currency,
    }).format(price);

  const formatDate = (date) => {
    if (!date) return null;
    
    const courseDate = new Date(date);
    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    
    return courseDate.toLocaleDateString('es-ES', options);
  };

  // Función para construir la URL correctamente
  const buildCourseUrl = useCallback(() => {
    // Limpiar el router de barras finales
    const cleanRouter = course.router?.replace(/\/$/, '') || '';
    
    // Asegurarse de que el id no tenga barras iniciales
    const cleanId = course.id?.toString().replace(/^\//, '') || '';
    
    // Si el router ya incluye el id, no agregarlo nuevamente
    if (cleanRouter.includes(cleanId)) {
      return cleanRouter;
    }
    
    // Construir la URL con una sola barra entre router e id
    return `${cleanRouter}/${cleanId}`;
  }, [course.router, course.id]);

  const handleCopy = () => {
    const url = `${window.location.origin}${buildCourseUrl()}`;
    navigator.clipboard.writeText(url)
      .then(() => alert('¡Enlace copiado!'))
      .catch(() => alert('Error al copiar'));
  };

  return (
    <>
      {isFormVisible ? (
        <div className="children__container">
          {children}
          <div className="button__container">
            <button onClick={handleBackClick} className="button--back">← Volver</button>
          </div>
        </div>
      ) : (
        <div className={`card_modal__container ${isVisible ? 'visible' : ''}`}>
          <div className="card_modal__header">
            <div style={{ position: 'relative' }}>
              <img src={course.image} alt={course.title} className="card_modal__image" loading="lazy" />
            </div>
            <div className="card_modal__header-content">
              <h2 className="card_modal__title">{course.title}</h2>
              {course.subtitle && <p className="card_modal__subtitle">{course.subtitle}</p>}
              {course.description && <p className="card_modal__description">{course.description}</p>}
              <div className="card_modal__rating">
                <div className="stars">{renderStars(course.rating)}</div>
                <span className="rating-number">{course.rating}</span>
                {course.students && <span className="students-count">({course.students.toLocaleString()} estudiantes)</span>}
                {course.sold && <span className="students-count">({course.sold.toLocaleString()} vendidos)</span>}
              </div>
              {course.instructor && (
                <div className="card_modal__instructor">
                  <BookOpen size={16} className="svg-icon" />
                  <span>Instructor: <strong>{course.instructor}</strong></span>
                </div>
              )}
            </div>
          </div>

          <div className="card_modal__highlights">
            {course.highlights?.map((highlight, index) => (
              <div key={index} className={`card_modal__highlight-item ${index === activeHighlight ? 'active' : ''}`}>
                <Sparkles size={16} />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
 
          <div className="card_modal__body">
            {course.date && (
              <div className="card_modal__info-item card_modal__date">
                <Calendar size={20} />
                <div><strong>Fecha:</strong><br /><span>{formatDate(course.date)}</span></div>
              </div>
            )}
            {course.duration && (
              <div className="card_modal__info-item">
                <Clock size={20} />
                <div><strong>Duración:</strong><br /><span>{course.duration}</span></div>
              </div>
            )}
            {course.badge && (
              <div className="card_modal__info-item">
                <Users size={20} />
                <div><strong>Nivel:</strong><br /><span>{course.badge}</span></div>
              </div>
            )}
            {course.format && (
              <div className="card_modal__info-item">
                <Monitor size={20} />
                <div><strong>Formato:</strong><br /><span>{course.format}</span></div>
              </div>
            )}
              <div className="card_modal__info-item card_modal__price">
                {course.originalPrice && (
                  <DiscountBadge 
                    originalPrice={course.originalPrice} 
                    currentPrice={course.price}
                    // position="top-right"
                    // style="circle"
                  />
                )}
                <div>
                  {course.originalPrice && (
                    <div className="card_modal__original-price">
                      <span className="line-through">{formatPrice(course.originalPrice)}</span>
                      <span className="oferta-label">Oferta</span>
                    </div>
                  )}
                  <div className="price-final">{formatPrice(course.price)}</div>
                </div>
              </div>
          </div>

          <button
            className="card_modal__action-button"
            onClick={handleEnrollClick}
            style={{ opacity: isLoading ? 0.8 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
          >
            <ShoppingCart size={20} /> Comprar Ahora <ArrowRight size={18} />
          </button>

          <div className="card_modal__buttons-floating">
            <button
              className="btn-copy-link"
              onClick={async () => {
                const shareData = {
                  title: document.title,
                  text: 'Mira este enlace interesante',
                  url: window.location.href,
                };

                if (navigator.share) {
                  try {
                    await navigator.share(shareData);
                  } catch (error) {
                    console.error('Error al compartir:', error);
                  }
                } else if (navigator.clipboard && navigator.clipboard.writeText) {
                  await navigator.clipboard.writeText(window.location.href);
                  const toast = document.createElement('div');
                  toast.textContent = 'Enlace copiado 📋';
                  toast.style.position = 'fixed';
                  toast.style.bottom = '20px';
                  toast.style.left = '50%';
                  toast.style.transform = 'translateX(-50%)';
                  toast.style.background = 'rgba(0,0,0,0.8)';
                  toast.style.color = '#fff';
                  toast.style.padding = '10px 20px';
                  toast.style.borderRadius = '12px';
                  toast.style.fontSize = '14px';
                  toast.style.zIndex = '9999';
                  toast.style.transition = 'opacity 0.3s ease';
                  document.body.appendChild(toast);
                  setTimeout(() => (toast.style.opacity = '0'), 1500);
                  setTimeout(() => toast.remove(), 1800);
                } else {
                  alert('Función de compartir no disponible en este navegador');
                }
              }}
            >
              <Share2 size={20} />
            </button>

            
            <Link to={buildCourseUrl()} className="card_modal__vermas-link" title='Expandir'>
              <FaExpandArrowsAlt />
            </Link>

          </div>

        </div>
      )}
    </>
  );
};

export default React.memo(ModalCard);