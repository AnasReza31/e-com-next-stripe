"use client"

import { TrashIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useCart } from "../../utils/useCart"
import { handleCheckout } from "../../services/checkout-cart"
import toast, { Toaster } from 'react-hot-toast';
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Page = () => {

    const { cartCount, cartItems, cartTotal, addItem, deleteById, incrementCartItems, decrementCartItems, deleteAllItems } = useCart()

    const router = useRouter()

    useEffect(() => {
        const query = new URLSearchParams(window.location.search)
        if (query.get('success')) {
            toast.success("Order placed! You'll receive an email confirmation");
            //  once order placed delete cart
            deleteAllItems()
        }
        if (query.get('canceled')) {
            toast.error("Order canceled! continue to shop around and checkout when you're ready");
        }
    }, [])

    const cartCheckout = async () => {
        try {
            // this body format is as per documentation in stripe checkout 
            const body = cartItems.map((product) => {
                return {
                    price: product.price_id,
                    quantity: product.quantity
                }
            })
            const url = await handleCheckout(body)
            router.push(url)
            console.log(url, "return url");
        } catch (err) {
            console.log(err, "error")
            toast.error(`checkout failed`);
        }
    }

    return (
        <div className='m-5 px-20'>
            {cartCount > 0 ? (
                <>
                    <h2 className='text-4xl font-semibold'> Cart Items: {cartCount}</h2>
                    <button className='text-orange-400 mt-2 font-bold hover:cursor-pointer hover:text-red-600'>Clear All
                        <TrashIcon className="inline-block w-4 h-4" onClick={deleteAllItems} />
                    </button>
                </>
            ) : (
                <>
                    <h2 className="text-4xl font-semibold">
                        Your cart is empty
                    </h2>
                    <Link href={"/products"} className="text-xl mt-1 text-orange-500 underline">Shop here</Link>
                </>
            )}

            {
                cartCount > 0 && (
                    <div>
                        {cartItems && cartItems.length > 0 &&
                            cartItems.map((product) => {
                                return (
                                    <div key={product.id} className="flex justify-between border rounded-md p-4 my-2 bg-white hover:shadow-lg">
                                        <Link href={`/products/${product.id}`} className="flex items-center">
                                            <Image src={`/images/${product.image}`} alt={product.name} width={80} height={80} className="w-20 h-auto" />
                                            <p className="font-semibold text-xl ml-2">{product.name}</p>
                                        </Link>

                                        <div className="flex items-center gap-5">
                                            <div className="flex items-center gap-3">
                                                <button disabled={product.quantity == 1} className="p-1 rounded-md text-orange-500 hover:bg-orange-500 hover:text-white disabled:cursor-not-allowed">
                                                    <MinusIcon className="w-6 h-6" onClick={() => decrementCartItems(product.id)} />
                                                </button>
                                                <p className="font-semibold text-xl">{product.quantity}</p>
                                                <button className="p-1 rounded-md text-orange-500 hover:bg-orange-500 hover:text-white disabled:cursor-not-allowed">
                                                    <PlusIcon className="w-6 h-6" onClick={() => incrementCartItems(product.id)} />
                                                </button>
                                            </div>

                                            <p>
                                                x <span className="font-semibold text-xl">{product.price / 100}</span>
                                            </p>

                                            <button className="text-orange-500 hover:text-red-600">
                                                <XCircleIcon className="w-6 h-6" onClick={() => deleteById(product.id)} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }

                        <div className="flex flex-col items-end border-t py-4 mt-8">
                            <p className="text-xl">
                                Total <span className="font-bold text-green-500">{cartTotal}</span>
                            </p>
                            <button onClick={cartCheckout} className="mt-4 py-2 px-6 bg-orange-500 text-white hover:bg-red-600 rounded-md">
                                Checkout
                            </button>
                        </div>
                    </div>
                )
            }
            <Toaster />
        </div>
    )
}

export default Page
