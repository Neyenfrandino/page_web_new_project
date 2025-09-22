// 📂 context/email/email.context.jsx
import React, { createContext, useCallback } from "react";
import sendEmailService from "../../services/email_services/email_services";

export const EmailContext = createContext({
  sendEmail: () => {},
});

export const EmailProvider = ({ children }) => {
  const sendEmail = useCallback(async (emailData) => {
    try {
      console.log("📧 Enviando email:", emailData);
      const response = await sendEmailService(emailData);
      console.log("✅ Respuesta del servicio de email:", response);
      return response;
  
    } catch (err) {
      console.error("❌ Error enviando email:", err);
      return { success: false, error: err };
    }
  }, []);



  return (
    <EmailContext.Provider value={{ sendEmail }}>
      {children}
    </EmailContext.Provider>
  );
};
