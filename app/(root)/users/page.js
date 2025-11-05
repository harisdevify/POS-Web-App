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

const initialUsers = [
  {
    id: 1,
    photo: "/table.jpg",
    name: "Ali Raza",
    username: "aliraza",
    email: "ali.raza@example.com",
    role: "Admin",
  },
  {
    id: 2,
    photo: "/table.jpg",
    name: "Ahmed Khan",
    username: "ahmedk",
    email: "ahmed.khan@example.com",
    role: "Manager",
  },
  {
    id: 3,
    photo: "/table.jpg",
    name: "Sara Malik",
    username: "saram",
    email: "sara.malik@example.com",
    role: "Staff",
  },
]

export default function Users() {
  const [users, setUsers] = useState(initialUsers)
  const [editing, setEditing] = useState(null)
  const [preview, setPreview] = useState("")

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const handleEdit = (user) => {
    setEditing(user)
    setPreview(user.photo)
  }

  const handleSave = () => {
    setUsers(users.map((u) => (u.id === editing.id ? editing : u)))
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
        {/* Header */}
        <CardHeader className="bg-muted/40 border-b rounded-t-xl">
          <CardTitle className="text-lg font-medium">Users Overview</CardTitle>
        </CardHeader>

        {/* Table */}
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-12 text-center">No.</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((u, index) => (
                <TableRow key={u.id} className="hover:bg-muted/30">
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>
                    <Image
                      src={u.photo}
                      alt={u.name}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.username}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button size="icon" variant="outline" onClick={() => handleEdit(u)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => handleDelete(u.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan="7" className="text-center py-6 text-muted-foreground">
                    No users found.
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
            <DialogTitle className="text-xl font-semibold">Edit User</DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-5">
              {/* Image Upload with Preview */}
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
                    placeholder="Full name"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <Label>Username *</Label>
                  <Input
                    value={editing.username}
                    onChange={(e) => setEditing({ ...editing, username: e.target.value })}
                    placeholder="Username"
                  />
                </div>

                <div className="flex flex-col space-y-1 col-span-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={editing.email}
                    onChange={(e) => setEditing({ ...editing, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>

                <div className="flex flex-col space-y-1 col-span-2">
                  <Label>Role</Label>
                  <Input
                    value={editing.role}
                    onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                    placeholder="Admin / Manager / Staff"
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
