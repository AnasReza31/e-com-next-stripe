import React from 'react'
import Link from 'next/link'
import ProductCard from '../components/ProductCard'
import ShareBtn from '../components/ShareBtn'
import { getProducts } from '../services/productService'

// export const dynamic = "force-dynamic" // default is auto
// it shows the new product changes if done in DB and for that it will request server,
// so basically it will update static pages dynamically on runtime by hitting server and making it static again

// export const revalidate = 30
// it shows the new product changes if done in DB and for that it will request server every 30secs,
// so basically it will update static pages dynamically on runtime by hitting server and making it static again
// if we reload first time it will do cache invalidation and second reload update


const Page = async () => {
    const products = await getProducts(7)

    return (
        <div>
            {/* banner */}
            <div className='bg-gray-900 h-72'>
                <h1 className='text-white text-center text-5xl font-bold pt-20'>Indias most loved
                    <span className='text-orange-400'>fashion platform for
                        <span className='text-rose-500'> coders !</span>
                    </span>
                </h1>
            </div>

            {/* cards */}

            <div className='m-4 flex gap-2'>
                {products.data.length > 0 && products.data.map((item, idx) => {
                    return <ProductCard {...item} key={item?.id} index={idx} />
                })}
            </div>


            <Link href={"/products"} className="inline-block text-orange-400 p-4 font-bold">
                View All {">"}
            </Link>


            {/* <button onClick={handleAlert}>Click me</button> */}
            {/* <ShareBtn /> */}
        </div>
    )
}

export default Page

// by default all components are server side components
// how to verify? go to network tab browser, we will see that whatever page we hit
// it makes call to server and bring the document content in response itself which is SSR
// that's why default components are SSR


// SSR components are server side rendered and server doesn't understand interactive elements
// example onclick or window or alert such things because these are available to browser client side
// now to make component interactive, we make it client component by using "use client"
// now here just for one button if we add use client it will make the whole component as client side comp
// and by doing that it will increase the size and loading time of document
// best idea is we can make button as client side comp and keep it separate
// in that case page.js will be rendered as SSR but whatever we import inside that they will take
// their own type which can be client side comp

// SSR comp doc size suppose => 2.3kb size
// SSR comp doc when converted to client side increased to => 2.5kb size
// SSR comp doc when we created a client comp separately and imported in page.js => 2.3~2.4kb
// so that SSR comp will load as SSR and client side comp will load as client side respectively
// the on click handler that we will add to button will not come in the same doc content request
// instead it will come in a separate bundle file page.js which wasn't the case when comp was SSR
// because in SSR there's no interactivity/action to be performed so no js bundle file
// whereas in client side comp, we have button actions so js bundle file will also be called
// try and check in network tab

// whatever we console in SSR, it will be printed in server terminal
// whatever we console in client side comp, it will be printed both in server terminal and browser also
// Reason: react hydration
// first time when SSR comp loaded (pre-hydration mode)it loads the button but without interactivity
// i.e any onclick and window
// so first console log of button comp happened on server side in pre hydration mode
// now after hydration(i.e when skeleton content is served from server), bundle file which is containing
// interactive methods of button element(client side comp) will attach that event handler to button
// and thus button will re-render again followed by page re-rendering which we say post hydration mode.
// and thus browser level console will also be logged on re-rendering by bundler


// in env file NEXT_PUBLIC_ is added as prefix to expose key in public on client side