import os
import dotenv
import stripe
import stripe.error

# Cargar variables de entorno
dotenv.load_dotenv()
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY", "")

# Verificar si la clave secreta de Stripe está configurada correctamente
if not STRIPE_SECRET_KEY:
    raise ValueError("La clave secreta de Stripe no está configurada correctamente.")

stripe.api_key = STRIPE_SECRET_KEY


def create_payment_method() -> str:
    #     """Crea un método de pago de prueba con un token de tarjeta de crédito."""
    try:
        method_payment = stripe.PaymentMethod.create(
            type='card',
            card={'token': 'tok_visa'}  # Token de prueba de Stripe
        )
        print(f"Método de pago creado con ID: {method_payment.id}")
        return method_payment.id
    except stripe.error.StripeError as e:
        print(f"Error al crear el método de pago: {e.user_message}")
        return None


def create_user(payment_request):
    
    name = payment_request["billing_details"].get("name", "Cliente Desconocido")
    email = payment_request["billing_details"].get("email", None)

    try:
        # Verifica si billing_details está presente
        if "billing_details" not in payment_request:
            print("❌ Error: No se encontró 'billing_details' en la solicitud")
            return None


        if not email or not name:
            print("⚠️ Advertencia: Email no proporcionado, usando uno por defecto.")
            return {"success": False, "message": "Falta información de pago"}
        
        user_exists = get_or_create_customer(email, name)
        if user_exists:
            return user_exists.id

        user = stripe.Customer.create(
            email=email,
            name=name
        )

        print(f"🔵 Creando usuario con Nombre: {name}, Email: {email}")
        print(f"✅ Usuario creado con ID: {user.id}")
        return user.id

    except stripe.error.StripeError as e:
        print(f"❌ Error de Stripe: {e.user_message}")
        return None

    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return None

def add_payment_method_to_user(client_id: str, payment_method_id: str):
#     """Asocia un método de pago a un usuario en Stripe."""
    if not client_id or not payment_method_id:
        print("Error: Cliente o método de pago no válidos.")
        return
    
    try:
        stripe.PaymentMethod.attach(payment_method_id, customer=client_id)
        print(f"Método de pago {payment_method_id} asociado al usuario {client_id}.")
    except stripe.error.StripeError as e:
        print(f"Error al asociar el método de pago: {e.user_message}")

def create_payment(amount: int, client_id: str, payment_method_id: str):
    """Crea un pago en Stripe."""
    if not client_id or not payment_method_id:
        print("Error: Cliente o método de pago no válidos.")
        return None
    
    try:
        payment = stripe.PaymentIntent.create(
            amount=int(amount * 100),  # Convertir a centavos
            currency='usd',
            customer=client_id,
            payment_method=payment_method_id,
            payment_method_types=['card'],
            confirm=True,
        )
        print(f"Pago creado con ID: {payment.id}")
        return payment.id
    except stripe.error.CardError as e:
        print(f"Error en la tarjeta: {e.user_message}")
        return None
    except stripe.error.StripeError as e:
        print(f"Error en el pago: {e.user_message}")
        return None

def get_or_create_customer(email, name):
    # Buscar un cliente con el correo electrónico proporcionado
    customers = stripe.Customer.list(email=email)

    # Si ya existe un cliente con ese correo, lo retornamos
    if customers.data:
        return customers.data[0]  # Retorna el primer cliente encontrado

    # Si no existe, creamos un nuevo cliente
    customer = stripe.Customer.create(
        email=email,
        name=name
    )
    return customer

# # Ejecución de flujo completo
def process_payment(payment):
    payment_request = payment.paymentMethod
    products = payment.product
    
    payment_method_id = create_payment_method()
    if not payment_method_id:
        print("No se pudo crear el método de pago. Proceso detenido.")
        return
    

    client_id = create_user(payment_request)
    if not client_id:
        print("No se pudo crear el usuario. Proceso detenido.")
        return

    add_payment_method_to_user(client_id, payment_method_id)


    payment_id = create_payment(products['amount'], client_id=client_id, payment_method_id=payment_method_id)
    
    if payment_id:
        print(f"Pago exitoso con ID: {payment_id}")
    else:
        print("El pago no pudo completarse.")
    