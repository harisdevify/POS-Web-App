"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Eye, Edit } from "lucide-react"

const initialRoles = [
  { id: 1, name: "Admin", createdAt: "2024-01-10" },
  { id: 2, name: "Manager", createdAt: "2024-03-22" },
  { id: 3, name: "Cashier", createdAt: "2024-07-15" },
]

export default function Roles() {
  const [roles, setRoles] = useState(initialRoles)
  const [viewing, setViewing] = useState(null)
  const [editing, setEditing] = useState(null)

  const handleSave = () => {
    setRoles(
      roles.map((r) => (r.id === editing.id ? editing : r))
    )
    setEditing(null)
  }

  return (
    <div className="p-4">
      <Card className="shadow-md rounded-xl border">
        <CardHeader className="bg-muted/40 border-b rounded-t-xl">
          <CardTitle className="text-lg font-medium">Roles Overview</CardTitle>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-center">No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {roles.map((role, index) => (
                <TableRow key={role.id} className="hover:bg-muted/30">
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.createdAt}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setViewing(role)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="default"
                        onClick={() => setEditing(role)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {roles.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan="4"
                    className="text-center py-6 text-muted-foreground"
                  >
                    No roles found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 👁 View Role Dialog */}
      <Dialog open={!!viewing} onOpenChange={() => setViewing(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              View Role
            </DialogTitle>
          </DialogHeader>
          {viewing && (
            <div className="space-y-3 py-2">
              <p>
                <strong>Name:</strong> {viewing.name}
              </p>
              <p>
                <strong>Created Date:</strong> {viewing.createdAt}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewing(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ✏️ Edit Role Dialog */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Edit Role
            </DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-3 py-2">
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium">Role Name</label>
                <Input
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium">Created Date</label>
                <Input
                  type="date"
                  value={editing.createdAt}
                  onChange={(e) =>
                    setEditing({ ...editing, createdAt: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-end gap-2">
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
