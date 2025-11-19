'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Edit, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const initialEmployees = [
  {
    id: 1,
    photo: '/table.jpg',
    name: 'Ali Raza',
    email: 'ali.raza@example.com',
    phone: '0300-1112233',
    salary: '50,000',
    city: 'Lahore',
  },
  {
    id: 2,
    photo: '/table.jpg',
    name: 'Ahmed Khan',
    email: 'ahmed.khan@example.com',
    phone: '0301-2223344',
    salary: '45,000',
    city: 'Karachi',
  },
  {
    id: 3,
    photo: '/table.jpg',
    name: 'Sara Malik',
    email: 'sara.malik@example.com',
    phone: '0302-3334455',
    salary: '55,000',
    city: 'Islamabad',
  },
];

export default function Employees() {
  const [employees, setEmployees] = useState(initialEmployees);

  return (
    <div>
      <Card className="shadow-md rounded-xl border">
        {/* Header with soft color */}
        <CardHeader className="border-b rounded-t-xl flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Users</CardTitle>
          <div className="flex justify-center items-center gap-2">
            <Input placeholder="Search User..." className="h-8 w-48" />
            <Link href={`/users/add`} className="button-relative group">
              <span className="button-absolute group-hover:opacity-0">Add</span>
              <Plus
                size={18}
                className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-green-500"
              />
            </Link>
          </div>
        </CardHeader>

        {/* Table */}
        <CardContent>
          <div className="overflow-x-auto table_scroll">
            <table>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Salary</th>
                  <th>City</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {employees.length > 0 ? (
                  employees.map((e) => (
                    <tr key={e.id}>
                      <td>
                        <Image
                          src={e.photo}
                          alt={e.name}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                      </td>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.phone}</td>
                      <td>{e.salary}</td>
                      <td>{e.city}</td>
                      <td>
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/users/edit/${e.id}`}
                            className="button-relative group"
                          >
                            <span className="button-absolute group-hover:opacity-0">
                              Edit
                            </span>
                            <Edit
                              size={18}
                              className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-sky-500"
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-6 text-muted-foreground"
                    >
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
