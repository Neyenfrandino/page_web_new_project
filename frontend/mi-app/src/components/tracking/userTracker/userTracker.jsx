import { useEffect, useState } from "react";

import "./userTracker.scss";

const UserTracker = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(
    localStorage.getItem("cookiesAccepted") === "true"
  );

  console.log("cookiesAccepted:", cookiesAccepted);

  useEffect(() => {
    if (!cookiesAccepted) return;

    const startTime = Date.now();

    // Geolocalización por IP
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((ipData) => {
        const userData = {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          language: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
          connection: navigator.connection?.effectiveType || "unknown",
          location: {
            city: ipData.city,
            region: ipData.region,
            country: ipData.country_name,
            ip: ipData.ip,
          },
          referrer: document.referrer, // Página de referencia
          url: window.location.href,
          historyLength: history.length,
          timestamp: new Date().toISOString(),
        };

        console.log("Datos recolectados:", userData);

        // Podés enviar esto a tu backend
        /*
        fetch("https://tuservidor.com/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        */

        // Medir tiempo en la página
        window.addEventListener("beforeunload", () => {
          const timeSpent = Date.now() - startTime;
          console.log(`Tiempo en página: ${timeSpent / 1000} segundos`);
        });

        // Actividad fuera de línea
        window.addEventListener("blur", () => {
          console.log("Usuario ha dejado la página.");
        });

        // Medir la tasa de conversión (ejemplo de evento de formulario)
        const form = document.querySelector("form");
        if (form) {
          form.addEventListener("submit", (e) => {
            console.log("Formulario enviado.");
            // Aquí podrías registrar el evento de conversión
          });
        }

        // Visitas recurrentes
        const visitCount = parseInt(localStorage.getItem("visitCount") || "0");
        localStorage.setItem("visitCount", (visitCount + 1).toString());
        console.log(`Número de visitas: ${visitCount + 1}`);

        // Eventos personalizados (ejemplo: cuántas veces se reproduce un video)
        const videoElement = document.querySelector("video");
        if (videoElement) {
          videoElement.addEventListener("play", () => {
            console.log("Video reproducido.");
            // Aquí podrías registrar el evento de reproducción del video
          });
        }
      });
  }, [cookiesAccepted]);

  const acceptCookies = () => {
    setCookiesAccepted(true);
    localStorage.setItem("cookiesAccepted", "true");
  };

  if (cookiesAccepted) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <div className="cookie-icon">
          {/* Aquí agregamos el ícono SVG proporcionado */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50" height="50">
            <path d="M257.5 27.6c-.8-5.4-4.9-9.8-10.3-10.6c-22.1-3.1-44.6 .9-64.4 11.4l-74 39.5C89.1 78.4 73.2 94.9 63.4 115L26.7 190.6c-9.8 20.1-13 42.9-9.1 64.9l14.5 82.8c3.9 22.1 14.6 42.3 30.7 57.9l60.3 58.4c16.1 15.6 36.6 25.6 58.7 28.7l83 11.7c22.1 3.1 44.6-.9 64.4-11.4l74-39.5c19.7-10.5 35.6-27 45.4-47.2l36.7-75.5c9.8-20.1 13-42.9 9.1-64.9c-.9-5.3-5.3-9.3-10.6-10.1c-51.5-8.2-92.8-47.1-104.5-97.4c-1.8-7.6-8-13.4-15.7-14.6c-54.6-8.7-97.7-52-106.2-106.8zM208 144a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM144 336a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm224-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
          </svg>
        </div>
        <p>
          Usamos cookies para mejorar tu experiencia. Al continuar, aceptás su
          uso.{" "}
          <a href="/politicas-de-cookies" className="cookie-link">
            Más información
          </a>
        </p>
        <button onClick={acceptCookies} className="cookie-button">
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default UserTracker;
