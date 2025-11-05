"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Edit, Trash2 } from "lucide-react"

const initialCustomers = [
  {
    id: 1,
    photo: "/table.jpg",
    name: "Ali Khan",
    email: "ali@example.com",
    phone: "0301-1234567",
    shopname: "Ali Traders",
    remainingBalance: 1500,
  },
  {
    id: 2,
    photo: "/table.jpg",
    name: "Ahmad Raza",
    email: "ahmad@example.com",
    phone: "0302-9876543",
    shopname: "Raza Mart",
    remainingBalance: 800,
  },
  {
    id: 3,
    photo: "/table.jpg",
    name: "Sara Ahmed",
    email: "sara@example.com",
    phone: "0303-1122334",
    shopname: "Sara Store",
    remainingBalance: 0,
  },
]

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [editing, setEditing] = useState(null)
  const [preview, setPreview] = useState("")

  const handleDelete = (id) => {
    setCustomers(customers.filter((c) => c.id !== id))
  }

  const handleEdit = (customer) => {
    setEditing(customer)
    setPreview(customer.photo)
  }

  const handleSave = () => {
    setCustomers(
      customers.map((c) => (c.id === editing.id ? editing : c))
    )
    setEditing(null)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      setEditing({ ...editing, photo: url })
    }
  }

  return (
    <div className="p-4">
      <Card className="shadow-md rounded-xl border">
        {/* 🔹 Soft colored header like Products Overview */}
        <CardHeader className="bg-muted/40 border-b rounded-t-xl">
          <CardTitle className="text-lg font-medium">
            Customers Overview
          </CardTitle>
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
                <TableHead>Shop Name</TableHead>
                <TableHead>Remaining Balance</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {customers.map((c, index) => (
                <TableRow key={c.id} className="hover:bg-muted/30">
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>
                    <Image
                      src={c.photo}
                      alt={c.name}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell>{c.shopname}</TableCell>
                  <TableCell>Rs. {c.remainingBalance}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(c)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(c.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {customers.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan="8"
                    className="text-center py-6 text-muted-foreground"
                  >
                    No customers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Customer Popup */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="sm:max-w-4xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Edit Customer
            </DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-6">
              {/* Photo Upload */}
              <div className="flex flex-col items-start border rounded-xl p-4 bg-muted/20 w-full">
                <Label htmlFor="photo" className="font-medium mb-2">
                  Choose File
                </Label>
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

              {/* Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <Label>Name *</Label>
                  <Input
                    value={editing.name}
                    onChange={(e) =>
                      setEditing({ ...editing, name: e.target.value })
                    }
                    placeholder="Enter customer name"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={editing.email}
                    onChange={(e) =>
                      setEditing({ ...editing, email: e.target.value })
                    }
                    placeholder="Enter email"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <Label>Phone *</Label>
                  <Input
                    value={editing.phone}
                    onChange={(e) =>
                      setEditing({ ...editing, phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <Label>Shop Name *</Label>
                  <Input
                    value={editing.shopname}
                    onChange={(e) =>
                      setEditing({ ...editing, shopname: e.target.value })
                    }
                    placeholder="Enter shop name"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <Label>Remaining Balance *</Label>
                  <Input
                    type="number"
                    value={editing.remainingBalance}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        remainingBalance: Number(e.target.value),
                      })
                    }
                    placeholder="Enter remaining balance"
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
