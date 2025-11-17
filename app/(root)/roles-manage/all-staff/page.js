'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AllStaff = () => {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    city: '',
    userType: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const data = [
    {
      name: 'haris',
      email: 'test@gmail.com',
      phone: '123321',
      address: 'bara gate',
      userType: 'Admin',
    },
    {
      name: 'haris',
      email: 'beautifulislam209@gmail.com',
      phone: '03034343433',
      address: 'bara gate',
      userType: 'Admin',
    },
  ];

  return (
    <>
      <Card className="overflow-hidden rounded-md border">
        {/* Heading Section */}
        <CardHeader className="border-b flex justify-between items-center">
          <CardTitle className="text-lg font-medium">All Staffs</CardTitle>
          <button
            onClick={() => setAdding(true)}
            className="button-relative group"
          >
            <span className="button-absolute group-hover:opacity-0">Add</span>
            <Plus
              size={18}
              className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-green-500"
            />
          </button>
        </CardHeader>

        {/* Table */}
        <CardContent className="overflow-x-auto table_scroll">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>User Type</th>
                <th>Address</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.userType}</td>
                  <td>{item.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* ADD STAFF MODAL */}
      <Dialog open={adding} onOpenChange={setAdding}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-xl">
          {/* Dark Header */}
          <div className="w-full border-b px-6 py-2 flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              Add New Staff
            </DialogTitle>
          </div>

          {/* Body Form */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <Label>Full Name</Label>
                <Input
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2"
                />
              </div>

              {/* Email */}
              <div>
                <Label>Email</Label>
                <Input
                  className="mt-2"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* City */}
              <div>
                <Label className="mb-2">City</Label>
                <Select
                  onValueChange={(value) => setForm({ ...form, city: value })}
                  className="w-full"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="peshawar">Peshawar</SelectItem>
                    <SelectItem value="islamabad">Islamabad</SelectItem>
                    <SelectItem value="karachi">Karachi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* User Type */}
              <div>
                <Label className="mb-2">User Type</Label>
                <Select
                  onValueChange={(value) =>
                    setForm({ ...form, userType: value })
                  }
                  className="w-full"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Address */}
              <div>
                <Label>Address</Label>
                <Input
                  className="mt-2"
                  placeholder="Enter address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>

              {/* Phone */}
              <div>
                <Label>Phone</Label>
                <Input
                  className="mt-2"
                  placeholder="Enter phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              {/* Password */}
              <div>
                <Label>Password</Label>
                <Input
                  className="mt-2"
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>

              {/* Confirm Password */}
              <div>
                <Label>Confirm Password</Label>
                <Input
                  className="mt-2"
                  type="password"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-8">
              <Button variant="outline" onClick={() => setAdding(false)}>
                Cancel
              </Button>

              <Button>Add Staff</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AllStaff;
