import React, { useContext, useEffect, useState } from "react"
import { ProductCtx } from "../components/Provider"

export const useCart = () => {

    const { cartItems, setCartItems } = useContext(ProductCtx)
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    // update cart count and price whenever cartItem changes
    useEffect(() => {
        setCartCount(cartItems.length)
        findTotalPrice()
        populateCartItems()
    }, [cartItems])

    const populateCartItems = () => {
        // if items are in localstorage but not in context(happens when refresh page since context data is reset)
        if (cartItems.length === 0) {
            const products = localStorage.getItem("products")
            if (products) {
                setCartItems(JSON.parse(products))
            }
        }
    }

    const findTotalPrice = () => {
        let amt = 0;
        const p = cartItems.forEach(product => {
            amt += product.price / 100 * product.quantity
        })
        setCartTotal(amt)
    }

    const addItem = (product) => {
        const existingProductIndex = cartItems.findIndex(item => item.id === product.id)
        const updatedCart = [...cartItems]
        // if product exist in cart, increase quantity
        if (existingProductIndex != -1) {
            updatedCart[existingProductIndex].quantity += 1
        } else {
            updatedCart.push({ ...product, quantity: 1 })
        }
        localStorage.setItem("products", JSON.stringify(updatedCart))
        setCartItems(updatedCart)

        // else add item
    }

    const deleteById = (productId) => {
        const newProducts = cartItems.filter(product => product.id !== productId)
        setCartItems(newProducts)
        if (newProducts.length === 0) {
            localStorage.removeItem("products")
        } else {
            localStorage.setItem("products", JSON.stringify(newProducts))
        }
    }

    const deleteAllItems = () => {
        localStorage.removeItem("products")
        setCartItems([])
    }

    const incrementCartItems = (productId) => {
        const newProducts = cartItems.map(item => {
            if (item.id === productId) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            } else return item
        })
        localStorage.setItem("products", JSON.stringify(newProducts))
        setCartItems(newProducts)
    }

    const decrementCartItems = (productId) => {
        const newProducts = cartItems.map(item => {
            if (item.id === productId && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            } else return item
        })
        localStorage.setItem("products", JSON.stringify(newProducts))
        setCartItems(newProducts)
    }

    return { cartCount, cartTotal, cartItems, addItem, deleteById, deleteAllItems, incrementCartItems, decrementCartItems }
}