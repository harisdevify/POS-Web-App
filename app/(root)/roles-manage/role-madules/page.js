"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Edit } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const initialRoles = [
  { id: 1, name: "Dashboard Access" },
  { id: 2, name: "Product Management" },
  { id: 3, name: "Sales Reports" },
  { id: 4, name: "Customer Records" },
  { id: 5, name: "Inventory Control" },
]

export default function RolesMadules() {
  const [roles, setRoles] = useState(initialRoles)
  const [selectedRole, setSelectedRole] = useState(null)
  const [editing, setEditing] = useState(null)

  const handleEdit = (role) => setEditing(role)
  const handleView = (role) => setSelectedRole(role)

  const handleSave = () => {
    setRoles((prev) =>
      prev.map((r) => (r.id === editing.id ? editing : r))
    )
    setEditing(null)
  }

  return (
    <div className="overflow-hidden rounded-md border">
      {/* Heading Section */}
      <div className="px-4 py-2 text-base font-semibold border-b bg-white">
        Role Modules
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border text-center w-16">No.</th>
              <th className="py-2 px-4 border text-left">Name</th>
              <th className="py-2 px-4 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, idx) => (
              <tr key={role.id}>
                <td className="py-2 px-4 border text-center">{idx + 1}</td>
                <td className="py-2 px-4 border">{role.name}</td>
                <td className="py-2 px-4 border text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="border p-1 hover:bg-gray-100"
                      onClick={() => handleView(role)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="border p-1 hover:bg-gray-100"
                      onClick={() => handleEdit(role)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Dialog */}
      <Dialog open={!!selectedRole} onOpenChange={() => setSelectedRole(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>View Role Module</DialogTitle>
          </DialogHeader>
          {selectedRole && (
            <div className="py-2 space-y-1">
              <p><strong>ID:</strong> {selectedRole.id}</p>
              <p><strong>Name:</strong> {selectedRole.name}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedRole(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Role Module</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-3">
              <Input
                value={editing.name}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
                placeholder="Enter new module name"
              />
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
