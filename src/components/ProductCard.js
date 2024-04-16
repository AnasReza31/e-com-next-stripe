import Image from 'next/image'
import Link from 'next/link'

const ProductCard = (props) => {
    const { name, description, images, id, default_price, index } = props
    return (
        <Link href={`/products/${id}`} className="w-full sm:w-64 h-62 rounded border border-gray-200 hover:cursor-pointer hover:shadow-xl">
            <Image alt={name} priority={index === 0} src={images[0]} width={160} height={160} className='w-full h-40' />
            <div className='flex justify-between p-2'>
                <div>
                    <h1 className='font-bold'>{name}</h1>
                    <p className='w-40 truncate'>{description}</p>
                </div>
                <div className='text-green-500 py-2 font-bold'>
                    ₹ {default_price.unit_amount / 100}
                </div>
            </div>
        </Link>
    )
}

export default ProductCard
