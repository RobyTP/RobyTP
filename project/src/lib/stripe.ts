import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const createPaymentIntent = async (amount: number) => {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const data = await response.json();
    return data.clientSecret;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};