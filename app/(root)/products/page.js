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

  const handleDelete = (id) => setProducts(products.filter((p) => p.id !== id))
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
      <Card className="border rounded-md shadow-sm">
        <CardHeader className="border-b py-2 px-3 bg-muted/40">
          <CardTitle className="text-base font-semibold">Products Overview</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="border px-2 py-1 text-center font-medium w-12">No.</th>
                  <th className="border px-2 py-1 text-left font-medium">Photo</th>
                  <th className="border px-2 py-1 text-left font-medium">Name</th>
                  <th className="border px-2 py-1 text-left font-medium">Category</th>
                  <th className="border px-2 py-1 text-left font-medium">Supplier</th>
                  <th className="border px-2 py-1 text-center font-medium">Stock</th>
                  <th className="border px-2 py-1 text-center font-medium">Price</th>
                  <th className="border px-2 py-1 text-center font-medium w-[120px]">Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p, index) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="border px-2 py-1 text-center">{index + 1}</td>
                    <td className="border px-2 py-1">
                      <Image
                        src={p.photo}
                        alt={p.name}
                        width={35}
                        height={35}
                        className="rounded"
                      />
                    </td>
                    <td className="border px-2 py-1">{p.name}</td>
                    <td className="border px-2 py-1">{p.category}</td>
                    <td className="border px-2 py-1">{p.supplier}</td>
                    <td className="border px-2 py-1 text-center">{p.stock}</td>
                    <td className="border px-2 py-1 text-center">Rs. {p.sellingPrice}</td>
                    <td className="border px-2 py-1 text-center">
                      <div className="flex justify-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleEdit(p)}
                          className="h-7 w-7"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => handleDelete(p.id)}
                          className="h-7 w-7"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Product Dialog */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] p-6 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Edit Product</DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-6">
              {/* Image Upload */}
              <div className="flex flex-col border rounded-md p-3 bg-muted/20">
                <Label htmlFor="photo" className="font-medium mb-2">Choose File</Label>
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 border rounded-md overflow-hidden bg-white">
                    {preview ? (
                      <Image src={preview} alt="Preview" fill className="object-cover" />
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
                <div>
                  <Label>Product Name *</Label>
                  <Input
                    value={editing.name}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <Label>Category *</Label>
                  <Input
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    placeholder="Enter category"
                  />
                </div>
                <div>
                  <Label>Supplier *</Label>
                  <Input
                    value={editing.supplier}
                    onChange={(e) => setEditing({ ...editing, supplier: e.target.value })}
                    placeholder="Enter supplier"
                  />
                </div>
                <div>
                  <Label>Stock *</Label>
                  <Input
                    type="number"
                    value={editing.stock}
                    onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })}
                    placeholder="Enter stock"
                  />
                </div>
                <div>
                  <Label>Buying Date</Label>
                  <Input
                    type="date"
                    value={editing.buyingDate}
                    onChange={(e) => setEditing({ ...editing, buyingDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Buying Price *</Label>
                  <Input
                    type="number"
                    value={editing.buyingPrice}
                    onChange={(e) => setEditing({ ...editing, buyingPrice: Number(e.target.value) })}
                    placeholder="Enter buying price"
                  />
                </div>
                <div>
                  <Label>Selling Price *</Label>
                  <Input
                    type="number"
                    value={editing.sellingPrice}
                    onChange={(e) =>
                      setEditing({ ...editing, sellingPrice: Number(e.target.value) })
                    }
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
