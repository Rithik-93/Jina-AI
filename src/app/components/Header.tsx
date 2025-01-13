import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          EcomStore
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-gray-600 hover:text-blue-600">
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-gray-600 hover:text-blue-600">
                <ShoppingCart className="inline-block" />
                <span className="sr-only">Cart</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

