import { useState, useEffect } from "react";

import Card from "../../componets/card/cardV1/card"; 
import CardV2Img from "../../componets/card/cardV2_Img/cardV2_img";
import CardV3_testimonios from "../../componets/card/cardV3_testimonios/cardV3_testimonios";

import Cta from "../../componets/cta/cta";
import "./services.router.scss";

const Services = ({ products }) => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`services__container ${isVisible ? 'visible' : ''}`}>
            <div className="services__background"></div>
            
            <div className="services__content">
                <h1 className="services__title">Nuestros Servicios</h1>
                <p className="services__description">
                    Descubre cómo podemos ayudarte con soluciones innovadoras y efectivas 
                    para transformar tu negocio y alcanzar nuevos horizontes.
                </p>
                
                <div className="services__cards-container">
                    <Card products={products} />
                </div>
            </div>

            <div className="asd">
                <CardV2Img />
            </div>
            
            <div className="asd1">
                <CardV3_testimonios />
            </div>
            
            <div className="asd2">
                <Cta 
                    title="¿Listo para empezar?" 
                    text="Contáctanos hoy mismo para una consulta personalizada" 
                    buttonText="Solicitar información" 
                    onClick={() => console.log("hola")} 
                />
            </div>
        </div>
    );
};

export default Services;
