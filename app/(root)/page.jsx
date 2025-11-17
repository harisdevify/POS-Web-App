'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      image: 'https://pos.mianhardware.com/assets/images/product/default.webp',
      name: 'Wireless Mouse',
      category: 'Accessories',
      stock: 120,
      buyingPrice: 900,
      sellingPrice: 1200,
      supplier: 'LogiTech',
      status: 'In Stock',
    },
    {
      id: 2,
      image: 'https://pos.mianhardware.com/assets/images/product/default.webp',
      name: 'Bluetooth Keyboard',
      category: 'Accessories',
      stock: 80,
      buyingPrice: 1100,
      sellingPrice: 1500,
      supplier: 'KeyPro',
      status: 'Low Stock',
    },
    {
      id: 3,
      image: 'https://pos.mianhardware.com/assets/images/product/default.webp',
      name: 'USB-C Hub',
      category: 'Electronics',
      stock: 0,
      buyingPrice: 1400,
      sellingPrice: 1800,
      supplier: 'Kingpark',
      status: 'Out of Stock',
    },
    {
      id: 4,
      image: 'https://pos.mianhardware.com/assets/images/product/default.webp',
      name: 'USB-C Hub',
      category: 'Electronics',
      stock: 0,
      buyingPrice: 1400,
      sellingPrice: 1800,
      supplier: 'Kingpark',
      status: 'Out of Stock',
    },
    {
      id: 5,
      image: 'https://pos.mianhardware.com/assets/images/product/default.webp',
      name: 'USB-C Hub',
      category: 'Electronics',
      stock: 0,
      buyingPrice: 1400,
      sellingPrice: 1800,
      supplier: 'Kingpark',
      status: 'Out of Stock',
    },
  ];

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  const stats = [
    { label: 'Total Paid', value: 'Rs. 125K' },
    { label: 'Total Due', value: 'Rs. 85K' },
    { label: 'Complete Orders', value: '4.5%' },
    { label: 'Pending Orders', value: '4.5%' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <Card
            key={index}
            className="rounded-xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <CardHeader className="pb-4 space-y-1">
              <CardDescription className="text-sm tracking-wide">
                {item.label}
              </CardDescription>
              <CardTitle className="text-3xl font-semibold tracking-tight">
                {item.value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* ---------- Product Table ---------- */}
      <Card className="border rounded-lg shadow-sm">
        <CardHeader className="flex items-center justify-between border-b">
          <CardTitle className="text-base font-semibold">
            New Products
          </CardTitle>
          <Link href="/products">
            <Button size="sm" variant="outline">
              View All
            </Button>
          </Link>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto table_scroll">
            <table>
              <thead>
                <tr>
                  <th>
                    <p className="flex justify-center items-center">Image</p>
                  </th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>
                    <p className="flex justify-center items-center">Action</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={40}
                        height={40}
                      />
                    </td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>{p.stock}</td>
                    <td>Rs. {p.sellingPrice}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs border ${
                          p.status === 'In Stock'
                            ? 'text-green-600 border-green-600'
                            : p.status === 'Low Stock'
                            ? 'text-yellow-600 border-yellow-600'
                            : 'text-red-600 border-red-600'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ---------- Edit Product Dialog ---------- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <form className="space-y-4">
              <div className="flex flex-col items-center">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={100}
                  height={100}
                  className="rounded-md mb-2"
                />
                <Input type="file" accept="image/*" className="w-full" />
              </div>

              <div>
                <Label className="mb-2">Product Name *</Label>
                <Input defaultValue={selectedProduct.name} />
              </div>

              <div className="grid grid-cols-2">
                <div>
                  <Label className="mb-2">Category *</Label>
                  <Input defaultValue={selectedProduct.category} />
                </div>
                <div>
                  <Label className="mb-2">Supplier *</Label>
                  <Input defaultValue={selectedProduct.supplier} />
                </div>
              </div>

              <div>
                <Label className="mb-2">Stock *</Label>
                <Input type="number" defaultValue={selectedProduct.stock} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="mb-2">Buying Price *</Label>
                  <Input
                    type="number"
                    defaultValue={selectedProduct.buyingPrice}
                  />
                </div>
                <div>
                  <Label className="mb-2">Selling Price *</Label>
                  <Input
                    type="number"
                    defaultValue={selectedProduct.sellingPrice}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
