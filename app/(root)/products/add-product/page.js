'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function AddCategory() {
  const [file, setFile] = useState(null);

  // React Hook Form
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    console.log('Uploaded File:', file);
  };

  return (
    <div>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="border-b">
          <CardTitle>Add Product</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* File Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Select Image</label>
                <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Alt Content</label>
                <Input
                  placeholder="Enter Alt Content"
                  {...register('alt_content', { required: true })}
                />
              </div>
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
            <div className="flex justify-end gap-3 pt-4">
              <Button asChild variant="outline">
                <Link href="/products/categories">Cancel</Link>
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
