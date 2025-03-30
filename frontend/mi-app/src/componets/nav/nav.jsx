import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home as HomeIcon,
  User as UserIcon,
  Briefcase as BriefcaseIcon,
  Folder as FolderIcon,
  Book as BookIcon,
  MessageCircle as MessageCircleIcon
} from 'lucide-react';

import './nav.scss';

// Icon mapping
const iconMap = {
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  FolderIcon,
  BookIcon,
  MessageCircleIcon
};

const Nav = ({ isScroll, listRouters }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  const [isAutoClosing, setIsAutoClosing] = useState(false);
  const menuContainerRef = useRef(null);
  const closeTimerRef = useRef(null);

  // Update active route on location change
  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  // Scroll-based menu management
  useEffect(() => {
    // Open menu when scrolled
    if (isScroll !== 0 && !isMenuOpen) {
      setIsMenuOpen(true);
    }

    // Close menu when back to top
    if (isScroll === 0 && isMenuOpen) {
      startAutoCloseTimer();
    }
  }, [isScroll, isMenuOpen]);

  // Start auto-close timer
  const startAutoCloseTimer = useCallback(() => {
    // Clear any existing timer
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setIsAutoClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setIsMenuOpen(false);
      setIsAutoClosing(false);
    }, 2000);
  }, []);

  // Prevent auto-close when hovering over menu
  const handleMouseEnter = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      setIsAutoClosing(false);
    }
  }, []);

  // Restart auto-close timer when mouse leaves
  const handleMouseLeave = useCallback(() => {
    if (isScroll === 0 && isMenuOpen) {
      startAutoCloseTimer();
    }
  }, [isScroll, isMenuOpen, startAutoCloseTimer]);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    // Only allow toggle when scroll is 0 and not auto-closing
    if (isScroll === 0 && !isAutoClosing) {
      setIsMenuOpen(prevState => !prevState);
    }
  }, [isScroll, isAutoClosing]);

  // Close menu when route is clicked
  const handleRouteClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <nav className="navigation">
      <div
        ref={menuContainerRef}
        className={`navigation__container ${isMenuOpen ? 'visible' : 'hidden'}`}
        style={{ display: isMenuOpen ? 'flex' : 'none' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="navigation__brand">
          <Link to={'/'} className="navigation__logo">
            <img src="img/4.svg" alt="Navigation Logo" />
          </Link>
        </div>

        <div
          className={`navigation__menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`navigation__links ${isMenuOpen ? 'mobile-open' : ''}`}>
          {listRouters.routes.map((route) => {
            const Icon = iconMap[route.icon];
            return (
              <li
                key={route.path}
                className={`navigation__link-item ${activeRoute === route.path ? 'active' : ''}`}
                onClick={handleRouteClick}
              >
                <Link to={route.path} className="navigation__link">
                  {Icon && <Icon size={16} />}
                  {route.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        onClick={toggleMobileMenu}
        className='btn-nav'
        disabled={isScroll !== 0 || isAutoClosing}
      >
        ▼
      </button>
    </nav>
  );
};

export default Nav;