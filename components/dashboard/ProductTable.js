'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { useState } from 'react';
import EditProduct from './EditProduct';

export function ProductTable({ products }) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(products || null);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  return (
    <>
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
                  <Image src={p.image} alt={p.name} width={40} height={40} />
                </td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
                <td>Rs. {p.sellingPrice}</td>
                <td>
                  <span
                    className={` ${
                      p.status === 'In Stock' ? 'active' : 'deactive'
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <EditProduct selectedProduct={selectedProduct} setOpen={setOpen} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
