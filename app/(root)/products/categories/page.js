"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Edit, Trash2 } from "lucide-react"

const initialCategories = [
  { id: 1, name: "Gas Cylinder", slug: "gas-cylinder" },
  { id: 2, name: "Industrial Equipment", slug: "industrial-equipment" },
  { id: 3, name: "Accessories", slug: "accessories" },
]

export default function Categories() {
  const [categories, setCategories] = useState(initialCategories)
  const [editing, setEditing] = useState(null)

  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const handleEdit = (category) => {
    setEditing(category)
  }

  const handleSave = () => {
    setCategories(
      categories.map((cat) => (cat.id === editing.id ? editing : cat))
    )
    setEditing(null)
  }

  return (
    <div className="p-4">
      {/* 🔹 Card Container */}
      <Card className="shadow-md rounded-xl border">
        {/* 🔸 Header same as Products Overview */}
        <CardHeader className="bg-muted/40 border-b rounded-t-xl">
          <CardTitle className="text-lg font-medium">
            Categories Overview
          </CardTitle>
        </CardHeader>

        {/* 🔸 Table Section */}
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories.map((cat, index) => (
                <TableRow key={cat.id} className="hover:bg-muted/30">
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell>{cat.slug}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(cat)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(cat.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No categories available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 🔹 Edit Dialog */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="sm:max-w-3xl sm:max-h-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="grid gap-3 py-2">
              <Input
                value={editing.name}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
                placeholder="Category Name"
              />
              <Input
                value={editing.slug}
                onChange={(e) =>
                  setEditing({ ...editing, slug: e.target.value })
                }
                placeholder="Slug"
              />
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
