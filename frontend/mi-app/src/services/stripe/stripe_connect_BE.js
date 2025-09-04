const stripeConnectBE = async (requestData) => {
  console.log("🚀 Enviando datos al backend:", requestData);

  try {
    const response = await fetch("http://localhost:8000/stripe/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData), // solo enviamos el producto
    });

    const data = await response.json();
    console.log("✅ Respuesta del backend:", data);

    if (!response.ok) {
      throw new Error(data.detail || data.message || "Error en backend");
    }

    if (!data.clientSecret) {
      throw new Error("El backend no devolvió clientSecret");
    }

    // Retornamos solo lo necesario para el frontend
    return { clientSecret: data.clientSecret };
  } catch (err) {
    console.error("❌ Error en stripeConnectBE:", err.message || JSON.stringify(err));
    return { success: false, error: err.message || JSON.stringify(err) };
  }
};

export default stripeConnectBE;
