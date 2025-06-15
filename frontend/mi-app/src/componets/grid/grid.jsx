import React from 'react';
import './grid.scss';

const Grid = ({ items, slice }) => {
  const defaultItems = [
    {
      id: 1,
      title: "A Guide To Rocky Mountain Vacations",
      subtitle: "Descubre los paisajes más impresionantes",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      badge: "Aventura",
      icon: "🏔️",
      category: "Guía de viaje"
    },
    {
      id: 2,
      title: "Traveling to USA",
      subtitle: "Aventuras en el desierto americano",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
      badge: "Explorar",
      icon: "🏜️",
      category: "Destino"
    },
    {
      id: 3,
      title: "Beach Vacation Paradise",
      subtitle: "Relájate en playas paradisíacas",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
      badge: "Relax",
      icon: "🏖️",
      category: "Vacaciones"
    },
    {
      id: 4,
      title: "Meet Big Cat The Hard Way",
      subtitle: "Aventuras en la nieve",
      image: "https://images.unsplash.com/photo-1544737151-6e4b0b5b59d7?w=600&h=400&fit=crop",
      badge: "Invierno",
      icon: "❄️",
      category: "Deportes"
    },
    {
      id: 5,
      title: "Most Unusual Objector",
      subtitle: "Descubre secretos urbanos",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
      badge: "Ciudad",
      icon: "🏙️",
      category: "Urbano"
    },
    {
      id: 6,
      title: "Mountain Lake Adventure",
      subtitle: "Lagos cristalinos y montañas majestuosas",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop",
      badge: "Naturaleza",
      icon: "🏔️",
      category: "Naturaleza"
    },
    {
      id: 7,
      title: "Fairy-tale Settings",
      subtitle: "Castillos de cuento de hadas",
      image: "https://images.unsplash.com/photo-1471919743851-c4df8b6ee130?w=600&h=400&fit=crop",
      badge: "Historia",
      icon: "🏰",
      category: "Cultura"
    },
    {
      id: 8,
      title: "Wild Adventure",
      subtitle: "Aventuras extremas en la naturaleza",
      image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=400&fit=crop",
      badge: "Aventura",
      icon: "🦁",
      category: "Extremo"
    },
    {
      id: 9,
      title: "Hidden Gems",
      subtitle: "Lugares únicos para descubrir",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      badge: "Relax",
      icon: "🌿",
      category: "Único"
    }
  ];

  const gridItems = items || defaultItems;

  const handleCardClick = (item) => {
    console.log('Card clicked:', item.title);
    // Aquí puedes agregar la lógica que necesites
  };

  return (
    <div className="grid">
      <div className="grid__container">
        {gridItems.slice(0, 3).map((item) => (
          <div 
            key={item.id} 
            className="grid__card"
            onClick={() => handleCardClick(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCardClick(item);
              }
            }}
          >
            <div className="grid__card-image">
              <img 
                src={item.image} 
                alt={item.title}
                loading="lazy"
              />
              {item.badge && (
                <div className="grid__card-badge">
                  {item.badge}
                </div>
              )}
            </div>
            <div className="grid__card-overlay">
              <h3 className="grid__card-title">{item.title}</h3>
              {item.subtitle && (
                <p className="grid__card-subtitle">{item.subtitle}</p>
              )}
              <div className="grid__card-meta">
                <div className="grid__card-avatar">
                  {item.icon}
                </div>
                <span>{item.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;