from fastapi import APIRouter, HTTPException
from app.repository.mercado_pago.mercado_pago import get_mercado_pago
from app.schema import MercadoPagoPreferenceSchema, PaymentConfirmationSchema
import requests
import os
from dotenv import load_dotenv


load_dotenv()
ACCESS_TOKEN = os.getenv("MERCADO_PAGO_ACCESS_TOKEN")
if not ACCESS_TOKEN:
    raise ValueError("El token de acceso de Mercado Pago (ACCESS_TOKEN) no está configurado.")

router = APIRouter(prefix='/mercado_pago', tags=['Mercado_Pago'])


@router.post('/create-preference')
async def create_preference(preference_schema: MercadoPagoPreferenceSchema):
    """
    Crea una preferencia de pago en Mercado Pago y devuelve el init_point.
    """
    try:
        response = get_mercado_pago(preference_schema)
        return {"success": True, "data": response}
    except HTTPException as e:
        # Devuelve errores controlados (400, 500, etc.)
        raise e
    except Exception as e:
        # Devuelve error genérico
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")



@router.post("/payment-confirmation")
async def payment_confirmation(data: PaymentConfirmationSchema):
    """
    Confirmación del pago después de que Mercado Pago redirige al usuario.
    """
    try:
        # 1️⃣ Obtener información completa del pago desde Mercado Pago
        MP_ACCESS_TOKEN = ACCESS_TOKEN
        url = f"https://api.mercadopago.com/v1/payments/{data.payment_id}"
        headers = {"Authorization": f"Bearer {MP_ACCESS_TOKEN}"}

        response = requests.get(url, headers=headers)
        payment_info = response.json()

        print("📌 Información de pago:", payment_info)

        if payment_info.get("status") != "approved":
            raise HTTPException(status_code=400, detail="El pago no fue aprobado")

        # 2️⃣ Aquí actualizas tu base de datos
        # ejemplo:
        # db.update_order(data.external_reference, status="paid")

        # 3️⃣ Enviar email de confirmación
        # send_email_to_user(payment_info["payer"]["email"])

        return {"success": True, "message": "Pago confirmado y base de datos actualizada"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error procesando confirmación: {str(e)}")