'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export default function AddSubCategories() {
  const [file, setFile] = useState(null);

  // React Hook Form
  const { register, handleSubmit, setValue, watch } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    console.log('Uploaded File:', file);
  };

  return (
    <div>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="border-b">
          <CardTitle>Add SubCategory</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* File Upload */}
            <div className="flex items-center gap-6">
              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full"
              />
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Sub Category Name</label>
                <Input
                  placeholder="Enter sub category name"
                  {...register('subCategoryName', { required: true })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Category Title</label>
                <Input
                  placeholder="Enter category title"
                  {...register('categoryTitle', { required: true })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Category Subtitle</label>
                <Input
                  placeholder="Enter category subtitle"
                  {...register('categorySubtitle')}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Select Category</label>
                <Select
                  onValueChange={(v) => setValue('category', v)}
                  defaultValue={watch('category')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hbl">HBL</SelectItem>
                    <SelectItem value="ubl">UBL</SelectItem>
                    <SelectItem value="mcb">MCB</SelectItem>
                    <SelectItem value="bank-al-habib">Bank Al Habib</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Descriptions */}
            <div className="flex flex-col pt-2">
              <label className="text-sm font-medium">Short Description</label>
              <Textarea
                placeholder="Enter short description..."
                {...register('shortDescription')}
              />
            </div>

            <div className="flex flex-col pt-2">
              <label className="text-sm font-medium">Long Description</label>
              <Textarea
                placeholder="Enter long description..."
                {...register('longDescription')}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button asChild variant="outline">
                <Link href="/products/subcategories">Cancel</Link>
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
