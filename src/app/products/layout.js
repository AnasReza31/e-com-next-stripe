import Link from "next/link";

export default function ProductLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Link href="/products" className="inline-block text-orange-400 p-4 font-bold">
          All Products
        </Link>
        {children}
      </body>
    </html>
  )
}

// we can also create nested layout for specific route like /products
// products/layout.js inside products folder will be applied to all the pages coming inside products path
