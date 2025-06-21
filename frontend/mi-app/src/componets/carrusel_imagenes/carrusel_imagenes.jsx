// MissionCarousel.jsx
import React, { useState, useEffect } from 'react';
import './carrusel_imagenes.scss';

const MissionCarousel = ({ cards, autoPlay = true, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
 
  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === cards.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, cards.length, autoPlayInterval]);

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? cards.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === cards.length - 1 ? 0 : currentIndex + 1);
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    if (autoPlay) {
      setIsAutoPlaying(true);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  return (
    <div 
      className="mission-carousel" 
    //   onMouseEnter={handleMouseEnter}
    //   onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="region"
      aria-label="Carrusel de misión"
    >
      {/* Main carousel container */}
      <div className="carousel-container">
        {/* Slides wrapper */}
        <div 
          className="carousel-slides"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {cards.map((card, index) => (
            <div 
              key={card.id} 
              className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
              aria-hidden={index !== currentIndex}
            >
              <div className="slide-image">
                <img 
                  src={card.image} 
                  alt={card.title}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <div className="slide-overlay"></div>
              </div>
              
              <div className="slide-content">
                <h3 className="slide-title">{card.title}</h3>
                <p className="slide-description">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button 
          className="carousel-arrow carousel-arrow--prev"
          onClick={goToPrevious}
          aria-label="Imagen anterior"
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button 
          className="carousel-arrow carousel-arrow--next"
          onClick={goToNext}
          aria-label="Siguiente imagen"
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Dots indicator */}
      <div className="carousel-dots">
        {cards.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a la imagen ${index + 1}`}
            type="button"
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="carousel-progress">
        <div 
          className="carousel-progress-bar"
          style={{ 
            width: `${((currentIndex + 1) / cards.length) * 100}%`,
            animationDuration: isAutoPlaying ? `${autoPlayInterval}ms` : 'none'
          }}
        />
      </div>


      {/* Counter */}
      <div className="carousel-counter">
        <span className="counter-current">{currentIndex + 1}</span>
        <span className="counter-separator">/</span>
        <span className="counter-total">{cards.length}</span>
      </div>
    </div>
  );
};

export default MissionCarousel;
