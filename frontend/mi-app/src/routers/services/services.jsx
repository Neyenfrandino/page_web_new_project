
import Card from "../../componets/card/card";
import "./services.scss";

const Services = ({products}) => {
    return (
        <div className="services__container">
            <div className="services__background"></div>
            <div className="services__content">
                <h1 className="services__title">Nuestros Servicios</h1>
                <p className="services__description">Descubre cómo podemos ayudarte con soluciones innovadoras y efectivas.</p>
                {/* <div className="services__grid">
                    <div className="service__card">
                        <h2>Diseño Web</h2>
                        <p>Creación de sitios web modernos y optimizados para todo tipo de dispositivos.</p>
                    </div>
                    <div className="service__card">
                        <h2>Marketing Digital</h2>
                        <p>Estrategias de marketing para aumentar la visibilidad y el alcance de tu negocio.</p>
                    </div>
                    <div className="service__card">
                        <h2>Desarrollo de Apps</h2>
                        <p>Aplicaciones a medida para potenciar la experiencia digital de tus clientes.</p>
                    </div>
                </div> */}
                <Card products={products} />
            </div>
        </div>
    );
};

export default Services;