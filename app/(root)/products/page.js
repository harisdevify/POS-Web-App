'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Edit, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const initialProducts = [
  {
    id: 1,
    title: 'Luke Mccullough',
    name: 'Kingpark Cylinder',
    category: 'Gas Cylinder',
    sub_category: 'Gas Cylinder',
    Availability: 'In Stock',
    status: 'Active',
  },
  {
    id: 2,
    title: 'Luke Mccullough',
    name: 'Kingpark Cylinder',
    category: 'Gas Cylinder',
    sub_category: 'Gas Cylinder',
    Availability: 'Out of Stock',
    status: 'Deactive',
  },
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);

  return (
    <div>
      <Card className="border rounded-md shadow-sm">
        <CardHeader className="border-b py-2 flex justify-between items-center">
          <CardTitle className="text-base font-semibold">
            Products Overview
          </CardTitle>
          <div className="flex justify-center items-center gap-2">
            <Input placeholder="Search product..." className="h-8 w-48" />
            <Link
              href={`/products/add-product`}
              className="button-relative group "
            >
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
                  <th>Title</th>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>Availability</th>
                  <th>Status</th>
                  <th>
                    <p className="flex justify-center items-center">Action</p>
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td>{p.category}</td>
                    <td>{p.sub_category}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs border ${
                          p.Availability === 'In Stock' ? 'active' : 'deactive'
                        }`}
                      >
                        {p.Availability}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs border ${
                          p.status === 'Active' ? 'active' : 'deactive'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td>
                      <div className="flex justify-center items-center">
                        <Link
                          href={`/products/edit-product/${p.id}`}
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
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
