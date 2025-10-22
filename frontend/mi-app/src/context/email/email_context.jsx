import React, { createContext, useCallback } from "react";
import emailjs from "@emailjs/browser";

export const EmailContext = createContext({
  sendEmail: () => {},
});

export const EmailProvider = ({ children }) => {
  const sendEmail = useCallback(async (emailData) => {
    console.log("📧 Enviando email con EmailJS:", emailData);
    try {

      // ✅ Enviar el correo usando EmailJS
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,   // tu service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,  // tu template ID
        emailData,                                 // datos dinámicos del template
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY    // tu public key
      );

      console.log("✅ Email enviado con éxito:", response);
      return { success: true, response };

    } catch (err) {
      console.error("❌ Error enviando email con EmailJS:", err);
      return { success: false, error: err };
    }
  }, []);

  return (
    <EmailContext.Provider value={{ sendEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

