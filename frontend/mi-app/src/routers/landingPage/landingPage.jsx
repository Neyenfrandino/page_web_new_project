import React, { useState, useEffect, useContext } from 'react';
import { ContextJsonLoadContext } from '../../context/context_json_load/context_json_load';
import {
  Home, 
  CreditCard, 
  ShoppingBag, 
  ChevronRight, 
  Star, 
  Users, 
  Check, 
  ArrowRight, 
  Mail, 
  Calendar, 
  User, 
  Globe 
} from 'lucide-react';

import CtaImgCuentaRgresiva from '../../components/seccion/cta_img_cuenta_rgresiva/cta_img_cuenta_rgresiva';
import TimelineNav from '../../components/layout/timeLineNav/timelineNav';
import './landingPage.scss';

// ========================================
// DATOS DE EJEMPLO (COMENTAR SI NO SE USAN)
// ========================================

// Testimonios - Se pueden traer del contexto o API más adelante
const TESTIMONIALS = [
  {
    name: "María González",
    role: "CEO, EcoTech Solutions",
    content: "El programa de Naluum transformó completamente nuestra visión empresarial. Ahora somos carbono neutral y más rentables.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    name: "Carlos Rodríguez",
    role: "Director, Fundación Verde",
    content: "La mejor inversión en educación ambiental. El impacto en nuestra comunidad ha sido extraordinario.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=2"
  },
  {
    name: "Ana Martínez",
    role: "Emprendedora Social",
    content: "Gracias a Naluum, mi proyecto sustentable ahora beneficia a más de 500 familias.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=3"
  }
];

// Planes de precios - Se pueden traer del contexto o API más adelante
const PRICING_PLANS = [
  {
    name: "Básico",
    price: 49,
    currency: "USD",
    period: "/mes",
    description: "Perfecto para comenzar tu viaje sustentable",
    features: [
      "Acceso a 3 cursos básicos",
      "Comunidad online",
      "Recursos descargables",
      "Soporte por email",
      "Certificados de finalización"
    ],
    recommended: false
  },
  {
    name: "Profesional",
    price: 149,
    currency: "USD",
    period: "/mes",
    description: "Para profesionales y empresas comprometidas",
    features: [
      "Acceso ilimitado a todos los cursos",
      "Consultoría mensual 1-a-1",
      "Proyectos prácticos guiados",
      "Soporte prioritario 24/7",
      "Certificación profesional",
      "Acceso a webinars exclusivos",
      "Networking con expertos"
    ],
    recommended: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    currency: "",
    period: "",
    description: "Soluciones personalizadas para organizaciones",
    features: [
      "Programas a medida",
      "Equipo dedicado de consultores",
      "Implementación en sitio",
      "Métricas de impacto",
      "Capacitación ilimitada",
      "Soporte ejecutivo",
      "ROI garantizado"
    ],
    recommended: false
  }
];

// Secciones del navegador
const LANDING_SECTIONS = [
  {
    id: "inicio",
    name: "Inicio", 
    path: "#inicio",
    icon: Home,
    title: "Transforma Tu Mundo con Educación Sustentable",
    subtitle: "Únete a la revolución verde. Aprende, implementa y lidera proyectos que regeneran el planeta mientras generan prosperidad.",
    type: "hero"
  },
  {
    id: "servicios",
    name: "Servicios",
    path: "#servicios",
    icon: ShoppingBag,
    title: "Nuestros Programas y Servicios",
    subtitle: "Educación transformadora para un futuro sustentable",
    type: "services"
  },
  {
    id: "pricing",
    name: "Planes",
    path: "#pricing",
    icon: CreditCard,
    title: "Planes de Membresía",
    subtitle: "Invierte en tu futuro y el del planeta",
    type: "pricing"
  },
  {
    id: "testimonials",
    name: "Testimonios",
    path: "#testimonials",
    icon: Users,
    title: "Historias de Transformación",
    subtitle: "Lo que dicen nuestros estudiantes y partners",
    type: "testimonials"
  },
  {
    id: "contacto",
    name: "Contacto",
    path: "#contacto",
    icon: Mail,
    title: "Comienza Tu Viaje Sustentable",
    subtitle: "Completa el formulario y recibe una sesión de orientación gratuita",
    type: "contact"
  },
];

// ========================================
// CONFIGURACIÓN DE PRODUCTOS A MOSTRAR
// ========================================

// 🎯 IMPORTANTE: Aquí configuras qué productos/servicios mostrar en la landing
// Puedes usar IDs, títulos o cualquier propiedad única de tus productos

