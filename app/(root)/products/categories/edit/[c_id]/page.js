'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import Link from 'next/link';

export default function EditSubCategory({ existingData }) {
  const [file, setFile] = useState(null);

  // React Hook Form
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: existingData || {},
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    console.log('Uploaded File:', file);
  };

  return (
    <div>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="border-b">
          <CardTitle>Edit Category</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar + Upload */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border">
                <Image
                  src={existingData?.image || '/table.jpg'}
                  width={80}
                  height={80}
                  alt="SubCategory"
                  className="object-cover"
                />
              </div>

              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="max-w-xs"
              />
            </div>

            {/* SEO & Category Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div>
                <label className="text-sm font-medium">Keywords</label>
                <Input
                  placeholder="Enter keywords..."
                  {...register('keywords')}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Meta Title</label>
                <Input
                  placeholder="Enter meta title..."
                  {...register('metaTitle')}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Meta Description</label>
                <Input
                  placeholder="Enter meta description..."
                  {...register('metaDescription')}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Name</label>
                <Input placeholder="Enter name..." {...register('name')} />
              </div>

              <div>
                <label className="text-sm font-medium">Category Title</label>
                <Input
                  placeholder="Enter category title..."
                  {...register('categoryTitle')}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Category Subtitle</label>
                <Input
                  placeholder="Enter category subtitle..."
                  {...register('categorySubtitle')}
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="text-sm font-medium">Short Description</label>
                <Textarea
                  placeholder="Enter short description..."
                  {...register('shortDescription')}
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="text-sm font-medium">Long Description</label>
                <Textarea
                  placeholder="Enter long description..."
                  {...register('longDescription')}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between gap-6 pt-4">
              {/* Status Checkbox */}
              <div className="flex items-center gap-2">
                <Input
                  type="checkbox"
                  id="status"
                  {...register('status')}
                  defaultChecked={watch('status') === 'active' || false}
                  className="w-4 h-4"
                />
                <label htmlFor="status" className="text-sm font-medium">
                  Active
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-center items-center gap-2">
                <Button asChild variant="outline">
                  <Link href="/products/subcategories">Cancel</Link>
                </Button>
                <Button type="submit">Update</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
