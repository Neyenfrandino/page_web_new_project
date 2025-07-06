import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Star, Clock, Users, Monitor, DollarSign, Sparkles,
  ArrowRight, ShoppingCart, Heart, BookOpen
} from 'lucide-react';
import './modal_card.scss';

const ModalCard = ({ course }) => {
  if (!course) return null;

  const [isVisible, setIsVisible] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mostrar entrada animada una vez montado
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [course.id]);

  // Animación de highlights
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHighlight(prev => (prev + 1) % (course.highlights?.length || 1));
    }, 2500);
    return () => clearInterval(interval);
  }, [course.id, course.highlights?.length]);

  const handleLikeToggle = useCallback(() => {
    setIsLiked(prev => !prev);
  }, []);

  const handleEnrollClick = useCallback(async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('¡Gracias por tu interés! Procesamos tu solicitud.');
  }, []);

  const renderStars = useCallback((rating) => {
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
            transition: 'all 0.2s ease'
          }}
        />
      );
    });
  }, []);

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: course.currency
    }).format(price);
  }, [course.currency]);

  return (
    <div className={`card_modal__container ${isVisible ? 'visible' : ''}`}>
      {/* Header */}
      <div className="card_modal__header">
        <div style={{ position: 'relative' }}>
          <img 
            src={course?.image}
            alt={course.title} 
            className="card_modal__image"
            loading="lazy"
          />
          {/* <button onClick={handleLikeToggle} className="like-button">
            <Heart 
              size={20} 
              fill={isLiked ? '#ef4444' : 'none'}
              stroke={isLiked ? '#ef4444' : '#64748b'}
            />
          </button> */}
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
              <BookOpen size={16} className='svg-icon'/>
              <span>Instructor: <strong>{course.instructor}</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Highlights */}
      <div className="card_modal__highlights">
        {course.highlights?.map((highlight, index) => (
          <div 
            key={index}
            className={`card_modal__highlight-item ${index === activeHighlight ? 'active' : ''}`}
          >
            <Sparkles size={16} />
            <span>{highlight}</span>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="card_modal__body">
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
          <DollarSign size={22} />
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

      {/* Botón acción */}
      <button 
        className="card_modal__action-button"
        onClick={handleEnrollClick}
        disabled={isLoading}
        style={{ opacity: isLoading ? 0.8 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
      >
        {isLoading ? (
          <>
            <div className="spinner" />
            Procesando...
          </>
        ) : (
          <>
            <ShoppingCart size={20} /> Confirmar Pedido <ArrowRight size={18} />
          </>
        )}
      </button>

      {/* Estilos en línea */}
      <style jsx>{`
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default React.memo(ModalCard);
