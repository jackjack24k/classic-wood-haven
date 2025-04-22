
import { Layout } from "@/components/layout/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const categories = [
  {
    id: 1,
    name: "Living Room",
    description: "Elegant sofas, coffee tables, and entertainment units",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Dining Room",
    description: "Beautiful dining tables and chairs",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Bedroom",
    description: "Comfortable beds and storage solutions",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Office",
    description: "Professional desks and work spaces",
    image: "/placeholder.svg"
  }
]

const Categories = () => {
  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-6">Product Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <Button asChild className="w-full">
                  <Link to={`/shop?category=${category.id}`}>
                    View Products
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Categories
