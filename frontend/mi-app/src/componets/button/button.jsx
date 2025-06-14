import { Link } from "react-router-dom";
import "./button.scss";

const Button = ({ text, link, icon, style = "primary" }) => {
  return (
    <div className={`cardV2__content-button cardV2__content-button--${style}`}>
      <Link className="cardV2__image-button" to={link}>
        {icon && <span className="cardV2__button-icon">{icon}</span>}
        {text}
      </Link>
    </div>
  );
};

export default Button;
