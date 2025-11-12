"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Edit, Trash2 } from "lucide-react"

const initialSuppliers = [
  {
    id: 1,
    photo: "/table.jpg",
    name: "Hi-Tech Supplies",
    email: "hitech@example.com",
    phone: "0300-1112223",
    shopname: "Hi-Tech",
    type: "Wholesale",
  },
  {
    id: 2,
    photo: "/table.jpg",
    name: "Power Co.",
    email: "power@example.com",
    phone: "0301-2223334",
    shopname: "Power Store",
    type: "Distributor",
  },
  {
    id: 3,
    photo: "/table.jpg",
    name: "Elmax Traders",
    email: "elmax@example.com",
    phone: "0302-3334445",
    shopname: "Elmax",
    type: "Retail",
  },
]

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState(initialSuppliers)
  const [editing, setEditing] = useState(null)
  const [preview, setPreview] = useState("")

  const handleDelete = (id) => {
    setSuppliers(suppliers.filter((s) => s.id !== id))
  }

  const handleEdit = (supplier) => {
    setEditing(supplier)
    setPreview(supplier.photo)
  }

  const handleSave = () => {
    setSuppliers(suppliers.map((s) => (s.id === editing.id ? editing : s)))
    setEditing(null)
    setPreview("")
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      setEditing({ ...editing, photo: url })
    }
  }

  return (
    <div className="p-4">
      <Card className="shadow-md rounded-xl border">
        {/* header with soft color */}
        <CardHeader className="bg-muted/40 border-b rounded-t-xl">
          <CardTitle className="text-lg font-medium">Suppliers Overview</CardTitle>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-12 text-center">No.</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Shopname</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {suppliers.map((s, index) => (
                <TableRow key={s.id} className="hover:bg-muted/30">
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>
                    <Image src={s.photo} alt={s.name} width={40} height={40} className="rounded-md" />
                  </TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.phone}</TableCell>
                  <TableCell>{s.shopname}</TableCell>
                  <TableCell>{s.type}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button size="icon" variant="outline" onClick={() => handleEdit(s)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => handleDelete(s.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {suppliers.length === 0 && (
                <TableRow>
                  <TableCell colSpan="8" className="text-center py-6 text-muted-foreground">
                    No suppliers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Supplier Dialog */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="sm:max-w-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Edit Supplier</DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-5">
              {/* compact image chooser with small preview */}
              <div className="flex flex-col items-start border rounded-xl p-4 bg-muted/20 w-full">
                <Label htmlFor="photo" className="font-medium mb-2">Choose File</Label>
                <div className="flex items-center gap-3 w-full">
                  <div className="relative w-14 h-14 border rounded-md overflow-hidden bg-white">
                    {preview ? (
                      <Image src={preview} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <Input id="photo" type="file" accept="image/*" onChange={handleImageChange} className="flex-1" />
                </div>
              </div>

              {/* fields in 2-column grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <Label>Name *</Label>
                  <Input
                    value={editing.name}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    placeholder="Supplier name"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={editing.email}
                    onChange={(e) => setEditing({ ...editing, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <Label>Phone</Label>
                  <Input
                    value={editing.phone}
                    onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
                    placeholder="0300-1234567"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <Label>Shopname</Label>
                  <Input
                    value={editing.shopname}
                    onChange={(e) => setEditing({ ...editing, shopname: e.target.value })}
                    placeholder="Shop name"
                  />
                </div>

                <div className="flex flex-col space-y-1 col-span-2 sm:col-span-1">
                  <Label>Type</Label>
                  <Input
                    value={editing.type}
                    onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                    placeholder="Wholesale / Distributor / Retail"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
