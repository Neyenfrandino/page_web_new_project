
import Card from "../../componets/card/card";
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
                
            </div>
        </div>
    );
};

export default Services;