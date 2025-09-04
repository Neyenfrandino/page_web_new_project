// services/mercado_pago.js
const conect_mercado_pago_BE = {
  createPreference: async (itemData) => {
    console.log("🚀 Datos enviados a Mercado Pago:", itemData);

    try {
      const response = await fetch("http://localhost:8000/mercado_pago/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              title: itemData.item.title,
              quantity: 1,
              unit_price: Number(itemData.item.price),
              currency_id: itemData.item.currency || "ARS",
            },
          ],
          back_urls: {
            success: "https://www.google.com",
            failure: "https://www.google.com",
            pending: "https://www.google.com",
          },
          auto_return: "approved",
          external_reference: `pedido_${itemData.item.id || Date.now()}`,
          notification_url: "https://www.google.com",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Datos devueltos por el backend:", data);

      return data; // Aquí devuelves el JSON { success, data: { preference_id, init_point } }
    } catch (error) {
      console.error("❌ Error en createPreference:", error.message || error);
      return { success: false, error: error.message };
    }
  },
};

export default conect_mercado_pago_BE;
