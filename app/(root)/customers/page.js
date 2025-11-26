

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Plus } from 'lucide-react';
import Image from 'next/image';
import defaultAvatar from '@/public/default-avatar.png';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button'; // for trigger button
import { Landmark, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { apiFetch, IMAGE_BASE_URL } from '@/lib/api';


export default async function Customers() {
const res = await apiFetch('/customers', {
    method: 'POST',
    cache: 'no-store',
  });
    const customers = res?.data?.users ?? [];
  const pagination = res?.data?.meta ?? {};
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
                 
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {customers.length > 0 ? (
                  customers.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <Image
                          src={`${IMAGE_BASE_URL}/${c.photo}`}
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
