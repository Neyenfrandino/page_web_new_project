// Nav.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DarkModeToggle from '../darkModeToggle/darkModeToggle';
import {
  Home as HomeIcon,
  User as UserIcon,
  Briefcase as BriefcaseIcon,
  Folder as FolderIcon,
  Book as BookIcon,
  MessageCircle as MessageCircleIcon,
  ShoppingCart as ShoppingCartIcon,
  FileText as FileTextIcon,
  ChevronDown as ChevronDownIcon
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
  FileTextIcon
};

const Nav = ({listRouters }) => {
  const location = useLocation();
  const [ activeRoute, setActiveRoute ] = useState(location.pathname);
  const [ openDropdown, setOpenDropdown ] = useState(null);

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  const toggleDropdown = (group, event) => {
    event.stopPropagation();
    if (openDropdown === group) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(group);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navigation">
      <div className="navigation__container">
        {/* Logo - Will be centered on mobile via CSS */}
        <div className="navigation__brand">
          <Link to="/" className="navigation__logo">
            <img src="img/4.svg" alt="Logo" />
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="navigation__menu">
          <ul className="navigation__links">
            {/* Principal links directly in the top menu */}
            {listRouters.find(route => route.group === "Principal")?.items.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <li key={item.name} className="navigation__item">
                  <Link
                    to={item.path}
                    className={`navigation__link ${activeRoute === item.path ? 'navigation__link--active' : ''}`}
                  >
                    {Icon && <Icon className="navigation__icon" />}
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}

            {/* Dropdown menus for other groups */}
            {listRouters
              .filter(route => route.group !== "Principal")
              .map((route) => (
                <li key={route.group} className="navigation__item navigation__item--has-dropdown">
                  <button
                    onClick={(e) => toggleDropdown(route.group, e)}
                    className="navigation__dropdown-toggle"
                  >
                    <span>{route.group}</span>
                    <ChevronDownIcon className={`navigation__dropdown-icon ${openDropdown === route.group ? 'navigation__dropdown-icon--open' : ''}`} />
                  </button>

                  {openDropdown === route.group && (
                    <ul className="navigation__dropdown">
                      {route.items.map((item) => {
                        const Icon = iconMap[item.icon];
                        return (
                          <li key={item.name} className="navigation__dropdown-item">
                            <Link
                              to={item.path}
                              className={`navigation__dropdown-link ${activeRoute === item.path ? 'navigation__dropdown-link--active' : ''}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {Icon && <Icon className="navigation__dropdown-icon" />}
                              <span>{item.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              ))}
          </ul>
        </div>

  

        {/* Mobile menu button - positioned on right via CSS */}
        <div className="navigation__mobile-toggle">
          <button 
            className="navigation__hamburger"
            onClick={(e) => toggleDropdown("mobile", e)}
          >
            <span className={`${openDropdown !== 'mobile' ? 'navigation__hamburger-line' : 'navigation__hamburger-line-close'}`}></span>
            <span className={`${openDropdown !== 'mobile' ? 'navigation__hamburger-line' : 'navigation__hamburger-line-close'}`}></span>
            <span className={`${openDropdown !== 'mobile' ? 'navigation__hamburger-line' : 'navigation__hamburger-line-close'}`}></span>
          </button>
        </div>

              {/* Botón de Modo Oscuro */}
              <div className="navigation__darkmode">
          <DarkModeToggle />
        </div>
      </div>
      

      {/* Mobile menu */}
      {openDropdown === "mobile" && (
        <div className="navigation__mobile-menu">
          {listRouters.map((route) => (
            <div key={route.group} className="navigation__mobile-group">
              <div className="navigation__mobile-group-title">
                {route.group}
              </div>
              <ul className="navigation__mobile-items">
                {route.items.map((item) => {
                  const Icon = iconMap[item.icon];
                  return (
                    <li key={item.name} className="navigation__mobile-item">
                      <Link
                        to={item.path}
                        className={`navigation__mobile-link ${activeRoute === item.path ? 'navigation__mobile-link--active' : ''}`}
                      >
                        {Icon && <Icon className="navigation__mobile-icon" />}
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Nav;
