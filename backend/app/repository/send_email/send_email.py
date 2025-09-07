# app/repository/email/order_email_repository.py

import os
import requests
from dotenv import load_dotenv

load_dotenv()

EMAILJS_SERVICE_ID = os.getenv("EMAILJS_SERVICE_ID")
EMAILJS_TEMPLATE_ID = os.getenv("EMAILJS_TEMPLATE_ID")
EMAILJS_PUBLIC_KEY = os.getenv("EMAILJS_PUBLIC_KEY")
EMAILJS_API_URL = "https://api.emailjs.com/api/v1.0/email/send"

def send_order_email(order_data: dict):
    """
    Envía un email con los detalles de la orden usando EmailJS.
    `order_data` debe ser el diccionario completo del OrderSchema.
    """
    payload = {
        "service_id": EMAILJS_SERVICE_ID,
        "template_id": EMAILJS_TEMPLATE_ID,
        "user_id": EMAILJS_PUBLIC_KEY,
        "template_params": order_data
    }

    try:
        response = requests.post(EMAILJS_API_URL, json=payload)
        response.raise_for_status()
        return {"success": True, "message": "Orden enviada por email correctamente"}
    except requests.exceptions.RequestException as e:
        print("Error al enviar email de orden:", e)
        return {"success": False, "message": str(e)}
