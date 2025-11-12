"use client"
import React from "react"
import { Edit } from "lucide-react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const data = [
  { id: 1, name: "Admin", createdAt: "2024-01-10" },
  { id: 2, name: "Manager", createdAt: "2024-03-22" },
  { id: 3, name: "Cashier", createdAt: "2024-07-15" },
  { id: 4, name: "Supervisor", createdAt: "2024-09-05" },
  { id: 5, name: "Operator", createdAt: "2024-10-02" },
]

const Roles = () => {
  return (
    <div className="">
      <Card className="shadow-md border rounded-xl">
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-medium">Roles Overview</CardTitle>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="min-w-[500px] w-full border-collapse text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-3 py-2 text-center w-12">No.</th>
                <th className="border px-3 py-2 text-left">Name</th>
                <th className="border px-3 py-2 text-left">Created Date</th>
                <th className="border px-3 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((role, idx) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2 text-center">{idx + 1}</td>
                  <td className="border px-3 py-2">{role.name}</td>
                  <td className="border px-3 py-2">{role.createdAt}</td>
                  <td className="border px-3 py-2 text-center">
                    <Link
                      href={`/roles-manage/roles/update-role/${role.id}`}
                      className="p-1 hover:opacity-70 inline-block"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Roles
