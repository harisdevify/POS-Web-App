"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initialModules = [
  { id: 1, module: "Dashboard", read: true, write: false },
  { id: 2, module: "Products", read: true, write: true },
  { id: 3, module: "Categories", read: true, write: false },
  { id: 4, module: "Suppliers", read: true, write: false },
  { id: 5, module: "Customers", read: true, write: false },
  { id: 6, module: "Sales", read: true, write: true },
  { id: 7, module: "Reports", read: true, write: false },
]

export default function AssignRoles() {
  const [modules, setModules] = useState(initialModules)
  const [roleName, setRoleName] = useState("")

  const handleToggle = (id, field) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: !m[field] } : m))
    )
  }

  const handleSave = () => {
    if (!roleName.trim()) {
      alert("⚠️ Please enter a role name before saving.")
      return
    }
    alert(`Permissions for "${roleName}" saved successfully ✅`)
  }

  return (
    <div className="p-4">
      <Card className="shadow-md rounded-xl border">
        <CardHeader className="bg-muted/40 border-b rounded-t-xl">
          <CardTitle className="text-lg font-medium">Assign Roles</CardTitle>
        </CardHeader>

        <div className="p-4 flex items-center gap-3 border-b">
          <Label htmlFor="roleName" className="text-sm font-medium">
            Role Name:
          </Label>
          <Input
            id="roleName"
            placeholder="Enter role name..."
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-center">No.</TableHead>
                <TableHead>Module</TableHead>
                <TableHead className="text-center">Permissions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {modules.map((m, idx) => (
                <TableRow key={m.id} className="hover:bg-muted/30">
                  <TableCell className="text-center">{idx + 1}</TableCell>
                  <TableCell className="font-medium">{m.module}</TableCell>

                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-6">
                      <label className="flex items-center gap-2 text-sm">
                        <Checkbox
                          checked={!!m.read}
                          onCheckedChange={() => handleToggle(m.id, "read")}
                        />
                        Read
                      </label>

                      <label className="flex items-center gap-2 text-sm">
                        <Checkbox
                          checked={!!m.write}
                          onCheckedChange={() => handleToggle(m.id, "write")}
                        />
                        Write
                      </label>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={() => setModules(initialModules)}>
            Reset
          </Button>
          <Button onClick={handleSave}>Save Permissions</Button>
        </div>
      </Card>
    </div>
  )
}
