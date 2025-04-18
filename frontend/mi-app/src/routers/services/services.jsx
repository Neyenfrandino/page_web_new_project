import Card from "../../componets/card/card"; // Mantuve el nombre original del import
import "./services.scss";

const Services = ({products}) => {
    return (
        <div className="services__container">
            <div className="services__background"></div>
            <div className="services__content">
                <h1 className="services__title">Nuestros Servicios</h1>
                <p className="services__description">Descubre cómo podemos ayudarte con soluciones innovadoras y efectivas.</p>
                <Card products={products} />
            </div>
            
            <div className="services__image-wrapper">
                <div className="services__image-content">
                    <h2 className="services__image-title">Soluciones a tu medida</h2>
                    <p className="services__image-text">Nuestro equipo de expertos está listo para atender tus necesidades</p>
                    <button className="services__image-button">Contactar</button>
                </div>
            </div>
        </div>
    );
};

export default Services;    