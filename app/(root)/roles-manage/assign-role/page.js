'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const initialModules = [
  { id: 1, module: 'Dashboard', read: true, write: false },
  { id: 2, module: 'Products', read: true, write: true },
  { id: 3, module: 'Categories', read: true, write: false },
  { id: 4, module: 'Suppliers', read: true, write: false },
  { id: 5, module: 'Customers', read: true, write: false },
  { id: 6, module: 'Sales', read: true, write: true },
  { id: 7, module: 'Reports', read: true, write: false },
];

export default function AssignRoles() {
  const [modules, setModules] = useState(initialModules);
  const [roleName, setRoleName] = useState('');

  const handleSave = () => {
    if (!roleName.trim()) {
      alert('⚠️ Please enter a role name before saving.');
      return;
    }
    alert(`Permissions for "${roleName}" saved successfully ✅`);
  };

  return (
    <Card className="shadow-md border rounded-xl">
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-medium">Assign Roles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Role Name Input */}
        <div>
          <label className="block mb-2 text-sm font-medium">Role Name</label>
          <Input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Enter Role Name"
          />
        </div>
        {/* Table */}
        <div className="overflow-x-auto table_scroll">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Module</th>
                <th>Permissions</th>
              </tr>
            </thead>

            <tbody>
              {modules.map((m, idx) => (
                <tr key={m.id}>
                  <td>{idx + 1}</td>
                  <td>{m.module}</td>
                  <td className="min-w-[200px]">
                    <div className="flex items-center justify-start gap-6 flex-wrap min-w-[200px]">
                      <div className="flex items-center gap-2">
                        <Checkbox className="cursor-pointer" />
                        <Label className="text-sm select-none">Read</Label>
                      </div>

                      {/* Write */}
                      <div className="flex items-center gap-2">
                        <Checkbox className="cursor-pointer" />
                        <Label className="text-sm select-none">Write</Label>
                      </div>
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
      </CardContent>
    </Card>
  );
}
