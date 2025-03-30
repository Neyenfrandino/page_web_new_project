from fastapi import APIRouter, HTTPException
from app.repository.stripe.stripe_payment import  process_payment
from app.schema import PaymentRequest  # Este schema es el que definirá la estructura de la petición de pago

router = APIRouter(prefix='/stripe', tags=['Stripe'])

@router.post("/create-payment")
async def create_payment_route(payment: PaymentRequest):

    try:
        if not payment:
            raise HTTPException(status_code=400, detail="No se recibió información de pago")
        
        process_payment(payment)
 
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
