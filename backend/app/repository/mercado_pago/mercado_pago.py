import os
from fastapi import HTTPException
import mercadopago
from dotenv import load_dotenv

load_dotenv()

ACCESS_TOKEN = os.getenv("MERCADO_PAGO_ACCESS_TOKEN")
if not ACCESS_TOKEN:
    raise ValueError("El token de acceso de Mercado Pago (ACCESS_TOKEN) no está configurado.")

sdk = mercadopago.SDK(ACCESS_TOKEN)

def get_mercado_pago(preference):
    try:
        # 1️⃣ Convertir Pydantic model a dict
        preference_data = preference.model_dump()

        # 2️⃣ Validar items
        items = preference_data.get("items", [])
        if not items or not isinstance(items, list):
            raise HTTPException(status_code=400, detail="Debe enviar al menos un item válido")

        preference_data["items"] = [
            {
                "title": str(item.get("title", "Producto prueba")),
                "quantity": int(item.get("quantity", 1)),
                "unit_price": float(item.get("unit_price", 1.0)),
                "currency_id": str(item.get("currency_id", "ARS")),
            }
            for item in items
        ]

        # 3️⃣ Normalizar back_urls y notification_url a string
        back_urls = preference_data.get("back_urls", {})
        preference_data["back_urls"] = {
            "success": str(back_urls.get("success", "https://www.google.com")),
            "failure": str(back_urls.get("failure", "https://www.google.com")),
            "pending": str(back_urls.get("pending", "https://www.google.com")),
        }
        notification_url = preference_data.get("notification_url")
        if notification_url:
            preference_data["notification_url"] = str(notification_url)

        # 4️⃣ Validar URLs
        for key, url in preference_data["back_urls"].items():
            if not url.startswith("http"):
                raise HTTPException(
                    status_code=400,
                    detail=f"back_urls.{key} debe ser una URL completa con http/https"
                )
        if notification_url and not preference_data["notification_url"].startswith("http"):
            raise HTTPException(
                status_code=400,
                detail="notification_url debe ser una URL completa con http/https"
            )

        # 5️⃣ Defaults
        preference_data["auto_return"] = preference_data.get("auto_return", "approved")
        preference_data["external_reference"] = preference_data.get("external_reference", "pedido_12345")

        # 6️⃣ Crear preferencia en Mercado Pago
        try:
            response = sdk.preference().create(preference_data)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error creando preferencia en Mercado Pago: {str(e)}")

        # 7️⃣ Verificar init_point
        init_point = response.get("response", {}).get("init_point")
        if not init_point:
            raise HTTPException(
                status_code=500,
                detail=f"Mercado Pago no devolvió init_point: {response.get('response')}"
            )

        return {
            "preference_id": response["response"].get("id"),
            "init_point": init_point
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")
