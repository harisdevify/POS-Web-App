'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

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
import { apiFetch } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AddSubCategories() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await apiFetch('/get-product-cate', {
          cache: 'no-store',
          method: 'POST',
        });
        console.log(res);
        if (res?.data) {
          setCategories(res?.data?.categories);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.log(error?.message);
      }
    };
    loadData();
  }, []);

  const onSubmit = async (data) => {
    const body = new FormData();
    body.append('p_sub_category_name', data.p_sub_category_name);
    body.append('s_cat_title', data.s_cat_title);
    body.append('s_cat_subtitle', data.s_cat_subtitle);
    body.append('select_category', data.select_category);
    body.append('s_cat_short_desc', data.s_cat_short_desc);
    body.append('s_cat_long_desc', data.s_cat_long_desc);
    body.append('p_category_id_fk', data.select_category);
    if (data.s_cat_image?.[0]) {
      body.append('s_cat_image', data.s_cat_image[0]);
    }

    try {
      const res = await apiFetch('/add-product-sub-category', {
        cache: 'no-store',
        method: 'POST',
        body,
      });

      if (res && res.status === true) {
        toast.success(res.message);
        router.push('/products/subcategories');
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
    }

    reset();
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
                {...register('s_cat_image')}
                className="w-full"
              />
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Sub Category Name</label>
                <Input
                  placeholder="Sub Category Name"
                  {...register('p_sub_category_name', { required: true })}
                />
                {errors.p_sub_category_name && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Category Title</label>
                <Input
                  placeholder="Category Title"
                  {...register('s_cat_title', { required: true })}
                />
                {errors.s_cat_title && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Category Subtitle</label>
                <Input
                  placeholder="Category Subtitle"
                  {...register('s_cat_subtitle', { required: true })}
                />
                {errors.s_cat_subtitle && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Select Category</label>
                <Controller
                  name="select_category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ''}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="--Select Category--" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.length > 0 ? (
                          categories.map((cat) => (
                            <SelectItem
                              key={cat.p_category_id}
                              value={cat.p_category_id.toString()}
                            >
                              {cat.p_category_name}
                            </SelectItem>
                          ))
                        ) : (
                          <p className="px-3 py-2 text-sm text-gray-500">
                            No categories found
                          </p>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.s_cat_subtitle && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>
            </div>

            {/* Descriptions */}
            <div className="flex flex-col pt-2">
              <label className="text-sm font-medium">Short Description</label>
              <Textarea
                placeholder="Short Description"
                rows={3}
                {...register('s_cat_short_desc')}
              />
            </div>

            <div className="flex flex-col pt-2">
              <label className="text-sm font-medium">Long Description</label>
              <Textarea
                placeholder="Long Description"
                rows={4}
                {...register('s_cat_long_desc')}
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
