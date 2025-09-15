from pydantic import BaseModel, HttpUrl,BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime
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


class PaymentConfirmationSchema(BaseModel):
    payment_id: str
    status: str
    external_reference: str
    
class BillingDetails(BaseModel):
    name: str
    email: str

class Product(BaseModel):
    name: str
    amount: int  # en centavos

class PaymentRequest(BaseModel):
    product: Product
    billing_details: BillingDetails




# Producto dentro de la orden
class Producto(BaseModel):
    id_producto: str = Field(..., description="ID único del producto")
    nombre: str = Field(..., description="Nombre del producto")
    cantidad: int = Field(..., gt=0, description="Cantidad solicitada")
    precio_unitario: float = Field(..., gt=0, description="Precio por unidad")

# Datos principales de la orden
class OrderSchema(BaseModel):
    # Datos del cliente
    nombre: str = Field(..., min_length=2, max_length=50, description="Nombre completo del cliente")
    correo: EmailStr = Field(..., description="Correo electrónico del cliente")
    telefono: str = Field(..., min_length=7, max_length=15, description="Número de contacto")
    direccion: str = Field(..., min_length=5, max_length=100, description="Dirección completa")
    ciudad: str = Field(..., min_length=2, max_length=50, description="Ciudad de entrega")
    codigo_postal: str = Field(..., min_length=3, max_length=10, description="Código postal")
    pais: str = Field(..., min_length=2, max_length=50, description="País de entrega")

    # Datos del pedido
    pedido_id: str = Field(..., description="ID único de la orden")
    fecha_compra: datetime = Field(default_factory=datetime.utcnow, description="Fecha y hora de la compra")
    metodo_pago: str = Field(..., description="Método de pago utilizado")
    estado_pago: str = Field(..., pattern="^(pendiente|aprobado|fallido)$", description="Estado del pago")
    productos: List[Producto] = Field(..., description="Lista de productos comprados")

    # Datos opcionales
    notas: str = Field(default="", description="Notas o comentarios del cliente")
    origen_pedido: str = Field(default="web", description="Origen de la orden, ejemplo: web, app, tienda física")
    tracking_id: str = Field(default="", description="Código de seguimiento del envío")


