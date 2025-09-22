import { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { MethodStatePaymentContext } from '../../../context/method_state_payment/method_state_payment.context.jsx';
import { ContextJsonLoadContext } from '../../../context/context_json_load/context_json_load.jsx';
import './cta_img_cuenta_rgresiva.scss';

const DOMAIN = import.meta.env.VITE_API_URL;

const CtaImgCuentaRgresiva = ({
  img,
  titles = { main: '', subtitle: "¿Ya tienes una cuenta?" },
  text = "Accede a tu cuenta para ver tus productos y servicios.",
  buttonText = "Inscríbete",
  timer = { targetDate: null },
  id = "curso-certificado-diseno-permacultura"
}) => {
  const { setMethodStatePayment } = useContext(MethodStatePaymentContext);
  const { eventos } = useContext(ContextJsonLoadContext);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // --- ⏳ Calcular tiempo restante del contador
  useEffect(() => {
    if (!timer?.targetDate) return;

    const calculateTimeLeft = () => {
      const difference = new Date(timer.targetDate) - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [timer?.targetDate]);

  const formatTime = (time) => time.toString().padStart(2, '0');

  // --- 🔹 Memorizar el evento filtrado
  const filterItem = useMemo(() => {
    if (!Array.isArray(eventos) || !id) return null;
    return eventos.find((evento) => evento.id === id) || null;
  }, [eventos, id]);

  // --- 🔹 Manejo de la acción principal
  const handlePrimaryAction = useCallback(
    (e) => {
      e.stopPropagation();

      if (!filterItem) {
        console.warn("⚠️ No se encontró el evento con el id proporcionado.");
        return;
      }

      const normalizedItem = {
        id: filterItem.id,
        title: filterItem.title,
        subtitle: filterItem.subtitle || filterItem.description,
        image: filterItem.image,
        badge: filterItem.badge || '',
        icon: filterItem.icon || (filterItem.type === 'service' ? '🌱' : ''),
        category: filterItem.category || '',
        price: filterItem.price,
        currency: filterItem.currency || 'USD',
        content: filterItem.content || '',
        originalData: filterItem,
        itemType: filterItem.type,
        originalPrice: filterItem.originalPrice || filterItem.price,
      };

      // Guardar en contexto para flujo de pago
      setMethodStatePayment({ normalizedItem });
      console.log("🚀 Normalized Item enviado al contexto:", normalizedItem);
    },
    [filterItem, setMethodStatePayment]
  );

  // --- Determinar la URL final de la imagen
  const finalImageUrl = useMemo(() => {
    if (!img) return null;
    return img.startsWith('http') ? img : `${DOMAIN}${img}`;
  }, [img]);

  return (
    <div className="cta-cuenta-regresiva__container">
      <div className="cta-cuenta-regresiva__content">
        {titles.main && (
          <div className="cta-cuenta-regresiva__titles">
            <h2>{titles.main}</h2>
          </div>
        )}

        <div className="cta-cuenta-regresiva__image">
          {finalImageUrl && (
            <img
              src={finalImageUrl}
              alt="Cuenta Regresiva"
              className="cta-cuenta-regresiva__img"
            />
          )}

          <div className="cta-cuenta-regresiva__content-text">
            {/* --- ⏳ Contador */}
            <div className="cta-cuenta-regresiva__timer">
              <div className="timer-content">
                <div className="timer-unit">
                  <span className="timer-number">{formatTime(timeLeft.days)}</span>
                  <span className="timer-label">Días</span>
                </div>
                <span className="timer-separator">:</span>
                <div className="timer-unit">
                  <span className="timer-number">{formatTime(timeLeft.hours)}</span>
                  <span className="timer-label">Horas</span>
                </div>
                <span className="timer-separator">:</span>
                <div className="timer-unit">
                  <span className="timer-number">{formatTime(timeLeft.minutes)}</span>
                  <span className="timer-label">Min</span>
                </div>
                <span className="timer-separator">:</span>
                <div className="timer-unit">
                  <span className="timer-number">{formatTime(timeLeft.seconds)}</span>
                  <span className="timer-label">Seg</span>
                </div>
              </div>
            </div>

            {/* --- 📄 Texto + Botón */}
            <div className="cta-cuenta-regresiva__text-section">
              <h2>{titles.subtitle}</h2>
              <p>{text}</p>
              <button
                onClick={handlePrimaryAction}
                className="cta-cuenta-regresiva__link"
                disabled={!filterItem}
              >
                <span>{buttonText}</span>
              </button>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaImgCuentaRgresiva;
