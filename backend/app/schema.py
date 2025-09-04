from pydantic import BaseModel, HttpUrl
from typing import List, Optional

class ItemSchema(BaseModel):
    title: str
    quantity: int
    unit_price: float
    currency_id: str = "ARS"

class BackUrlsSchema(BaseModel):
    success: str = "http://localhost:3000/payment/success"
    failure: str = "http://localhost:3000/payment/failure"
    pending: str = "http://localhost:3000/payment/pending"


class MercadoPagoPreferenceSchema(BaseModel):
    items: List[ItemSchema]
    back_urls: BackUrlsSchema = BackUrlsSchema()
    auto_return: str = "approved"
    external_reference: Optional[str] = "pedido_12345"
    notification_url: Optional[str] = "https://www.google.com"




# # class PaymentRequest(BaseModel):
# #     paymentMethod: dict
# #     product: dict


# class PaymentRequest(BaseModel):
#     name: str
#     email: str
#     amount: int   # en centavos si es Stripe
#     product: str

class BillingDetails(BaseModel):
    name: str
    email: str

class Product(BaseModel):
    name: str
    amount: int  # en centavos

class PaymentRequest(BaseModel):
    product: Product
    billing_details: BillingDetails