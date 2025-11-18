'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button'; // for trigger button
import { Landmark, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const initialCustomers = [
  {
    id: 1,
    photo: '/table.jpg',
    name: 'Ali Khan',
    email: 'ali@example.com',
    phone: '0301-1234567',
    shopname: 'Ali Traders',
    remainingBalance: 1500,
  },
  {
    id: 2,
    photo: '/table.jpg',
    name: 'Ahmad Raza',
    email: 'ahmad@example.com',
    phone: '0302-9876543',
    shopname: 'Raza Mart',
    remainingBalance: 800,
  },
  {
    id: 3,
    photo: '/table.jpg',
    name: 'Sara Ahmed',
    email: 'sara@example.com',
    phone: '0303-1122334',
    shopname: 'Sara Store',
    remainingBalance: 0,
  },
];

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);

  return (
    <div>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-base font-semibold flex justify-between items-center">
            Customers Overview
            <Link href={`/customers/add`} className="button-relative group">
              <span className="button-absolute group-hover:opacity-0">Add</span>
              <Plus
                size={18}
                className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-green-500"
              />
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto table_scroll">
            <table>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Shop Name</th>
                  <th>Remaining Balance</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {customers.length > 0 ? (
                  customers.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <Image
                          src={c.photo}
                          alt={c.name}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                      </td>

                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>{c.shopname}</td>
                      <td>Rs. {c.remainingBalance}</td>

                      <td className="text-center border">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              ⋮
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem>
                              <Link
                                href={`/customers/edit/${c.id}`}
                                className="flex gap-2 items-center"
                              >
                                <Edit className="w-4 h-4" />
                                View/Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link
                                href={`/customers/order/${c.id}`}
                                className="flex gap-2 items-center"
                              >
                                <ShoppingBag size={20} /> Order
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link
                                href={`/customers/transaction/${c.id}`}
                                className="flex gap-2 items-center"
                              >
                                <Landmark size={20} /> Transaction
                              </Link>
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
                      className="text-center py-4 text-muted-foreground border"
                    >
                      No customers found.
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
