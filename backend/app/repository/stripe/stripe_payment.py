import stripe
import os
# from dotenv import load_dotenv
# # load_dotenv()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

def process_payment(payment: dict):
    """
    Crea un PaymentIntent y devuelve el client_secret
    """
    try:
        product = payment.get("product", {})
        billing = payment.get("billing_details", {})

        intent = stripe.PaymentIntent.create(
            amount=int(product.get("amount", 0)),  # ya en centavos
            currency="usd",
            automatic_payment_methods={"enabled": True},
            metadata={
                "name": billing.get("name"),
                "email": billing.get("email"),
                "product": product.get("name"),
            }
        )
        print("🚀 Intento de pago creado:", intent)
        return intent.client_secret
    except Exception as e:
        print("❌ Error en process_payment:", str(e))
        return None
