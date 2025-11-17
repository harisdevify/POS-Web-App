'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Edit, Plus } from 'lucide-react';
import { useState } from 'react';

const initialRoles = [
  { id: 1, name: 'Dashboard Access' },
  { id: 2, name: 'Product Management' },
  { id: 3, name: 'Sales Reports' },
  { id: 4, name: 'Customer Records' },
  { id: 5, name: 'Inventory Control' },
];

export default function RolesModules() {
  const [roles, setRoles] = useState(initialRoles);

  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newModuleName, setNewModuleName] = useState('');

  // Edit
  const handleEdit = (role) => setEditing(role);

  const handleSaveEdit = () => {
    setRoles((prev) => prev.map((r) => (r.id === editing.id ? editing : r)));
    setEditing(null);
  };

  // Add
  const handleAddModule = () => {
    if (!newModuleName.trim()) return;

    const newModule = {
      id: roles.length ? roles[roles.length - 1].id + 1 : 1,
      name: newModuleName,
    };

    setRoles((prev) => [...prev, newModule]);
    setNewModuleName('');
    setAdding(false);
  };

  return (
    <Card className="overflow-hidden rounded-md border">
      <CardHeader className="border-b flex justify-between items-center">
        <CardTitle className="text-lg font-medium">Role Modules</CardTitle>

        {/* Add Button */}
        <button
          onClick={() => setAdding(true)}
          size="icon"
          className="button-relative group"
        >
          <span className="button-absolute group-hover:opacity-0">Add</span>
          <Plus
            size={18}
            className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-green-500"
          />
        </button>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="overflow-x-auto table_scroll">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {roles.map((role, idx) => (
                <tr key={role.id}>
                  <td>{idx + 1}</td>
                  <td>{role.name}</td>
                  <td>
                    <button
                      size="icon"
                      className="button-relative group"
                      onClick={() => handleEdit(role)}
                    >
                      <span className="button-absolute group-hover:opacity-0">
                        Edit
                      </span>
                      <Edit
                        size={18}
                        className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-sky-500"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      {/* ------------------- ADD NEW MODULE ------------------- */}
      <Dialog open={adding} onOpenChange={() => setAdding(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Module</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            <Input
              value={newModuleName}
              onChange={(e) => setNewModuleName(e.target.value)}
              placeholder="Enter module name"
            />
          </div>

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setAdding(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddModule}>Add Module</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ------------------- EDIT MODULE ------------------- */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Module</DialogTitle>
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
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
