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

const initialEmployees = [
  {
    id: 1,
    photo: "/table.jpg",
    name: "Ali Raza",
    email: "ali.raza@example.com",
    phone: "0300-1112233",
    salary: "50,000",
    city: "Lahore",
  },
  {
    id: 2,
    photo: "/table.jpg",
    name: "Ahmed Khan",
    email: "ahmed.khan@example.com",
    phone: "0301-2223344",
    salary: "45,000",
    city: "Karachi",
  },
  {
    id: 3,
    photo: "/table.jpg",
    name: "Sara Malik",
    email: "sara.malik@example.com",
    phone: "0302-3334455",
    salary: "55,000",
    city: "Islamabad",
  },
]

export default function Employees() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [editing, setEditing] = useState(null)
  const [preview, setPreview] = useState("")

  const handleDelete = (id) => {
    setEmployees(employees.filter((e) => e.id !== id))
  }

  const handleEdit = (employee) => {
    setEditing(employee)
    setPreview(employee.photo)
  }

  const handleSave = () => {
    setEmployees(employees.map((e) => (e.id === editing.id ? editing : e)))
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
        {/* Header with soft color */}
        <CardHeader className="bg-muted/40 border-b rounded-t-xl">
          <CardTitle className="text-lg font-medium">Employees Overview</CardTitle>
        </CardHeader>

        {/* Table */}
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-12 text-center">No.</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>City</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {employees.map((e, index) => (
                <TableRow key={e.id} className="hover:bg-muted/30">
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>
                    <Image
                      src={e.photo}
                      alt={e.name}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{e.name}</TableCell>
                  <TableCell>{e.email}</TableCell>
                  <TableCell>{e.phone}</TableCell>
                  <TableCell>{e.salary}</TableCell>
                  <TableCell>{e.city}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button size="icon" variant="outline" onClick={() => handleEdit(e)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => handleDelete(e.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {employees.length === 0 && (
                <TableRow>
                  <TableCell colSpan="8" className="text-center py-6 text-muted-foreground">
                    No employees found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="sm:max-w-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Edit Employee</DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-5">
              {/* Compact Image Upload */}
              <div className="flex flex-col items-start border rounded-xl p-4 bg-muted/20 w-full">
                <Label htmlFor="photo" className="font-medium mb-2">
                  Choose File
                </Label>
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
                  <Label>Name *</Label>
                  <Input
                    value={editing.name}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    placeholder="Employee name"
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
                  <Label>Salary</Label>
                  <Input
                    value={editing.salary}
                    onChange={(e) => setEditing({ ...editing, salary: e.target.value })}
                    placeholder="Enter salary"
                  />
                </div>

                <div className="flex flex-col space-y-1 col-span-2 sm:col-span-1">
                  <Label>City</Label>
                  <Input
                    value={editing.city}
                    onChange={(e) => setEditing({ ...editing, city: e.target.value })}
                    placeholder="Enter city"
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
