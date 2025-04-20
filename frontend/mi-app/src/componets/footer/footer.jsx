import React from "react";
import "./footer.scss";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaLocationDot, FaEnvelope, FaPhone } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__decorative-border"></div>
      
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__logo">
            <div className="logo-container">
              <h2>TuEmpresa</h2>
            </div>
            <p>Impulsamos tu crecimiento digital con soluciones simples y efectivas.</p>
            
            <div className="footer__social">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>
          
          <div className="footer__nav">
            <div className="footer__links">
              <h3>Enlaces</h3>
              <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Sobre Nosotros</a></li>
                <li><a href="#">Servicios</a></li>
                <li><a href="#">Testimonios</a></li>
                <li><a href="#">Contacto</a></li>
              </ul>
            </div>
            
            <div className="footer__contact">
              <h3>Contáctanos</h3>
              <ul>
                <li><i><FaLocationDot /></i><span>Calle Principal 123, Ciudad</span></li>
                <li><i><FaEnvelope /></i><span>info@tuempresa.com</span></li>
                <li><i><FaPhone /></i><span>+34 123 456 789</span></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} TuEmpresa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
