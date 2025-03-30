import { useState } from "react";
import "./card.scss";

// Componente principal que renderiza la colección de tarjetas
const Card = ({ products }) => {
  return (
    <div className="card__container">
      <div className="card__content">
        <div className="card__grid">
          {products.map((product, index) => (
            <ProductCard 
              key={index}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente para cada tarjeta de producto individual
const ProductCard = ({ product, index }) => {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <div className={`card card--${showInfo ? 'expanded' : 'collapsed'}`}>
      {/* Título del producto */}
      <h2>{product.name}</h2>
      
      {/* Imagen del producto */}
      <div className="card__image-wrapper">
        <img src={product.image} alt={product.name} />
      </div>
      
      {/* Botón para mostrar/ocultar información */}
      <button 
        className="card__info-button"
        onClick={() => setShowInfo(!showInfo)}
      >
        {showInfo ? "Hide Info" : "Show Info"}
      </button>
      
      {/* Panel de información del producto */}
      <div className={`card__info-panel ${showInfo ? 'card__info-panel--visible' : ''}`}>
        {/* Descripción */}
        <div className="card__description">
          <p>{product.description}</p>
        </div>
        
        {/* Contenido del panel (precio y botón de compra) */}
        <div className="card__info-panel__content">
          {/* Precio */}
          <div className="card__price">
            <span>{product.price}</span>
            <span className="card__currency">{product.currency}</span>
          </div>
          
          {/* Botón de inscripción/compra */}
          <div className="card__button-buy">
            <button className="card__button-buy-btn">
              <span>inscripción</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;