'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const UpdateRole = () => {
  const [roleName, setRoleName] = useState('Dashboard');

  const modules = [
    'Dashboard',
    'Users',
    'Roles',
    'Products',
    'Orders',
    'Reports',
  ];

  return (
    <div>
      <Card className="shadow-md border rounded-xl">
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-medium">Update Role</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Role Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">Role Name</label>
            <Input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Enter Role Name"
            />
          </div>

          {/* Permissions Table */}
          <div className="overflow-x-auto table_scroll">
            <table>
              <thead>
                <tr>
                  <th>Module</th>
                  <th>Permissions</th>
                </tr>
              </thead>

              <tbody>
                {modules.map((module, index) => (
                  <tr key={index}>
                    <td>{module}</td>
                    <td>
                      <div className="flex items-center gap-6 justify-start">
                        {/* Read */}
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

          {/* Save */}
          <div className="flex justify-end">
            <Button variant="outline">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateRole;
