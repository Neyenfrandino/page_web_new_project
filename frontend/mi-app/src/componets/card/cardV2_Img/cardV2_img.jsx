import { Link } from "react-router-dom";
import "./cardV2_img.scss"

const CardV2Img = ({ /* objectContentCard */ }) => {

    const objectContentCard = {
        title: "Soluciones a tu medida",
        text: "Nuestro equipo de expertos está listo para atender tus necesidades y ayudarte a alcanzar tus objetivos de negocio con eficiencia y profesionalismo.",
        buttonPrimary: ["Contactar", '/contact'],
        buttonSecondary: ["Ver más", '/products'],
        image: "img/7.png",
    }
    return (
        <div className="cardV2__image-wrapper">
            <div className="cardV2__image-content">
                <h2 className="cardV2__image-title">{objectContentCard.title}</h2>
                <p className="cardV2__image-text">{objectContentCard.text}</p>
                <div className="cardV2__buttons-group">
                    <Link className="cardV2__image-button primary" to={objectContentCard.buttonPrimary[1]}>{objectContentCard.buttonPrimary[0]}</Link>
                    <Link className="cardV2__image-button secondary" to={objectContentCard.buttonSecondary[1]}>{objectContentCard.buttonSecondary[0]}</Link>
                </div>
            </div>
        </div>
    )
}

export default CardV2Img;
