'use client';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Label } from '../ui/label';

export default function EditProduct({ selectedProduct, setOpen }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: selectedProduct.name,
      category: selectedProduct.category,
      supplier: selectedProduct.supplier,
      stock: selectedProduct.stock,
      buyingPrice: selectedProduct.buyingPrice,
      sellingPrice: selectedProduct.sellingPrice,
    },
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    setOpen(false); // close the dialog
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center">
        <Image
          src={selectedProduct.image}
          alt={selectedProduct.name}
          width={100}
          height={100}
          className="rounded-md mb-2"
        />

        <Input
          type="file"
          accept="image/*"
          {...register('image')}
          className="w-full"
        />
      </div>

      <div>
        <Label className="mb-2">Product Name *</Label>
        <Input {...register('name', { required: true })} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="mb-2">Category *</Label>
          <Input {...register('category', { required: true })} />
        </div>
        <div>
          <Label className="mb-2">Supplier *</Label>
          <Input {...register('supplier', { required: true })} />
        </div>
      </div>

      <div>
        <Label className="mb-2">Stock *</Label>
        <Input type="number" {...register('stock', { required: true })} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="mb-2">Buying Price *</Label>
          <Input
            type="number"
            {...register('buyingPrice', { required: true })}
          />
        </div>
        <div>
          <Label className="mb-2">Selling Price *</Label>
          <Input
            type="number"
            {...register('sellingPrice', { required: true })}
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" type="button" onClick={() => setOpen(false)}>
          Cancel
        </Button>

        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );
}