// INSTRUCCIONES:
// 1. Pon showAll en false para activar los filtros
// 2. Descomenta y agrega los valores que quieras filtrar
// 3. Puedes usar uno o varios filtros a la vez

const FEATURED_PRODUCTS_CONFIG = {
  // Opción 1: Por IDs específicos (exacto)
  byIds: [
    'creacion-redes-locales',
    'diseno-implementacion-proyectos-sustentables',
    'hospedaje-cabanas-selva'
  ],
  
  // Opción 2: Por títulos específicos (exacto)
  byTitles: [
    // 'Diseño e Implementación de Proyectos Sustentables',
    // 'Consultoría Ambiental Empresarial',
    // 'Taller de Permacultura Urbana'
  ],
  
  // Opción 3: Por categorías
  byCategories: [
    // 'programa',
    // 'consultoria',
    // 'curso'
  ],
  
  // Opción 4: Por tipo (service/product)
  byTypes: [
    // 'service',
    // 'product'
  ],
  
  // Configuración adicional
  maxItems: 3, // Máximo de items a mostrar
  showAll: false, // CAMBIAR A false PARA ACTIVAR FILTROS
};

const timerProps = {
  img: "/img/3.png",
  titles: {
    main: "",
    subtitle: "Festival Eco de la Tierra",
  },
  text: " lorem ipsum dolor sit amet, con sectetuer adipiscing elit, sed diam nonummy nibh euis mod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
  buttonText: "Inscríbete ahora",
  timer: {
    targetDate: "2025-09-23T18:59:59"
  },
  link : "/servicios/laboratorios-alimentacion-viva"
};


// ========================================
// COMPONENTE PRINCIPAL
// ========================================

