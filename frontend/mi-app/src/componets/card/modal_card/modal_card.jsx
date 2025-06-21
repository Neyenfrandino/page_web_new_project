// ModalCard.jsx - Versión Mejorada y Elegante
import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Clock, 
  Users, 
  Monitor, 
  DollarSign, 
  Sparkles, 
  ArrowRight,
  ShoppingCart,
  Heart,
  BookOpen
} from 'lucide-react';
import './modal_card.scss';

const course = {
  id: 1,
  name: 'Diseño de Espacios Regenerativos',
  description:
    'Transformamos patios, chacras, escuelas o casas en sistemas vivos, productivos y sostenibles. Desde el diseño del paisaje hasta la implementación consciente.',
  price: 149.99,
  originalPrice: 199.99,
  currency: 'USD',
  duration: '6 semanas',
  level: 'Todos los niveles',
  format: 'Presencial y online',
  image: 'https://cdn.pixabay.com/photo/2019/09/25/18/45/saplings-4504323_1280.png',
  rating: 4.8,
  students: 1234,
  instructor: 'Maria González',
  highlights: [
    'Certificación incluida',
    'Acceso de por vida',
    'Comunidad exclusiva',
    'Soporte 24/7',
    'Proyectos reales'
  ]
};

const ModalCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Animación de entrada
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Rotación de highlights
    const interval = setInterval(() => {
      setActiveHighlight(prev => (prev + 1) % course.highlights.length);
    }, 2500);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);
 
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
            transition: 'all 0.2s ease'
          }}
        />
      );
    });
  };

  const handleEnrollClick = async () => {
    setIsLoading(true);
    
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    alert('¡Inscripción exitosa! Te hemos enviado los detalles por email.');
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: course.currency
    }).format(price);
  };

  return (
    <div className={`card_modal__container ${isVisible ? 'visible' : ''}`}>
      {/* Header Section */}
      <div className="card_modal__header">
        <div style={{ position: 'relative' }}>
          <img 
            src={course.image} 
            alt={course.name} 
            className="card_modal__image"
            loading="lazy"
          />
          <button
            onClick={handleLikeToggle}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Heart 
              size={20} 
              fill={isLiked ? '#ef4444' : 'none'}
              stroke={isLiked ? '#ef4444' : '#64748b'}
            />
          </button>
        </div>
        
        <div className="card_modal__header-content">
          <h2 className="card_modal__title">{course.name}</h2>
          <p className="card_modal__description">{course.description}</p>
          
          <div className="card_modal__rating">
            <div className="stars">
              {renderStars(course.rating)}
            </div>
            <span className="rating-number">{course.rating}</span>
            <span className="students-count">
              ({course.students.toLocaleString()} estudiantes)
            </span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            marginTop: '0.8rem',
            fontSize: '0.9rem',
            color: '#64748b'
          }}>
            <BookOpen size={16} />
            <span>Instructor: <strong>{course.instructor}</strong></span>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="card_modal__highlights">
        {course.highlights.map((highlight, index) => (
          <div 
            key={index}
            className={`card_modal__highlight-item ${index === activeHighlight ? 'active' : ''}`}
          >
            <Sparkles size={16} />
            <span>{highlight}</span>
          </div>
        ))}
      </div>

      {/* Body Section */}
      <div className="card_modal__body">
        <div className="card_modal__info-item">
          <Clock size={20} />
          <div>
            <strong>Duración:</strong>
            <br />
            <span style={{ fontWeight: 400, fontSize: '0.95em', color: '#64748b' }}>
              {course.duration}
            </span>
          </div>
        </div>
        
        <div className="card_modal__info-item">
          <Users size={20} />
          <div>
            <strong>Nivel:</strong>
            <br />
            <span style={{ fontWeight: 400, fontSize: '0.95em', color: '#64748b' }}>
              {course.level}
            </span>
          </div>
        </div>
        
        <div className="card_modal__info-item">
          <Monitor size={20} />
          <div>
            <strong>Formato:</strong>
            <br />
            <span style={{ fontWeight: 400, fontSize: '0.95em', color: '#64748b' }}>
              {course.format}
            </span>
          </div>
        </div>
        
        <div className="card_modal__info-item card_modal__price">
          <DollarSign size={22} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ 
                textDecoration: 'line-through', 
                opacity: 0.7, 
                fontSize: '0.9em' 
              }}>
                {formatPrice(course.originalPrice)}
              </span>
              <span style={{ 
                background: 'rgba(255, 255, 255, 0.2)', 
                padding: '0.2rem 0.5rem', 
                borderRadius: '8px', 
                fontSize: '0.8em',
                fontWeight: 800
              }}>
                -25%
              </span>
            </div>
            <div style={{ fontSize: '1.4em', fontWeight: 900 }}>
              {formatPrice(course.price)}
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        className="card_modal__action-button"
        onClick={handleEnrollClick}
        disabled={isLoading}
        style={{
          opacity: isLoading ? 0.8 : 1,
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? (
          <>
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid transparent',
              borderTop: '2px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            Procesando...
          </>
        ) : (
          <>
            <ShoppingCart size={20} />
            Inscribirse Ahora
            <ArrowRight size={18} />
          </>
        )}
      </button>

      {/* Estilos para la animación de carga */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ModalCard;