import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DarkModeToggle from '../darkModeToggle/darkModeToggle';
import Carousel from '../carousel/carousel';
import projects from '../../json/projects.json';

import {
  Home as HomeIcon,
  User as UserIcon,
  Briefcase as BriefcaseIcon,
  Folder as FolderIcon,
  Book as BookIcon,
  MessageCircle as MessageCircleIcon,
  ShoppingCart as ShoppingCartIcon,
  FileText as FileTextIcon,
  ChevronDown as ChevronDownIcon,
  Calendar as CalendarIcon
} from 'lucide-react';
import './nav.scss';

// Icon mapping
const iconMap = {
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  FolderIcon,
  BookIcon,
  MessageCircleIcon,
  ShoppingCartIcon,
  FileTextIcon,
  CalendarIcon
};

const Nav = ({ listRouters }) => {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  // Process navigation items from props
  const navItems = useMemo(() => {
    if (!listRouters) return [];
    
    // If listRouters is an object with the key "Movimiento Naluum"
    if (listRouters["Movimiento Naluum"]) {
      return listRouters["Movimiento Naluum"];
    }
    // If listRouters is directly an array
    else if (Array.isArray(listRouters)) {
      return listRouters;
    }
    // If it's a differently structured object, try to extract an array
    else if (typeof listRouters === 'object') {
      // Try to get the first array we find
      for (const key in listRouters) {
        if (Array.isArray(listRouters[key])) {
          return listRouters[key];
        }
      }
    }
    // Return empty array to avoid errors
    return [];
  }, [listRouters]);

  // Main navigation items (excluding individual project pages)
  const mainNavItems = useMemo(() => {
    if (!navItems || !Array.isArray(navItems)) return [];
    
    return navItems.filter(item => 
      item && (!item.path.includes('/proyectos/') || item.path === '/movimiento-naluum/proyectos' || item.name === 'Proyectos')
    );
  }, [navItems]);
  
  // Projects menu item
  const projectsItem = useMemo(() => {
    if (!navItems || !Array.isArray(navItems)) return null;
    
    return navItems.find(item => 
      item && (item.path === '/movimiento-naluum/projects' || item.name === 'Proyectos')
    );
  }, [navItems]);

  // Update active route when location changes
  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  // Handle dropdown toggle
  const toggleDropdown = (path, event) => {
    event.stopPropagation();
    setOpenDropdowns(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  // Toggle mobile menu
  const toggleMobileMenu = (event) => {
    event.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close dropdowns and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setMobileMenuOpen(false);
      setOpenDropdowns({});
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Render dropdown items for desktop navigation
  const renderDropdownItems = (items, level = 0) => {
    if (!items || !Array.isArray(items)) return null;
    
    return items.map((item) => {
      if (!item) return null;
      
      const Icon = item.icon ? iconMap[item.icon] : null;
      const projectsFilter = item.name ? projects.projects.filter(project => project.name === item.name) : [];
      
      return (
        <li key={item.path} className={`navigation__dropdown-item ${level > 0 ? 'navigation__dropdown-item--nested' : ''}`}>
          
          <Link
            to={item.path}
            className={`navigation__dropdown-link ${activeRoute === item.path ? 'navigation__dropdown-link--active' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {projectsFilter.length > 0 && <Carousel projects={projectsFilter} />}
            {/* <span>{item.name}</span> */}
          </Link>
        </li>
      );
    });
  };

  // Render items for mobile navigation
  const renderMobileItems = (items, level = 0) => {
    if (!items || !Array.isArray(items)) return null;
    
    return items.map((item) => {
      if (!item) return null;
      
      const Icon = item.icon ? iconMap[item.icon] : null;
      const hasSubNav = item.subnavegacion && item.subnavegacion.length > 0;
      const isMadreSelva = item.name === 'Madre Selva' || item.name === 'Naluum';
      
      return (
        <li key={item.path} className={`navigation__mobile-item ${level > 0 ? `navigation__mobile-item--level-${level}` : ''}`}>
          {hasSubNav && !isMadreSelva ? (
            <>
              <div 
                className={`navigation__mobile-link ${activeRoute === item.path ? 'navigation__mobile-link--active' : ''}`}
                onClick={(e) => toggleDropdown(item.path, e)}
                style={{ paddingLeft: `${0.75 + level * 1}rem` }}
              >
                {Icon && <Icon className="navigation__mobile-icon" />}
                <span>{item.name}</span>
                <ChevronDownIcon className={`navigation__mobile-chevron ${openDropdowns[item.path] ? 'navigation__mobile-chevron--open' : ''}`} />
              </div>
              
              {openDropdowns[item.path] && (
                <ul className="navigation__mobile-subitems">
                  {renderMobileItems(item.subnavegacion, level + 1)}
                </ul>
              )}
            </>
          ) : (
            <Link
              to={item.path}
              className={`navigation__mobile-link ${activeRoute === item.path ? 'navigation__mobile-link--active' : ''}`}
              style={{ paddingLeft: `${0.75 + level * 1}rem` }}
            >
              {Icon && <Icon className="navigation__mobile-icon" />}
              <span>{item.name || (item.icon === 'ShoppingCartIcon' ? 'Carrito' : '')}</span>
            </Link>
          )}
        </li>
      );
    });
  };

  // Render desktop navigation items
  const renderDesktopItems = (items) => {
    if (!items || !Array.isArray(items)) return null;
    
    return items.map((item) => {
      if (!item) return null;
      
      const Icon = item.icon ? iconMap[item.icon] : null;
      const hasSubNav = item.name === 'Proyectos' || (item.subnavegacion && item.subnavegacion.length > 0);
      const isMadreSelva = item.name === 'Madre Selva';
      
      return (
        <li key={item.path} className={`navigation__item ${hasSubNav && !isMadreSelva ? 'navigation__item--has-dropdown' : ''}`}>
          {hasSubNav && !isMadreSelva ? (
            <>
              <button
                onClick={(e) => toggleDropdown(item.path, e)}
                className={`navigation__dropdown-toggle ${activeRoute.includes(item.path) ? 'navigation__dropdown-toggle--active' : ''}`}
              >
                {Icon && <Icon className="navigation__icon" />}
                <span>{item.name}</span>
                <ChevronDownIcon className={`navigation__dropdown-icon ${openDropdowns[item.path] ? 'navigation__dropdown-icon--open' : ''}`} />
              </button>

              {openDropdowns[item.path] && (
                <ul className="navigation__dropdown">
                  {(item.subnavegacion && Array.isArray(item.subnavegacion)) 
                    ? renderDropdownItems(item.subnavegacion) 
                    : (projectsItem && projectsItem.subnavegacion) 
                      ? renderDropdownItems(projectsItem.subnavegacion)
                      : null}
                </ul>
              )}
            </>
          ) : (
            // Aqui en donde se va a mostrar el carrito de compras, y aqui debemos mostrar el numero de productos en el carrito, y traerlo dinamicamente
            <Link
              to={item.path}
              className={`navigation__link ${activeRoute === item.path ? 'navigation__link--active' : ''}`}
            >
              {Icon && <Icon className="navigation__icon" />}
              <span>{item.name || (item.icon === 'ShoppingCartIcon' ? (
                 <span className={`navigation__link-text${activeRoute.includes('/carrito-de-compras') ? ' navigation__link--active' : ''}`}>5</span>
              ) : '')}</span>
             
            </Link>
          )}
        </li>
      );
    });
  };

  return (
    <nav className="navigation">
      <div className="navigation__container">
        {/* Mobile menu button */}
        <div className="navigation__mobile-toggle">
          <button 
            className="navigation__hamburger"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`${!mobileMenuOpen ? 'navigation__hamburger-line' : 'navigation__hamburger-line-close'}`}></span>
            <span className={`${!mobileMenuOpen ? 'navigation__hamburger-line' : 'navigation__hamburger-line-close'}`}></span>
            <span className={`${!mobileMenuOpen ? 'navigation__hamburger-line' : 'navigation__hamburger-line-close'}`}></span>
          </button>
        </div>
        
        {/* Logo - Will be centered on mobile via CSS */}
        <div className="navigation__brand">
          <Link to="/movimiento-naluum/" className="navigation__logo">
            <img src="/img/logo_naluum_trasparente.svg" alt="Logo" />
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="navigation__menu">
          <ul className="navigation__links">
            {renderDesktopItems(mainNavItems)}
          </ul>
        </div>

        {/* Dark Mode Toggle */}
        <div className="navigation__darkmode">
          <DarkModeToggle />
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="navigation__mobile-menu">
          <div className="navigation__mobile-group">
            <div className="navigation__mobile-group-title">
              Movimiento Naluum
            </div>
            <ul className="navigation__mobile-items">
              {renderMobileItems(navItems)}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;