const LandingPage = () => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  // Contexto global para obtener servicios y productos
  const { servicios, products } = useContext(ContextJsonLoadContext);
  
  // Estados UI
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Combinar servicios y productos del contexto
  const allProducts = [...(servicios || []), ...(products || [])];
  
  // ========================================
  // FUNCIÓN DE FILTRADO DE PRODUCTOS DESTACADOS
  // ========================================
  const getFeaturedProducts = () => {
    // Verificar que hay productos disponibles
    if (!allProducts || allProducts.length === 0) {
      console.log('No hay productos disponibles en el contexto');
      return [];
    }
    
    // Si showAll es true, retornar todos los productos
    if (FEATURED_PRODUCTS_CONFIG.showAll) {
      console.log('Mostrando todos los productos:', allProducts.length);
      return allProducts.slice(0, FEATURED_PRODUCTS_CONFIG.maxItems);
    }
    
    let featured = [];
    
    // Filtrar por IDs
    if (FEATURED_PRODUCTS_CONFIG.byIds && FEATURED_PRODUCTS_CONFIG.byIds.length > 0) {
      const byIds = allProducts.filter(item => 
        item && item.id && FEATURED_PRODUCTS_CONFIG.byIds.includes(item.id)
      );
      console.log('Filtrados por ID:', byIds.length);
      featured = [...featured, ...byIds];
    }
    
    // Filtrar por títulos
    if (FEATURED_PRODUCTS_CONFIG.byTitles && FEATURED_PRODUCTS_CONFIG.byTitles.length > 0) {
      const byTitles = allProducts.filter(item => 
        item && item.title && FEATURED_PRODUCTS_CONFIG.byTitles.includes(item.title)
      );
      console.log('Filtrados por título:', byTitles.length);
      featured = [...featured, ...byTitles];
    }
    
    // Filtrar por categorías
    if (FEATURED_PRODUCTS_CONFIG.byCategories && FEATURED_PRODUCTS_CONFIG.byCategories.length > 0) {
      const byCategories = allProducts.filter(item => 
        item && item.category && FEATURED_PRODUCTS_CONFIG.byCategories.includes(item.category)
      );
      console.log('Filtrados por categoría:', byCategories.length);
      featured = [...featured, ...byCategories];
    }
    
    // Filtrar por tipos
    if (FEATURED_PRODUCTS_CONFIG.byTypes && FEATURED_PRODUCTS_CONFIG.byTypes.length > 0) {
      const byTypes = allProducts.filter(item => 
        item && item.type && FEATURED_PRODUCTS_CONFIG.byTypes.includes(item.type)
      );
      console.log('Filtrados por tipo:', byTypes.length);
      featured = [...featured, ...byTypes];
    }
    
    // Si no hay filtros activos pero showAll es false, no mostrar nada
    if (featured.length === 0 && !FEATURED_PRODUCTS_CONFIG.showAll) {
      console.log('No se encontraron productos con los filtros especificados');
      
      // Verificar si hay filtros configurados
      const hasFilters = 
        (FEATURED_PRODUCTS_CONFIG.byIds && FEATURED_PRODUCTS_CONFIG.byIds.length > 0) ||
        (FEATURED_PRODUCTS_CONFIG.byTitles && FEATURED_PRODUCTS_CONFIG.byTitles.length > 0) ||
        (FEATURED_PRODUCTS_CONFIG.byCategories && FEATURED_PRODUCTS_CONFIG.byCategories.length > 0) ||
        (FEATURED_PRODUCTS_CONFIG.byTypes && FEATURED_PRODUCTS_CONFIG.byTypes.length > 0);
      
      if (!hasFilters) {
        console.log('No hay filtros configurados y showAll está en false');
      }
    }
    
    // Eliminar duplicados usando Map para mantener el primer objeto único
    const uniqueMap = new Map();
    featured.forEach(item => {
      if (item && item.id && !uniqueMap.has(item.id)) {
        uniqueMap.set(item.id, item);
      }
    });
    
    // Convertir el Map a array y limitar cantidad
    const uniqueFeatured = Array.from(uniqueMap.values())
      .slice(0, FEATURED_PRODUCTS_CONFIG.maxItems);
    
    console.log('Productos finales a mostrar:', uniqueFeatured.length);
    return uniqueFeatured;
  };
  
  // Obtener productos destacados
  const featuredProducts = getFeaturedProducts();
  
  // Log para debugging
  useEffect(() => {
    console.log('Productos del contexto:', {
      servicios: servicios?.length || 0,
      products: products?.length || 0,
      total: allProducts.length,
      destacados: featuredProducts.length
    });
  }, [servicios, products, allProducts.length, featuredProducts.length]);

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manejador del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
    // Resetear formulario
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    });
  };

  // Manejador de cambios en inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Filtrar productos según tab activa
  const filteredProducts = activeTab === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(item => item.type === activeTab);
  
  // Función para manejar la compra/acción principal
  const handleProductAction = (product) => {
    // Aquí puedes implementar la lógica de compra
    // Por ejemplo: redirección a checkout, agregar al carrito, etc.
    
    if (product.router) {
      // Si el producto tiene una ruta definida
      window.location.href = product.router;
    } else if (product.link) {
      // Si tiene un link externo
      window.open(product.link, '_blank');
    } else {
      // Acción por defecto: scroll a contacto con producto preseleccionado
      setFormData(prev => ({ ...prev, service: product.id }));
      document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Función para determinar el texto del botón según el tipo
  const getActionButtonText = (product) => {
    // Personalizar según el tipo de producto
    if (product.type === 'service') {
      return 'Contratar Ahora';
    } else if (product.type === 'product') {
      return 'Comprar Ahora';
    } else if (product.category === 'curso') {
      return 'Inscribirse Ahora';
    } else if (product.category === 'consultoria') {
      return 'Agendar Consulta';
    }
    return 'Más Información';
  };

  return (
    <div className="landing">
      {/* Navegación Timeline */}
      <TimelineNav sections={LANDING_SECTIONS} />

      {/* ========================================
          SECCIÓN HERO
          ======================================== */}
      <section className="landing__hero" id="inicio">
        <div className="landing__container">
          <div className="landing__hero-content">
            {/* Badge promocional */}
            <div className="landing__badge">
              🌱 Oferta Especial: 30% OFF en todos los programas
            </div>
            
            {/* Título principal */}
            <h1 className="landing__title">
              Transforma Tu Mundo con<br />
              <span className="landing__title--gradient">Educación Sustentable</span>
            </h1>
            
            {/* Subtítulo */}
            <p className="landing__subtitle">
              Únete a la revolución verde. Aprende, implementa y lidera proyectos 
              que regeneran el planeta mientras generan prosperidad.
            </p>
            
            {/* Botones CTA */}
            <div className="landing__hero-buttons">
              <button 
                onClick={() => document.getElementById('servicios').scrollIntoView({ behavior: 'smooth' })}
                className="landing__button landing__button--primary"
              >
                Explorar Programas <ArrowRight className="landing__button-icon" />
              </button>
              <button className="landing__button landing__button--secondary">
                Ver Demo Gratuita
              </button>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="landing__stats">
            <div className="landing__stat">
              <div className="landing__stat-value">2,500+</div>
              <div className="landing__stat-label">Estudiantes Activos</div>
            </div>
            <div className="landing__stat">
              <div className="landing__stat-value">98%</div>
              <div className="landing__stat-label">Satisfacción</div>
            </div>
            <div className="landing__stat">
              <div className="landing__stat-value">150+</div>
              <div className="landing__stat-label">Proyectos Creados</div>
            </div>
            <div className="landing__stat">
              <div className="landing__stat-value">25</div>
              <div className="landing__stat-label">Países</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECCIÓN SERVICIOS/PRODUCTOS
          ======================================== */}
      <section id="servicios" className="landing__services">
        <div className="landing__container">
          <div className="landing__section-header">
            <h2 className="landing__section-title">Nuestros Programas y Servicios</h2>
            <p className="landing__section-subtitle">
              Educación transformadora para un futuro sustentable
            </p>
          </div>

          {/* Tabs de filtrado */}
          <div className="landing__tabs">
            <button 
              className={`landing__tab ${activeTab === 'all' ? 'landing__tab--active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Todos
            </button>
            <button 
              className={`landing__tab ${activeTab === 'service' ? 'landing__tab--active' : ''}`}
              onClick={() => setActiveTab('service')}
            >
              Servicios
            </button>
            <button 
              className={`landing__tab ${activeTab === 'product' ? 'landing__tab--active' : ''}`}
              onClick={() => setActiveTab('product')}
            >
              Productos
            </button>
          </div>

          {/* Grid de servicios/productos */}
          <div className="landing__services-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div key={item.id} className="landing__service-card">
                  {/* Imagen del servicio */}
                  <div className="landing__service-image">
                    <img src={item.image || 'https://via.placeholder.com/400x200'} alt={item.title} />
                    {item.badge && <span className="landing__service-badge">{item.badge}</span>}
                  </div>
                  
                  {/* Contenido del servicio */}
                  <div className="landing__service-content">
                    <span className="landing__service-category">
                      {item.category || item.type}
                    </span>
                    <h3 className="landing__service-title">{item.title}</h3>
                    <p className="landing__service-description">
                      {item.description || item.subtitle}
                    </p>
                    
                    {/* Metadatos */}
                    <div className="landing__service-meta">
                      {item.duration && (
                        <div className="landing__service-meta-item">
                          <Calendar size={14} />
                          <span>{item.duration}</span>
                        </div>
                      )}
                      {item.format && (
                        <div className="landing__service-meta-item">
                          <Globe size={14} />
                          <span>{item.format}</span>
                        </div>
                      )}
                      {item.students && (
                        <div className="landing__service-meta-item">
                          <User size={14} />
                          <span>{item.students} estudiantes</span>
                        </div>
                      )}
                    </div>

                    {/* Footer con precio y rating */}
                    <div className="landing__service-footer">
                      <div className="landing__service-price">
                        {item.price && (
                          <>
                            <span className="landing__service-price-currency">
                              {item.currency || 'USD'}
                            </span>
                            <span className="landing__service-price-value">
                              ${item.price}
                            </span>
                          </>
                        )}
                      </div>
                      {item.rating && (
                        <div className="landing__service-rating">
                          <Star className="landing__service-star" />
                          <span>{item.rating}</span>
                        </div>
                      )}
                    </div>

                    {/* Botón CTA principal */}
                    <button 
                      className="landing__service-button landing__service-button--primary"
                      onClick={() => handleProductAction(item)}
                    >
                      {getActionButtonText(item)} <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ 
                gridColumn: '1 / -1', 
                textAlign: 'center', 
                padding: '3rem',
                color: '#7B7A70',
                background: 'rgba(213, 206, 169, 0.1)',
                borderRadius: '1rem',
                border: '2px dashed #D5CEA9'
              }}>
                <h3 style={{ color: '#063B2C', marginBottom: '1rem' }}>
                  ⚠️ No hay productos para mostrar
                </h3>
                <p style={{ marginBottom: '0.5rem' }}>
                  Para mostrar productos específicos:
                </p>
                <ol style={{ 
                  textAlign: 'left', 
                  maxWidth: '400px', 
                  margin: '1rem auto',
                  fontSize: '0.875rem' 
                }}>
                  <li>Cambia <code>showAll: false</code> en FEATURED_PRODUCTS_CONFIG</li>
                  <li>Descomenta y agrega IDs, títulos o categorías</li>
                  <li>Verifica que los valores coincidan exactamente</li>
                </ol>
                <p style={{ fontSize: '0.75rem', marginTop: '1rem', opacity: 0.8 }}>
                  Revisa la consola para más información de debugging
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className='CTA-CUENTA-RGRESIVA'>
        <CtaImgCuentaRgresiva {...timerProps} />

      </section>

      {/* ========================================
          SECCIÓN PRICING
          ======================================== */}
      <section id="pricing" className="landing__pricing">
        <div className="landing__container">
          <div className="landing__section-header">
            <h2 className="landing__section-title">Planes de Membresía</h2>
            <p className="landing__section-subtitle">
              Invierte en tu futuro y el del planeta
            </p>
          </div>

          <div className="landing__pricing-grid">
            {PRICING_PLANS.map((plan, index) => (
              <div 
                key={index}
                className={`landing__pricing-card ${plan.recommended ? 'landing__pricing-card--recommended' : ''}`}
              >
                {plan.recommended && (
                  <div className="landing__pricing-badge">MÁS POPULAR</div>
                )}
                <h3 className="landing__pricing-name">{plan.name}</h3>
                <p className="landing__pricing-description">{plan.description}</p>
                
                {/* Precio */}
                <div className="landing__pricing-price">
                  {plan.currency && (
                    <span className="landing__pricing-currency">{plan.currency} $</span>
                  )}
                  <span className="landing__pricing-value">{plan.price}</span>
                  <span className="landing__pricing-period">{plan.period}</span>
                </div>
                
                {/* Características */}
                <ul className="landing__pricing-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="landing__pricing-feature">
                      <Check className="landing__pricing-check" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Botón */}
                <button 
                  onClick={() => {
                    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`landing__pricing-button ${plan.recommended ? 'landing__pricing-button--primary' : ''}`}
                >
                  Seleccionar Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          SECCIÓN TESTIMONIOS
          ======================================== */}
      <section id="testimonials" className="landing__testimonials">
        <div className="landing__container">
          <div className="landing__section-header">
            <h2 className="landing__section-title">Historias de Transformación</h2>
            <p className="landing__section-subtitle">
              Lo que dicen nuestros estudiantes y partners
            </p>
          </div>

          <div className="landing__testimonials-grid">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="landing__testimonial-card">
                {/* Rating */}
                <div className="landing__testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="landing__testimonial-star" />
                  ))}
                </div>
                
                {/* Contenido */}
                <p className="landing__testimonial-content">
                  "{testimonial.content}"
                </p>
                
                {/* Autor */}
                <div className="landing__testimonial-author">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="landing__testimonial-avatar"
                  />
                  <div>
                    <div className="landing__testimonial-name">{testimonial.name}</div>
                    <div className="landing__testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          SECCIÓN CONTACTO
          ======================================== */}
      <section id="contacto" className="landing__contact">
        <div className="landing__container landing__container--small">
          <div className="landing__section-header">
            <h2 className="landing__section-title">Comienza Tu Viaje Sustentable</h2>
            <p className="landing__section-subtitle">
              Completa el formulario y recibe una sesión de orientación gratuita
            </p>
          </div>

          <form onSubmit={handleSubmit} className="landing__form">
            <div className="landing__form-grid">
              {/* Nombre */}
              <div className="landing__form-group">
                <label className="landing__form-label">Nombre Completo *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="landing__form-input"
                  placeholder="Juan Pérez"
                />
              </div>
              
              {/* Email */}
              <div className="landing__form-group">
                <label className="landing__form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="landing__form-input"
                  placeholder="juan@ejemplo.com"
                />
              </div>
              
              {/* Teléfono */}
              <div className="landing__form-group">
                <label className="landing__form-label">Teléfono *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="landing__form-input"
                  placeholder="+52 123 456 7890"
                />
              </div>
              
              {/* Empresa */}
              <div className="landing__form-group">
                <label className="landing__form-label">Organización</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="landing__form-input"
                  placeholder="Mi Empresa S.A."
                />
              </div>
              
              {/* Servicio de interés */}
              <div className="landing__form-group landing__form-group--full">
                <label className="landing__form-label">Programa de Interés</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="landing__form-select"
                >
                  <option value="">Selecciona un programa</option>
                  {featuredProducts.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Mensaje */}
              <div className="landing__form-group landing__form-group--full">
                <label className="landing__form-label">Mensaje (Opcional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="landing__form-textarea"
                  placeholder="Cuéntanos sobre tus objetivos..."
                />
              </div>
            </div>

            {/* Footer del formulario */}
            <div className="landing__form-footer">
              <p className="landing__form-disclaimer">
                * Campos obligatorios. Respetamos tu privacidad.
              </p>
              <button type="submit" className="landing__form-submit">
                Enviar Solicitud <ChevronRight className="landing__form-submit-icon" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;