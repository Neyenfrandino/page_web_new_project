import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  User as UserIcon, 
  Briefcase as BriefcaseIcon, 
  Folder as FolderIcon, 
  Book as BookIcon, 
  MessageCircle as MessageCircleIcon 
} from 'lucide-react';

// import routesConfig from './routes.json';
import listRouters from '../../listRouters.json';
import './nav.scss';

const MinimalistLogo = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    width="50" 
    height="50"
  >
    <rect 
      x="10" 
      y="10" 
      width="80" 
      height="80" 
      fill="none" 
      stroke="#2c3e50" 
      strokeWidth="6"
    />
    <line 
      x1="50" 
      y1="10" 
      x2="50" 
      y2="90" 
      stroke="#2c3e50" 
      strokeWidth="4"
    />
    <line 
      x1="10" 
      y1="50" 
      x2="90" 
      y2="50" 
      stroke="#2c3e50" 
      strokeWidth="4"
    />
  </svg>
);

const Nav = ({ brandName = 'Mi Empresa' }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState(location.pathname);

  // Icon mapping
  const iconMap = {
    HomeIcon: HomeIcon,
    UserIcon: UserIcon,
    BriefcaseIcon: BriefcaseIcon,
    FolderIcon: FolderIcon,
    BookIcon: BookIcon,
    MessageCircleIcon: MessageCircleIcon
  };

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRouteClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="navigation__container">
        <div className="navigation__brand">
          <Link to={'/'} className="navigation__logo">
            <img src="img/3.svg" alt="" />
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
    </nav>
  );
};

export default Nav;