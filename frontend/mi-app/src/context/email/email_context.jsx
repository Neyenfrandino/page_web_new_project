// 📂 context/email/email.context.jsx
import React, { createContext, useCallback } from "react";

export const EmailContext = createContext({
  sendEmail: () => {},
});

export const EmailProvider = ({ children }) => {
  const sendEmail = useCallback(async (emailData) => {
    try {
      console.log("📧 Enviando email:", emailData);
  
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
