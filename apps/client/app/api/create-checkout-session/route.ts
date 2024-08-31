import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST() {
  try {
    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Assessment",
            },
            unit_amount: 2000, // $20.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      ui_mode: "embedded", // Specify embedded mode for Checkout
      return_url: `${process.env.NEXT_PUBLIC_URL}/create-wheel-of-life?session_id={CHECKOUT_SESSION_ID}`,
    });

    // Return the client secret to the client
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err: any) {
    // Handle any errors and return them to the client
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
