# app/routers/routers_order.py

from fastapi import APIRouter, HTTPException, status
from app.schema import OrderSchema
from app.repository.send_email.send_email import send_order_email

router = APIRouter(prefix="/order", tags=["Order"])

@router.post("/send_order_email", response_model=dict, status_code=status.HTTP_200_OK)
async def send_order_email_endpoint(order: OrderSchema):
    """
    API para recibir la orden desde el frontend y enviar un email con EmailJS.
    """
    try:
        result = send_order_email(order.dict())
        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["message"])
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al procesar la orden: {str(e)}"
        )
 