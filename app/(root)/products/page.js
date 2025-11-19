'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    Availability: 'Hi-Tech Supplies',
    status: 'active',
  },
  {
    id: 1,
    title: 'Luke Mccullough',
    name: 'Kingpark Cylinder',
    category: 'Gas Cylinder',
    sub_category: 'Gas Cylinder',
    Availability: 'Hi-Tech Supplies',
    status: 'active',
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
                {products.map((p, index) => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td>{p.category}</td>
                    <td>{p.sub_category}</td>
                    <td>{p.Availability}</td>
                    <td>{p.status}</td>

                    <td>
                      <button className="button-relative group">
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
      </Card>
    </div>
  );
}
