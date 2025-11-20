'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function EditProduct() {
  const { p_id } = useParams();
  console.log(p_id);

  const [file, setFile] = useState(null);
  const { register, handleSubmit, control } = useForm();
  const products = [
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

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    console.log('Uploaded File:', file);
  };

  return (
    <div>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="border-b">
          <CardTitle>Add Product {p_id}</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center items-center gap-3 w-full">
              {/* Image Preview */}
              <div className="flex flex-col md:flex-row justify-center items-center border rounded-lg overflow-hidden h-32 w-2/5 relative">
                {file ? (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    width={120}
                    height={120}
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src="/table.jpg"
                    alt="SubCategory"
                    width={120}
                    height={120}
                    className="object-cover text-center"
                  />
                )}
              </div>

              {/* Alt Content */}
              <div className="flex flex-col justify-center w-full">
                <Label className="mb-1 text-sm font-medium">Alt Content</Label>
                <Textarea
                  placeholder="Enter Alt Content"
                  {...register('alt_content', { required: true })}
                  className="w-full h-24"
                />
              </div>
            </div>
            {/* File Upload */}
            <div className="flex flex-col justify-center">
              <Label className="mb-1 text-sm font-medium">Select Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full cursor-pointer"
              />
            </div>
            <div className="flex flex-col pt-2">
              <label className="text-sm font-medium">Product Description</label>
              <Textarea
                placeholder="add Product Description..."
                {...register('pro_desc')}
              />
            </div>
            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium">Keywords</label>
                <Input placeholder="Enter keywords" {...register('keywords')} />
              </div>

              <div>
                <label className="text-sm font-medium">Meta Title</label>
                <Input
                  placeholder="Enter meta title"
                  {...register('metaTitle')}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Meta Description</label>
                <Input
                  placeholder="Enter meta description"
                  {...register('metaDescription')}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Product Title</label>
                <Input
                  placeholder="Enter Product Title"
                  {...register('pro_title', { required: true })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Select Category</Label>
                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      className="w-full"
                      onValueChange={field.onChange}
                      value={field.value}
                      position="popper"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Label>Select Sub Category</Label>
                <Controller
                  name="subCategory"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      className="w-full"
                      onValueChange={field.onChange}
                      value={field.value}
                      position="popper"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a sub category" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Label>Youtube Video</Label>
                <Controller
                  name="youtubeVideo"
                  control={control}
                  defaultValue="No"
                  render={({ field }) => (
                    <Select
                      className="w-full"
                      onValueChange={field.onChange}
                      value={field.value}
                      position="popper"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label>Youtube Video URL</Label>
                <Input placeholder="URL" {...register('youtubeUrl')} />
              </div>

              <div className="grid gap-2">
                <Label>Youtube Video ID</Label>
                <Input placeholder="Video ID" {...register('youtubeVideoId')} />
              </div>
              <div className="grid gap-2">
                <Label>In Stock</Label>
                <Controller
                  name="inStock"
                  control={control}
                  defaultValue="No"
                  render={({ field }) => (
                    <Select
                      className="w-full"
                      onValueChange={field.onChange}
                      value={field.value}
                      position="popper"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Stock?" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* SHADCN SELECT - Featured */}
              <div className="grid gap-2">
                <Label>Featured</Label>
                <Controller
                  name="featured"
                  control={control}
                  defaultValue="No"
                  render={({ field }) => (
                    <Select
                      className="w-full"
                      onValueChange={field.onChange}
                      value={field.value}
                      position="popper"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Featured?" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Input
                  type="checkbox"
                  id="status"
                  {...register('status')}
                  className="w-4 h-4"
                />
                <label htmlFor="status" className="text-sm font-medium">
                  Active
                </label>
              </div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Product Variants Table */}
      <Card className="border rounded-md shadow-sm mt-6">
        <CardHeader className="border-b py-2 flex justify-between items-center">
          <CardTitle>Product Variants</CardTitle>

          {/* Add Variant Button (DialogTrigger) */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="button-relative group ">
                <span className="button-absolute group-hover:opacity-0">
                  Add
                </span>
                <Plus
                  size={18}
                  className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-green-500"
                />
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl w-full">
              <DialogHeader>
                <DialogTitle>Add Variant</DialogTitle>
              </DialogHeader>

              <form className="grid grid-cols-2 gap-4 mt-4">
                <Input type="file" />
                <Input type="text" placeholder="Enter Alt Content" />
                <Select className="w-full">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Color" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="Red">Red</SelectItem>
                    <SelectItem value="Blue">Blue</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="text" placeholder="Enter Variant Name" />
                <Input type="number" placeholder="Enter Weight" />
                <Input type="number" placeholder="Enter Original Price" />
                <Input type="number" placeholder="Enter Price" />
                <Input type="number" placeholder="Enter Discount" />
                <Input type="number" placeholder="Enter Total Quantity" />
                <Input type="number" placeholder="Enter Available Quantity" />

                <DialogFooter className="col-span-2 flex justify-end gap-2 mt-4">
                  <Button type="submit">Add Variant</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto table_scroll">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Available Quantity</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t">
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
                    <td className="text-center">
                      <Link
                        href={`/products/edit-product/${p_id}/prod-varianr/${p.id}`}
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
