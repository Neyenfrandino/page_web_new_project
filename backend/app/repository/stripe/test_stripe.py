from stripe_payment import process_payment

# Simulación de pago de prueba
fake_payment = {
    "paymentMethod": {
        "billing_details": {
            "name": "Juan Perez",
            "email": "juan@example.com"
        }
    },
    "product": {
        "amount": 19.99  # USD
    }
}

if __name__ == "__main__":
    process_payment(fake_payment)
