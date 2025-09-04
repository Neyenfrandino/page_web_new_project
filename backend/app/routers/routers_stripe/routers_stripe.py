from fastapi import APIRouter, HTTPException
from app.repository.stripe.stripe_payment import process_payment
from app.schema import PaymentRequest  # Pydantic model

router = APIRouter(prefix='/stripe', tags=['Stripe'])

@router.post("/create-payment")
async def create_payment_route(payment: PaymentRequest):
    """
    Recibe un producto y billing_details y devuelve el clientSecret de Stripe
    """
    try:
        payment_dict = {
            "product": {
                "name": payment.product.name,
                "amount": payment.product.amount
            },
            "billing_details": payment.billing_details.dict()
        }

        print("🚀 Datos recibidos del frontend:", payment_dict)

        client_secret = process_payment(payment_dict)

        if not client_secret:
            raise HTTPException(status_code=400, detail="No se pudo crear PaymentIntent")

        return {"clientSecret": client_secret}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
