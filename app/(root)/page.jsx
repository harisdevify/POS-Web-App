"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      image: "/images/box.png",
      name: "Wireless Mouse",
      category: "Accessories",
      stock: 120,
      buyingPrice: 900,
      sellingPrice: 1200,
      supplier: "LogiTech",
      status: "In Stock",
    },
    {
      id: 2,
      image: "/images/box.png",
      name: "Bluetooth Keyboard",
      category: "Accessories",
      stock: 80,
      buyingPrice: 1100,
      sellingPrice: 1500,
      supplier: "KeyPro",
      status: "Low Stock",
    },
    {
      id: 3,
      image: "/images/box.png",
      name: "USB-C Hub",
      category: "Electronics",
      stock: 0,
      buyingPrice: 1400,
      sellingPrice: 1800,
      supplier: "Kingpark",
      status: "Out of Stock",
    },
  ];

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  return (
    <div className=" space-y-6">
      {/* ---------- Top 3 Summary Cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border rounded-lg shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Total Paid</CardDescription>
            <CardTitle className="text-2xl font-semibold">Rs. 125,000</CardTitle>
          </CardHeader>
        </Card>

        <Card className="border rounded-lg shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Total Due</CardDescription>
            <CardTitle className="text-2xl font-semibold">Rs. 85,000</CardTitle>
          </CardHeader>
        </Card>

        <Card className="border rounded-lg shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Complete Orders</CardDescription>
            <CardTitle className="text-2xl font-semibold">4.5%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* ---------- Product Table ---------- */}
      <Card className="border rounded-lg shadow-sm">
        <CardHeader className="flex items-center justify-between border-b py-2">
          <CardTitle className="text-base font-semibold">New Products</CardTitle>
          <Link href="/products">
            <Button size="sm" variant="outline">
              View All
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-3 py-2 text-left">Image</th>
                  <th className="border px-3 py-2 text-left">Product</th>
                  <th className="border px-3 py-2 text-left">Category</th>
                  <th className="border px-3 py-2 text-left">Stock</th>
                  <th className="border px-3 py-2 text-left">Price</th>
                  <th className="border px-3 py-2 text-left">Status</th>
                  <th className="border px-3 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                    </td>
                    <td className="border px-3 py-2">{p.name}</td>
                    <td className="border px-3 py-2">{p.category}</td>
                    <td className="border px-3 py-2">{p.stock}</td>
                    <td className="border px-3 py-2">Rs. {p.sellingPrice}</td>
                    <td className="border px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs border ${
                          p.status === "In Stock"
                            ? "text-green-600 border-green-600"
                            : p.status === "Low Stock"
                            ? "text-yellow-600 border-yellow-600"
                            : "text-red-600 border-red-600"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="border px-3 py-2 text-center">
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
                  className="rounded-md mb-2 border"
                />
                <Input type="file" accept="image/*" className="w-full" />
              </div>

              <div>
                <Label>Product Name *</Label>
                <Input defaultValue={selectedProduct.name} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Category *</Label>
                  <Input defaultValue={selectedProduct.category} />
                </div>
                <div>
                  <Label>Supplier *</Label>
                  <Input defaultValue={selectedProduct.supplier} />
                </div>
              </div>

              <div>
                <Label>Stock *</Label>
                <Input type="number" defaultValue={selectedProduct.stock} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Buying Price *</Label>
                  <Input type="number" defaultValue={selectedProduct.buyingPrice} />
                </div>
                <div>
                  <Label>Selling Price *</Label>
                  <Input type="number" defaultValue={selectedProduct.sellingPrice} />
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
