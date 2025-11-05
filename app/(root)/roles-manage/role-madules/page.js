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
    <div className="p-4">
      <Card className="shadow-md rounded-xl border">
        <CardHeader className="bg-muted/40 border-b rounded-t-xl">
          <CardTitle className="text-lg font-medium">Role Modules</CardTitle>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-center">No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {roles.map((role, idx) => (
                <TableRow key={role.id} className="hover:bg-muted/30">
                  <TableCell className="text-center">{idx + 1}</TableCell>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleView(role)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => handleEdit(role)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={!!selectedRole} onOpenChange={() => setSelectedRole(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>View Role Module</DialogTitle>
          </DialogHeader>
          {selectedRole && (
            <div className="py-2">
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
