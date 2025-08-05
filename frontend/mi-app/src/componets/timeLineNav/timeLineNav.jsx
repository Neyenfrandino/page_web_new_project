import React, { useState, useEffect, useRef } from 'react';
import './timelineNav.scss';

const TimelineNav = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const observerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    // Intersection Observer para detectar qué sección está visible
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Obtener la entrada más visible
        const mostVisible = visibleEntries.reduce((prev, current) => {
          return current.intersectionRatio > prev.intersectionRatio ? current : prev;
        });
        setActiveSection(mostVisible.target.id);
      }
    }, observerOptions);

    // Observar todas las secciones
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observerRef.current.observe(element);
      }
    });

    // Detectar scroll para mostrar nombres
    const handleScroll = () => {
      setIsScrolling(true);
      
      // Limpiar timeout anterior
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Ocultar nombres después de dejar de scrollear
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 60; // Offset para headers fijos
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const getActiveIndex = () => {
    return sections.findIndex(section => section.id === activeSection);
  };

  return (
    <nav className="timeline-nav">
      <div className="timeline-container">
        {/* Línea de fondo */}
        <div className="timeline-line" />
        
        {/* Línea de progreso */}
        <div 
          className="timeline-progress" 
          style={{ 
            height: `${((getActiveIndex() + 1) / sections.length) * 100}%` 
          }}
        />
        
        {/* Items de navegación */}
        {sections.map((section, index) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          const isHovered = hoveredSection === section.id;
          const isPassed = index < getActiveIndex();
          const showLabel = isScrolling || isHovered || isActive;
          
          return (
            <div
              key={section.id}
              className={`timeline-item ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
              onClick={() => handleNavClick(section.id)}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <div className="item-content">
                <span className={`item-label ${showLabel ? 'visible' : ''}`}>
                  {section.name}
                </span>
                <Icon className="item-icon" size={18} />
              </div>
              <div className="item-dot" />
            </div>
          );
        })}
      </div>
      
      {/* Indicador móvil de sección activa */}
      <div className="mobile-indicator">
        <div className="indicator-content">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`indicator-dot ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => handleNavClick(section.id)}
            />
          ))}
        </div>
        <span className="current-section">
          {sections.find(s => s.id === activeSection)?.name}
        </span>
      </div>
    </nav>
  );
};

export default TimelineNav;