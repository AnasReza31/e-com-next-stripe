import { CheckIcon } from "@heroicons/react/24/solid"
import ShareBtn from "../../../components/ShareBtn"
import AddToCart from "../../../components/AddToCart"
import { getProductById, getProducts } from "../../../services/productService"
import Image from "next/image"
import { notFound } from "next/navigation"

// it shows the new product changes if done in DB and for that it will request server,
// so basically it will update static pages dynamically on runtime by hitting server and making it static again by saving the cache
// export const dynamic = "force-dynamic" // default is auto

// it shows the new product changes if done in DB and for that it will request server every 30secs,
// so basically it will update static pages dynamically on runtime by hitting server and making it static again by saving the cache
// if we reload first time it will do cache invalidation and second reload update
// export const revalidate = 30

// dynamicParams make sure that if any new dynamic path is hit, it will hit that path to server to fetch details
// at runtime and then make it static page again by saving the cache. this code is default added by next js whenever it find a 
// new dynamic param so we need not to add it manually.
// this logic is incremental static regenerate i.e ISR
export const dynamicParams = true

// dynamicParams has 2 demerits:
// 1 . if we update data of any product, it will not get updated
// 2. this new product will also not be visible in all products page since it was built static page

// this is a server side page because it's based on dynamic url which ever product we hit
// it will bring the data at that moment only. Next Js doesn't know in advance which id will be there
// or which product will be clicked but unlike product listing page it knows which api to be called and 
// provides all data at once and then will create listing page as SSG at build time


// can we make this product detail page also SSG ??
// yes by knowing all id we can build all detail pages by making api call at build time only,
// thus we dont need node server at run time to build this page
// so if we can have all products data and by doing map, we can use each product id and can build
// static pages using that id at build time, so here we go below:
// Note we can remove below function and it will be SSR page again.

export async function generateStaticParams() {
    const products = await getProducts(7)
    const slugs = products.data.map(item => ({ slug: item.id }))
    return slugs
    // as we return slugs here, each slug will be passed to generateMetadata and ProductDetail
    // at build time which will create static pages at build time itself.
    // try npm run build and see the results
}

// this is a meta data generator function which can be used in server side comp to 
// generate meta data by using props received in this component
export async function generateMetadata({ params: { slug } }) {
    const product = await getProductById(slug)
    if (!product) notFound()

    return {
        title: `${product?.name}`,
        description: `${product?.description}`
    }
}

const ProductDetail = async ({ params: { slug } }) => {
    const product = await getProductById(slug)

    // Only plain objects can be passed to Client Components from Server Components. 
    // Classes or other objects with methods are not supported.
    const clientProduct = {
        name: product.name,
        description: product.description,
        id: product.id,
        price: product.default_price.unit_amount,
        price_id: product.default_price.id,
        currency: 'INR',
        image: product.images[0]
    }


    return (
        <div className='m-2 px-20'>
            <div className='flex justify-around items-center flex-wrap'>
                <div className='w-80 h-80'>
                    <Image src={product?.images[0]} width={320} height={320} priority className='w-full h-auto' />
                </div>
                <div className='flex-1 max-w-md border rounded-md shadow-lg p-6 bg-white'>
                    <h2 className='text-3xl font-semibold'>{product?.name}</h2>
                    <div className='flex pt-2 gap-2'>
                        <CheckIcon className="text-lime-500 w-5 h-5" />
                        <span className="font-semibold">In Stock</span> |
                        <ShareBtn />
                    </div>
                    <div className="mt-4 pt-4">
                        <p className="text-gray-500">Price: </p>
                        <p className="text-xl font-semibold">₹ {product?.default_price?.unit_amount / 100} </p>
                    </div>
                    <AddToCart product={clientProduct} />
                </div>
            </div>
            <p className="mt-8 text-2xl">
                {product?.description}
            </p>
        </div>
    )
}

export default ProductDetail


// a normal js file like page.js is a SSG and anything like dynamic routes are SSR.

// if we add force-dynamic in normal page.js static file just for testing purpose, it wl build that also dynamic and not SSG
// so we only use this when we're creating static pages of dynamic route.

// force-dynamic or revalidate timer we only use when there's a dynamic route which is created as SSG by using getStaticParam
// so that we can update static pages even after its built
