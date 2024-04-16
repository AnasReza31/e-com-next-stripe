"use client"

import Link from 'next/link'
import React from 'react'
import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import { useCart } from '../utils/useCart'

function NavBar() {

    const { cartCount } = useCart()

    return (
        <div className='bg-white p-2 justify-between flex'>
            <Link href={"/"} className='text-orange-500 font-bold text-3xl'> Dev Store </Link>
            <Link href="/cart" className='text-orange-500 px-4 py-2 font-bold hover:text-red-600 hover:cursor-pointer'>
                <ShoppingCartIcon className='w-7 h-7 inline-block' />Cart <span>({cartCount})</span>
            </Link>
        </div>
    )
}

export default NavBar

// Link component is used to make it work like SPA
// PROD => basically it will load all those links related js file with basic data in first time so when you route
// to any other page it will not hit server again and instead change route and inject  its content
// that's how using Link comp, it becomes SPA

// but if we use basic anchor tag, it will not load all other links related js file, it means if we route to
// any other page, it has to request to server to serve it's data
// and reload the page. this includes unnecessary load on server hit

// but in SPA, it will change the route and load only necessary js file of that route to inject
// its content into the body

// Dev => In SPA, all remains same, its just that it will not load all js files at once
// if we hit any route one time, it will load that page js file only and can be seen in n/w tab
// but if we hit it again, it will not make that call again and instead create next cache 

