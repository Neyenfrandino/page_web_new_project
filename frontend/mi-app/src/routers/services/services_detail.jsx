import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ContextJsonLoadContext } from '../../context/context_json_load/context_json_load';
import {
  Calendar,
  Clock,
  Users,
  Monitor,
  Star,
  CheckCircle,
  ArrowRight,
  Share2,
  Heart,
  ShieldCheck,
  Award
} from 'lucide-react';

import './services_detail.scss';

  // Datos por defecto en caso de que no haya servicio
  const defaultService = {
    title: 'Curso de Construcción Sostenible',
    subtitle: 'Aprende técnicas modernas y ancestrales de construcción ecológica',
    description: 'Este curso te enseñará las mejores prácticas en construcción sostenible, combinando técnicas tradicionales con innovaciones modernas.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=400&fit=crop',
    badge: 'Intermedio',
    format: 'Online',
    price: 299,
    currency: 'USD',
    rating: 4.8,
    students: 1250,
    instructor: 'Carlos Mendoza',
    duration: '8 semanas',
    date: '2024-02-15',
    highlights: [
      'Técnicas de construcción con materiales naturales',
      'Diseño bioclimático y eficiencia energética',
      'Sistemas de captación de agua lluvia',
      'Construcción con tierra y fibras naturales',
      'Certificación en construcción sostenible'
    ]
  };


const ServiceDetail = () => {
  const { servicios } = useContext(ContextJsonLoadContext);
  const { id } = useParams();
  
  // Asumiendo que servicios es un array y necesitas el primer elemento o un servicio específico
  const currentService = Array.isArray(servicios)
  ? servicios.find((s) => String(s.id) === String(id)) || defaultService
  : defaultService;

  
  const [isLiked, setIsLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);


  console.log('Servicio actual:', currentService);
  const formatPrice = (price) => {
    if (!price) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currentService.currency || 'USD',
    }).format(price);
  };

  const formatDate = (date) => {
    if (!date) return 'Fecha por confirmar';
    try {
      const courseDate = new Date(date);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return courseDate.toLocaleDateString('es-ES', options);
    } catch (error) {
      return 'Fecha por confirmar';
    }
  };

  const renderStars = (rating) => {
    const numRating = rating || 0;
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={20}
        fill={i < Math.floor(numRating) ? '#8F764C' : 'none'}
        stroke={i < Math.floor(numRating) ? '#8F764C' : '#d1d5db'}
        className="star"
      />
    ));
  };

  const handleShare = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('¡Enlace copiado al portapapeles!'))
        .catch(() => alert('Error al copiar el enlace'));
    } else {
      // Fallback para navegadores que no soportan clipboard API
      alert('Función de compartir no disponible en este navegador');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handlePurchase = () => {
    alert(`¡Te has inscrito al curso: ${currentService.title}!`);
  };

  const handleContact = () => {
    alert('Contactando con soporte...');
  };

  return (
    <div className={`service-detail ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="service-detail__hero">
        <div className="service-detail__hero-background">
          <img src={currentService.image} alt={currentService.title} />
          <div className="overlay"></div>
        </div>
        
        <div className="service-detail__hero-content">
          <div className="badge-container">
            <span className="badge badge--level">{currentService.badge}</span>
            <span className="badge badge--format">{currentService.format}</span>
          </div>
          
          <h1 className="title">{currentService.title}</h1>
          <p className="subtitle">{currentService.subtitle}</p>
          
          <div className="hero-footer">
            <div className="rating">
              <div className="stars">{renderStars(currentService.rating)}</div>
              <span className="rating-text">
                {currentService.rating || 0} ({currentService.students || 0} estudiantes)
              </span>
            </div>
            
            <div className="actions">
              <button onClick={handleShare} className="action-btn" aria-label="Compartir">
                <Share2 size={20} />
              </button>
              <button 
                onClick={handleLike} 
                className={`action-btn ${isLiked ? 'liked' : ''}`} 
                aria-label="Me gusta"
              >
                <Heart size={20} fill={isLiked ? '#ef4444' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="service-detail__container">
        <div className="service-detail__content">
          {/* Description Section */}
          <section className="section section--description">
            <h2 className="section__title">Acerca de este curso</h2>
            <p className="description">{currentService.description}</p>
          </section>

          {/* Highlights Section */}
          <section className="section section--highlights">
            <h2 className="section__title">Lo que aprenderás</h2>
            <div className="highlights-grid">
              {(currentService.highlights || []).map((highlight, index) => (
                <div key={index} className="highlight-item">
                  <CheckCircle size={20} className="icon" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Instructor Section */}
          <section className="section section--instructor">
            <h2 className="section__title">Tu instructor</h2>
            <div className="instructor-card">
              <div className="instructor-avatar">
                <Users size={32} />
              </div>
              <div className="instructor-info">
                <h3>{currentService.instructor || 'Instructor Experto'}</h3>
                <p>Experto en construcción sostenible y técnicas ancestrales</p>
              </div>
            </div>

            
          </section>

          {/* Additional Info */}
          <section className="section section--info">
            <h2 className="section__title">Información adicional</h2>
            <div className="info-cards">
              <div className="info-card">
                <ShieldCheck size={24} className="icon" />
                <h4>Garantía de satisfacción</h4>
                <p>30 días de garantía de devolución</p>
              </div>
              <div className="info-card">
                <Award size={24} className="icon" />
                <h4>Certificado</h4>
                <p>Obtén tu certificado al completar el curso</p>
              </div>
            </div>
          </section>
          
        </div>

        {/* Sidebar */}
        <aside className="service-detail__sidebar">
          <div className="purchase-card">
            <div className="price-section">
              <span className="price">{formatPrice(currentService.price)}</span>
              <span className="price-label">Precio total</span>
            </div>

            <button className="purchase-btn" onClick={handlePurchase}>
              Inscribirme ahora
              <ArrowRight size={20} />
            </button>

            <div className="course-info">
              {currentService.date && (
                <div className="info-item">
                  <Calendar size={18} />
                  <div>
                    <strong>Fecha de inicio</strong>
                    <span>{formatDate(currentService.date)}</span>
                  </div>
                </div>
              )}
              
              <div className="info-item">
                <Clock size={18} />
                <div>
                  <strong>Duración</strong>
                  <span>{currentService.duration || 'Por definir'}</span>
                </div>
              </div>
              
              <div className="info-item">
                <Monitor size={18} />
                <div>
                  <strong>Formato</strong>
                  <span>{currentService.format || 'Online'}</span>
                </div>
              </div>
              
              <div className="info-item">
                <Users size={18} />
                <div>
                  <strong>Nivel</strong>
                  <span>{currentService.badge || 'Todos los niveles'}</span>
                </div>
              </div>
            </div>

            <div className="guarantee">
              <ShieldCheck size={20} />
              <p>Este curso incluye garantía de satisfacción de 30 días</p>
            </div>
          </div>
        </aside>
        
        <div className="cta-card">
            <h3>¿Tienes preguntas?</h3>
            <p>Nuestro equipo está aquí para ayudarte</p>
            <button className="contact-btn" onClick={handleContact}>
              Contactar soporte
            </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;