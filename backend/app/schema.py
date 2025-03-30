from pydantic import BaseModel
from typing import List

class ItemSchema(BaseModel):
    title: str
    quantity: int
    currency_id: str = 'ARS'  # ID de la moneda (Ej: "ARS", "USD")
    unit_price: float  # Precio unitario del producto

class BackUrlsSchema(BaseModel):
    success: str = 'https://www.youtube.com'  # URL de redirección en caso de éxito
    failure: str = 'https://www.youtube.com' # URL de redirección en caso de fallo
    pending: str = 'https://www.youtube.com' # URL de redirección si el pago queda pendiente

class MercadoPagoPreferenceSchema(BaseModel):
    items: List[ItemSchema]  # Lista de productos
    back_urls: BackUrlsSchema  # URLs de redirección
    auto_return: str = 'approved'  # Autorización para devolver el dinero


class PaymentRequest(BaseModel):
    paymentMethod: dict
    product: dict