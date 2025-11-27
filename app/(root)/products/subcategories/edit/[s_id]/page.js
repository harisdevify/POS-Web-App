'use client';

import { use, useEffect, useState } from 'react';
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
import { apiFetch, IMAGE_BASE_URL } from '@/lib/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function EditSubCategory({ params }) {
  const { s_id } = use(params);
  const [categories, setCategories] = useState([]);
  const [subCatImg, setSubCatImg] = useState(null);
  const [file, setFile] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      p_sub_category_name: '',
      s_cat_title: '',
      s_cat_subtitle: '',
      s_cat_short_desc: '',
      s_cat_long_desc: '',
      p_category_id_fk: '',
      s_cat_id: '',
      is_deleted: '0',
    },
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await apiFetch('/get-product-cate', {
          cache: 'no-store',
          method: 'POST',
        });

        if (res?.data) {
          setCategories(res?.data?.categories ?? []);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadCategories();
  }, [s_id]);

  useEffect(() => {
    const loadSubCategory = async () => {
      try {
        const res = await apiFetch('/get-single-sub-cate', {
          cache: 'no-store',
          method: 'POST',
          body: JSON.stringify({ s_cat_id: s_id }),
        });
        if (res?.data) {
          const data = res.data;

          // convert category ID to string
          data.p_category_id_fk = data.p_category_id_fk?.toString() ?? '';

          setFile(data.s_cat_image);
          setSubCatImg(data.s_cat_image);

          // Only reset if categories already loaded
          if (categories.length) {
            reset(data);
          } else {
            // wait until categories load
            const checkCategories = setInterval(() => {
              if (categories.length) {
                reset(data);
                clearInterval(checkCategories);
              }
            }, 50);
          }
        }
      } catch (error) {
        console.log(error?.message);
      }
    };
    loadSubCategory();
  }, [s_id, categories, reset]);

  const onSubmit = async (formData) => {
    const body = new FormData();
    body.append('p_sub_category_name', formData.p_sub_category_name);
    body.append('p_category_id_fk', formData.p_category_id_fk);
    body.append('s_cat_title', formData.s_cat_title);
    body.append('s_cat_subtitle', formData.s_cat_subtitle);
    body.append('s_cat_short_desc', formData.s_cat_short_desc);
    body.append('s_cat_long_desc', formData.s_cat_long_desc);
    body.append('s_cat_id', formData.s_cat_id);
    body.append('is_deleted', Number(formData.is_deleted));

    if (formData.s_cat_image?.[0]) {
      body.append('s_cat_image', subCatImg); // file upload
    }
    try {
      const res = await apiFetch('/update-product-sub-cate', {
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
  };

  return (
    <div>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="border-b">
          <CardTitle>Edit SubCategory</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar + Upload */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border">
                <Image
                  src={
                    subCatImg
                      ? subCatImg instanceof File
                        ? URL.createObjectURL(subCatImg)
                        : `${IMAGE_BASE_URL}/${subCatImg}`
                      : '/default-avatar.png'
                  }
                  width={80}
                  height={80}
                  alt="SubCategory"
                  className="object-cover"
                />
              </div>

              <Input
                type="file"
                onChange={(e) => {
                  setSubCatImg(e.target.files[0]);
                }}
                {...register('s_cat_image')}
                className="max-w-xs"
              />
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Sub Category Name</label>
                <Input
                  {...register('p_sub_category_name', { required: true })}
                />
                {errors.p_sub_category_name && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Category Title</label>
                <Input {...register('s_cat_title', { required: true })} />
                {errors.s_cat_title && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Category Subtitle</label>
                <Input {...register('s_cat_subtitle', { required: true })} />
                {errors.s_cat_subtitle && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Select Category</label>
                <Controller
                  name="p_category_id_fk"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString() ?? ''}
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
              </div>
            </div>

            {/* Descriptions */}
            <div className="flex flex-col pt-2">
              <label className="text-sm font-medium">Short Description</label>
              <Textarea rows={2} {...register('s_cat_short_desc')} />
            </div>

            <div className="flex flex-col pt-2">
              <label className="text-sm font-medium">Long Description</label>
              <Textarea rows={4} {...register('s_cat_long_desc')} />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between gap-6 pt-4">
              {/* Status Checkbox */}
              <div className="flex items-center gap-2">
                <Controller
                  name="is_deleted"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!field.value}
                        onChange={(e) => field.onChange(!e.target.checked)}
                      />
                      {!field.value ? 'Active' : 'Deactive'}
                    </label>
                  )}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-center items-center gap-2">
                <Button type="submit">Update</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
