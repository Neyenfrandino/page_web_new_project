import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  User,
  Folder,
  Calendar,
  MessageCircle,
  ShoppingCart,
  Briefcase,
  ChevronDown,
  Menu,
  X,
  Store,
  Package,
  BookOpen,
  PenTool,
  Leaf,
  Star,
  Globe
} from 'lucide-react';

import './Nav.scss';

const iconMap = {
  HomeIcon: Home,
  UserIcon: User,
  FolderIcon: Folder,
  CalendarIcon: Calendar,
  MessageCircleIcon: MessageCircle,
  ShoppingCartIcon: ShoppingCart,
  BriefcaseIcon: Briefcase,
  StoreIcon: Store,
  PackageIcon: Package,
  BookOpenIcon: BookOpen,
  PenToolIcon: PenTool,
  LeafIcon: Leaf,
  StarIcon: Star,
  GlobeIcon: Globe
};

const Nav = ({ listRouters, projects, cartItemsCount }) => {
  const [isScroll, setIsScroll] = useState(false);


  const [openDropdown, setOpenDropdown] = useState(null);
  const [projectImageIndexes, setProjectImageIndexes] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const intervalRefs = useRef({});
  const navRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  
  // Usar useLocation para obtener la ruta actual
  const location = useLocation();
  

    useEffect(() => {
      const handleScroll = () => setIsScroll(window.scrollY);
      handleScroll();
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Detect
  // ar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Cerrar menú móvil al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    if (isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobile, isMobileMenuOpen]);

  // Prevenir scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobile && isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isMobileMenuOpen]);

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Función para verificar si una ruta está activa
  const isActiveRoute = useCallback((item) => {
    const currentPath = location.pathname;
    
    // Para items tipo "single" o "cart"
    if (item.type === 'single' || item.type === 'cart') {
      return currentPath === item.path;
    }
    
    // Para items con dropdown
    if (item.type === 'dropdown' || item.type === 'mega-dropdown') {
      // Verificar si alguna subruta está activa
      if (item.subItems) {
        return item.subItems.some(subItem => {
          if (subItem.type === 'group' && subItem.subItems) {
            return subItem.subItems.some(groupItem => currentPath === groupItem.path);
          }
          return currentPath === subItem.path;
        });
      }
    }
    
    return false;
  }, [location.pathname]);

  // Función para verificar si un dropdown item está activo
  const isActiveDropdownItem = useCallback((subItemPath) => {
    return location.pathname === subItemPath;
  }, [location.pathname]);

  const renderIcon = useCallback((iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={isMobile ? 20 : 18} /> : null;
  }, [isMobile]);

  // Función para inicializar los índices de imágenes
  const initializeImageIndexes = useCallback(() => {
    if (!projects?.projects) return;
    
    const initialIndexes = {};
    projects.projects.forEach(project => {
      if (project.images && project.images.length > 0) {
        initialIndexes[project.name] = 0;
      }
    });
    setProjectImageIndexes(initialIndexes);
  }, [projects]);

  // Función para cambiar la imagen de un proyecto específico
  const cycleProjectImage = useCallback((projectName, totalImages) => {
    setProjectImageIndexes(prev => ({
      ...prev,
      [projectName]: (prev[projectName] + 1) % totalImages
    }));
  }, []);

  // Función para iniciar el ciclo de imágenes de un proyecto
  const startImageCycle = useCallback((projectName, totalImages) => {
    if (totalImages <= 1 || isMobile) return;
    
    // Limpiar intervalo existente si existe
    if (intervalRefs.current[projectName]) {
      clearInterval(intervalRefs.current[projectName]);
    }
    
    // Crear nuevo intervalo
    intervalRefs.current[projectName] = setInterval(() => {
      cycleProjectImage(projectName, totalImages);
    }, 2500); // Cambiar cada 2.5 segundos
    
  }, [cycleProjectImage, isMobile]);

  // Función para detener el ciclo de imágenes de un proyecto
  const stopImageCycle = useCallback((projectName) => {
    if (intervalRefs.current[projectName]) {
      clearInterval(intervalRefs.current[projectName]);
      delete intervalRefs.current[projectName];
    }
  }, []);

  // Función para detener todos los ciclos
  const stopAllImageCycles = useCallback(() => {
    Object.keys(intervalRefs.current).forEach(projectName => {
      stopImageCycle(projectName);
    });
  }, [stopImageCycle]);

  // Inicializar índices cuando cambien los proyectos
  useEffect(() => {
    initializeImageIndexes();
  }, [initializeImageIndexes]);

  // Limpiar intervalos al desmontar el componente
  useEffect(() => {
    return () => {
      stopAllImageCycles();
    };
  }, [stopAllImageCycles]);

  // Función para manejar la entrada del mouse con delay
  const handleMouseEnter = useCallback((index, item) => {
    const hasDropdown = item.type === 'dropdown' || item.type === 'mega-dropdown';
    
    if (hasDropdown && !isMobile) {
      // Cancelar cualquier timeout pendiente de cierre
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
        dropdownTimeoutRef.current = null;
      }

      setOpenDropdown(index);
      
      // Si es el dropdown de proyectos, iniciar ciclos de imágenes
      if (item.name === 'Proyectos' && projects?.projects) {
        item.subItems.forEach(subItem => {
          const matchedProject = projects.projects.find(p => p.name === subItem.name);
          if (matchedProject && matchedProject.images && matchedProject.images.length > 1) {
            startImageCycle(matchedProject.name, matchedProject.images.length);
          }
        });
      }
    }
  }, [projects, startImageCycle, isMobile]);

  // Función para manejar la salida del mouse con delay
  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      // Cancelar timeout anterior si existe
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
      
      // Crear nuevo timeout para cerrar el dropdown después de un delay
      dropdownTimeoutRef.current = setTimeout(() => {
        setOpenDropdown(null);
        stopAllImageCycles();
      }, 150); // 150ms de delay
    }
  }, [stopAllImageCycles, isMobile]);

  // Nueva función para manejar cuando el mouse entra al dropdown
  const handleDropdownMouseEnter = useCallback(() => {
    if (!isMobile) {
      // Cancelar el timeout de cierre cuando el mouse entra al dropdown
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
        dropdownTimeoutRef.current = null;
      }
    }
  }, [isMobile]);

  // Nueva función para manejar cuando el mouse sale del dropdown
  const handleDropdownMouseLeave = useCallback(() => {
    if (!isMobile) {
      // Crear timeout para cerrar cuando sale del dropdown
      dropdownTimeoutRef.current = setTimeout(() => {
        setOpenDropdown(null);
        stopAllImageCycles();
      }, 150);
    }
  }, [stopAllImageCycles, isMobile]);

  const handleClick = useCallback((e, item, index) => {
    const hasDropdown = item.type === 'dropdown' || item.type === 'mega-dropdown';
    
    if (hasDropdown) {
      e.preventDefault();
      if (isMobile) {
        setOpenDropdown(openDropdown === index ? null : index);
      }
    } else {
      // Si es móvil y no tiene submenu, cerrar el menú
      if (isMobile && item.type !== 'cart') {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    }
  }, [isMobile, openDropdown]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => {
      const newState = !prev;
      if (!newState) {
        setOpenDropdown(null);
        stopAllImageCycles();
      }
      return newState;
    });
  }, [stopAllImageCycles]);

  const handleDropdownLinkClick = useCallback(() => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
      setOpenDropdown(null);
      stopAllImageCycles();
    }
  }, [isMobile, stopAllImageCycles]);

  // Renderizar dropdown estándar con imágenes
  const renderStandardDropdown = useCallback((item) => {
    if (!item.subItems) return null;

    return (
      <ul 
        className="nav__dropdown nav__dropdown--standard"
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
      >
        {item.subItems.map((subItem, subIndex) => {
          const isActive = isActiveDropdownItem(subItem.path);

          return (
            <li 
              key={subIndex} 
              className={`nav__dropdown-item nav__dropdown-item--standard ${isActive ? 'nav__dropdown-item--active' : ''}`}
            >
              <Link 
                to={subItem.path} 
                className={`nav__dropdown-link nav__dropdown-link--standard ${isActive ? 'nav__dropdown-link--active' : ''}`}
                onClick={handleDropdownLinkClick}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="nav__standard-images">
                  <img
                    src={subItem.image || '/img/default-preview.jpg'}
                    alt={subItem.name}
                    className="nav__standard-background"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/img/default-preview.jpg';
                    }}
                  />
                  <div className="nav__standard-overlay">
                    {/* <span className="nav__standard-icon">
                      {renderIcon(subItem.icon)}
                    </span> */}
                    <h4 className="nav__standard-title">{subItem.name}</h4>
                  </div>
                </div>
                <span className="nav__dropdown-text">
                  {subItem.description || 'Descubre más sobre esta sección'}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }, [handleDropdownLinkClick, handleDropdownMouseEnter, handleDropdownMouseLeave, isActiveDropdownItem, renderIcon]);

  // Renderizar dropdown de proyectos con imágenes
  const renderProjectDropdown = useCallback((item) => {
    if (!item.subItems || !projects?.projects) return null;

    return (
      <ul 
        className="nav__dropdown nav__dropdown--projects"
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
      >
        {item.subItems.map((subItem, subIndex) => {
          const matchedProject = projects.projects.find(p => p.name === subItem.name);
          
          if (!matchedProject) return null;

          const currentImageIndex = projectImageIndexes[matchedProject.name] || 0;
          const isActive = isActiveDropdownItem(subItem.path);

          return (
            <li 
              key={subIndex} 
              className={`nav__dropdown-item ${isActive ? 'nav__dropdown-item--active' : ''}`}
            >
              <Link 
                to={subItem.path} 
                className={`nav__dropdown-link ${isActive ? 'nav__dropdown-link--active' : ''}`}
                onClick={handleDropdownLinkClick}
                aria-label={`Ver proyecto ${matchedProject.name}: ${matchedProject.description}`}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="nav__project-images">
                  {matchedProject.images.map((image, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={image}
                      alt={`${matchedProject.name} - imagen ${imageIndex + 1}`}
                      className={`nav__project-background ${
                        imageIndex === currentImageIndex ? 'nav__project-background--active' : ''
                      }`}
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ))}
                  <img
                    src={matchedProject.logo}
                    alt={`Logo de ${matchedProject.name}`}
                    className="nav__project-logo"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <span className="nav__dropdown-text">
                  {matchedProject.description}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }, [projects, projectImageIndexes, handleDropdownLinkClick, handleDropdownMouseEnter, handleDropdownMouseLeave, isActiveDropdownItem]);

  // Verificar que listRouters existe y tiene la estructura esperada
  const menuItems = listRouters?.['Movimiento Naluum'] || [];

  return (
    <nav className="nav" ref={navRef}>
      <div className={`nav__content ${isScroll > 0 ? 'isScrollTrue alt-animation' : ''}`}>
        {/* Logo */}
        <div className="nav__logo">
          <Link 
            to="/movimiento-naluum/" 
            className="nav__logo-link"
            onClick={() => {
              if (isMobile && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
                setOpenDropdown(null);
              }
            }}
            aria-label="Ir al inicio - Movimiento Naluum"
          >
            <img 
              src="/img/logo_naluum_trasparente.svg" 
              alt="Logo Movimiento Naluum"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/img/logo_naluum_fallback.png'; // Imagen de respaldo
              }}
            />
          </Link>
        </div>

        {/* Hamburger Button - Solo visible en móvil */}
        <button 
          className="nav__hamburger"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="nav-menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu */}
        <div 
          className={`nav__menu ${isMobileMenuOpen ? 'nav__menu--open' : ''}`}
          id="nav-menu"
          role="navigation"
          aria-label="Navegación principal"
        >
          <ul className="nav__menu-list">
            {menuItems.map((item, index) => {
              const isActive = isActiveRoute(item);
              const hasDropdown = item.type === 'dropdown' || item.type === 'mega-dropdown';
              
              return (
                <li
                  key={index}
                  className={`nav__menu-item ${hasDropdown ? 'nav__menu-item--has-dropdown' : ''} ${isActive ? 'nav__menu-item--active' : ''} ${item.type === 'cart' ? 'nav__menu-item--cart' : ''}`}
                  onMouseEnter={() => handleMouseEnter(index, item)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link 
                    to={item.path || '#'}  
                    onClick={(e) => handleClick(e, item, index)} 
                    className={`nav__menu-link ${isActive ? 'nav__menu-link--active' : ''} ${item.type === 'cart' ? 'nav__menu-link--cart' : ''}`}
                    aria-haspopup={hasDropdown ? "true" : "false"}
                    aria-expanded={openDropdown === index ? "true" : "false"}
                    aria-current={location?.pathname === item.path ? "page" : undefined}
                  >
                    <span className="nav__menu-icon">
                      {renderIcon(item.icon)}
                    </span>
                    {item.name && <span className="nav__menu-text">{item.name}</span>}
                    {hasDropdown && (
                      <ChevronDown 
                        size={isMobile ? 16 : 14} 
                        className={`nav__menu-chevron ${openDropdown === index ? 'nav__menu-chevron--open' : ''}`}
                        aria-hidden="true"
                      />
                    )}
                    {item.type === 'cart' && item.showBadge && cartItemsCount > 0 && (
                      <span className="nav__cart-badge">{cartItemsCount}</span>
                    )}
                  </Link>

                  {/* Dropdown */}
                  {hasDropdown && openDropdown === index && (
                    item.name === 'Proyectos' 
                      ? renderProjectDropdown(item)
                      : renderStandardDropdown(item)
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Overlay para cerrar menú en móvil */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="nav__overlay"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setOpenDropdown(null);
          }}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Nav;