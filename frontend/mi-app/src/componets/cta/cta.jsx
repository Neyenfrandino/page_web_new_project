import { useEffect, useRef, useState } from "react";
import Button from "../button/button";
import "./cta.scss";

const Cta = ({
  title = "¿Listo para empezar?",
  text = "Contáctanos hoy mismo para una consulta personalizada",
  buttonText = "Solicitar información",
  onClick,
}) => {
  const contentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Solo se activa una vez
        }
      },
      { threshold: 0.3 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <section className="cta">
      <div
        ref={contentRef}
        className={`cta-content ${isVisible ? "visible" : ""}`}
      >
        <h2>{title}</h2>
        <p>{text}</p>
        <Button text={buttonText} type="tertiary" onClick={onClick} />
      </div>
    </section>
  );
};

export default Cta;
