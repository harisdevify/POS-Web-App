'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

// SHADCN UI
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

export default function ProductVariant() {
  const [variantColors] = useState([
    { color_id: 1, color_name: 'Red' },
    { color_id: 2, color_name: 'Blue' },
    { color_id: 3, color_name: 'Black' },
  ]);

  const [variantImages, setVariantImages] = useState([
    {
      p_img_id: 101,
      image_path: '/table.jpg',
      rimg_alt_content: 'Demo Image 1',
    },
    {
      p_img_id: 102,
      image_path: '/table.jpg',
      rimg_alt_content: 'Demo Image 2',
    },
    {
      p_img_id: 103,
      image_path: '/table.jpg',
      rimg_alt_content: 'Demo Image 3',
    },
  ]);

  const { register, handleSubmit, control, watch } = useForm({
    defaultValues: {
      product_id_fk: '1',
      p_v_id: '101',
      p_v_name: 'Premium Variant',
      product_weight: '250',
      purchase_price: '1200',
      sale_price: '1800',
      discount_percent: 10,
      total_quantity: 50,
      available_quantity: 30,
      variant_color: 1,
      in_stock: 1,
      is_deleted: 0,
    },
  });

  const watchFiles = watch('image_path');

  const handleDeleteImage = (id) => {
    setVariantImages((prev) => prev.filter((img) => img.p_img_id !== id));
  };

  const onSubmit = (data) => {
    console.log('SUBMIT DATA:', data);
  };

  return (
    <section className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Images Card */}
        <Card>
          <CardHeader>
            <CardTitle>Product Variant Images</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              {variantImages.map((variantImag, index) => (
                <div
                  key={variantImag.p_img_id}
                  className="group relative rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <div className="relative w-full h-40 ">
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(variantImag.p_img_id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 "
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="p-2 border-t">
                    <Textarea
                      {...register(`rimg_alt_content.${index}`)}
                      defaultValue={variantImag.rimg_alt_content}
                      rows={1}
                      className="text-xs"
                    />

                    <input
                      type="hidden"
                      {...register(`p_img_id.${index}`)}
                      value={variantImag.p_img_id}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Upload Section */}
            <div className="my-6">
              <label className="block text-sm font-medium mb-2">
                Add New Images
              </label>

              <Input type="file" multiple {...register('image_path')} />

              {watchFiles && watchFiles.length > 0 && (
                <div className="mt-3 space-y-1">
                  {Array.from(watchFiles).map((file, i) => (
                    <Input
                      key={i}
                      type="text"
                      placeholder={`Alt text for ${file.name}`}
                      {...register(`new_alt_content.${i}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Edit Product Variant Details</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Variant Color */}
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Variant Color
                </label>

                <Controller
                  name="variant_color"
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="w-full"
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={String(field.value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Color" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {variantColors.map((color) => (
                          <SelectItem
                            key={color.color_id}
                            value={String(color.color_id)}
                          >
                            {color.color_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Variant Name */}
              <div>
                <label className="block mb-1">Variant Name</label>
                <Input {...register('p_v_name')} />
              </div>

              <div>
                <label className="block mb-1">Variant Weight (Grams)</label>
                <Input type="number" {...register('product_weight')} />
              </div>

              <div>
                <label className="block mb-1">Purchase Price</label>
                <Input type="number" {...register('purchase_price')} />
              </div>

              <div>
                <label className="block mb-1">Sale Price</label>
                <Input type="number" {...register('sale_price')} />
              </div>

              <div>
                <label className="block mb-1">Discount (%)</label>
                <Input type="number" {...register('discount_percent')} />
              </div>

              <div>
                <label className="block mb-1">Total Quantity</label>
                <Input type="number" {...register('total_quantity')} />
              </div>

              <div>
                <label className="block mb-1">Available Quantity</label>
                <Input type="number" {...register('available_quantity')} />
              </div>

              {/* In Stock */}
              <div>
                <label className="block mb-1">In Stock</label>

                <Controller
                  name="in_stock"
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="w-full"
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={String(field.value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="1">Yes</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-6">
              {/* Active / Deactive */}
              <Controller
                name="is_deleted"
                control={control}
                render={({ field }) => (
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={!field.value}
                      onChange={(e) => field.onChange(!e.target.checked)}
                    />
                    {!field.value ? 'Active' : 'Deactive'}
                  </label>
                )}
              />

              <button type="submit" className="add-btn px-4 py-2 text-xs">
                Update Variant
              </button>
            </div>
          </CardContent>
        </Card>
      </form>
    </section>
  );
}
