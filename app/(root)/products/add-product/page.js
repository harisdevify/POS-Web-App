'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { apiFetch } from '@/lib/api';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function AddCategory() {
  const [file, setFile] = useState(null);
  const [productCatTypes, setProductCatTypes] = useState([]);
  const [productSubcategories, setProductSubcategories] = useState([]);
  const { register, handleSubmit, control, watch } = useForm();
  const router = useRouter();
  const watchCategory = watch('category_id_fk');
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchProductCat = async () => {
      try {
        const res = await apiFetch('/get-product-cate', {
          cache: 'no-store',
          method: 'POST',
        });
        if (res?.data) {
          setProductCatTypes(res.data?.categories);
        } else {
          toast.error(res.message);
        }
      } catch {
        toast.error('Failed to load product category.');
      }
    };
    fetchProductCat();
  }, []);

  // Fetch Subcategories
  const fetchSubcategories = async (categoryId) => {
    if (!categoryId) return;
    try {
      const res = await apiFetch('/subcategories-by-category', {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({ category_id: Number(categoryId) }),
      });

      if (res?.data?.data && Array.isArray(res.data.data)) {
        setProductSubcategories(res.data.data);
      } else {
        setProductSubcategories([]);
      }
    } catch {
      setProductSubcategories([]);
    }
  };

  useEffect(() => {
    if (watchCategory) fetchSubcategories(watchCategory);
  }, [watchCategory]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append('keywords', data.keywords || '');
    formData.append('meta_title', data.meta_title || '');
    formData.append('meta_desc', data.meta_desc || '');
    formData.append('product_name', data.product_name || '');
    formData.append('alt_content', data.alt_content || '');
    formData.append('product_details', data.product_details || '');
    formData.append('category_id_fk', data.category_id_fk || '');
    formData.append('subcat_id_fk', data.subcat_id_fk || '');
    formData.append('is_youtube_video', data.is_youtube_video == 1 ? 1 : 0);
    formData.append('youtube_video_url', data.youtube_video_url || '');
    formData.append('youtube_video_id', data.youtube_video_id || '');
    formData.append('in_stock', data.in_stock == 1 ? 1 : 0);
    formData.append('is_featured', data.is_featured == 1 ? 1 : 0);
    formData.append('user_id', userId || '');

    if (file) {
      formData.append('product_image', file);
    }

    try {
      const res = await apiFetch('/add-products', {
        method: 'POST',
        cache: 'no-store',
        body: formData,
      });
      console.log(res);
      if (res?.status === true) {
        toast.success(res.message);
        router.push(`/products`);
      } else toast.error(res.message);
    } catch (err) {
      toast.error('Error while adding product.');
    }
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
                  required
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
                {...register('product_details')}
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
                  {...register('meta_title')}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Meta Description</label>
                <Input
                  placeholder="Enter meta description"
                  {...register('meta_desc')}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Product Title</label>
                <Input
                  placeholder="Enter Product Title"
                  {...register('product_name', { required: true })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Select Category</Label>
                <Controller
                  name="category_id_fk"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(val) => field.onChange(val)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Category</SelectLabel>
                          {productCatTypes?.map((pc_type) => (
                            <SelectItem
                              key={pc_type.p_category_id}
                              value={String(pc_type.p_category_id)}
                            >
                              {pc_type.p_category_name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Label>Select Sub Category</Label>
                <Controller
                  name="subcat_id_fk"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(val) => field.onChange(val)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Sub Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Sub Category</SelectLabel>
                          {productSubcategories?.length > 0
                            ? productSubcategories.map((subcat) => (
                                <SelectItem
                                  key={subcat.s_cat_id}
                                  value={String(subcat.s_cat_id)}
                                >
                                  {subcat.p_sub_category_name}
                                </SelectItem>
                              ))
                            : null}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Label>Youtube Video</Label>
                <Controller
                  name="is_youtube_video"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Select
                      value={String(field.value)}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Youtube Video" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Youtube Video</SelectLabel>
                          <SelectItem value="1">Yes</SelectItem>
                          <SelectItem value="0">No</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label>Youtube Video URL</Label>
                <Input placeholder="URL" {...register('youtube_video_url')} />
              </div>

              <div className="grid gap-2">
                <Label>Youtube Video ID</Label>
                <Input
                  placeholder="Video ID"
                  {...register('youtube_video_id')}
                />
              </div>
              <div className="grid gap-2">
                <Label>In Stock</Label>
                <Controller
                  name="in_stock"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Select
                      value={String(field.value)}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="In Stock" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>In Stock</SelectLabel>
                          <SelectItem value="1">Yes</SelectItem>
                          <SelectItem value="0">No</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Label>Featured</Label>
                <Controller
                  name="is_featured"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Select
                      value={String(field.value)}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Featured" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Featured</SelectLabel>
                          <SelectItem value="1">Yes</SelectItem>
                          <SelectItem value="0">No</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button asChild variant="outline">
                <Link href="/products">Cancel</Link>
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
