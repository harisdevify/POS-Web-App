"use client"

import { useState } from "react"
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
    <div className="overflow-hidden rounded-md border bg-white">
      {/* Header */}
      <div className="px-4 py-2 text-base font-semibold border-b">
        Assign Roles
      </div>

      {/* Role Name Input */}
      <div className="p-4 flex flex-wrap items-center gap-3 border-b">
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

      {/* Table */}
      <div className="overflow-x-auto custom-scroll">
        <table className="min-w-full border-collapse bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border text-center w-16">No.</th>
              <th className="py-2 px-4 border text-left">Module</th>
              <th className="py-2 px-4 border text-center">Permissions</th>
            </tr>
          </thead>

          <tbody>
            {modules.map((m, idx) => (
              <tr key={m.id}>
                <td className="py-2 px-4 border text-center">{idx + 1}</td>
                <td className="py-2 px-4 border">{m.module}</td>
                <td className="py-2 px-4 border text-center">
                  <div className="flex items-center justify-center gap-6 flex-wrap">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 border-t flex flex-wrap justify-end gap-2">
        <Button variant="outline" onClick={() => setModules(initialModules)}>
          Reset
        </Button>
        <Button onClick={handleSave}>Save Permissions</Button>
      </div>

      {/* Custom Scrollbar Style */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 9999px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f9fafb;
        }
      `}</style>
    </div>
  )
}
