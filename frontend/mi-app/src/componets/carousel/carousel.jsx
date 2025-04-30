// Carousel.jsx
import React, { useState, useEffect } from 'react';
import './Carousel.scss';

const Carousel = ({ projects }) => {
  const { images, logo, description } = projects[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images.length, isHovered]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="carousel__container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel__slide ${index === currentIndex ? 'carousel__slide--active' : ''}`}
          >
            <div className="carousel__image">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>

            <div className="carousel__title-container">
              <h3 className="carousel__title">
                <img src={`${logo}`} alt="" />
              </h3>
            </div>

            <div className={`carousel__overlay ${isHovered ? 'carousel__overlay--visible' : ''}`}>
              <p className="carousel__description">{description && description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
