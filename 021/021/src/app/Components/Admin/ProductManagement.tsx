"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useToast } from "@/hooks/use-toast"

export default function ProductManagement() {
  const { toast } = useToast()
  const [category, setCategory] = useState<string>("")
  const [formData, setFormData] = useState({
    brand: "",
    series: "",
    productName: "",
    price: "",
    size: "",
    stock: "",
  })

  // Fetch categories from the database
  const categories = useQuery(api.Product.getCategories)
  const addProduct = useMutation(api.Product.add)
  const addStock = useMutation(api.stock.setStock)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!category || !formData.productName || !formData.stock || !formData.series) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields"
      })
      return
    }

    if (category === "Shoes" && !formData.size) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Size is required for shoes"
      })
      return
    }

    try {
      // First, add the product
      await addProduct({
        category,
        brand: formData.brand || "",
        series: formData.series,
        productName: formData.productName,
        price: formData.price ? parseFloat(formData.price) : 0,
        size: formData.size || undefined,
      })

      // Then, add the stock with a slight delay to ensure product is created
      await new Promise(resolve => setTimeout(resolve, 100));
      
      await addStock({
        productName: formData.productName,
        brand: formData.brand || "",
        categoryname: category,
        stockQuantity: parseInt(formData.stock),
        series: formData.series,
        price: formData.price ? parseFloat(formData.price) : 0,
      })

      toast({
        title: "Success",
        description: "Product added successfully"
      })
      
      // Reset form
      setCategory("")
      setFormData({
        brand: "",
        series: "",
        productName: "",
        price: "",
        size: "",
        stock: "",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add product"
      })
      console.error(error)
    }
  }

  if (!categories) {
    return <div>Loading categories...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Management</CardTitle>
        <CardDescription>Add or edit product information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category Name *</Label>
              <Select
                value={category}
                onValueChange={setCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input 
                id="brand"
                value={formData.brand}
                onChange={handleInputChange}
                placeholder="e.g., Yonex"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="series">Series *</Label>
              <Input 
                id="series"
                value={formData.series}
                onChange={handleInputChange}
                placeholder="e.g., ASTROX"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productName">Product Name *</Label>
              <Input 
                id="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="e.g., ASTROX 88 S PRO"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input 
                id="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., 269"
              />
            </div>

            {(category === "Shoes" || formData.size) && (
              <div className="space-y-2">
                <Label htmlFor="size">
                  Size {category === "Shoes" ? "*" : "(Optional)"}
                </Label>
                <Input 
                  id="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  placeholder="e.g., UK 8"
                  required={category === "Shoes"}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="stock">Stock *</Label>
              <Input 
                id="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="e.g., 50"
                required
              />
            </div>
          </div>
          <Button type="submit">Add Product</Button>
        </form>
      </CardContent>
    </Card>
  )
}
