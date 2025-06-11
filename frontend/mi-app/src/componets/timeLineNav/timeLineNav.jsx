import React, { useState } from 'react';
import './TimelineNav.scss';
import { Link, useLocation } from 'react-router-dom';

const TimelineNav = ({ routes }) => {
  const location = useLocation();

  // Detectar el prefijo dinámico (ej: /movimiento-naluum)
  const match = location.pathname.match(/^(\/[^/]+)\/projects\/([^/]+)/);
  const basePath = match ? match[1] : '';
  const currentProject = match ? match[2] : '';

  const [activeRoute, setActiveRoute] = useState(1);

  const handleRouteClick = (routeId) => {
    setActiveRoute(routeId);
  };

  return (
    <div className="timeline-nav">
      <div className="timeline-container">
        <div className="timeline-line"></div>
        {routes.map((route) => {
          const fullPath = `${basePath}/projects/${currentProject}/${route.path}`;

          return (
            <Link key={route.id} to={fullPath} className="item-link">
              <div 
                className={`timeline-item ${activeRoute === route.id ? 'active' : ''}`}
                onClick={() => handleRouteClick(route.id)}
              >
                <div className="item-content">
                  <span className="item-label">{route.name}</span>
                  <route.icon className="item-icon" size={18} />
                </div>
                <div className="item-dot"></div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineNav;
