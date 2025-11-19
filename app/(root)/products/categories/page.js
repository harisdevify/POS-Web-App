'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Edit, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const initialCategories = [
  {
    id: 1,
    name: 'Gas Cylinder',
    subCategory: 'lights',
    date: '01-01-2025',
    status: 'active',
  },
  {
    id: 2,
    name: 'Industrial Equipment',
    subCategory: 'lights',
    date: '01-01-2025',
    status: 'active',
  },
  {
    id: 3,
    name: 'Accessories',
    subCategory: 'lights',
    date: '01-01-2025',
    status: 'active',
  },
];

export default function Categories() {
  const [categories, setCategories] = useState(initialCategories);

  return (
    <div>
      <Card className="shadow-md rounded-xl border">
        <CardHeader className="border-b rounded-t-xl flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Categories</CardTitle>
          <div className="flex justify-center items-center gap-2">
            <Input placeholder="Search User..." className="h-8 w-48" />
            <Link
              href="/products/categories/add"
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
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">
                    <p className="flex justify-center items-center">Action</p>
                  </th>
                  <th className="px-4 py-2 border-b">Category</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Date/Time</th>
                </tr>
              </thead>

              <tbody>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <tr key={cat.id} className="border-b">
                      <td className="px-4 py-2">
                        <div className="flex justify-center items-center">
                          <Link
                            href={`/products/categories/edit/${cat.id}`}
                            variant="outline"
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

                      <td className="px-4 py-2">{cat.name}</td>
                      <td className="px-4 py-2">{cat.status}</td>
                      <td className="px-4 py-2">{cat.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-6 text-muted-foreground"
                    >
                      No categories available.
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
