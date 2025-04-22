
import { Layout } from "@/components/layout/Layout"
import { ProductGrid } from "@/components/product/ProductGrid"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const Shop = () => {
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("newest")

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold">Our Collection</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popularity">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ProductGrid />
        </div>
      </div>
    </Layout>
  )
}

export default Shop
