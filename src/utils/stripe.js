import Stripe from "stripe";

export const stripe = Stripe(process.env.STRIPE_SK)