# app/repository/email/order_email_repository.py

import os
import requests
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

EMAILJS_SERVICE_ID = os.getenv("EMAILJS_SERVICE_ID")
EMAILJS_TEMPLATE_ID = os.getenv("EMAILJS_TEMPLATE_ID")
EMAILJS_PUBLIC_KEY = os.getenv("EMAILJS_PUBLIC_KEY")
EMAILJS_API_URL = "https://api.emailjs.com/api/v1.0/email/send"


def send_order_email(order_data: dict):
    """
    Envía un email con los detalles de la orden usando EmailJS.
    `order_data` debe ser un diccionario basado en el esquema OrderSchema.
    """

    # ✅ 1. Validar variables de entorno antes de continuar
    missing_vars = [
        var for var, value in {
            "EMAILJS_SERVICE_ID": EMAILJS_SERVICE_ID,
            "EMAILJS_TEMPLATE_ID": EMAILJS_TEMPLATE_ID,
            "EMAILJS_PUBLIC_KEY": EMAILJS_PUBLIC_KEY,
        }.items() if not value
    ]
    
    if missing_vars:
        error_message = f"Variables de entorno faltantes: {', '.join(missing_vars)}"
        print("❌", error_message)
        return {"success": False, "message": error_message}

    # ✅ 2. Construir el payload
    payload = {
        "service_id": EMAILJS_SERVICE_ID,
        "template_id": EMAILJS_TEMPLATE_ID,
        "user_id": EMAILJS_PUBLIC_KEY,
        "template_params": order_data
    }

    try:
        # ✅ 3. Hacer la petición POST a EmailJS
        response = requests.post(EMAILJS_API_URL, json=payload, timeout=10)

        # ✅ 4. Validar respuesta
        if response.status_code != 200:
            print("❌ Error de EmailJS:", response.text)
            return {
                "success": False,
                "message": f"Error en EmailJS: {response.status_code}",
                "details": response.text
            }

        print("✅ Orden enviada por email correctamente:", response.json())
        return {
            "success": True,
            "message": "Orden enviada por email correctamente",
            "emailjs_response": response.json()
        }

    except requests.exceptions.Timeout:
        return {
            "success": False,
            "message": "Tiempo de espera agotado al intentar enviar el correo."
        }

    except requests.exceptions.RequestException as e:
        print("❌ Error al enviar email de orden:", str(e))
        return {
            "success": False,
            "message": "Error de conexión al enviar email",
            "error": str(e)
        }
