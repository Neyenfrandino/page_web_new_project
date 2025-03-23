import mercadopago
import os
from fastapi import HTTPException

# ACCESS_TOKEN = os.getenv("ACCESS_TOKEN", "")  # Si deseas usar variables de entorno
ACCESS_TOKEN = 'APP_USR-8714967665340941-032206-2022354acb93ae44756ff78d44452335-288716343'

# Asegúrate de imprimir el token correctamente
print(ACCESS_TOKEN, 'aaaa')

if not ACCESS_TOKEN:
    raise ValueError("El token de acceso de Mercado Pago (ACCESS_TOKEN) no está configurado.")

sdk = mercadopago.SDK(ACCESS_TOKEN)

def get_mercado_pago(preference):
    try:
        # Usar model_dump() en Pydantic 2.x
        preference_data = preference.model_dump()  # Si usas Pydantic 2.x
        # Si usas una versión anterior de Pydantic, utiliza preference.dict()
        # preference_data = preference.dict()  # Para Pydantic 1.x

        preference_response = sdk.preference().create(preference_data)

        if preference_response.get("status") == 201 and "response" in preference_response:
            print(preference_response)
            return {"preference_id": preference_response["response"].get("id", "ID no disponible")}
        
        error_detail = preference_response.get("response", {}).get("message", "Error desconocido")
        raise HTTPException(status_code=400, detail=f"Error al crear la preferencia: {error_detail}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {str(e)}")
