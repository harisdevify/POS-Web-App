"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const UpdateRole = () => {
  const [roleName, setRoleName] = useState("Admin")

  const modules = [
    "Dashboard",
    "Users",
    "Roles",
    "Products",
    "Orders",
    "Reports",
  ]

  return (
    <div className="">
      <Card className="shadow-md border rounded-xl">
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-medium">Update Role</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Role Name Input */}
          <div>
            <label className="block mb-2 text-sm font-medium">Role Name</label>
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter Role Name"
            />
          </div>

          {/* Permissions Table */}
          <div className="overflow-x-auto">
            <table className="min-w-[500px] w-full border-collapse text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-3 py-2 text-left w-1/2">Module</th>
                  <th className="border px-3 py-2 text-left">Permissions</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((module, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{module}</td>
                    <td className="border px-3 py-2">
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-1 text-sm">
                          <input type="checkbox" /> Read
                        </label>
                        <label className="flex items-center gap-1 text-sm">
                          <input type="checkbox" /> Write
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button variant="outline">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UpdateRole
