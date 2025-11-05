"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AddProduct() {
  const [form, setForm] = useState({
    photo: null,
    preview: "",
    name: "",
    category: "",
    supplier: "",
    stock: "",
    buyingDate: "",
    buyingPrice: "",
    sellingPrice: "",
  })

  // 🖼 Handle File Upload & Preview
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "photo") {
      const file = files[0]
      setForm({
        ...form,
        photo: file,
        preview: file ? URL.createObjectURL(file) : "",
      })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  // 🧾 Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Product Added:", form)
    alert("✅ Product added successfully (check console).")
  }

  const handleCancel = () => {
    setForm({
      photo: null,
      preview: "",
      name: "",
      category: "",
      supplier: "",
      stock: "",
      buyingDate: "",
      buyingPrice: "",
      sellingPrice: "",
    })
  }

  return (
    <div className="p-4">
      <Card className="shadow-md border rounded-xl max-w-5xl mx-auto h-full">
        <CardHeader className="bg-muted/40 border-b rounded-t-xl">
          <CardTitle className="text-lg font-medium">Add  Product</CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="grid gap-6">
            {/* 🖼 Product Image */}
            <div className="grid gap-2">
              <Label htmlFor="photo">Product Image</Label>
              <Input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />

              {form.preview && (
                <div className="mt-3">
                  <Image
                    src={form.preview}
                    alt="Preview"
                    width={120}
                    height={120}
                    className="rounded-md border object-cover"
                  />
                </div>
              )}
            </div>

            {/* 🔹 2-Column Layout for Inputs */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter product name"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              {/* Category */}
              <div className="grid gap-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="Enter category"
                  required
                  value={form.category}
                  onChange={handleChange}
                />
              </div>

              {/* Supplier */}
              <div className="grid gap-2">
                <Label htmlFor="supplier">Supplier *</Label>
                <Input
                  id="supplier"
                  name="supplier"
                  placeholder="Enter supplier name"
                  required
                  value={form.supplier}
                  onChange={handleChange}
                />
              </div>

              {/* Product Stock */}
              <div className="grid gap-2">
                <Label htmlFor="stock">Product Stock *</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="Enter stock quantity"
                  required
                  value={form.stock}
                  onChange={handleChange}
                />
              </div>

              {/* Buying Date */}
              <div className="grid gap-2">
                <Label htmlFor="buyingDate">Buying Date</Label>
                <Input
                  id="buyingDate"
                  name="buyingDate"
                  type="date"
                  value={form.buyingDate}
                  onChange={handleChange}
                />
              </div>

              {/* Buying Price */}
              <div className="grid gap-2">
                <Label htmlFor="buyingPrice">Buying Price *</Label>
                <Input
                  id="buyingPrice"
                  name="buyingPrice"
                  type="number"
                  placeholder="Enter buying price"
                  required
                  value={form.buyingPrice}
                  onChange={handleChange}
                />
              </div>

              {/* Selling Price (full width if odd number of inputs) */}
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="sellingPrice">Selling Price *</Label>
                <Input
                  id="sellingPrice"
                  name="sellingPrice"
                  type="number"
                  placeholder="Enter selling price"
                  required
                  value={form.sellingPrice}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 🧭 Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="px-6"
              >
                Cancel
              </Button>
              <Button type="submit" className="px-6">
                Add Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
