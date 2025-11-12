"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Edit, Trash2 } from "lucide-react"

const initialUsers = [
  { id: 1, photo: "/table.jpg", name: "Ali Raza", username: "aliraza", email: "ali.raza@example.com", role: "Admin" },
  { id: 2, photo: "/table.jpg", name: "Ahmed Khan", username: "ahmedk", email: "ahmed.khan@example.com", role: "Manager" },
  { id: 3, photo: "/table.jpg", name: "Sara Malik", username: "saram", email: "sara.malik@example.com", role: "Staff" },
]

export default function Users() {
  const [users, setUsers] = useState(initialUsers)
  const [editing, setEditing] = useState(null)
  const [preview, setPreview] = useState("")

  const handleDelete = (id) => setUsers(users.filter(u => u.id !== id))
  const handleEdit = (user) => { setEditing(user); setPreview(user.photo) }
  const handleSave = () => { setUsers(users.map(u => u.id === editing.id ? editing : u)); setEditing(null); setPreview("") }
  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if(file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      setEditing({...editing, photo: url})
    }
  }

  return (
    <div className="p-4">
      <Card className="shadow-md border rounded-xl">
        <CardHeader className="bg-muted/40 border-b rounded-t-xl">
          <CardTitle className="text-lg font-medium">Users Overview</CardTitle>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="min-w-[700px] w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border px-3 py-2 text-center w-12">No.</th>
                <th className="border px-3 py-2 text-left">Photo</th>
                <th className="border px-3 py-2 text-left">Name</th>
                <th className="border px-3 py-2 text-left">Username</th>
                <th className="border px-3 py-2 text-left">Email</th>
                <th className="border px-3 py-2 text-left">Role</th>
                <th className="border px-3 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2 text-center">{idx + 1}</td>
                  <td className="border px-3 py-2">
                    <Image src={u.photo} alt={u.name} width={40} height={40} className="rounded-md" />
                  </td>
                  <td className="border px-3 py-2 font-medium">{u.name}</td>
                  <td className="border px-3 py-2">{u.username}</td>
                  <td className="border px-3 py-2 truncate">{u.email}</td>
                  <td className="border px-3 py-2">{u.role}</td>
                  <td className="border px-3 py-2 text-center flex justify-center gap-2">
                    <Button size="icon" variant="outline" onClick={() => handleEdit(u)}><Edit className="w-4 h-4" /></Button>
                    <Button size="icon" variant="destructive" onClick={() => handleDelete(u.id)}><Trash2 className="w-4 h-4" /></Button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="sm:max-w-3xl p-6">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-center gap-3 border rounded-xl p-4 bg-muted/20">
                <div className="relative w-16 h-16 border rounded-md overflow-hidden bg-white">
                  {preview ? <Image src={preview} alt="Preview" fill className="object-cover" /> :
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>}
                </div>
                <Input type="file" accept="image/*" onChange={handleImageChange} className="flex-1" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <Label>Name *</Label>
                  <Input value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} />
                </div>
                <div className="flex flex-col space-y-1">
                  <Label>Username *</Label>
                  <Input value={editing.username} onChange={e => setEditing({...editing, username: e.target.value})} />
                </div>
                <div className="flex flex-col space-y-1 sm:col-span-2">
                  <Label>Email *</Label>
                  <Input value={editing.email} onChange={e => setEditing({...editing, email: e.target.value})} />
                </div>
                <div className="flex flex-col space-y-1 sm:col-span-2">
                  <Label>Role</Label>
                  <Input value={editing.role} onChange={e => setEditing({...editing, role: e.target.value})} />
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
