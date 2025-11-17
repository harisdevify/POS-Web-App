'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const initialProducts = [
  {
    id: 1,
    photo: 'https://pos.mianhardware.com/assets/images/product/default.webp',
    name: 'Kingpark Cylinder',
    category: 'Gas Cylinder',
    supplier: 'Hi-Tech Supplies',
    stock: 50,
    buyingDate: '2024-10-05',
    buyingPrice: 1500,
    sellingPrice: 1800,
  },
  {
    id: 2,
    photo: 'https://pos.mianhardware.com/assets/images/product/default.webp',
    name: 'Hi Power Cylinder',
    category: 'Gas Cylinder',
    supplier: 'Power Co.',
    stock: 30,
    buyingDate: '2024-09-20',
    buyingPrice: 800,
    sellingPrice: 1000,
  },
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleEdit = (product) => {
    setEditing(product);
    setPreview(product.photo);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      setEditing({ ...editing, photo: previewURL });
    }
  };

  const handleSave = () => {
    setProducts(products.map((p) => (p.id === editing.id ? editing : p)));
    setEditing(null);
    setPreview(null);
  };

  return (
    <div className="p-4">
      <Card className="border rounded-md shadow-sm">
        <CardHeader className="border-b py-2">
          <CardTitle className="text-base font-semibold">
            Products Overview
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto table_scroll">
            <table>
              <thead>
                <tr>
                  <th>
                    <p className="flex justify-center items-center">Photo</p>
                  </th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Supplier</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>
                    {' '}
                    <p className="flex justify-center items-center">
                      Action
                    </p>{' '}
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((p, index) => (
                  <tr key={index}>
                    <td>
                      <Image
                        src={p.photo}
                        alt={p.name}
                        width={35}
                        height={35}
                        className="rounded"
                      />
                    </td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>{p.supplier}</td>
                    <td>{p.stock}</td>
                    <td>Rs. {p.sellingPrice}</td>
                    <td>
                      <button
                        size="icon"
                        className="button-relative group"
                        onClick={() => handleEdit(p)}
                      >
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

      {/* Edit Product Dialog */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] p-6 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Edit Product
            </DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-6">
              {/* Image Upload */}
              <div className="flex flex-col border rounded-md p-3 bg-muted/20">
                <Label htmlFor="photo" className="font-medium mb-2">
                  Choose File
                </Label>
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 border rounded-md overflow-hidden ">
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs ">
                        No Image
                      </div>
                    )}
                  </div>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Product Name *</Label>
                  <Input
                    value={editing.name}
                    onChange={(e) =>
                      setEditing({ ...editing, name: e.target.value })
                    }
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <Label>Category *</Label>
                  <Input
                    value={editing.category}
                    onChange={(e) =>
                      setEditing({ ...editing, category: e.target.value })
                    }
                    placeholder="Enter category"
                  />
                </div>
                <div>
                  <Label>Supplier *</Label>
                  <Input
                    value={editing.supplier}
                    onChange={(e) =>
                      setEditing({ ...editing, supplier: e.target.value })
                    }
                    placeholder="Enter supplier"
                  />
                </div>
                <div>
                  <Label>Stock *</Label>
                  <Input
                    type="number"
                    value={editing.stock}
                    onChange={(e) =>
                      setEditing({ ...editing, stock: Number(e.target.value) })
                    }
                    placeholder="Enter stock"
                  />
                </div>
                <div>
                  <Label>Buying Date</Label>
                  <Input
                    type="date"
                    value={editing.buyingDate}
                    onChange={(e) =>
                      setEditing({ ...editing, buyingDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Buying Price *</Label>
                  <Input
                    type="number"
                    value={editing.buyingPrice}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        buyingPrice: Number(e.target.value),
                      })
                    }
                    placeholder="Enter buying price"
                  />
                </div>
                <div>
                  <Label>Selling Price *</Label>
                  <Input
                    type="number"
                    value={editing.sellingPrice}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        sellingPrice: Number(e.target.value),
                      })
                    }
                    placeholder="Enter selling price"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
