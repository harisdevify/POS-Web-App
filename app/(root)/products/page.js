"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit, Trash2 } from "lucide-react"

const initialProducts = [
  {
    id: 1,
    photo: "/table.jpg",
    name: "Kingpark Cylinder",
    category: "Gas Cylinder",
    supplier: "Hi-Tech Supplies",
    stock: 50,
    buyingDate: "2024-10-05",
    buyingPrice: 1500,
    sellingPrice: 1800,
  },
  {
    id: 2,
    photo: "/table.jpg",
    name: "Hi Power Cylinder",
    category: "Gas Cylinder",
    supplier: "Power Co.",
    stock: 30,
    buyingDate: "2024-09-20",
    buyingPrice: 800,
    sellingPrice: 1000,
  },
]

export default function Products() {
  const [products, setProducts] = useState(initialProducts)
  const [editing, setEditing] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const handleEdit = (product) => {
    setEditing(product)
    setPreview(product.photo)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const previewURL = URL.createObjectURL(file)
      setPreview(previewURL)
      setEditing({ ...editing, photo: previewURL })
    }
  }

  const handleSave = () => {
    setProducts(products.map((p) => (p.id === editing.id ? editing : p)))
    setEditing(null)
    setPreview(null)
  }

  return (
    <div className="p-4">
      <Card className="shadow-md rounded-xl border">
        <CardHeader className="bg-muted/40 border-b rounded-t-xl">
          <CardTitle className="text-lg font-medium">Products Overview</CardTitle>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">No.</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p, index) => (
                <TableRow key={p.id} className="hover:bg-muted/30">
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>
                    <Image
                      src={p.photo}
                      alt={p.name}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>{p.supplier}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell>Rs. {p.sellingPrice}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(p)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(p.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

     {/* Edit Product Dialog */}
<Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
  <DialogContent className="sm:max-w-4xl max-h-[90vh] p-6">
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold">Edit Product</DialogTitle>
    </DialogHeader>

    {editing && (
      <div className="space-y-6">
        {/* Image Upload (compact and inline preview) */}
        <div className="flex flex-col items-start border rounded-xl p-4 bg-muted/20 w-full">
          <Label htmlFor="photo" className="font-medium mb-2">Choose File</Label>
          <div className="flex items-center gap-3 w-full">
            <div className="relative w-16 h-16 border rounded-md overflow-hidden bg-white">
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="flex-1"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <Label>Product Name *</Label>
            <Input
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              placeholder="Enter product name"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <Label>Category *</Label>
            <Input
              value={editing.category}
              onChange={(e) => setEditing({ ...editing, category: e.target.value })}
              placeholder="Enter category"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <Label>Supplier *</Label>
            <Input
              value={editing.supplier}
              onChange={(e) => setEditing({ ...editing, supplier: e.target.value })}
              placeholder="Enter supplier"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <Label>Product Stock *</Label>
            <Input
              type="number"
              value={editing.stock}
              onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })}
              placeholder="Enter stock"
            />
          </div>

          <div className="flex flex-col space-y-1 col-span-2 sm:col-span-1">
            <Label>Buying Date</Label>
            <Input
              type="date"
              value={editing.buyingDate}
              onChange={(e) => setEditing({ ...editing, buyingDate: e.target.value })}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <Label>Buying Price *</Label>
            <Input
              type="number"
              value={editing.buyingPrice}
              onChange={(e) => setEditing({ ...editing, buyingPrice: Number(e.target.value) })}
              placeholder="Enter buying price"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <Label>Selling Price *</Label>
            <Input
              type="number"
              value={editing.sellingPrice}
              onChange={(e) => setEditing({ ...editing, sellingPrice: Number(e.target.value) })}
              placeholder="Enter selling price"
            />
          </div>
        </div>
      </div>
    )}

    <DialogFooter className="flex justify-end gap-2 pt-4">
      <Button variant="outline" onClick={() => setEditing(null)}>
        Cancel
      </Button>
      <Button onClick={handleSave}>Save Changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </div>
  )
}
