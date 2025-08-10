import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!STRIPE_PUBLIC_KEY) {
  console.error("🚨 La clave pública de Stripe no está definida. Verifica tu archivo .env");
}
console.log("🚀 Stripe public key:", STRIPE_PUBLIC_KEY);
export const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
