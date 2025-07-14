import { Link } from "react-router-dom";
import Button from "../../button/button";
import "./cardV2_img.scss"

const CardV2Img = ({ /* objectContentCard */ }) => {

    const objectContentCard = {
        question: "¿Qué es Movimiento Naluum?",
        title: "Educación, conciencia y colaboración para transforma",
        text: "El Movimiento Naluum es una propuesta para generar una comunidad educativa consciente y profesional que inspire a más personas. Está inspirado en los sistemas vivos que se autorregulan y se sostienen gracias a la colaboración efectiva y amorosa. Se basa en crear un sistema vivo, sustentable en el tiempo",
        buttonPrimary: ["Conocer más sobre el movimiento", '/sobre_nosotros'],
        image: "/img/personas_trabajando.jpg"
    }
    
    return (

        <div className="cardV2__container">
            <div className="cardV2__image-content">
                <div className="cardV2__image">
                    <img src={`${objectContentCard.image}`} alt="Personas trabajando" />
                </div>

                <div className="cardV2__content--text">
                    <span className="cardV2__content-title">{objectContentCard.question}</span>
                    <h2 className="cardV2__content-subtitle">{objectContentCard.title}</h2>
                    <p className="cardV2__content-description">{objectContentCard.text}</p>

                    <div className="button-card">
                        <Button text={objectContentCard.buttonPrimary[0]} link={objectContentCard.buttonPrimary[1]} style="primary" />
                    </div>
                </div>
            </div>
        </div>

    )
}
 
export default CardV2Img;
