import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

type Product = {
  id: string
  name: string
  metadata: {
    price: number
    brand: string
    category: string
    image_url: string
    description: string
    tags: string[]
  }
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={product.metadata.image_url}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.metadata.brand}</p>
        <p className="text-gray-800 font-bold mb-2">${product.metadata.price.toFixed(2)}</p>
        <p className="text-gray-600 mb-4">{product.metadata.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {product.metadata.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

