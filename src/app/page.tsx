import { ProductCard } from './components/ProductCard'
import { Header } from './components/Header'

async function getProducts() {
  // In a real application, this would be an API call
  // For this example, we'll simulate an API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    products: [
      {
        id: "cm5vbxoxq000ie1d0qxxas19p",
        clientId: "client1",
        vectorId: "a3cd7a17-9be5-48a6-80e3-388e41e4fe2e",
        name: "Bluetooth Speaker",
        metadata: {
          id: "12346",
          tags: ["audio", "wireless", "speaker"],
          brand: "SoundWave",
          price: 49.99,
          title: "Bluetooth Speaker",
          category: "Electronics",
          image_url: "https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=2048x2048&w=is&k=20&c=oo7SGfjmPkybpqoNccDsYWG-4uxSmn8G79NiLA1mNvs=",
          description: "Portable Bluetooth speaker with enhanced bass."
        },
        createdAt: "2025-01-13T17:40:20.990Z",
        updatedAt: "2025-01-13T17:40:20.990Z"
      },
      {
        id: "cm5vbxoxq000je1d0ix2rt6s8",
        clientId: "client1",
        vectorId: "22c6cd00-7d94-4eba-9902-cd6db4fb49c7",
        name: "Gaming Keyboard",
        metadata: {
          id: "12347",
          tags: ["gaming", "keyboard", "RGB"],
          brand: "KeyLight",
          price: 129.99,
          title: "Gaming Keyboard",
          category: "Computer Accessories",
          image_url: "https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=2048x2048&w=is&k=20&c=oo7SGfjmPkybpqoNccDsYWG-4uxSmn8G79NiLA1mNvs=",
          description: "Mechanical gaming keyboard with customizable RGB lighting."
        },
        createdAt: "2025-01-13T17:40:20.990Z",
        updatedAt: "2025-01-13T17:40:20.990Z"
      },
      {
        id: "cm5vbxoxq000ke1d033epfffs",
        clientId: "client1",
        vectorId: "0e9183a3-00fb-43fa-96c6-8442471477e8",
        name: "4K Monitor",
        metadata: {
          id: "12348",
          tags: ["monitor", "4K", "display"],
          brand: "VisionPro",
          price: 399.99,
          title: "4K Monitor",
          category: "Electronics",
          image_url: "https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=2048x2048&w=is&k=20&c=oo7SGfjmPkybpqoNccDsYWG-4uxSmn8G79NiLA1mNvs=",
          description: "27-inch 4K UHD monitor with HDR support."
        },
        createdAt: "2025-01-13T17:40:20.990Z",
        updatedAt: "2025-01-13T17:40:20.990Z"
      }
    ]
  }
}

export default async function Home() {
  const { products } = await getProducts()

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  )
}

