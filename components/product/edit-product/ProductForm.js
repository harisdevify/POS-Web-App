// components/products/ProductForm.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Controller } from 'react-hook-form';
import FormField from './FormField';

export function ProductForm({
  onSubmit,
  register,
  control,
  watch,
  setValue,
  errors,
  handleSubmit,
  file,
  setFile,
  productCatTypes,
  productSubcategories,
  fetchSubcategories,
  initialData,
}) {
  const watchCategory = watch('category_id_fk');
  const watchSubCategory = watch('subcat_id_fk');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Image Upload Section */}
      <div className="flex justify-center items-center gap-3 w-full">
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
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${
                watch('product_image') || ''
              }`}
              alt="Preview"
              width={120}
              height={120}
              className="object-cover"
            />
          )}
        </div>
        <div className="flex flex-col justify-center w-full">
          <Label className="mb-1 text-sm font-medium">Alt Content</Label>
          <Textarea
            placeholder="Enter Alt Content"
            {...register('alt_content')}
            className="w-full h-24"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <Label className="mb-1 text-sm font-medium">Select Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full cursor-pointer"
        />
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="Keywords"
          placeholder="Enter keywords"
          register={register}
          name="keywords"
        />

        <FormField
          label="Meta Title"
          placeholder="Enter meta title"
          register={register}
          name="meta_title"
        />

        <FormField
          label="Meta Description"
          placeholder="Enter meta description"
          register={register}
          name="meta_desc"
        />

        <FormField
          label="Product Title"
          placeholder="Enter Product Title"
          register={register}
          name="product_name"
          required
        />

        {/* Category Select */}
        <div className="grid gap-2">
          <Label>Select Category</Label>
          <select
            {...register('category_id_fk')}
            className="form-control w-full"
            onChange={async (e) => {
              const selectedCat = e.target.value;
              setValue('category_id_fk', selectedCat);
              setValue('subcat_id_fk', '');
              await fetchSubcategories(selectedCat);
            }}
            value={watchCategory || ''}
          >
            <option value="">Select Category</option>
            {productCatTypes?.map((pc_type) => (
              <option key={pc_type.p_category_id} value={pc_type.p_category_id}>
                {pc_type.p_category_name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Select */}
        <div className="grid gap-2">
          <Label>Select Sub Category</Label>
          <select
            {...register('subcat_id_fk')}
            className="form-control w-full"
            onChange={(e) => {
              const selectedSub = e.target.value;
              setValue('subcat_id_fk', selectedSub);
            }}
            value={watchSubCategory || ''}
          >
            <option value="">Select Subcategory</option>
            {productSubcategories?.length > 0 ? (
              productSubcategories.map((subcat) => (
                <option key={subcat.s_cat_id} value={subcat.s_cat_id}>
                  {subcat.p_sub_category_name}
                </option>
              ))
            ) : (
              <option disabled>No Subcategories</option>
            )}
          </select>
        </div>

        {/* YouTube Video */}
        <div className="grid gap-2">
          <label className="block font-medium">Youtube Video</label>
          <select
            className="form-control w-full"
            value={watch('is_youtube_video') ?? ''}
            onChange={(e) =>
              setValue('is_youtube_video', Number(e.target.value))
            }
          >
            <option value="">Select</option>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>

        <FormField
          label="Youtube Video URL"
          placeholder="URL"
          register={register}
          name="youtube_video_url"
        />

        <FormField
          label="Youtube Video ID"
          placeholder="Video ID"
          register={register}
          name="youtube_video_id"
        />

        {/* In Stock */}
        <div className="grid gap-2">
          <label className="block font-medium">In Stock</label>
          <Controller
            name="in_stock"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="form-control w-full"
                value={field.value ? 'true' : 'false'}
                onChange={(e) => field.onChange(e.target.value === 'true')}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            )}
          />
        </div>

        {/* Featured */}
        <div className="grid gap-2">
          <label className="block font-medium">Featured</label>
          <Controller
            name="is_featured"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="form-control w-full"
                value={field.value ? 'true' : 'false'}
                onChange={(e) => field.onChange(e.target.value === 'true')}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            )}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="pt-4 flex justify-between items-center">
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
        <Button type="submit">Update Product</Button>
      </div>
    </form>
  );
}
