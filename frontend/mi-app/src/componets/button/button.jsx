import "./button.scss";

const Button = ({ text, onClick, type = "primary", className = "" }) => {

    const buttonTypes = {
        primary: "primary",
        secondary: "secondary",
        tertiary: "tertiary",
    };

    const combinedClassName = `button ${buttonTypes[type]} ${className}`.trim();

    return (
        <div className="button-container">
            <button className={combinedClassName} onClick={onClick}>
                {text}
            </button>
        </div>
    );
};

export default Button;
