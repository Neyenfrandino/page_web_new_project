const conect_mercado_pago_BE = async (preferenceData) => {
    console.log("Datos enviados a la API:", preferenceData);
    try {
        const response = await fetch('http://localhost:8000/mercado_pago/create-preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(preferenceData),
        });

        if (response.ok) {
            const data = await response.json(); // Obtener los datos JSON de la respuesta

            console.log(data); // Verifica la respuesta para confirmar la clave correcta

            // Suponiendo que la respuesta tiene un campo 'preference_id'
            return data['preference_id'];
        } else {
            console.error("Error al crear la preferencia", response.status);
            return null; // Retorna null si hubo un error en la respuesta
        }
    } catch (error) {
        console.error("Error al conectar con el backend", error);
        return null; // Retorna null si ocurre un error en la petición
    }
};

export default conect_mercado_pago_BE;
