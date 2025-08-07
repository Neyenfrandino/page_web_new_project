import React, { useState, useContext } from 'react';
import { ContextJsonLoadContext } from '../../context/context_json_load/context_json_load';
import './testimonial_card.scss';

const TestimonialCard = ({ typeTestimonial = 'servicio' }) => {
  const { testimonios } = useContext(ContextJsonLoadContext);
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonialType = testimonios?.[typeTestimonial] || [];   
  
  // Si no hay testimonios, no renderizar nada
  if (!testimonialType || testimonialType.length === 0) return null;

  // Función de navegación corregida para usar testimonialType
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonialType.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonialType.length) % testimonialType.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);  
  };

  const currentProduct = testimonialType[currentSlide];

  return (
    <div className="product-showcase">
      <div className="showcase-header">
        <h1 className="main-title">
          CADA HISTORIA ES UN TESTIMONIO
        </h1>
        <div className="decorative-leaf decorative-leaf--top">
          <span className="leaf-icon">🍃</span>
        </div>
      </div>

      <div className="product-card">
        <div className="product-image-section">
          <div className="product-image-wrapper">
            <img
              src={currentProduct?.image || 'https://via.placeholder.com/400x300?text=Sin+Imagen'}
              alt={currentProduct?.name || 'Producto'}
              className="product-image"
            />

            <div className="product-name-overlay">
              <h2 className="product-name">{currentProduct?.name || 'Producto'}</h2>
            </div>

            <div className="decorative-leaf decorative-leaf--image">
              <span className="leaf-icon">🍃</span>
            </div>
          </div>
        </div>

        <div className="product-info-section">
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`star ${
                  i < (currentProduct?.rating || 0) ? 'star--filled' : 'star--empty'
                }`}
              >
                ★
              </span>
            ))}
          </div>

          <h3 className="product-title">{currentProduct?.title || 'Título'}</h3>

          <p className="product-description">{currentProduct?.description || 'Descripción'}</p>

          <p className="author-name">{currentProduct?.author || 'Autor'}</p>

          <div className="carousel-dots">
            {testimonialType.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'dot--active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>

          <div className="decorative-leaf decorative-leaf--bottom">
            <span className="leaf-icon">🍃</span>
          </div>
        </div>

        {/* Botones de navegación - solo mostrar si hay más de un testimonio */}
        {testimonialType.length > 1 && (
          <>
            <button onClick={prevSlide} className="carousel-btn carousel-btn--prev">
              ‹
            </button>
            <button onClick={nextSlide} className="carousel-btn carousel-btn--next">
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;