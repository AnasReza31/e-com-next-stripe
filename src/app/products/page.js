import React from 'react'
import ProductCard from '../../components/ProductCard'
import { getProducts } from '../../services/productService'

// it shows the new product changes if done in DB and for that it will request server every 30secs,
// so basically it will update static pages dynamically on runtime by hitting server and making it static again
// if we reload first time it will do cache invalidation and second reload update
// export const revalidate = 30

// export const dynamic = "force-dynamic" // default is auto
// so basically it will update static pages dynamically on runtime by hitting server and making it static again
// so basically it will over ride the SSG and make it SSR

const Products = async () => {

  const products = await getProducts(7)

  return (
    <div className="my-4 mx-12 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {products.data.length > 0 && products.data.map((item, idx) => {
        return <ProductCard {...item} key={item?.id} index={idx}/>
      })}
    </div>
  )
}

export default Products

// app is the entry point like homepage and whatever folder structure we create further
// routing goes like that
// src/app/page.js => http://localhost:3000
// so src/app/products/page.js => http://localhost:3000/products
// src/app/products/p1/page.js => http://localhost:3000/products/p1


// when prod build is served, next js create some pages as static and leave some pages for SSR
// eg here /cart                                180 B          91.2 kB
// ├ ○ /products                            180 B          91.2 kB        Static
//  λ /products/[...slug]                    5.42 kB        89.7 kB       SSR

// SSG has benefit of cdn caching which loads page lot faster

// SSG comes with one drawback, for any crud changes in DB will require a fresh build whereas SSR doesn't
// how to verify??
// Do npm run build and start next js/node js server with command npm run start
// now if we add any product in DB like stripe here, and hit that product url detail page, next js will look for that new
// product slug in slug page.js file in generateStaticParams method if it contains this slug or not
// if it doesn't find this slug, next js will automatically hit the server i.e stripe and try to fetch new product data 
// once received, it will build page at runtime and add in static files and 
// now if we reload page again, that call to stripe will not be seen again as this page is statically
// added by next js