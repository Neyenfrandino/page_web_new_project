const stripeConnectBE = async (paymentMethod) => {
    console.log('paymentMethod', paymentMethod);
  
    try {
        if (!paymentMethod || typeof paymentMethod !== "object") {
            throw new Error("Método de pago no válido");
        }

        const response = await fetch("http://localhost:8000/stripe/create-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentMethod), // ✅ Convierte el objeto en JSON válido
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al procesar el pago");
        }

        console.log("Respuesta del servidor:", response);
        return await response.json();
    } catch (error) {
        console.error("Error al procesar el pago:", error);
        return { success: false, error: error.message };
    }
}

export default stripeConnectBE;
