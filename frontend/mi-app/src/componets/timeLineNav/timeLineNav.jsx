// TimelineNav.jsx
import React, { useState } from 'react';
import { Clock, Home, User, Settings, FileText } from 'lucide-react';
import './TimelineNav.scss';

const TimelineNav = () => {
  // Datos de ejemplo para las rutas
  const routes = [
    { id: 1, name: "Inicio", path: "/", icon: Home },
    { id: 2, name: "Perfil", path: "/perfil", icon: User },
    { id: 3, name: "Historial", path: "/historial", icon: Clock },
    { id: 4, name: "Documentos", path: "/documentos", icon: FileText },
    { id: 5, name: "Configuración", path: "/configuracion", icon: Settings }
  ];

  const [activeRoute, setActiveRoute] = useState(1);

  const handleRouteClick = (routeId) => {
    setActiveRoute(routeId);
    // Aquí se puede agregar la lógica de navegación real
  };

  return (
    <div className="timeline-nav">
      <div className="timeline-container">
        <div className="timeline-line"></div>
        {routes.map((route) => (
          <div 
            key={route.id} 
            className={`timeline-item ${activeRoute === route.id ? 'active' : ''}`}
            onClick={() => handleRouteClick(route.id)}
          >
            <div className="item-content">
              <span className="item-label">{route.name}</span>
              <route.icon className="item-icon" size={18} />
            </div>
            <div className="item-dot"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineNav;