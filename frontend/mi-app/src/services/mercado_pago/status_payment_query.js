
const statusPaymentQuery = async ({ payment_id, status, external_reference }) => {
  try {
    const response = await fetch("http://localhost:8000/mercado_pago/payment-confirmation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payment_id, status, external_reference }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); 
      throw new Error(errorData.detail || `Error ${response.status}: No se pudo confirmar el pago`);
    }

    const data = await response.json();
    console.log("✅ Servidor actualizado:", data);
    return data;
  } catch (error) {
    console.error("❌ Error notificando al backend:", error.message);
    throw error; // Re-lanzar el error para manejarlo desde fuera si es necesario
  }
};

export default statusPaymentQuery;