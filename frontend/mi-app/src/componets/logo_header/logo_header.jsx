import './logo_header.scss';

const LogoHeader = ({ logo_img }) => {
  if (!logo_img) return null; // Evita renderizar si no hay imagen

  return (
    <div className="logo__container">
      <div className="logo__content">
        <img src={logo_img} alt="Logo de la empresa" className="logo__img" />
      </div>
    </div>
  );
};

export default LogoHeader;
