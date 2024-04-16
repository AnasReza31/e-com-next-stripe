import { stripe } from "../utils/stripe"

export const getProducts = async (limit) => {
    let products = null
    try {
        products = await stripe.products.list({
            limit: limit || 5,
            expand: ['data.default_price']
        })
        return products
    } catch(err) {
        console.log("Error from Stripe:", err);
    }
    return products
}

export const getProductById = async (productId) => {
    let product = null
    try {
        product = await stripe.products.retrieve(productId, {
            expand: ['default_price']
        })
        return product
    } catch(err) {
        console.log("Error from Stripe:", err);
    }
    return product
}