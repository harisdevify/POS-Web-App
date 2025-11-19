'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Edit, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const initialSuppliers = [
  {
    id: 1,
    photo: '/table.jpg',
    name: 'Hi-Tech Supplies',
    email: 'hitech@example.com',
    phone: '0300-1112223',
    shopname: 'Hi-Tech',
    type: 'Wholesale',
  },
  {
    id: 2,
    photo: '/table.jpg',
    name: 'Power Co.',
    email: 'power@example.com',
    phone: '0301-2223334',
    shopname: 'Power Store',
    type: 'Distributor',
  },
  {
    id: 3,
    photo: '/table.jpg',
    name: 'Elmax Traders',
    email: 'elmax@example.com',
    phone: '0302-3334445',
    shopname: 'Elmax',
    type: 'Retail',
  },
];

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);

  const handleDelete = (id) => {
    setSuppliers((prev) => prev.filter((s) => s.id != id));
  };

  return (
    <div>
      <Card className="shadow-md rounded-xl border">
        {/* header with soft color */}
        <CardHeader className="flex items-center justify-between border-b">
          <CardTitle className="text-lg font-medium">
            Suppliers Overview
          </CardTitle>
          <div className="flex justify-center items-center gap-2">
            <Input placeholder="Search Suppliers..." className="h-8 w-48" />
            <Link href={`/suppliers/add`} className="button-relative group">
              <span className="button-absolute group-hover:opacity-0">Add</span>
              <Plus
                size={18}
                className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-green-500"
              />
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto table_scroll">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>
                    <p className="flex justify-center items-center"> Photo</p>
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Shopname</th>
                  <th>Type</th>
                  <th>
                    <p className="flex justify-center items-center">Action</p>
                  </th>
                </tr>
              </thead>

              <tbody>
                {suppliers.length > 0 ? (
                  suppliers.map((s, index) => (
                    <tr key={s.id}>
                      <td>{index + 1}</td>
                      <td>
                        <Image
                          src={s.photo}
                          alt={s.name}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                      </td>
                      <td>{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.phone}</td>
                      <td>{s.shopname}</td>
                      <td>{s.type}</td>
                      <td>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              ⋮
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem>
                              <Link
                                href={`/suppliers/edit/${s.id}`}
                                className="flex gap-2 items-center"
                              >
                                <Edit className="w-4 h-4" />
                                View/Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Button
                                variant="outline"
                                onClick={() => handleDelete(s.id)}
                                className="flex gap-2 items-center cursor-pointer"
                              >
                                <Trash2 size={20} /> Delete
                              </Button>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-6 text-muted-foreground"
                    >
                      No suppliers found.
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
