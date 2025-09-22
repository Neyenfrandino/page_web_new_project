
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

const sendEmail = async (formState) => {
    console.log("🚀 Enviando email:", formState);

    try {
        const response = await fetch(`${API_URL}/order/send_order_email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formState),
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Datos devueltos por el backend:", data);

        return data; // Aquí devuelves el JSON { success, data: { preference_id, init_point } }
    } catch (error) {
        console.error("❌ Error en sendEmail:", error.message || error);
        return { success: false, error: error.message };
    }
};  

export default sendEmail;
 