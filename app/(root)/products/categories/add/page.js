'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { apiFetch } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AddCategory() {
  const [file, setFile] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    //  Corrected backend fields
    formData.append('p_category_name', data.categoryName);
    formData.append('pcat_image', file);
    formData.append('pcat_title', data.categoryTitle);
    formData.append('pcat_subtitle', data.categorySubtitle);
    formData.append('pcat_short_desc', data.shortDescription);
    formData.append('pcat_long_desc', data.longDescription);

    formData.append('keywords', data.keywords);
    formData.append('meta_title', data.metaTitle);
    formData.append('meta_description', data.metaDescription);

    try {
      const res = await apiFetch('/add-product-categories', {
        method: 'POST',
        cache: 'no-store',
        body: formData,
      });

      if (res.status === true) {
        toast.success(res.message);
        router.push('/products/categories');
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    reset();
  };

  return (
    <div>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="border-b">
          <CardTitle>Add Category</CardTitle>
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
                <label className="text-sm font-medium">Category Name</label>
                <Input
                  placeholder="Enter category name"
                  {...register('categoryName', { required: true })}
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
                  placeholder="Enter subtitle"
                  {...register('categorySubtitle')}
                />
              </div>
            </div>

            {/* Descriptions */}
            <div className="flex flex-col pt-2">
              <label className="text-sm font-medium">Short Description</label>
              <Textarea
                placeholder="Write a short description"
                {...register('shortDescription')}
              />
            </div>

            <div className="flex flex-col pt-2">
              <label className="text-sm font-medium">Long Description</label>
              <Textarea
                placeholder="Write a detailed description"
                {...register('longDescription')}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
