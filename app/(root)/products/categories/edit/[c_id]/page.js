'use client';

import { use, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { apiFetch, IMAGE_BASE_URL } from '@/lib/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function EditSubCategory({ params }) {
  const { c_id } = use(params);
  const [file, setFile] = useState(null);
  const router = useRouter();
  const [catImg, setCatImg] = useState(null);

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      keywords: '',
      meta_title: '',
      meta_description: '',
      p_category_name: '',
      pcat_title: '',
      pcat_subtitle: '',
      pcat_short_desc: '',
      pcat_long_desc: '',
      is_deleted: '0',
    },
  });

  // Fetch category from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await apiFetch('/get-single-cate', {
          method: 'POST',
          cache: 'no-store',
          body: JSON.stringify({ p_category_id: c_id }),
        });

        if (res) {
          const data = res.data;
          setFile(data.pcat_image);
          reset(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, [c_id, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('p_category_id', c_id);
    formData.append('keywords', data.keywords);
    formData.append('meta_title', data.meta_title);
    formData.append('meta_description', data.meta_description);
    formData.append('p_category_name', data.p_category_name);
    formData.append('pcat_title', data.pcat_title);
    formData.append('pcat_subtitle', data.pcat_subtitle);
    formData.append('pcat_short_desc', data.pcat_short_desc);
    formData.append('pcat_long_desc', data.pcat_long_desc);
    formData.append('is_deleted', Number(data.is_deleted));
    if (data.pcat_image?.[0]) {
      formData.append('pcat_image', catImg); // file upload
    }

    try {
      const res = await apiFetch('/update-product-cate', {
        cache: 'no-store',
        method: 'POST',
        body: formData,
      });
      if (res.status === true) {
        toast.success(res.message);
        router.push('/products/categories');
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
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
              <div className="w-20 h-20 rounded overflow-hidden border">
                <Image
                  src={`${IMAGE_BASE_URL}/${file}`}
                  width={80}
                  height={80}
                  alt="SubCategory"
                  className="object-cover"
                />
              </div>

              <Input
                type="file"
                onChange={(e) => {
                  setCatImg(e.target.files[0]);
                }}
                className="max-w-xs"
              />
            </div>

            {/* SEO & Category Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div>
                <label className="text-sm font-medium">Keywords</label>
                <Input {...register('keywords')} />
              </div>

              <div>
                <label className="text-sm font-medium">Meta Title</label>
                <Input {...register('meta_title')} />
              </div>

              <div>
                <label className="text-sm font-medium">Meta Description</label>
                <Input {...register('meta_description')} />
              </div>

              <div>
                <label className="text-sm font-medium">Name</label>
                <Input {...register('p_category_name')} />
              </div>

              <div>
                <label className="text-sm font-medium">Category Title</label>
                <Input {...register('pcat_title')} />
              </div>

              <div>
                <label className="text-sm font-medium">Category Subtitle</label>
                <Input {...register('pcat_subtitle')} />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="text-sm font-medium">Short Description</label>
                <Textarea rows={2} {...register('pcat_short_desc')} />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="text-sm font-medium">Long Description</label>
                <Textarea rows={4} {...register('pcat_long_desc')} />
              </div>
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
